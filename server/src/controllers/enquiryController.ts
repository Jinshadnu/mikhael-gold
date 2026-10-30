import { Request, Response } from 'express';
import { z } from 'zod';
import { query, get, execute } from '../database/db.js';
import { logAudit } from '../middleware/errorHandler.js';

export const createEnquirySchema = z.object({
  full_name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().min(8, 'A valid mobile number is required'),
  email: z.string().email('Please enter a valid email address').optional().or(z.literal('')),
  category: z.string().optional().nullable(),
  product_reference: z.string().optional().nullable(),
  message: z.string().min(5, 'Please provide details in your message'),
});

export async function createPublicEnquiry(req: Request, res: Response): Promise<void> {
  const body = createEnquirySchema.parse(req.body);

  const result = await execute(
    `INSERT INTO enquiries (full_name, mobile, email, category, product_reference, message, status)
     VALUES (?, ?, ?, ?, ?, ?, 'New')`,
    [
      body.full_name,
      body.mobile,
      body.email || null,
      body.category || null,
      body.product_reference || null,
      body.message,
    ]
  );

  res.status(201).json({
    success: true,
    data: { id: result.insertId },
    message: 'Thank you for your enquiry. Our jewellery consultant will contact you shortly.',
  });
}

export async function getAdminEnquiries(req: Request, res: Response): Promise<void> {
  const { status, search, page = '1', limit = '15' } = req.query;

  const pageNum = Math.max(1, parseInt(page as string, 10) || 1);
  const limitNum = Math.max(1, Math.min(100, parseInt(limit as string, 10) || 15));
  const offset = (pageNum - 1) * limitNum;

  const conditions: string[] = [];
  const params: any[] = [];

  if (status && status !== 'all') {
    conditions.push('status = ?');
    params.push(status);
  }

  if (search) {
    conditions.push('(full_name LIKE ? OR mobile LIKE ? OR email LIKE ? OR product_reference LIKE ?)');
    const term = `%${search}%`;
    params.push(term, term, term, term);
  }

  const whereClause = conditions.length ? `WHERE ${conditions.join(' AND ')}` : '';

  const countSql = `SELECT COUNT(*) as total FROM enquiries ${whereClause}`;
  const countRes = await get<{ total: number }>(countSql, params);
  const total = countRes ? countRes.total : 0;

  const listSql = `
    SELECT * FROM enquiries
    ${whereClause}
    ORDER BY created_at DESC
    LIMIT ? OFFSET ?
  `;
  const enquiries = await query(listSql, [...params, limitNum, offset]);

  res.json({
    success: true,
    data: enquiries,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
}

export async function getAdminEnquiryById(req: Request, res: Response): Promise<void> {
  const { id } = req.params;

  const enquiry = await get('SELECT * FROM enquiries WHERE id = ?', [id]);
  if (!enquiry) {
    res.status(404).json({ success: false, error: 'Enquiry not found.' });
    return;
  }

  const notes = await query(
    'SELECT * FROM enquiry_notes WHERE enquiry_id = ? ORDER BY created_at DESC',
    [id]
  );

  res.json({
    success: true,
    data: {
      ...enquiry,
      notes,
    },
  });
}

export const updateStatusSchema = z.object({
  status: z.enum(['New', 'Contacted', 'In Progress', 'Completed', 'Archived']),
});

export async function updateEnquiryStatus(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = updateStatusSchema.parse(req.body);

  const enquiry = await get('SELECT id, status FROM enquiries WHERE id = ?', [id]);
  if (!enquiry) {
    res.status(404).json({ success: false, error: 'Enquiry not found.' });
    return;
  }

  await execute(
    'UPDATE enquiries SET status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [body.status, id]
  );

  await logAudit(req, 'UPDATE_ENQUIRY_STATUS', 'enquiry', id, {
    oldStatus: enquiry.status,
    newStatus: body.status,
  });

  res.json({ success: true, message: 'Enquiry status updated successfully.' });
}

export const addNoteSchema = z.object({
  note: z.string().min(2, 'Note content is required'),
});

export async function addEnquiryNote(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  const body = addNoteSchema.parse(req.body);

  const enquiry = await get('SELECT id FROM enquiries WHERE id = ?', [id]);
  if (!enquiry) {
    res.status(404).json({ success: false, error: 'Enquiry not found.' });
    return;
  }

  const adminId = req.admin?.id || null;
  const adminName = req.admin?.name || 'Administrator';

  await execute(
    'INSERT INTO enquiry_notes (enquiry_id, admin_id, admin_name, note) VALUES (?, ?, ?, ?)',
    [id, adminId, adminName, body.note]
  );

  await logAudit(req, 'ADD_ENQUIRY_NOTE', 'enquiry', id);

  res.json({ success: true, message: 'Note added successfully.' });
}

export async function exportEnquiriesCsv(_req: Request, res: Response): Promise<void> {
  const enquiries = await query<any>('SELECT * FROM enquiries ORDER BY created_at DESC');

  const headers = ['ID', 'Full Name', 'Mobile', 'Email', 'Category', 'Product Ref', 'Message', 'Status', 'Date'];
  const escapeCsv = (str: any) => {
    if (str === null || str === undefined) return '""';
    const escaped = String(str).replace(/"/g, '""');
    return `"${escaped}"`;
  };

  const rows = enquiries.map((e) => [
    e.id,
    escapeCsv(e.full_name),
    escapeCsv(e.mobile),
    escapeCsv(e.email || ''),
    escapeCsv(e.category || ''),
    escapeCsv(e.product_reference || ''),
    escapeCsv(e.message),
    escapeCsv(e.status),
    escapeCsv(e.created_at),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');

  res.setHeader('Content-Type', 'text/csv; charset=utf-8');
  res.setHeader('Content-Disposition', `attachment; filename="mikhael_enquiries_${Date.now()}.csv"`);
  res.send(csvContent);
}
