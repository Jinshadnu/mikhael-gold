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

// ========================
// PUBLIC PRODUCT APIS
// ========================

export async function getPublicProducts(req: Request, res: Response): Promise<void> {
  const {
    category,
    search,
    material,
    featured,
    new_arrival,
    sort = 'newest',
    page = '1',
    limit = '12',
  } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.max(1, Math.min(50, parseInt(limit as string, 10) || 12));
  const offset = (pageNum - 1) * limitNum;

  const conditions: string[] = ["p.publication_status = 'published'"];
  const params: any[] = [];

  if (category) {
    conditions.push('(c.slug = ? OR p.category_id = ?)');
    params.push(category, category);
  }

  if (search) {
    conditions.push('(p.name LIKE ? OR p.sku LIKE ? OR p.short_description LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  if (material) {
    conditions.push('p.material LIKE ?');
    params.push(`%${material}%`);
  }

  if (featured === 'true' || featured === '1') {
    conditions.push('p.is_featured = 1');
  }

  if (new_arrival === 'true' || new_arrival === '1') {
    conditions.push('p.is_new_arrival = 1');
  }

  let orderBy = 'p.created_at DESC';
  if (sort === 'price_asc') {
    orderBy = 'p.published_price ASC';
  } else if (sort === 'price_desc') {
    orderBy = 'p.published_price DESC';
  } else if (sort === 'name_asc') {
    orderBy = 'p.name ASC';
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  // Get total count
  const countSql = `
    SELECT COUNT(*) as total 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    ${whereClause}
  `;
  const countRes = await get<{ total: number }>(countSql, params);
  const total = countRes ? countRes.total : 0;

  // Get paginated items
  const dataSql = `
    SELECT 
      p.id, p.name, p.sku, p.slug, p.short_description, p.main_image,
      p.category_id, c.name as category_name, c.slug as category_slug,
      p.material, p.purity, p.gross_weight, p.net_weight, p.stone_weight,
      p.diamond_details, p.making_charges, p.published_price, p.display_price,
      p.availability_status, p.is_featured, p.is_new_arrival, p.created_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
    ORDER BY ${orderBy}
    LIMIT ? OFFSET ?
  `;
  const products = await query(dataSql, [...params, limitNum, offset]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

export async function getPublicProductBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;

  const productSql = `
    SELECT 
      p.*,
      c.name as category_name,
      c.slug as category_slug
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.slug = ? AND p.publication_status = 'published'
  `;
  const product = await get(productSql, [slug]);

  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  // Get gallery images
  const images = await query(
    'SELECT id, image_url, alt_text, is_primary FROM product_images WHERE product_id = ? ORDER BY display_order ASC, id ASC',
    [product.id]
  );

  // Get related products from the same category
  const relatedSql = `
    SELECT 
      p.id, p.name, p.sku, p.slug, p.short_description, p.main_image,
      p.published_price, p.display_price, p.purity, p.gross_weight,
      c.name as category_name
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    WHERE p.category_id = ? AND p.id != ? AND p.publication_status = 'published'
    ORDER BY p.is_featured DESC, p.created_at DESC
    LIMIT 4
  `;
  const related = await query(relatedSql, [product.category_id, product.id]);

  res.json({
    success: true,
    data: {
      ...product,
      images,
      related,
    },
  });
}

// ========================
// ADMIN PRODUCT APIS
// ========================

export async function getAdminProducts(req: Request, res: Response): Promise<void> {
  const { search, category_id, status, page = '1', limit = '15' } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 15));
  const offset = (pageNum - 1) * limitNum;

  const conditions: string[] = [];
  const params: any[] = [];

  if (category_id) {
    conditions.push('p.category_id = ?');
    params.push(category_id);
  }

  if (status && status !== 'all') {
    conditions.push('p.publication_status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(p.name LIKE ? OR p.sku LIKE ? OR p.material LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countSql = `SELECT COUNT(*) as total FROM products p ${whereClause}`;
  const countRes = await get<{ total: number }>(countSql, params);
  const total = countRes ? countRes.total : 0;

  const listSql = `
    SELECT 
      p.id, p.name, p.sku, p.slug, p.main_image, p.category_id,
      c.name as category_name, p.material, p.purity, p.gross_weight,
      p.published_price, p.display_price, p.availability_status,
      p.is_featured, p.is_new_arrival, p.publication_status, p.created_at, p.updated_at
    FROM products p
    LEFT JOIN categories c ON p.category_id = c.id
    ${whereClause}
    ORDER BY p.updated_at DESC
    LIMIT ? OFFSET ?
  `;
  const products = await query(listSql, [...params, limitNum, offset]);

  res.json({
    success: true,
    data: products,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

export async function getAdminProductById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const product = await get('SELECT * FROM products WHERE id = ?', [id]);
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  const images = await query(
    'SELECT * FROM product_images WHERE product_id = ? ORDER BY display_order ASC, id ASC',
    [id]
  );

  res.json({
    success: true,
    data: {
      ...product,
      images,
    },
  });
}

export const createProductSchema = z.object({
  name: z.string().min(2, 'Product name is required'),
  sku: z.string().min(2, 'SKU is required'),
  slug: z.string().optional(),
  short_description: z.string().optional().nullable(),
  full_description: z.string().optional().nullable(),
  main_image: z.string().optional().nullable(),
  category_id: z.number().int().positive('Category is required'),
  subcategory_id: z.number().int().optional().nullable(),
  material: z.string().default('Gold'),
  purity: z.string().optional().nullable(),
  gross_weight: z.number().optional().nullable(),
  net_weight: z.number().optional().nullable(),
  stone_weight: z.number().optional().nullable(),
  diamond_details: z.string().optional().nullable(),
  making_charges: z.number().optional().nullable(),
  published_price: z.number().optional().nullable(),
  display_price: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
  availability_status: z.enum(['in_stock', 'made_to_order', 'out_of_stock']).default('in_stock'),
  is_featured: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
  is_new_arrival: z.union([z.boolean(), z.number()]).transform((v) => (v ? 1 : 0)),
  publication_status: z.enum(['published', 'draft', 'archived']).default('published'),
  seo_title: z.string().optional().nullable(),
  seo_description: z.string().optional().nullable(),
  gallery_images: z.array(z.string()).optional(),
});

export async function createProduct(req: Request, res: Response): Promise<void> {
  const body = createProductSchema.parse(req.body);

  const finalSlug = body.slug ? slugify(body.slug) : slugify(body.name);

  // Check unique SKU
  const existingSku = await get('SELECT id FROM products WHERE sku = ?', [body.sku]);
  if (existingSku) {
    res.status(400).json({ success: false, error: 'A product with this SKU already exists.' });
    return;
  }

  // Check unique slug
  const existingSlug = await get('SELECT id FROM products WHERE slug = ?', [finalSlug]);
  if (existingSlug) {
    res.status(400).json({ success: false, error: 'A product with this URL slug already exists.' });
    return;
  }

  const insertRes = await execute(
    `INSERT INTO products (
      name, sku, slug, short_description, full_description, main_image,
      category_id, subcategory_id, material, purity, gross_weight, net_weight,
      stone_weight, diamond_details, making_charges, published_price, display_price,
      availability_status, is_featured, is_new_arrival, publication_status,
      seo_title, seo_description
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      body.name,
      body.sku,
      finalSlug,
      body.short_description || null,
      body.full_description || null,
      body.main_image || null,
      body.category_id,
      body.subcategory_id || null,
      body.material,
      body.purity || null,
      body.gross_weight || null,
      body.net_weight || null,
      body.stone_weight || null,
      body.diamond_details || null,
      body.making_charges || null,
      body.published_price || null,
      body.display_price,
      body.availability_status,
      body.is_featured,
      body.is_new_arrival,
      body.publication_status,
      body.seo_title || null,
      body.seo_description || null,
    ]
  );

  const newProductId = insertRes.insertId;

  // Primary image
  if (body.main_image) {
    await execute(
      `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
       VALUES (?, ?, ?, 0, 1)`,
      [newProductId, body.main_image, body.name]
    );
  }

  // Additional gallery images
  if (body.gallery_images && Array.isArray(body.gallery_images)) {
    for (let i = 0; i < body.gallery_images.length; i++) {
      const imgUrl = body.gallery_images[i];
      if (imgUrl && imgUrl !== body.main_image) {
        await execute(
          `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
           VALUES (?, ?, ?, ?, 0)`,
          [newProductId, imgUrl, body.name, i + 1]
        );
      }
    }
  }

  await logAudit(req, 'CREATE_PRODUCT', 'product', newProductId, { name: body.name, sku: body.sku });

  res.status(201).json({
    success: true,
    data: { id: newProductId, slug: finalSlug },
    message: 'Product created successfully.',
  });
}

export async function updateProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = createProductSchema.parse(req.body);

  const product = await get('SELECT id, slug, sku FROM products WHERE id = ?', [id]);
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  const finalSlug = body.slug ? slugify(body.slug) : slugify(body.name);

  // Check unique SKU
  const existingSku = await get('SELECT id FROM products WHERE sku = ? AND id != ?', [body.sku, id]);
  if (existingSku) {
    res.status(400).json({ success: false, error: 'Another product with this SKU already exists.' });
    return;
  }

  // Check unique slug
  const existingSlug = await get('SELECT id FROM products WHERE slug = ? AND id != ?', [finalSlug, id]);
  if (existingSlug) {
    res.status(400).json({ success: false, error: 'Another product with this URL slug already exists.' });
    return;
  }

  await execute(
    `UPDATE products SET
      name = ?, sku = ?, slug = ?, short_description = ?, full_description = ?, main_image = ?,
      category_id = ?, subcategory_id = ?, material = ?, purity = ?, gross_weight = ?, net_weight = ?,
      stone_weight = ?, diamond_details = ?, making_charges = ?, published_price = ?, display_price = ?,
      availability_status = ?, is_featured = ?, is_new_arrival = ?, publication_status = ?,
      seo_title = ?, seo_description = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?`,
    [
      body.name,
      body.sku,
      finalSlug,
      body.short_description || null,
      body.full_description || null,
      body.main_image || null,
      body.category_id,
      body.subcategory_id || null,
      body.material,
      body.purity || null,
      body.gross_weight || null,
      body.net_weight || null,
      body.stone_weight || null,
      body.diamond_details || null,
      body.making_charges || null,
      body.published_price || null,
      body.display_price,
      body.availability_status,
      body.is_featured,
      body.is_new_arrival,
      body.publication_status,
      body.seo_title || null,
      body.seo_description || null,
      id,
    ]
  );

  // Re-sync gallery images if provided
  if (body.gallery_images) {
    await execute('DELETE FROM product_images WHERE product_id = ?', [id]);
    if (body.main_image) {
      await execute(
        `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
         VALUES (?, ?, ?, 0, 1)`,
        [id, body.main_image, body.name]
      );
    }
    for (let i = 0; i < body.gallery_images.length; i++) {
      const imgUrl = body.gallery_images[i];
      if (imgUrl && imgUrl !== body.main_image) {
        await execute(
          `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
           VALUES (?, ?, ?, ?, 0)`,
          [id, imgUrl, body.name, i + 1]
        );
      }
    }
  }

  await logAudit(req, 'UPDATE_PRODUCT', 'product', id, { name: body.name, sku: body.sku });

  res.json({ success: true, message: 'Product updated successfully.' });
}

export async function deleteProduct(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const product = await get('SELECT id, name, sku FROM products WHERE id = ?', [id]);
  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  await execute('DELETE FROM product_images WHERE product_id = ?', [id]);
  await execute('DELETE FROM products WHERE id = ?', [id]);

  await logAudit(req, 'DELETE_PRODUCT', 'product', id, { name: product.name, sku: product.sku });

  res.json({ success: true, message: 'Product deleted successfully.' });
}

export async function toggleProductPublish(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const product = await get<{ id: number; publication_status: string }>(
    'SELECT id, publication_status FROM products WHERE id = ?',
    [id]
  );

  if (!product) {
    res.status(404).json({ success: false, error: 'Product not found.' });
    return;
  }

  const newStatus = product.publication_status === 'published' ? 'draft' : 'published';
  await execute('UPDATE products SET publication_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', [
    newStatus,
    id,
  ]);

  await logAudit(req, 'TOGGLE_PUBLISH_PRODUCT', 'product', id, { newStatus });

  res.json({ success: true, data: { publication_status: newStatus } });
}

