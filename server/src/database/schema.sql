-- ============================================================================
-- MIKHAEL GOLD AND DIAMONDS LLP
-- Relational Database Schema (MySQL & SQLite Compatible DDL)
-- ============================================================================

CREATE TABLE IF NOT EXISTS admins (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(191) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  parent_id INTEGER NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  seo_title VARCHAR(255) NULL,
  seo_description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(191) NOT NULL UNIQUE,
  short_description TEXT NULL,
  full_description TEXT NULL,
  main_image VARCHAR(500) NULL,
  category_id INTEGER NOT NULL,
  subcategory_id INTEGER NULL,
  material VARCHAR(100) NOT NULL DEFAULT 'Gold',
  purity VARCHAR(50) NULL, -- e.g. '22K (916)', '18K', '24K'
  gross_weight DECIMAL(10,3) NULL, -- in grams
  net_weight DECIMAL(10,3) NULL, -- in grams
  stone_weight DECIMAL(10,3) NULL, -- in carats or grams
  diamond_details TEXT NULL, -- e.g. '0.85 ct, VVS-VS, EF Color'
  making_charges DECIMAL(12,2) NULL,
  published_price DECIMAL(12,2) NULL,
  display_price INTEGER NOT NULL DEFAULT 0, -- 1 = Show Price, 0 = 'Contact Us for Price'
  availability_status VARCHAR(50) NOT NULL DEFAULT 'in_stock', -- 'in_stock', 'made_to_order', 'out_of_stock'
  is_featured INTEGER NOT NULL DEFAULT 0,
  is_new_arrival INTEGER NOT NULL DEFAULT 0,
  publication_status VARCHAR(50) NOT NULL DEFAULT 'published', -- 'published', 'draft', 'archived'
  seo_title VARCHAR(255) NULL,
  seo_description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
  FOREIGN KEY (subcategory_id) REFERENCES categories (id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS product_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_primary INTEGER NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NULL,
  subtitle TEXT NULL,
  content_json TEXT NULL,
  image_url VARCHAR(500) NULL,
  is_enabled INTEGER NOT NULL DEFAULT 1,
  display_order INTEGER NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255) NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'All',
  image_url VARCHAR(500) NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_visible INTEGER NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  email VARCHAR(191) NULL,
  category VARCHAR(100) NULL,
  product_reference VARCHAR(255) NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'New', -- 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiry_notes (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  enquiry_id INTEGER NOT NULL,
  admin_id INTEGER NULL,
  admin_name VARCHAR(120) NOT NULL,
  note TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (enquiry_id) REFERENCES enquiries (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS business_settings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  admin_id INTEGER NULL,
  admin_email VARCHAR(191) NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NULL,
  details TEXT NULL,
  ip_address VARCHAR(100) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance & query optimization
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_status ON products(publication_status, is_featured);
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);
CREATE INDEX IF NOT EXISTS idx_enquiries_status ON enquiries(status);
CREATE INDEX IF NOT EXISTS idx_product_images_product ON product_images(product_id);

