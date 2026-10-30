import { Request, Response } from 'express';
import { get, query } from '../database/db.js';

export async function getDashboardStats(_req: Request, res: Response): Promise<void> {
  const [publishedProducts, draftProducts, activeCategories, totalEnquiries, newEnquiries] =
    await Promise.all([
      get<{ count: number }>(
        "SELECT COUNT(*) as count FROM products WHERE publication_status = 'published'"
      ),
      get<{ count: number }>(
        "SELECT COUNT(*) as count FROM products WHERE publication_status = 'draft'"
      ),
      get<{ count: number }>("SELECT COUNT(*) as count FROM categories WHERE is_active = 1"),
      get<{ count: number }>("SELECT COUNT(*) as count FROM enquiries"),
      get<{ count: number }>("SELECT COUNT(*) as count FROM enquiries WHERE status = 'New'"),
    ]);

  const recentEnquiries = await query(
    'SELECT id, full_name, mobile, email, category, status, created_at FROM enquiries ORDER BY created_at DESC LIMIT 5'
  );

  const recentProducts = await query(
    `SELECT p.id, p.name, p.sku, p.main_image, p.publication_status, p.updated_at, c.name as category_name
     FROM products p
     LEFT JOIN categories c ON p.category_id = c.id
     ORDER BY p.updated_at DESC LIMIT 5`
  );

  const recentAuditLogs = await query(
    'SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 5'
  );

  res.json({
    success: true,
    data: {
      stats: {
        publishedProducts: publishedProducts?.count || 0,
        draftProducts: draftProducts?.count || 0,
        activeCategories: activeCategories?.count || 0,
        totalEnquiries: totalEnquiries?.count || 0,
        newEnquiries: newEnquiries?.count || 0,
      },
      recentEnquiries,
      recentProducts,
      recentAuditLogs,
    },
  });
}
