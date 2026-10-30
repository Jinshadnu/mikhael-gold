import { Request, Response } from 'express';
import { z } from 'zod';
import { query, get, execute } from '../database/db.js';
import { logAudit } from '../middleware/errorHandler.js';

export async function getPublicHomepage(_req: Request, res: Response): Promise<void> {
  const sections = await query(
    'SELECT section_key, title, subtitle, content_json, image_url, is_enabled FROM homepage_sections WHERE is_enabled = 1 ORDER BY display_order ASC'
  );

  const formatted: Record<string, any> = {};
  for (const sec of sections) {
    let parsedContent = {};
    if (sec.content_json) {
      try {
        parsedContent = typeof sec.content_json === 'string' ? JSON.parse(sec.content_json) : sec.content_json;
      } catch (e) {
        parsedContent = {};
      }
    }
    formatted[sec.section_key] = {
      title: sec.title,
      subtitle: sec.subtitle,
      image_url: sec.image_url,
      ...parsedContent,
    };
  }

  res.json({ success: true, data: formatted });
}

export async function getAdminHomepageSections(_req: Request, res: Response): Promise<void> {
  const sections = await query('SELECT * FROM homepage_sections ORDER BY display_order ASC');
  const parsed = sections.map((sec) => {
    let content = {};
    try {
      content = typeof sec.content_json === 'string' ? JSON.parse(sec.content_json) : sec.content_json;
    } catch (e) {
      content = {};
    }
    return {
      ...sec,
      content,
    };
  });

  res.json({ success: true, data: parsed });
}

export const updateSectionSchema = z.object({
  title: z.string().optional().nullable(),
  subtitle: z.string().optional().nullable(),
  content: z.record(z.any()).optional(),
  image_url: z.string().optional().nullable(),
  is_enabled: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
});

export async function updateHomepageSection(req: Request, res: Response): Promise<void> {
  const { key } = req.params;
  const body = updateSectionSchema.parse(req.body);

  const section = await get('SELECT id, section_key FROM homepage_sections WHERE section_key = ?', [key]);
  if (!section) {
    res.status(404).json({ success: false, error: 'Homepage section not found.' });
    return;
  }

  const contentJson = body.content ? JSON.stringify(body.content) : null;

  await execute(
    `UPDATE homepage_sections SET
      title = ?, subtitle = ?, content_json = ?, image_url = ?, is_enabled = ?, updated_at = CURRENT_TIMESTAMP
    WHERE section_key = ?`,
    [body.title || null, body.subtitle || null, contentJson, body.image_url || null, body.is_enabled, key]
  );

  await logAudit(req, 'UPDATE_HOMEPAGE_SECTION', 'homepage_section', key);

  res.json({ success: true, message: 'Homepage section updated successfully.' });
}

