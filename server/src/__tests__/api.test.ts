import { describe, it, expect, beforeAll } from 'vitest';
import bcrypt from 'bcryptjs';
import { initDb, get, query, execute } from '../database/db.js';
import { runSeed } from '../database/seed.js';

describe('Mikhael Gold Database & Business Logic Tests', () => {
  beforeAll(async () => {
    await initDb();
    await runSeed();
  });

  it('Verifies business settings seeded correctly with real address', async () => {
    const settings = await query<{ setting_key: string; setting_value: string }>(
      'SELECT setting_key, setting_value FROM business_settings'
    );
    const map = Object.fromEntries(settings.map((s) => [s.setting_key, s.setting_value]));

    expect(map.business_name).toBe('MIKHAEL GOLD AND DIAMONDS LLP');
    expect(map.address).toContain('Punnayurkulam, Kerala');
    expect(map.google_maps_url).toContain('maps.app.goo.gl');
    expect(map.currency).toBe('INR');
  });

  it('Verifies all 8 jewellery categories exist and are active', async () => {
    const categories = await query<{ name: string; slug: string; is_active: number }>(
      'SELECT name, slug, is_active FROM categories WHERE is_active = 1 ORDER BY display_order ASC'
    );

    expect(categories.length).toBeGreaterThanOrEqual(8);
    const slugs = categories.map((c) => c.slug);
    expect(slugs).toContain('gold-necklaces');
    expect(slugs).toContain('gold-chains');
    expect(slugs).toContain('gold-rings');
    expect(slugs).toContain('gold-bangles');
    expect(slugs).toContain('gold-earrings');
    expect(slugs).toContain('diamond-jewellery');
    expect(slugs).toContain('bridal-jewellery');
    expect(slugs).toContain('traditional-jewellery');
  });

  it('Verifies admin authentication credentials and bcrypt hashing', async () => {
    const admin = await get<{ email: string; password_hash: string }>(
      'SELECT email, password_hash FROM admins WHERE email = ?',
      ['admin@mikhaelgold.com']
    );

    expect(admin).toBeDefined();
    expect(bcrypt.compareSync('Admin@Mikhael2026', admin!.password_hash)).toBe(true);
    expect(bcrypt.compareSync('WrongPassword', admin!.password_hash)).toBe(false);
  });

  it('Verifies products data model, weights, purities, and publication status', async () => {
    const products = await query<{
      name: string;
      sku: string;
      purity: string;
      gross_weight: number;
      publication_status: string;
      is_featured: number;
    }>('SELECT name, sku, purity, gross_weight, publication_status, is_featured FROM products');

    expect(products.length).toBeGreaterThanOrEqual(6);
    const kasuMala = products.find((p) => p.sku === 'MGD-NL-001');
    expect(kasuMala).toBeDefined();
    expect(kasuMala?.purity).toBe('22K (916)');
    expect(kasuMala?.publication_status).toBe('published');
    expect(kasuMala?.gross_weight).toBe(48.5);
  });

  it('Verifies customer enquiry creation and status lifecycle', async () => {
    const insertRes = await execute(
      `INSERT INTO enquiries (full_name, mobile, email, category, product_reference, message, status)
       VALUES (?, ?, ?, ?, ?, ?, 'New')`,
      [
        'Farhana K.',
        '+91 94470 11223',
        'farhana@example.com',
        'Bridal Jewellery',
        'Emerald Palakka Mala Royal Choker',
        'Enquiring about wedding set availability for next month.',
      ]
    );

    expect(insertRes.insertId).toBeGreaterThan(0);

    const enquiry = await get<{ id: number; full_name: string; status: string }>(
      'SELECT id, full_name, status FROM enquiries WHERE id = ?',
      [insertRes.insertId]
    );
    expect(enquiry?.full_name).toBe('Farhana K.');
    expect(enquiry?.status).toBe('New');

    // Admin updates status to Contacted
    await execute('UPDATE enquiries SET status = ? WHERE id = ?', ['Contacted', enquiry!.id]);
    const updated = await get<{ status: string }>('SELECT status FROM enquiries WHERE id = ?', [
      enquiry!.id,
    ]);
    expect(updated?.status).toBe('Contacted');
  });

  it('Verifies homepage sections data integrity', async () => {
    const sections = await query<{ section_key: string; is_enabled: number }>(
      'SELECT section_key, is_enabled FROM homepage_sections WHERE is_enabled = 1'
    );
    const keys = sections.map((s) => s.section_key);
    expect(keys).toContain('announcement_bar');
    expect(keys).toContain('hero_section');
    expect(keys).toContain('about_section');
    expect(keys).toContain('why_choose_us');
    expect(keys).toContain('bridal_section');
  });
});
