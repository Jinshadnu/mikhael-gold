# Database Architecture & Management Guide
## Mikhael Gold and Diamonds LLP

This document outlines the database schema, foreign key relations, indexing strategy, and backup/restoration procedures.

---

## 1. Schema Overview

The application utilizes a relational database architecture with 10 tables:

| Table Name | Description | Key Relationships |
| :--- | :--- | :--- |
| `admins` | Administrative users with hashed passwords and role definitions | `audit_logs.admin_id`, `enquiry_notes.admin_id` |
| `categories` | Jewellery product hierarchy (main & subcategories) | Self-referential `parent_id`, `products.category_id` |
| `products` | Core jewellery catalogue records with weights, purity, prices, and status | `category_id` -> `categories.id` |
| `product_images` | High-resolution gallery photographs for each product | `product_id` -> `products.id` (CASCADE) |
| `homepage_sections`| Editable CMS modules (Announcement, Hero, About, Bridal, etc.) | Independent |
| `gallery_images` | Public showroom and craft gallery photographs | Independent |
| `enquiries` | Customer contact inquiries and consultation requests | `enquiry_notes.enquiry_id` (CASCADE) |
| `enquiry_notes` | Internal staff follow-up history per enquiry | `enquiry_id` -> `enquiries.id` |
| `business_settings`| Key-value store for address, phone, WhatsApp, opening hours, SEO | Independent |
| `audit_logs` | Security log recording admin actions (IP, user, entity, changes) | `admin_id` -> `admins.id` |

---

## 2. Production MySQL Schema DDL

The complete MySQL schema script is located at:
`server/src/database/schema.mysql.sql`

To apply schema to a clean database:
```bash
mysql -u root -p mikhael_gold_db < server/src/database/schema.mysql.sql
```

---

## 3. Automated Database Seeding

To seed or re-seed initial data:
```bash
npm run seed
```

This populates:
1. Default Administrator: `admin@mikhaelgold.com` / `Admin@Mikhael2026`
2. 8 Jewellery Categories matching Phase 2-D
3. Authentic jewellery catalogue items (Kasu Mala, Palakka, Nagapadam, Diamond Solitaires, Temple Jhumkas)
4. Homepage CMS sections
5. Gallery images
6. Genuine showroom settings for Mahima Complex, Punnayurkulam

---

## 4. Database Backups & Restoration

### MySQL Automated Backup (Daily Cron Job)

Create a daily backup script `/usr/local/bin/backup_mikhael_db.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/mysql"
DATE=$(date +\%Y\%m\%d_\%H\%M\%S)
mkdir -p "$BACKUP_DIR"

mysqldump -u mikhael_user -p'YourPassword' --single-transaction --quick mikhael_gold_db | gzip > "$BACKUP_DIR/mikhael_db_$DATE.sql.gz"

# Retain backups for 30 days
find "$BACKUP_DIR" -type f -name "*.sql.gz" -mtime +30 -delete
```

Make executable and register with crontab:
```bash
chmod +x /usr/local/bin/backup_mikhael_db.sh
crontab -e
# Run daily at 2:00 AM
0 2 * * * /usr/local/bin/backup_mikhael_db.sh
```

### Restoring MySQL from Backup

```bash
gunzip < /var/backups/mysql/mikhael_db_20261030_020000.sql.gz | mysql -u mikhael_user -p mikhael_gold_db
```

### SQLite Backup (Local / Dev)

For SQLite mode:
```bash
sqlite3 server/mikhael.db ".backup 'mikhael_backup.db'"
```
