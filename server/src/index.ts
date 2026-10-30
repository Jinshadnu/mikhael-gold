import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import fs from 'fs';
import { config } from './config/index.js';
import { initDb, get } from './database/db.js';
import { runSeed } from './database/seed.js';
import publicRoutes from './routes/publicRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';

const app = express();

// Security headers
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: 'cross-origin' },
  })
);

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static uploads directory
app.use('/uploads', express.static(config.uploadsDir));

// Rate limiting
app.use('/api', apiLimiter);

// API routes
app.use('/api/public', publicRoutes);
app.use('/api/admin', adminRoutes);

// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'Mikhael Gold and Diamonds API',
  });
});

// Serve frontend static files if client/dist exists
const clientDist = path.resolve(process.cwd(), '../client/dist');
const altClientDist = path.resolve(process.cwd(), 'client/dist');
const resolvedClientDist = fs.existsSync(clientDist)
  ? clientDist
  : fs.existsSync(altClientDist)
  ? altClientDist
  : null;

if (resolvedClientDist) {
  app.use(express.static(resolvedClientDist));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }
    res.sendFile(path.join(resolvedClientDist, 'index.html'));
  });
}

// Centralized error handling
app.use(errorHandler);

// Startup & Database bootstrap
async function startServer() {
  try {
    console.log('🚀 Checking database connection...');
    await initDb();

    // Check if seeded
    const adminCount = await get<{ count: number }>('SELECT COUNT(*) as count FROM admins');
    if (!adminCount || adminCount.count === 0) {
      console.log('🌱 Fresh database detected. Running seed...');
      await runSeed();
    }

    app.listen(config.port, () => {
      console.log(`✨ Mikhael Gold Server running on http://localhost:${config.port}`);
      console.log(`📁 Uploads served from: ${config.uploadsDir}`);
      if (resolvedClientDist) {
        console.log(`🌐 Frontend UI served from: ${resolvedClientDist}`);
      }
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;
