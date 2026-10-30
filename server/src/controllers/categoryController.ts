import { Request, Response } from 'express';
import { z } from 'zod';
import { get, query, execute } from '../database/db.js';
import { logAudit } from '../middleware/errorHandler.js';

function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
}

export async function getPublicCategories(_req: Request, res: Response): Promise<void> {
  const sql = `
    SELECT 
      c.id, c.name, c.slug, c.description, c.image_url, c.display_order,
      COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id AND p.publication_status = 'published'
    WHERE c.is_active = 1
    GROUP BY c.id
    ORDER BY c.display_order ASC, c.name ASC
  `;
  const categories = await query(sql);
  res.json({ success: true, data: categories });
}

export async function getAdminCategories(_req: Request, res: Response): Promise<void> {
  const sql = `
    SELECT 
      c.id, c.name, c.slug, c.description, c.image_url, c.parent_id,
      c.display_order, c.is_active, c.seo_title, c.seo_description,
      COUNT(p.id) as product_count
    FROM categories c
    LEFT JOIN products p ON p.category_id = c.id
    GROUP BY c.id
    ORDER BY c.display_order ASC, c.name ASC
  `;
  const categories = await query(sql);
  res.json({ success: true, data: categories });
}

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name is required'),
  slug: z.string().optional(),
  description: z.string().optional().nullable(),
  image_url: z.string().optional().nullable(),
  parent_id: z.number().int().optional().nullable(),
  display_order: z.number().int().default(0),
  is_active: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
});

export async function createCategory(req: Request, res: Response): Promise<void> {
  const body = categorySchema.parse(req.body);
  const finalSlug = body.slug ? slugify(body.slug) : slugify(body.name);

  const existing = await get('SELECT id FROM categories WHERE slug = ?', [finalSlug]);
  if (existing) {
    res.status(400).json({ success: false, error: 'A category with this URL slug already exists.' });
    return;
  }

  const result = await execute(
    `INSERT INTO categories (name, slug, description, image_url, parent_id, display_order, is_active, seo_title, seo_description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      body.name,
      finalSlug,
      body.description || null,
      body.image_url || null,
      body.parent_id || null,
      body.display_order,
      body.is_active,
      body.seo_title || null,
      body.seo_description || null,
    ]
  );

  await logAudit(req, 'CREATE_CATEGORY', 'category', result.insertId, { name: body.name, slug: finalSlug });

  res.status(201).json({
    success: true,
    data: { id: result.insertId, slug: finalSlug },
    message: 'Category created successfully.',
  });
}

export async function updateCategory(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = categorySchema.parse(req.body);
  const finalSlug = body.slug ? slugify(body.slug) : slugify(body.name);

  const category = await get('SELECT id FROM categories WHERE id = ?', [id]);
  if (!category) {
    res.status(404).json({ success: false, error: 'Category not found.' });
    return;
  }

  const existingSlug = await get('SELECT id FROM categories WHERE slug = ? AND id != ?', [finalSlug, id]);
  if (existingSlug) {
    res.status(400).json({ success: false, error: 'Another category with this URL slug already exists.' });
    return;
  }

  await execute(
    `UPDATE categories SET
      name = ?, slug = ?, description = ?, image_url = ?, parent_id = ?,
      display_order = ?, is_active = ?, seo_title = ?, seo_description = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      body.name,
      finalSlug,
      body.description || null,
      body.image_url || null,
      body.parent_id || null,
      body.display_order,
      body.is_active,
      body.seo_title || null,
      body.seo_description || null,
      id,
    ]
  );

  await logAudit(req, 'UPDATE_CATEGORY', 'category', id, { name: body.name, slug: finalSlug });

  res.json({ success: true, message: 'Category updated successfully.' });
}

export async function deleteCategory(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const category = await get('SELECT id, name FROM categories WHERE id = ?', [id]);
  if (!category) {
    res.status(404).json({ success: false, error: 'Category not found.' });
    return;
  }

  // Check associated products
  const productCountRes = await get<{ count: number }>(
    'SELECT COUNT(*) as count FROM products WHERE category_id = ?',
    [id]
  );
  const productCount = productCountRes ? productCountRes.count : 0;

  if (productCount > 0) {
    res.status(400).json({
      success: false,
      error: `Cannot delete category "${category.name}" because it has ${productCount} associated product(s). Please reassign or delete these products first.`,
    });
    return;
  }

  await execute('DELETE FROM categories WHERE id = ?', [id]);
  await logAudit(req, 'DELETE_CATEGORY', 'category', id, { name: category.name });

  res.json({ success: true, message: 'Category deleted successfully.' });
}
