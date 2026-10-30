import { Router, Request, Response } from 'express';
import { login, getMe, changePassword, loginSchema } from '../controllers/authController.js';
import { getDashboardStats } from '../controllers/dashboardController.js';
import {
  getAdminProducts,
  getAdminProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  toggleProductPublish,
} from '../controllers/productController.js';
import {
  getAdminCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import {
  getAdminHomepageSections,
  updateHomepageSection,
} from '../controllers/homepageController.js';
import {
  getAdminGallery,
  createGalleryImage,
  updateGalleryImage,
  deleteGalleryImage,
} from '../controllers/galleryController.js';
import {
  getAdminEnquiries,
  getAdminEnquiryById,
  updateEnquiryStatus,
  addEnquiryNote,
  exportEnquiriesCsv,
} from '../controllers/enquiryController.js';
import { getAdminSettings, updateAdminSettings } from '../controllers/settingsController.js';
import { requireAdmin } from '../middleware/auth.js';
import { authLimiter } from '../middleware/rateLimiter.js';
import { validateBody } from '../middleware/validate.js';
import { upload } from '../middleware/upload.js';

const router = Router();

// Authentication
router.post('/auth/login', authLimiter, validateBody(loginSchema), login);
router.get('/auth/me', requireAdmin, getMe);
router.post('/auth/change-password', requireAdmin, changePassword);

// Dashboard
router.get('/dashboard', requireAdmin, getDashboardStats);

// Products
router.get('/products', requireAdmin, getAdminProducts);
router.get('/products/:id', requireAdmin, getAdminProductById);
router.post('/products', requireAdmin, createProduct);
router.put('/products/:id', requireAdmin, updateProduct);
router.delete('/products/:id', requireAdmin, deleteProduct);
router.patch('/products/:id/toggle-publish', requireAdmin, toggleProductPublish);

// Categories
router.get('/categories', requireAdmin, getAdminCategories);
router.post('/categories', requireAdmin, createCategory);
router.put('/categories/:id', requireAdmin, updateCategory);
router.delete('/categories/:id', requireAdmin, deleteCategory);

// Homepage CMS
router.get('/homepage', requireAdmin, getAdminHomepageSections);
router.put('/homepage/:key', requireAdmin, updateHomepageSection);

// Gallery CMS
router.get('/gallery', requireAdmin, getAdminGallery);
router.post('/gallery', requireAdmin, createGalleryImage);
router.put('/gallery/:id', requireAdmin, updateGalleryImage);
router.delete('/gallery/:id', requireAdmin, deleteGalleryImage);

// Enquiries
router.get('/enquiries', requireAdmin, getAdminEnquiries);
router.get('/enquiries/export/csv', requireAdmin, exportEnquiriesCsv);
router.get('/enquiries/:id', requireAdmin, getAdminEnquiryById);
router.patch('/enquiries/:id/status', requireAdmin, updateEnquiryStatus);
router.post('/enquiries/:id/notes', requireAdmin, addEnquiryNote);

// Settings
router.get('/settings', requireAdmin, getAdminSettings);
router.put('/settings', requireAdmin, updateAdminSettings);

// Image Upload
router.post(
  '/upload',
  requireAdmin,
  upload.single('image'),
  (req: Request, res: Response): void => {
    if (!req.file) {
      res.status(400).json({ success: false, error: 'No image file uploaded.' });
      return;
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    res.json({
      success: true,
      data: {
        url: fileUrl,
        filename: req.file.filename,
        mimetype: req.file.mimetype,
        size: req.file.size,
      },
    });
  }
);

export default router;
