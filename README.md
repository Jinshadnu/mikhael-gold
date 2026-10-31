# MIKHAEL GOLD AND DIAMONDS LLP
### Premium Luxury Jewellery E-Commerce Website & Content Management System

A production-ready web application and administrative management console built for **MIKHAEL GOLD AND DIAMONDS LLP**, located at Mahima Complex, Punnayurkulam, Kerala.

Inspired by Kerala fine jewellery heritage and the company's official circular emblem, featuring Royal Burgundy (`#780817`), Dark Burgundy (`#530510`), Deep Wine (`#40030B`), Royal Gold (`#D4AF37`), Champagne Gold (`#E8D39A`), and Warm Ivory (`#FAF8F2`).

* **Live Demo (GitHub Pages)**: [https://jinshadnu.github.io/mikhael-gold/](https://jinshadnu.github.io/mikhael-gold/)

---

## 🌟 Key Features

### 1. Premium Public Website
* **Slim Announcement Bar**: Configurable promotional message with link and dismiss controls.
* **Luxury Navigation Header**: Monogram branding, desktop navigation, catalogue search, WhatsApp direct contact, and mobile drawer.
* **Cinematic Hero Banner**: High-resolution jewellery photography with subtle gold foil accents, typography, and clear calls-to-action.
* **Jewellery Categories**: Dynamic cards for Gold Necklaces, Chains, Rings, Bangles, Earrings, Diamond Jewellery, Bridal Sets, and Traditional Collections.
* **Featured Product Grid**: Shows hallmark purity (e.g. `22K 916`), weight specifications, price (or "Contact Us for Price"), and WhatsApp enquiry triggers.
* **Product Detail Pages (`/products/:slug`)**: Multi-angle image gallery with thumbnail switcher, specifications table (gross weight, net weight, stone details), WhatsApp enquiry button with pre-filled SKU, and related pieces.
* **Bridal Showcase**: Dedicated bridal collection section highlighting Kasu Mala, Palakka Mala, and Nagapadam temple jewellery.
* **Showroom Gallery (`/gallery`)**: Category-filtered photography with touch-friendly lightbox zoom and lazy loading.
* **Customer Enquiries (`/contact`)**: Form with client-side validation, rate-limiting, and direct database storage.
* **Showroom Location & Hours**: Embedded Google Map for Door No. 81 A, Althara, Mahima Complex, Punnayurkulam, Kerala, with one-click directions.

### 2. Comprehensive Admin Console (`/admin`)
* **Secure Authentication**: Argon2/bcrypt-secured login with rate-limiting, JWT sessions, and protected routes.
* **Dashboard Overview**: Real-time metrics for published products, drafts, categories, and customer enquiry leads.
* **Product Management (CRUD)**: Create, edit, and delete jewellery pieces; configure prices, weights, availability (`in_stock`, `made_to_order`), and toggle publication status.
* **Category Management**: Unlimited category and subcategory creation, display order controls, and deletion protection for categories containing products.
* **Homepage CMS**: Modify announcement bar, hero section headings, about section text, and bridal highlights without code changes.
* **Gallery CMS**: Upload new photographs (JPEG, PNG, WEBP, AVIF up to 5MB) with captions and visibility controls.
* **Enquiry & Lead Management**: Filter customer inquiries by status (`New`, `Contacted`, `In Progress`, `Completed`, `Archived`), view internal staff follow-up history, add notes, and export to CSV.
* **Store Settings**: Configure showroom contact numbers, WhatsApp links, Google Maps directions, currency, and SEO defaults.

---

## 🛠️ Technology Stack

* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, React Router 6, TanStack Query, Lucide React
* **Backend**: Node.js, Express, TypeScript, REST API, Zod validation, Multer (persistent file uploads), Helmet, Express Rate Limit
* **Database**: Dual-engine architecture supporting both **MySQL 8.0+** (`mysql2`) for production and **SQLite** (`better-sqlite3`) for instant zero-configuration local development.

---

## 🚀 Quickstart Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Seed Database
Initialize tables and populate with default categories, sample jewellery pieces, and showroom settings:
```bash
npm run seed
```

### 3. Run Automated Tests
```bash
npm test
```

### 4. Start Development Servers
Runs both the Express API (port 5001) and Vite frontend (port 3000) concurrently:
```bash
npm run dev
```

Visit:
* Public Website: `http://localhost:3000`
* Admin Login: `http://localhost:3000/admin/login`

### 5. Production Build & Start
```bash
npm run build
npm start
```
The server will start on `http://localhost:5001` and serve both the API and the compiled React production bundle.

---

## 🔐 Default Administrator Account

Created automatically during seeding:

* **URL**: `http://localhost:3000/admin/login`
* **Email**: `admin@mikhaelgold.com`
* **Password**: `Admin@Mikhael2026`

*(Password can be updated anytime inside the Admin Console under Store Settings).*

---

## 📍 Showroom Information

* **Business Name**: MIKHAEL GOLD AND DIAMONDS LLP
* **Address**: Door No. 81 A, Althara, Mahima Complex, P.O. Punnayurkulam, Kerala 679561, India.
* **Google Maps**: [https://maps.app.goo.gl/xW4Z3r6HhwbxB59BA](https://maps.app.goo.gl/xW4Z3r6HhwbxB59BA)

---

## 📂 Documentation

* [Production Deployment Guide](docs/DEPLOYMENT.md)
* [Database Architecture & Backup Guide](docs/DATABASE_GUIDE.md)
* [REST API Specification](docs/API_DOCUMENTATION.md)

