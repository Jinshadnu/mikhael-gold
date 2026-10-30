import rateLimit from 'express-rate-limit';

// Strict rate limit for login attempts (10 requests per 15 mins)
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many authentication attempts. Please try again after 15 minutes.',
  },
});

// Rate limit for public enquiry submissions (10 requests per 30 mins)
export const enquiryLimiter = rateLimit({
  windowMs: 30 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many enquiry submissions from this IP. Please try again later or contact us directly on WhatsApp.',
  },
});

// General API rate limiter (200 requests per minute)
export const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
