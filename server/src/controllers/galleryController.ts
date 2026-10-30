import { Request, Response } from 'express';
import { z } from 'zod';
import { query, get, execute } from '../database/db.js';
import { logAudit } from '../middleware/errorHandler.js';

export async function getPublicGallery(req: Request, res: Response): Promise<void> {
  const { category } = req.query;

  let sql = 'SELECT * FROM gallery_images WHERE is_visible = 1';
  const params: any[] = [];

  if (category && category !== 'All') {
    sql += ' AND category = ?';
    params.push(category);
  }

  sql += ' ORDER BY display_order ASC, id DESC';

  const images = await query(sql, params);
  res.json({ success: true, data: images });
}

export async function getAdminGallery(_req: Request, res: Response): Promise<void> {
  const images = await query('SELECT * FROM gallery_images ORDER BY display_order ASC, id DESC');
  res.json({ success: true, data: images });
}

export const galleryImageSchema = z.object({
  title: z.string().min(2, 'Image title is required'),
  alt_text: z.string().optional().nullable(),
  category: z.string().default('All'),
  image_url: z.string().min(5, 'Image URL is required'),
  display_order: z.number().int().default(0),
  is_visible: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
});

export async function createGalleryImage(req: Request, res: Response): Promise<void> {
  const body = galleryImageSchema.parse(req.body);

  const result = await execute(
    `INSERT INTO gallery_images (title, alt_text, category, image_url, display_order, is_visible)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [body.title, body.alt_text || null, body.category, body.image_url, body.display_order, body.is_visible]
  );

  await logAudit(req, 'CREATE_GALLERY_IMAGE', 'gallery_image', result.insertId);

  res.status(201).json({
    success: true,
    data: { id: result.insertId },
    message: 'Gallery image added successfully.',
  });
}

export async function updateGalleryImage(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = galleryImageSchema.parse(req.body);

  const image = await get('SELECT id FROM gallery_images WHERE id = ?', [id]);
  if (!image) {
    res.status(404).json({ success: false, error: 'Gallery image not found.' });
    return;
  }

  await execute(
    `UPDATE gallery_images SET
      title = ?, alt_text = ?, category = ?, image_url = ?, display_order = ?, is_visible = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [body.title, body.alt_text || null, body.category, body.image_url, body.display_order, body.is_visible, id]
  );

  await logAudit(req, 'UPDATE_GALLERY_IMAGE', 'gallery_image', id);

  res.json({ success: true, message: 'Gallery image updated successfully.' });
}

export async function deleteGalleryImage(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const image = await get('SELECT id, title FROM gallery_images WHERE id = ?', [id]);
  if (!image) {
    res.status(404).json({ success: false, error: 'Gallery image not found.' });
    return;
  }

  await execute('DELETE FROM gallery_images WHERE id = ?', [id]);
  await logAudit(req, 'DELETE_GALLERY_IMAGE', 'gallery_image', id, { title: image.title });

  res.json({ success: true, message: 'Gallery image removed successfully.' });
}

