# Production Deployment Guide
## Mikhael Gold and Diamonds LLP

This guide provides production setup and deployment procedures for **MIKHAEL GOLD AND DIAMONDS LLP**.

---

## 1. System Requirements

* **Node.js**: v18.0.0 or v20.x+ (Recommended: Node.js 20 LTS or 22 LTS)
* **Package Manager**: npm v9+
* **Database**: MySQL 8.0+ / MariaDB 10.5+ (or embedded SQLite for lightweight environments)
* **OS**: Ubuntu 22.04 LTS / Debian 12 / macOS / RHEL 9
* **Reverse Proxy**: Nginx with SSL (Let's Encrypt / Certbot)
* **Process Manager**: PM2

---

## 2. Server Preparation (Ubuntu / Debian VPS)

```bash
# 1. Update package index
sudo apt update && sudo apt upgrade -y

# 2. Install Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs nginx git

# 3. Install PM2 globally
sudo npm install -g pm2
```

---

## 3. Production MySQL Database Setup

Install MySQL Server:
```bash
sudo apt install -y mysql-server
sudo mysql_secure_installation
```

Login to MySQL and create the database & dedicated user:
```sql
CREATE DATABASE mikhael_gold_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

CREATE USER 'mikhael_user'@'localhost' IDENTIFIED BY 'StrongPasswordHere!2026';
GRANT ALL PRIVILEGES ON mikhael_gold_db.* TO 'mikhael_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

Import the initial MySQL schema:
```bash
mysql -u mikhael_user -p mikhael_gold_db < /path/to/Mikhael/server/src/database/schema.mysql.sql
```

---

## 4. Application Build & Environment Configuration

Clone or upload the repository to `/var/www/mikhael`:
```bash
cd /var/www/mikhael

# Install all workspace dependencies
npm install

# Create production environment file in server/
cp server/.env.example server/.env
nano server/.env
```

Configure `server/.env`:
```env
PORT=5001
NODE_ENV=production
JWT_SECRET=use_a_long_cryptographically_secure_random_string_here_512bit
JWT_EXPIRES_IN=7d
CORS_ORIGIN=https://mikhaelgold.com

DB_CLIENT=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=mikhael_user
DB_PASSWORD=StrongPasswordHere!2026
DB_NAME=mikhael_gold_db
```

Seed the initial database with default categories, settings, and administrator:
```bash
npm run seed
```

Build both server and client:
```bash
npm run build
```

---

## 5. Starting the Service with PM2

```bash
# Start backend service using PM2
cd /var/www/mikhael
pm2 start server/dist/index.js --name "mikhael-gold"

# Configure PM2 to restart on system reboot
pm2 save
pm2 startup
```

---

## 6. Nginx Reverse Proxy & SSL Configuration

Create Nginx site configuration at `/etc/nginx/sites-available/mikhaelgold`:

```nginx
server {
    server_name mikhaelgold.com www.mikhaelgold.com;

    client_max_body_size 10M;

    # Static uploads caching
    location /uploads/ {
        alias /var/www/mikhael/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # Proxy to Node Express application
    location / {
        proxy_pass http://127.0.0.1:5001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site and test configuration:
```bash
sudo ln -s /etc/nginx/sites-available/mikhaelgold /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Obtain free SSL certificates with Certbot:
```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d mikhaelgold.com -d www.mikhaelgold.com
```

---

## 7. Separate Netlify Frontend Deployment (Alternative)

If deploying the frontend to Netlify and the backend to an external API server:
1. In `client/vite.config.ts`, set the API proxy or use an environment variable `VITE_API_BASE_URL`.
2. Connect your Git repository to Netlify.
3. Build command: `npm --workspace=client run build`
4. Publish directory: `client/dist`
5. The SPA redirect rule `client/public/_redirects` will automatically route all routes to `index.html`.

