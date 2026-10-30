import bcrypt from 'bcryptjs';
import { get, execute, initDb } from './db.js';

export async function runSeed() {
  console.log('🔄 Initializing database schema...');
  await initDb();

  // 1. Seed Admin
  const existingAdmin = await get('SELECT id FROM admins WHERE email = ?', ['admin@mikhaelgold.com']);
  if (!existingAdmin) {
    const passwordHash = bcrypt.hashSync('Admin@Mikhael2026', 10);
    await execute(
      `INSERT INTO admins (name, email, password_hash, role) VALUES (?, ?, ?, ?)`,
      ['Store Administrator', 'admin@mikhaelgold.com', passwordHash, 'super_admin']
    );
    console.log('✅ Admin user created: admin@mikhaelgold.com / Admin@Mikhael2026');
  }

  // 2. Seed Categories
  const categoriesData = [
    {
      name: 'Gold Necklaces',
      slug: 'gold-necklaces',
      description: 'Handcrafted 22K gold necklaces spanning traditional Kerala motifs to sleek contemporary designs.',
      image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      display_order: 1,
    },
    {
      name: 'Gold Chains',
      slug: 'gold-chains',
      description: 'Elegant daily wear, hollow rope, and traditional Kerala chains in hallmark 916 gold.',
      image_url: 'https://images.unsplash.com/photo-1611591475878-a2b1660d2bce?q=80&w=1000&auto=format&fit=crop',
      display_order: 2,
    },
    {
      name: 'Gold Rings',
      slug: 'gold-rings',
      description: 'Artfully sculpted gold rings for engagements, daily luxury, and milestone celebrations.',
      image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      display_order: 3,
    },
    {
      name: 'Gold Bangles',
      slug: 'gold-bangles',
      description: 'Traditional Kerala kappu, vala, and intricately etched wedding bangles.',
      image_url: 'https://images.unsplash.com/photo-1611591475878-a2b1660d2bce?q=80&w=1000&auto=format&fit=crop',
      display_order: 4,
    },
    {
      name: 'Gold Earrings',
      slug: 'gold-earrings',
      description: 'Classic jhumkas, contemporary studs, and chandelier drops in radiant 22K gold.',
      image_url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      display_order: 5,
    },
    {
      name: 'Diamond Jewellery',
      slug: 'diamond-jewellery',
      description: 'Brilliant certified diamonds cut to perfection in luminous gold and platinum settings.',
      image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
      display_order: 6,
    },
    {
      name: 'Bridal Jewellery',
      slug: 'bridal-jewellery',
      description: 'Magnificent bridal sets celebrating rich South Indian wedding traditions.',
      image_url: 'https://images.unsplash.com/photo-1543290956-bd4023ab3447?q=80&w=1000&auto=format&fit=crop',
      display_order: 7,
    },
    {
      name: 'Traditional Jewellery',
      slug: 'traditional-jewellery',
      description: 'Heritage temple jewellery including Palakka Mala, Kasu Mala, and Nagapadam creations.',
      image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      display_order: 8,
    },
  ];

  for (const cat of categoriesData) {
    const existingCat = await get('SELECT id FROM categories WHERE slug = ?', [cat.slug]);
    if (!existingCat) {
      await execute(
        `INSERT INTO categories (name, slug, description, image_url, display_order, is_active)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [cat.name, cat.slug, cat.description, cat.image_url, cat.display_order]
      );
    }
  }
  console.log('✅ Categories seeded');

  // 3. Seed Products
  const necklacesCat = await get('SELECT id FROM categories WHERE slug = ?', ['gold-necklaces']);
  const ringsCat = await get('SELECT id FROM categories WHERE slug = ?', ['gold-rings']);
  const banglesCat = await get('SELECT id FROM categories WHERE slug = ?', ['gold-bangles']);
  const earringsCat = await get('SELECT id FROM categories WHERE slug = ?', ['gold-earrings']);
  const diamondCat = await get('SELECT id FROM categories WHERE slug = ?', ['diamond-jewellery']);
  const bridalCat = await get('SELECT id FROM categories WHERE slug = ?', ['bridal-jewellery']);
  const traditionalCat = await get('SELECT id FROM categories WHERE slug = ?', ['traditional-jewellery']);

  const productsData = [
    {
      name: 'Lakshmi Kasu Mala Heritage Necklace',
      sku: 'MGD-NL-001',
      slug: 'lakshmi-kasu-mala-heritage-necklace',
      short_description: 'An iconic 22K gold Kasu Mala featuring embossed Goddess Lakshmi coins and auspicious floral edging.',
      full_description: 'The Lakshmi Kasu Mala is the cornerstone of timeless Kerala tradition. Meticulously handcrafted in 916 hallmark gold, each coin reflects divine prosperity and classical temple aesthetics. Designed to drape with royal elegance for brides and ceremonial celebrations.',
      main_image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1000&auto=format&fit=crop',
      category_id: bridalCat?.id || 7,
      material: '22K Gold (916 BIS Hallmarked)',
      purity: '22K (916)',
      gross_weight: 48.500,
      net_weight: 48.500,
      stone_weight: 0.000,
      diamond_details: null,
      making_charges: 3800.00,
      published_price: 365000.00,
      display_price: 0, // Contact us for price by default
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 1,
      publication_status: 'published',
      seo_title: 'Lakshmi Kasu Mala Heritage Necklace | Mikhael Gold and Diamonds',
      seo_description: 'Authentic handcrafted 22K BIS Hallmarked Lakshmi Kasu Mala gold necklace for Kerala brides.',
    },
    {
      name: 'Emerald Palakka Mala Royal Choker',
      sku: 'MGD-NL-002',
      slug: 'emerald-palakka-mala-royal-choker',
      short_description: 'Traditional Kerala leaf-motif necklace set with radiant emerald-tinted stones and ruby highlights.',
      full_description: 'A celebration of Malabar heritage, this Palakka Mala showcases signature leaf motifs embellished with rich emerald glass work and pure 22K gold borders. A beloved signature for traditional Kerala weddings.',
      main_image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      category_id: traditionalCat?.id || 8,
      material: '22K Gold & Natural Stones',
      purity: '22K (916)',
      gross_weight: 36.200,
      net_weight: 32.400,
      stone_weight: 3.800,
      diamond_details: null,
      making_charges: 2900.00,
      published_price: 245000.00,
      display_price: 0,
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 0,
      publication_status: 'published',
      seo_title: 'Emerald Palakka Mala Royal Choker | Mikhael Gold and Diamonds',
      seo_description: 'Handcrafted Palakka Mala choker necklace in 22K gold with rich emerald stones.',
    },
    {
      name: 'Royal Solitaire Brilliant Diamond Ring',
      sku: 'MGD-RG-101',
      slug: 'royal-solitaire-brilliant-diamond-ring',
      short_description: 'An exceptional 1.10 carat round brilliant solitaire diamond set in an 18K yellow gold band.',
      full_description: 'Exuding pure brilliance, this solitaire diamond ring is precision-cut to maximize fire and scintillation. Features an IGI-certified natural diamond graded VVS1 with pristine E color, embraced by an 18K yellow gold band.',
      main_image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1000&auto=format&fit=crop',
      category_id: diamondCat?.id || 6,
      material: '18K Gold & Certified Diamond',
      purity: '18K (750)',
      gross_weight: 4.800,
      net_weight: 4.580,
      stone_weight: 0.220,
      diamond_details: '1.10 ct, Round Brilliant, VVS1, E Color, IGI Certified',
      making_charges: 4500.00,
      published_price: 185000.00,
      display_price: 1,
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 1,
      publication_status: 'published',
      seo_title: 'Royal Solitaire Diamond Ring | Mikhael Gold and Diamonds',
      seo_description: '1.10 Carat IGI Certified round brilliant solitaire diamond ring in 18K gold.',
    },
    {
      name: 'Kerala Nagapadam Bridal Thaali Mala',
      sku: 'MGD-NL-003',
      slug: 'kerala-nagapadam-bridal-thaali-mala',
      short_description: 'Sacred snake-hood motif handcrafted bridal chain with rich green enamel and ruby accents.',
      full_description: 'The Nagapadam necklace represents protection, abundance, and graceful South Indian tradition. Accented with vibrant cabochon stones and masterfully woven gold loops.',
      main_image: 'https://images.unsplash.com/photo-1543290956-bd4023ab3447?q=80&w=1000&auto=format&fit=crop',
      category_id: bridalCat?.id || 7,
      material: '22K Gold',
      purity: '22K (916)',
      gross_weight: 42.000,
      net_weight: 38.500,
      stone_weight: 3.500,
      diamond_details: null,
      making_charges: 3200.00,
      published_price: 290000.00,
      display_price: 0,
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 0,
      publication_status: 'published',
      seo_title: 'Kerala Nagapadam Bridal Mala | Mikhael Gold and Diamonds',
      seo_description: 'Traditional 22K gold Nagapadam necklace for bridal wear and wedding ceremonies.',
    },
    {
      name: 'Handcrafted Filigree Antique Gold Bangles (Pair)',
      sku: 'MGD-BG-201',
      slug: 'handcrafted-filigree-antique-gold-bangles-pair',
      short_description: 'A stately pair of Kerala antique finish 22K gold bangles with delicate floral filigree.',
      full_description: 'Adorned with intricate micro-granulation and timeless repoussé work, this pair of bangles evokes the craftsmanship of royal Travancore artisans. BIS 916 hallmarked for guaranteed purity.',
      main_image: 'https://images.unsplash.com/photo-1611591475878-a2b1660d2bce?q=80&w=1000&auto=format&fit=crop',
      category_id: banglesCat?.id || 4,
      material: '22K Antique Gold',
      purity: '22K (916)',
      gross_weight: 32.600,
      net_weight: 32.600,
      stone_weight: 0.000,
      diamond_details: null,
      making_charges: 2500.00,
      published_price: 235000.00,
      display_price: 0,
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 1,
      publication_status: 'published',
      seo_title: 'Antique Filigree 22K Gold Bangles Pair | Mikhael Gold and Diamonds',
      seo_description: 'Handcrafted 22K antique gold bangles with royal floral filigree for festive and bridal wear.',
    },
    {
      name: 'Temple Archana Bell Jhumka Earrings',
      sku: 'MGD-ER-301',
      slug: 'temple-archana-bell-jhumka-earrings',
      short_description: 'Classic three-tiered temple jhumkas with hanging gold bead droplets and ruby studs.',
      full_description: 'A timeless silhouette that frames the face with festive grandeur. Featuring subtle antique oxidized gold accents, intricate floral motifs, and gentle sounding gold pearl droplets.',
      main_image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1000&auto=format&fit=crop',
      category_id: earringsCat?.id || 5,
      material: '22K Gold',
      purity: '22K (916)',
      gross_weight: 18.400,
      net_weight: 17.900,
      stone_weight: 0.500,
      diamond_details: null,
      making_charges: 1800.00,
      published_price: 135000.00,
      display_price: 0,
      availability_status: 'in_stock',
      is_featured: 1,
      is_new_arrival: 0,
      publication_status: 'published',
      seo_title: 'Temple Bell 22K Gold Jhumka Earrings | Mikhael Gold and Diamonds',
      seo_description: 'Authentic Kerala temple jhumkas in 22K hallmarked gold with delicate bead tassels.',
    },
    {
      name: 'Eternity Diamond Tennis Bracelet',
      sku: 'MGD-DB-401',
      slug: 'eternity-diamond-tennis-bracelet',
      short_description: 'Continuous strand of brilliant round-cut diamonds set in 18K white and yellow gold.',
      full_description: 'A masterclass in modern sophistication. 4.5 carats of closely set natural diamonds glide smoothly around the wrist with a double-safety lock clasp.',
      main_image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1000&auto=format&fit=crop',
      category_id: diamondCat?.id || 6,
      material: '18K White Gold & Natural Diamonds',
      purity: '18K (750)',
      gross_weight: 14.200,
      net_weight: 13.300,
      stone_weight: 0.900,
      diamond_details: '4.50 ct Total Weight, SI-GH Clarity & Color, Excellent Cut',
      making_charges: 6500.00,
      published_price: 380000.00,
      display_price: 1,
      availability_status: 'made_to_order',
      is_featured: 1,
      is_new_arrival: 1,
      publication_status: 'published',
      seo_title: 'Eternity Diamond Tennis Bracelet | Mikhael Gold and Diamonds',
      seo_description: 'Luxury 4.50 carat diamond tennis bracelet crafted in 18K gold.',
    },
    {
      name: 'Contemporary Layered 22K Gold Choker',
      sku: 'MGD-NL-004',
      slug: 'contemporary-layered-22k-gold-choker',
      short_description: 'Modern geometric polished gold choker with shimmering bead fringe.',
      full_description: 'Designed for the modern connoisseur, this choker balances sleek mirror-polished gold plates with soft textural beads, seamlessly transitioning from festive evenings to grand receptions.',
      main_image: 'https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=1000&auto=format&fit=crop',
      category_id: necklacesCat?.id || 1,
      material: '22K Gold',
      purity: '22K (916)',
      gross_weight: 24.500,
      net_weight: 24.500,
      stone_weight: 0.000,
      diamond_details: null,
      making_charges: 2100.00,
      published_price: 182000.00,
      display_price: 0,
      availability_status: 'in_stock',
      is_featured: 0,
      is_new_arrival: 1,
      publication_status: 'published',
      seo_title: 'Modern 22K Gold Choker | Mikhael Gold and Diamonds',
      seo_description: 'Contemporary sleek 22K gold choker necklace designed for modern elegance.',
    },
  ];

  for (const prod of productsData) {
    const existingProd = await get('SELECT id FROM products WHERE sku = ?', [prod.sku]);
    if (!existingProd) {
      const res = await execute(
        `INSERT INTO products (
          name, sku, slug, short_description, full_description, main_image,
          category_id, material, purity, gross_weight, net_weight, stone_weight,
          diamond_details, making_charges, published_price, display_price,
          availability_status, is_featured, is_new_arrival, publication_status,
          seo_title, seo_description
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          prod.name,
          prod.sku,
          prod.slug,
          prod.short_description,
          prod.full_description,
          prod.main_image,
          prod.category_id,
          prod.material,
          prod.purity,
          prod.gross_weight,
          prod.net_weight,
          prod.stone_weight,
          prod.diamond_details,
          prod.making_charges,
          prod.published_price,
          prod.display_price,
          prod.availability_status,
          prod.is_featured,
          prod.is_new_arrival,
          prod.publication_status,
          prod.seo_title,
          prod.seo_description,
        ]
      );

      // Add product images
      await execute(
        `INSERT INTO product_images (product_id, image_url, alt_text, display_order, is_primary)
         VALUES (?, ?, ?, 0, 1)`,
        [res.insertId, prod.main_image, prod.name]
      );
    }
  }
  console.log('✅ Products seeded');

  // 4. Seed Homepage Sections
  const sectionsData = [
    {
      section_key: 'announcement_bar',
      title: 'Announcement Bar',
      subtitle: 'Discover Timeless Elegance at Mikhael Gold and Diamonds • Punnayurkulam, Kerala',
      content_json: JSON.stringify({
        text: 'Discover Timeless Elegance at Mikhael Gold and Diamonds • Punnayurkulam, Kerala',
        link_text: 'Explore Jewellery',
        link_url: '/products',
      }),
      image_url: null,
      is_enabled: 1,
      display_order: 1,
    },
    {
      section_key: 'hero_section',
      title: 'Elegance That Lasts Forever',
      subtitle: 'THE ART OF TIMELESS BEAUTY',
      content_json: JSON.stringify({
        eyebrow: 'THE ART OF TIMELESS BEAUTY',
        heading: 'Elegance That Lasts Forever',
        description: 'Discover exquisite gold and diamond jewellery crafted to celebrate your most precious moments.',
        primary_cta_text: 'Explore Our Collection',
        primary_cta_url: '/products',
        secondary_cta_text: 'Contact Us',
        secondary_cta_url: '/contact',
      }),
      image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop',
      is_enabled: 1,
      display_order: 2,
    },
    {
      section_key: 'about_section',
      title: 'Crafted with Elegance. Chosen with Love.',
      subtitle: 'Welcome to Mikhael Gold and Diamonds LLP',
      content_json: JSON.stringify({
        heading: 'Crafted with Elegance. Chosen with Love.',
        subheading: 'Welcome to Mikhael Gold and Diamonds LLP',
        paragraph1: 'Located at Mahima Complex, Punnayurkulam, Mikhael Gold and Diamonds LLP brings you authentic Kerala gold craftsmanship and certified diamond creations.',
        paragraph2: 'Every piece in our showroom is selected with care, honoring enduring purity, transparent ethics, and the timeless heritage of South Indian jewellery artistry.',
        highlight: 'BIS Hallmarked 916 Pure Gold & Certified Natural Diamonds',
      }),
      image_url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop',
      is_enabled: 1,
      display_order: 3,
    },
    {
      section_key: 'why_choose_us',
      title: 'Why Choose Mikhael',
      subtitle: 'Genuine benefits crafted around customer trust',
      content_json: JSON.stringify({
        items: [
          {
            title: 'Elegant Jewellery Collections',
            description: 'Carefully curated gold, diamond, and antique bridal collections crafted for unforgettable moments.',
            icon: 'Sparkles',
          },
          {
            title: 'Personalised Customer Assistance',
            description: 'Dedicated one-on-one attention from experienced jewellery advisors to guide your selection.',
            icon: 'HeartHandshake',
          },
          {
            title: 'Gold and Diamond Selection',
            description: 'Strict 916 BIS hallmark compliance on gold and rigorously certified genuine diamonds.',
            icon: 'ShieldCheck',
          },
          {
            title: 'Special Occasion Jewellery',
            description: 'Bespoke sets designed specifically for weddings, betrothals, and traditional celebrations.',
            icon: 'Crown',
          },
        ],
      }),
      image_url: null,
      is_enabled: 1,
      display_order: 4,
    },
    {
      section_key: 'bridal_section',
      title: 'The Royal Kerala Bridal Collection',
      subtitle: 'Heritage Adornments for the Auspicious Day',
      content_json: JSON.stringify({
        heading: 'The Royal Kerala Bridal Collection',
        description: 'From sacred Kasu Mala and vibrant Palakka to regal Nagapadam thaalis and multi-tiered jhumkas, discover bridal jewellery designed to be treasured for generations.',
        cta_text: 'Discover Bridal Collection',
        cta_url: '/products?category=bridal-jewellery',
        highlights: [
          'Sacred Temple Chokers & Long Harams',
          'Traditional Palakka & Nagapadam Necklaces',
          'Intricate Antique Gold Bangles & Kadas',
          'Royal Bell Jhumkas with Pure Gold Droplets',
        ],
      }),
      image_url: 'https://images.unsplash.com/photo-1543290956-bd4023ab3447?q=80&w=1200&auto=format&fit=crop',
      is_enabled: 1,
      display_order: 5,
    },
  ];

  for (const sec of sectionsData) {
    const existingSec = await get('SELECT id FROM homepage_sections WHERE section_key = ?', [sec.section_key]);
    if (!existingSec) {
      await execute(
        `INSERT INTO homepage_sections (section_key, title, subtitle, content_json, image_url, is_enabled, display_order)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [sec.section_key, sec.title, sec.subtitle, sec.content_json, sec.image_url, sec.is_enabled, sec.display_order]
      );
    }
  }
  console.log('✅ Homepage sections seeded');

  // 5. Seed Gallery Images
  const galleryData = [
    {
      title: 'Traditional Kasu Mala Bridal Suite',
      alt_text: 'Kerala bride wearing traditional Kasu Mala and Palakka gold jewellery',
      category: 'Bridal',
      image_url: 'https://images.unsplash.com/photo-1543290956-bd4023ab3447?q=80&w=1200&auto=format&fit=crop',
      display_order: 1,
    },
    {
      title: 'Handcrafted 22K Gold Bangles',
      alt_text: 'Pair of antique finish Kerala gold bangles on display',
      category: 'Bangles',
      image_url: 'https://images.unsplash.com/photo-1611591475878-a2b1660d2bce?q=80&w=1200&auto=format&fit=crop',
      display_order: 2,
    },
    {
      title: 'Exquisite Diamond Solitaire Collection',
      alt_text: 'Sparkling diamond solitaire ring against black velvet',
      category: 'Diamonds',
      image_url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
      display_order: 3,
    },
    {
      title: 'Royal Temple Jhumka Craftsmanship',
      alt_text: 'Intricate temple gold jhumkas with ruby accents',
      category: 'Earrings',
      image_url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
      display_order: 4,
    },
    {
      title: 'Fine Diamond Tennis & Eternity Bands',
      alt_text: 'Diamond tennis bracelet crafted in 18K gold',
      category: 'Diamonds',
      image_url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
      display_order: 5,
    },
    {
      title: 'Grand Heritage Gold Choker',
      alt_text: 'Layered gold choker necklace on warm luxury fabric',
      category: 'Necklaces',
      image_url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
      display_order: 6,
    },
  ];

  for (const img of galleryData) {
    const existingImg = await get('SELECT id FROM gallery_images WHERE image_url = ?', [img.image_url]);
    if (!existingImg) {
      await execute(
        `INSERT INTO gallery_images (title, alt_text, category, image_url, display_order, is_visible)
         VALUES (?, ?, ?, ?, ?, 1)`,
        [img.title, img.alt_text, img.category, img.image_url, img.display_order]
      );
    }
  }
  console.log('✅ Gallery images seeded');

  // 6. Seed Business Settings
  const defaultSettings: Record<string, string> = {
    business_name: 'MIKHAEL GOLD AND DIAMONDS LLP',
    tagline: 'The Art of Timeless Beauty',
    address: 'Door No. 81 A, Althara, Mahima Complex, P.O. Punnayurkulam, Kerala 679561, India.',
    google_maps_url: 'https://maps.app.goo.gl/xW4Z3r6HhwbxB59BA',
    google_maps_embed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3920.8924080131494!2d75.9890259!3d10.6657954!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7954b41b1d427%3A0xe543597fe2ca1387!2sMikhael%20Gold%20and%20Diamonds%20LLP!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
    phone: '+91 94470 00000',
    whatsapp_number: '919447000000',
    email: 'contact@mikhaelgold.com',
    opening_hours: 'Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: 10:00 AM – 6:00 PM',
    currency: 'INR',
    currency_symbol: '₹',
    timezone: 'Asia/Kolkata',
    instagram_url: 'https://instagram.com/mikhaelgold',
    facebook_url: 'https://facebook.com/mikhaelgold',
    seo_title: 'Mikhael Gold and Diamonds LLP | Fine Gold & Diamond Jewellery in Kerala',
    seo_description: 'Discover exquisite 22K gold jewellery, certified diamonds, and traditional Kerala bridal collections at Mikhael Gold and Diamonds LLP, Punnayurkulam, Kerala.',
  };

  for (const [key, val] of Object.entries(defaultSettings)) {
    const existing = await get('SELECT id FROM business_settings WHERE setting_key = ?', [key]);
    if (!existing) {
      await execute(
        `INSERT INTO business_settings (setting_key, setting_value) VALUES (?, ?)`,
        [key, val]
      );
    }
  }
  console.log('✅ Business settings seeded');

  console.log('🎉 Database seeding complete!');
}

if (process.argv[1]?.endsWith('seed.ts') || process.argv[1]?.endsWith('seed.js')) {
  runSeed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
  });
}

