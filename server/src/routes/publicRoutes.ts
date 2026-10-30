import { Router } from 'express';
import { getPublicSettings } from '../controllers/settingsController.js';
import { getPublicHomepage } from '../controllers/homepageController.js';
import { getPublicCategories } from '../controllers/categoryController.js';
import { getPublicProducts, getPublicProductBySlug } from '../controllers/productController.js';
import { getPublicGallery } from '../controllers/galleryController.js';
import { createPublicEnquiry } from '../controllers/enquiryController.js';
import { getSitemapXml, getRobotsTxt } from '../controllers/seoController.js';
import { enquiryLimiter } from '../middleware/rateLimiter.js';

const router = Router();

router.get('/settings', getPublicSettings);
router.get('/homepage', getPublicHomepage);
router.get('/categories', getPublicCategories);
router.get('/products', getPublicProducts);
router.get('/products/:slug', getPublicProductBySlug);
router.get('/gallery', getPublicGallery);
router.post('/enquiries', enquiryLimiter, createPublicEnquiry);

router.get('/sitemap.xml', getSitemapXml);
router.get('/robots.txt', getRobotsTxt);

export default router;
