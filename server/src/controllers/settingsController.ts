import { Request, Response } from 'express';
import { query, get, execute } from '../database/db.js';
import { logAudit } from '../middleware/errorHandler.js';

export async function getPublicSettings(_req: Request, res: Response): Promise<void> {
  const rows = await query<{ setting_key: string; setting_value: string }>(
    'SELECT setting_key, setting_value FROM business_settings'
  );

  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.setting_key] = row.setting_value;
  }

  res.json({ success: true, data: settings });
}

export async function getAdminSettings(_req: Request, res: Response): Promise<void> {
  const rows = await query<{ setting_key: string; setting_value: string; updated_at: string }>(
    'SELECT * FROM business_settings'
  );

  const settings: Record<string, string> = {};
  for (const row of rows) {
    settings[row.setting_key] = row.setting_value;
  }

  res.json({ success: true, data: settings });
}

export async function updateAdminSettings(req: Request, res: Response): Promise<void> {
  const updates: Record<string, any> = req.body;

  for (const [key, val] of Object.entries(updates)) {
    const stringVal = val === null || val === undefined ? '' : String(val);
    const existing = await get('SELECT id FROM business_settings WHERE setting_key = ?', [key]);

    if (existing) {
      await execute(
        'UPDATE business_settings SET setting_value = ?, updated_at = CURRENT_TIMESTAMP WHERE setting_key = ?',
        [stringVal, key]
      );
    } else {
      await execute(
        'INSERT INTO business_settings (setting_key, setting_value) VALUES (?, ?)',
        [key, stringVal]
      );
    }
  }

  await logAudit(req, 'UPDATE_SETTINGS', 'business_settings', undefined, updates);

  res.json({ success: true, message: 'Settings saved successfully.' });
}

