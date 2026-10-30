# REST API Specification
## Mikhael Gold and Diamonds LLP

All endpoints return JSON responses adhering to the following structure:
```json
{
  "success": true,
  "data": { ... },
  "message": "Optional feedback message",
  "pagination": { "page": 1, "limit": 12, "total": 24, "totalPages": 2 }
}
```

---

## 1. Public Endpoints (`/api/public`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/settings` | Retrieve store contact info, showroom address, hours, and WhatsApp number |
| `GET` | `/homepage` | Retrieve all active CMS homepage sections |
| `GET` | `/categories` | Retrieve active categories and published product counts |
| `GET` | `/products` | Query published products (supports `category`, `search`, `material`, `sort`, `page`, `limit`) |
| `GET` | `/products/:slug` | Retrieve single product details, gallery images, and related products |
| `GET` | `/gallery` | Retrieve visible showroom gallery photographs (supports `category` filter) |
| `POST`| `/enquiries` | Submit customer jewellery inquiry (rate limited) |
| `GET` | `/sitemap.xml` | Dynamic XML sitemap for SEO crawlers |
| `GET` | `/robots.txt` | Standard robots directives |

---

## 2. Administrative Endpoints (`/api/admin`)

*All administrative endpoints require `Authorization: Bearer <token>` header.*

### Authentication & Profile
* `POST /auth/login`: Authenticate admin with email and password (rate limited).
* `GET /auth/me`: Retrieve current logged-in admin identity.
* `POST /auth/change-password`: Update administrator password with bcrypt verification.

### Dashboard
* `GET /dashboard`: Retrieve aggregate statistics (published count, draft count, enquiries, recent leads, recent updates).

### Products CRUD
* `GET /products`: List products with search, category, and publication status filter.
* `GET /products/:id`: Full product details and gallery images.
* `POST /products`: Create new jewellery product.
* `PUT /products/:id`: Update existing product.
* `DELETE /products/:id`: Delete product and associated gallery images.
* `PATCH /products/:id/toggle-publish`: Toggle between 'published' and 'draft'.

### Categories CRUD
* `GET /categories`: List all categories with product counts.
* `POST /categories`: Create new category.
* `PUT /categories/:id`: Update category details.
* `DELETE /categories/:id`: Delete category (protected against deleting categories with active products).

### Content & Media Management
* `GET /homepage`: List homepage CMS modules.
* `PUT /homepage/:key`: Update module content, copy, or toggle visibility.
* `GET /gallery`: List all gallery photographs.
* `POST /gallery`: Add new gallery photo.
* `PUT /gallery/:id`: Update photo details.
* `DELETE /gallery/:id`: Remove photo.
* `POST /upload`: Multipart image file upload (JPEG, PNG, WEBP, AVIF up to 5MB).

### Customer Enquiries
* `GET /enquiries`: List enquiries (supports status filter, search, pagination).
* `GET /enquiries/:id`: Retrieve single enquiry with complete internal notes timeline.
* `PATCH /enquiries/:id/status`: Update status (`New`, `Contacted`, `In Progress`, `Completed`, `Archived`).
* `POST /enquiries/:id/notes`: Append internal staff follow-up note.
* `GET /enquiries/export/csv`: Stream downloadable CSV of customer enquiries.

### Business Settings
* `GET /settings`: Retrieve all store configuration key-values.
* `PUT /settings`: Save updated store settings.
