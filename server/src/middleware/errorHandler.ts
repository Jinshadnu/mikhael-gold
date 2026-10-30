import { Request, Response, NextFunction } from 'express';
import { execute } from '../database/db.js';

export async function logAudit(
  req: Request,
  action: string,
  entityType: string,
  entityId?: string | number,
  details?: Record<string, any>
) {
  try {
    const adminId = req.admin?.id || null;
    const adminEmail = req.admin?.email || null;
    const ip = req.ip || req.socket.remoteAddress || null;
    const detailsStr = details ? JSON.stringify(details) : null;

    await execute(
      `INSERT INTO audit_logs (admin_id, admin_email, action, entity_type, entity_id, details, ip_address)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [adminId, adminEmail, action, entityType, entityId?.toString() || null, detailsStr, ip]
    );
  } catch (err) {
    console.error('Failed to write audit log:', err);
  }
}

export function errorHandler(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error('Unhandled server error:', err);

  const status = err.status || err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && status === 500
      ? 'An internal server error occurred. Please contact support.'
      : err.message || 'An error occurred';

  res.status(status).json({
    success: false,
    error: message,
  });
}
