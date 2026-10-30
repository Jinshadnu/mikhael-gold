import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5001', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'mikhael_super_secure_jwt_secret_key_2026',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  uploadsDir: path.resolve(process.cwd(), '../uploads'),
  db: {
    client: (process.env.DB_CLIENT || 'sqlite').toLowerCase(), // 'sqlite' or 'mysql'
    sqlitePath: process.env.DB_SQLITE_PATH || path.resolve(process.cwd(), 'mikhael.db'),
    mysql: {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'mikhael_gold_db',
    },
  },
};
