import { Request, Response } from 'express';
import { query } from '../database/db.js';

export async function getSitemapXml(req: Request, res: Response): Promise<void> {
  const host = req.get('host') || 'mikhaelgold.com';
  const protocol = req.protocol;
  const baseUrl = `${protocol}://${host}`;

  const [categories, products] = await Promise.all([
    query<{ slug: string; updated_at: string }>(
      'SELECT slug, updated_at FROM categories WHERE is_active = 1'
    ),
    query<{ slug: string; updated_at: string }>(
      "SELECT slug, updated_at FROM products WHERE publication_status = 'published'"
    ),
  ]);

  const staticPages = [
    { url: '', priority: '1.0', changefreq: 'daily' },
    { url: '/products', priority: '0.9', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/gallery', priority: '0.8', changefreq: 'weekly' },
    { url: '/contact', priority: '0.8', changefreq: 'monthly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const page of staticPages) {
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}${page.url}</loc>\n`;
    xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
    xml += `    <priority>${page.priority}</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const cat of categories) {
    const lastMod = cat.updated_at ? new Date(cat.updated_at).toISOString() : new Date().toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/products?category=${cat.slug}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.85</priority>\n`;
    xml += `  </url>\n`;
  }

  for (const prod of products) {
    const lastMod = prod.updated_at ? new Date(prod.updated_at).toISOString() : new Date().toISOString();
    xml += `  <url>\n`;
    xml += `    <loc>${baseUrl}/products/${prod.slug}</loc>\n`;
    xml += `    <lastmod>${lastMod}</lastmod>\n`;
    xml += `    <changefreq>weekly</changefreq>\n`;
    xml += `    <priority>0.8</priority>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>`;

  res.setHeader('Content-Type', 'application/xml');
  res.send(xml);
}

export function getRobotsTxt(req: Request, res: Response): void {
  const host = req.get('host') || 'mikhaelgold.com';
  const protocol = req.protocol;
  const baseUrl = `${protocol}://${host}`;

  const robots = `User-agent: *
Disallow: /admin/
Disallow: /api/admin/
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

  res.setHeader('Content-Type', 'text/plain');
  res.send(robots);
}

