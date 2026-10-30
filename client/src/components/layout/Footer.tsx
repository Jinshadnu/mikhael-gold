import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, MessageCircle, ExternalLink, ShieldCheck } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const Footer: React.FC = () => {
  const { settings, getWhatsAppLink } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-luxury-black text-ivory/80 border-t border-gold-champagne/20 relative">
      <div className="kasavu-accent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full border border-gold-champagne flex items-center justify-center font-serif text-gold-champagne text-xl font-bold bg-luxury-dark">
                M
              </span>
              <div>
                <p className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-ivory">
                  MIKHAEL
                </p>
                <p className="text-[10px] tracking-[0.25em] uppercase text-gold-champagne font-medium">
                  Gold & Diamonds LLP
                </p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-ivory/70 pt-2">
              Authentic Kerala gold craftsmanship and certified natural diamonds. Celebrating your
              most auspicious moments with purity, transparency, and timeless elegance.
            </p>

            <div className="flex items-center gap-2 pt-2 text-gold-champagne text-xs">
              <ShieldCheck className="w-4 h-4 text-gold-champagne shrink-0" />
              <span className="text-[11px] tracking-wider uppercase font-semibold">
                BIS Hallmarked 916 Pure Gold
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-champagne mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link to="/" className="hover:text-gold-champagne transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gold-champagne transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="hover:text-gold-champagne transition">
                  Jewellery Catalogue
                </Link>
              </li>
              <li>
                <Link to="/products?category=bridal-jewellery" className="hover:text-gold-champagne transition">
                  Bridal Collection
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-gold-champagne transition">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-gold-champagne transition">
                  Contact & Visit Showroom
                </Link>
              </li>
            </ul>
          </div>

          {/* Jewellery Categories */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-champagne mb-4">
              Collections
            </h4>
            <ul className="space-y-2.5 text-xs text-ivory/70">
              <li>
                <Link to="/products?category=gold-necklaces" className="hover:text-gold-champagne transition">
                  Gold Necklaces
                </Link>
              </li>
              <li>
                <Link to="/products?category=gold-chains" className="hover:text-gold-champagne transition">
                  Gold Chains
                </Link>
              </li>
              <li>
                <Link to="/products?category=gold-rings" className="hover:text-gold-champagne transition">
                  Gold & Solitaire Rings
                </Link>
              </li>
              <li>
                <Link to="/products?category=gold-bangles" className="hover:text-gold-champagne transition">
                  Traditional Kerala Bangles
                </Link>
              </li>
              <li>
                <Link to="/products?category=gold-earrings" className="hover:text-gold-champagne transition">
                  Temple Jhumkas & Drops
                </Link>
              </li>
              <li>
                <Link to="/products?category=diamond-jewellery" className="hover:text-gold-champagne transition">
                  Certified Diamonds
                </Link>
              </li>
            </ul>
          </div>

          {/* Showroom & Contact */}
          <div className="space-y-3.5">
            <h4 className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-champagne mb-4">
              Showroom
            </h4>

            <div className="flex items-start gap-2.5 text-xs text-ivory/70">
              <MapPin className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
              <address className="not-italic leading-relaxed">
                Door No. 81 A, Althara, Mahima Complex,<br />
                P.O. Punnayurkulam, Kerala 679561, India.
              </address>
            </div>

            {settings.google_maps_url && (
              <a
                href={settings.google_maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-gold-champagne hover:text-gold-light underline underline-offset-4 font-medium transition"
              >
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}

            <div className="flex items-start gap-2.5 text-xs text-ivory/70 pt-1">
              <Clock className="w-4 h-4 text-gold-champagne shrink-0 mt-0.5" />
              <span>{settings.opening_hours || 'Mon – Sat: 9:30 AM – 7:30 PM'}</span>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold-champagne/15 border border-gold-champagne text-gold-champagne text-xs font-semibold tracking-wider uppercase hover:bg-gold-champagne hover:text-luxury-black transition"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/20 text-ivory text-xs font-medium hover:border-gold-champagne hover:text-gold-champagne transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call Showroom</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar with Policies & Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ivory/50">
          <p>© {currentYear} MIKHAEL GOLD AND DIAMONDS LLP. All rights reserved.</p>

          <div className="flex items-center space-x-6">
            <Link to="/privacy-policy" className="hover:text-gold-champagne transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-gold-champagne transition">
              Terms & Conditions
            </Link>
            <Link to="/admin/login" className="hover:text-gold-champagne transition text-[11px] opacity-60">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
