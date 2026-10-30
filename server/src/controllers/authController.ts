import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { get, execute } from '../database/db.js';
import { config } from '../config/index.js';
import { logAudit } from '../middleware/errorHandler.js';

export const loginSchema = z.object({
  email: z.string().email('Valid email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  const admin = await get<{
    id: number;
    name: string;
    email: string;
    password_hash: string;
    role: string;
  }>('SELECT id, name, email, password_hash, role FROM admins WHERE email = ?', [email.toLowerCase().trim()]);

  if (!admin) {
    res.status(401).json({ success: false, error: 'Invalid email or password.' });
    return;
  }

  const isPasswordValid = bcrypt.compareSync(password, admin.password_hash);
  if (!isPasswordValid) {
    res.status(401).json({ success: false, error: 'Invalid email or password.' });
    return;
  }

  // Update last login
  await execute('UPDATE admins SET last_login_at = CURRENT_TIMESTAMP WHERE id = ?', [admin.id]);

  const token = jwt.sign(
    {
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    },
    config.jwtSecret,
    { expiresIn: '7d' }
  );

  req.admin = {
    id: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };

  await logAudit(req, 'LOGIN', 'admin', admin.id, { email: admin.email });

  res.json({
    success: true,
    data: {
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    },
  });
}

export async function getMe(req: Request, res: Response): Promise<void> {
  if (!req.admin) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  const admin = await get(
    'SELECT id, name, email, role, last_login_at, created_at FROM admins WHERE id = ?',
    [req.admin.id]
  );

  if (!admin) {
    res.status(404).json({ success: false, error: 'Admin account not found' });
    return;
  }

  res.json({ success: true, data: admin });
}

export async function changePassword(req: Request, res: Response): Promise<void> {
  if (!req.admin) {
    res.status(401).json({ success: false, error: 'Unauthorized' });
    return;
  }

  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword || newPassword.length < 8) {
    res.status(400).json({
      success: false,
      error: 'Current password and a new password with at least 8 characters are required.',
    });
    return;
  }

  const admin = await get<{ id: number; password_hash: string }>(
    'SELECT id, password_hash FROM admins WHERE id = ?',
    [req.admin.id]
  );

  if (!admin || !bcrypt.compareSync(currentPassword, admin.password_hash)) {
    res.status(400).json({ success: false, error: 'Current password is incorrect.' });
    return;
  }

  const newHash = bcrypt.hashSync(newPassword, 10);
  await execute('UPDATE admins SET password_hash = ? WHERE id = ?', [newHash, req.admin.id]);
  await logAudit(req, 'CHANGE_PASSWORD', 'admin', req.admin.id);

  res.json({ success: true, message: 'Password updated successfully.' });
}
