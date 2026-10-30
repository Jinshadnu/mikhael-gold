import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MessageCircle, Phone, ArrowRight, MapPin, ShieldCheck, Sparkles } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

interface HeaderProps {
  onOpenSearch?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { settings, getWhatsAppLink } = useSettings();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gold Jewellery', path: '/products?category=gold-necklaces' },
    { name: 'Diamond Jewellery', path: '/products?category=diamond-jewellery' },
    { name: 'Bridal Collection', path: '/products?category=bridal-jewellery' },
    { name: 'Collections', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 bg-luxury-black text-ivory ${
          scrolled
            ? 'shadow-luxury border-b border-gold-champagne/30 bg-luxury-black/95 backdrop-blur-md'
            : 'border-b border-gold-champagne/20'
        }`}
      >
        {/* Tier 1: Main Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-22">
            {/* Left: Showroom Meta (Desktop) / Mobile Drawer Button (Mobile) */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-ivory hover:text-gold-champagne transition"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 text-gold-champagne" />
              </button>

              <div className="hidden lg:flex flex-col text-[11px] text-ivory/60 leading-tight">
                <span className="flex items-center gap-1.5 text-gold-champagne font-medium uppercase tracking-wider text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>BIS 916 Hallmarked</span>
                </span>
                <span className="text-[10px] text-ivory/50 tracking-wider mt-0.5">
                  Punnayurkulam, Kerala
                </span>
              </div>
            </div>

            {/* Center: Prestigious Nav Heading & Monogram */}
            <Link to="/" className="flex items-center gap-3.5 sm:gap-4 group text-center">
              {/* Refined Gold Monogram Crest */}
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-gold-champagne/70 flex items-center justify-center bg-gradient-to-b from-stone-900 to-black shadow-gold-glow group-hover:border-gold-champagne transition duration-300 shrink-0">
                <span className="font-serif text-xl sm:text-2xl font-bold gold-gradient-text">
                  M
                </span>
              </div>

              {/* Brand Typography */}
              <div className="flex flex-col items-start text-left">
                <span className="font-serif text-xl sm:text-2xl tracking-[0.16em] font-semibold text-ivory uppercase leading-none group-hover:text-gold-light transition duration-300">
                  MIKHAEL
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.28em] text-gold-champagne uppercase font-medium mt-1 leading-none">
                  Gold & Diamonds LLP
                </span>
              </div>
            </Link>

            {/* Right: Search & Concierge Buttons */}
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenSearch || (() => navigate('/products'))}
                className="px-3 py-1.5 rounded-full border border-white/15 text-ivory/80 hover:text-gold-champagne hover:border-gold-champagne/50 transition flex items-center gap-2 text-xs uppercase tracking-wider"
                title="Search Catalogue"
              >
                <Search className="w-3.5 h-3.5 text-gold-champagne" />
                <span className="hidden sm:inline text-[11px]">Search</span>
              </button>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-gold-champagne/70 bg-gold-champagne/10 text-xs font-semibold tracking-wider uppercase text-gold-champagne hover:bg-gold-champagne hover:text-luxury-black transition shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </a>
            </div>
          </div>
        </div>

        {/* Tier 2: Dedicated Navigation Row (Single line, spacious, no wrapping) */}
        <div className="hidden lg:block border-t border-gold-champagne/15 bg-black/40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center space-x-8 xl:space-x-10 h-12">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/' && !location.search
                    : location.pathname + location.search === link.path ||
                      (location.pathname === '/products' &&
                        link.path.includes(location.search) &&
                        location.search !== '');

                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`nav-link text-xs uppercase tracking-[0.2em] font-medium whitespace-nowrap transition-colors duration-200 ${
                      isActive
                        ? 'active text-gold-champagne font-semibold'
                        : 'text-ivory/80 hover:text-gold-champagne'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Bottom Kerala Kasavu Accent Line */}
        <div className="kasavu-accent"></div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-sm w-full bg-luxury-black text-ivory shadow-2xl p-6 flex flex-col justify-between border-r border-gold-champagne/25 z-50 animate-in slide-in-from-left duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gold-champagne/20">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full border border-gold-champagne flex items-center justify-center font-serif text-gold-champagne font-bold text-xl bg-stone-900">
                    M
                  </span>
                  <div>
                    <span className="font-serif text-lg font-bold tracking-[0.16em] uppercase text-ivory block leading-none">
                      MIKHAEL
                    </span>
                    <span className="text-[9px] tracking-[0.26em] text-gold-champagne uppercase font-medium mt-1 block">
                      Gold & Diamonds LLP
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-ivory/70 hover:text-ivory rounded-full hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="mt-6 flex flex-col space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-xs font-semibold uppercase tracking-[0.2em] text-ivory/85 hover:text-gold-champagne py-3 px-3 flex items-center justify-between border-b border-white/5 transition hover:bg-white/[0.03] rounded"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-champagne/60" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Contact Details */}
            <div className="pt-6 border-t border-gold-champagne/20 space-y-3.5">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-gold-champagne text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition shadow-gold-glow"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Consultation</span>
              </a>

              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gold-champagne/40 text-gold-champagne text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone}</span>
                </a>
              )}

              <div className="text-center text-[11px] text-ivory/50 space-y-0.5 pt-1">
                <p className="font-medium text-ivory/70">
                  Door No. 81 A, Mahima Complex, Punnayurkulam, Kerala
                </p>
                <p className="text-[10px] text-gold-champagne/80 tracking-wider uppercase">
                  BIS 916 Hallmarked 22K Gold
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
