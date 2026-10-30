-- ============================================================================
-- MIKHAEL GOLD AND DIAMONDS LLP
-- Production MySQL DDL Schema
-- Compatible with MySQL 8.0+ and MariaDB 10.5+
-- ============================================================================

CREATE DATABASE IF NOT EXISTS mikhael_gold_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE mikhael_gold_db;

CREATE TABLE IF NOT EXISTS admins (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(191) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL DEFAULT 'super_admin',
  last_login_at DATETIME NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_admins_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS categories (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(150) NOT NULL,
  slug VARCHAR(191) NOT NULL UNIQUE,
  description TEXT NULL,
  image_url VARCHAR(500) NULL,
  parent_id INT UNSIGNED NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_active TINYINT(1) NOT NULL DEFAULT 1,
  seo_title VARCHAR(255) NULL,
  seo_description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_categories_parent FOREIGN KEY (parent_id) REFERENCES categories (id) ON DELETE SET NULL,
  INDEX idx_categories_slug (slug),
  INDEX idx_categories_active (is_active, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS products (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(191) NOT NULL UNIQUE,
  short_description TEXT NULL,
  full_description MEDIUMTEXT NULL,
  main_image VARCHAR(500) NULL,
  category_id INT UNSIGNED NOT NULL,
  subcategory_id INT UNSIGNED NULL,
  material VARCHAR(100) NOT NULL DEFAULT 'Gold',
  purity VARCHAR(50) NULL,
  gross_weight DECIMAL(10,3) NULL,
  net_weight DECIMAL(10,3) NULL,
  stone_weight DECIMAL(10,3) NULL,
  diamond_details TEXT NULL,
  making_charges DECIMAL(12,2) NULL,
  published_price DECIMAL(12,2) NULL,
  display_price TINYINT(1) NOT NULL DEFAULT 0,
  availability_status VARCHAR(50) NOT NULL DEFAULT 'in_stock',
  is_featured TINYINT(1) NOT NULL DEFAULT 0,
  is_new_arrival TINYINT(1) NOT NULL DEFAULT 0,
  publication_status VARCHAR(50) NOT NULL DEFAULT 'published',
  seo_title VARCHAR(255) NULL,
  seo_description TEXT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_products_category FOREIGN KEY (category_id) REFERENCES categories (id) ON DELETE RESTRICT,
  CONSTRAINT fk_products_subcategory FOREIGN KEY (subcategory_id) REFERENCES categories (id) ON DELETE SET NULL,
  INDEX idx_products_slug (slug),
  INDEX idx_products_sku (sku),
  INDEX idx_products_category (category_id),
  INDEX idx_products_status (publication_status, is_featured, is_new_arrival)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS product_images (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  alt_text VARCHAR(255) NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_product_images_product FOREIGN KEY (product_id) REFERENCES products (id) ON DELETE CASCADE,
  INDEX idx_product_images_product (product_id, display_order)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS homepage_sections (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  section_key VARCHAR(100) NOT NULL UNIQUE,
  title VARCHAR(255) NULL,
  subtitle TEXT NULL,
  content_json JSON NULL,
  image_url VARCHAR(500) NULL,
  is_enabled TINYINT(1) NOT NULL DEFAULT 1,
  display_order INT NOT NULL DEFAULT 0,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_homepage_sections_key (section_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS gallery_images (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  alt_text VARCHAR(255) NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'All',
  image_url VARCHAR(500) NOT NULL,
  display_order INT NOT NULL DEFAULT 0,
  is_visible TINYINT(1) NOT NULL DEFAULT 1,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_gallery_images_category (category, is_visible)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enquiries (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(150) NOT NULL,
  mobile VARCHAR(50) NOT NULL,
  email VARCHAR(191) NULL,
  category VARCHAR(100) NULL,
  product_reference VARCHAR(255) NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'New',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_enquiries_status (status),
  INDEX idx_enquiries_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS enquiry_notes (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  enquiry_id INT UNSIGNED NOT NULL,
  admin_id INT UNSIGNED NULL,
  admin_name VARCHAR(120) NOT NULL,
  note TEXT NOT NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_enquiry_notes_enquiry FOREIGN KEY (enquiry_id) REFERENCES enquiries (id) ON DELETE CASCADE,
  INDEX idx_enquiry_notes_enquiry (enquiry_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS business_settings (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  setting_key VARCHAR(100) NOT NULL UNIQUE,
  setting_value TEXT NULL,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_settings_key (setting_key)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS audit_logs (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  admin_id INT UNSIGNED NULL,
  admin_email VARCHAR(191) NULL,
  action VARCHAR(100) NOT NULL,
  entity_type VARCHAR(100) NOT NULL,
  entity_id VARCHAR(100) NULL,
  details TEXT NULL,
  ip_address VARCHAR(100) NULL,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_audit_logs_action (action),
  INDEX idx_audit_logs_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

