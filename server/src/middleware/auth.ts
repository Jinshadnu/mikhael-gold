import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';
import { get } from '../database/db.js';

export interface AdminPayload {
  id: number;
  email: string;
  role: string;
  name: string;
}

declare global {
  namespace Express {
    interface Request {
      admin?: AdminPayload;
    }
  }
}

export async function requireAdmin(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: 'Authentication required. No token provided.' });
    return;
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as AdminPayload;
    const admin = await get('SELECT id, name, email, role FROM admins WHERE id = ?', [decoded.id]);
    if (!admin) {
      res.status(401).json({ success: false, error: 'User does not exist or has been disabled.' });
      return;
    }

    req.admin = {
      id: admin.id,
      email: admin.email,
      role: admin.role,
      name: admin.name,
    };
    next();
  } catch (err) {
    res.status(401).json({ success: false, error: 'Invalid or expired authentication token.' });
  }
}
