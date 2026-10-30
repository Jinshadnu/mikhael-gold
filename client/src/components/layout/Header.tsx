import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Search, MessageCircle, Phone, ArrowRight } from 'lucide-react';
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
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname, location.search]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Gold Jewellery', path: '/products?category=gold-necklaces' },
    { name: 'Diamond Jewellery', path: '/products?category=diamond-jewellery' },
    { name: 'Collections', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-luxury-black/95 backdrop-blur-md shadow-luxury border-b border-gold-champagne/20 text-ivory'
            : 'bg-luxury-black text-ivory border-b border-gold-champagne/15'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Left: Brand Identity & Monogram */}
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="w-10 h-10 rounded-full border border-gold-champagne/60 flex items-center justify-center bg-luxury-dark/80 group-hover:border-gold-champagne transition-all shadow-subtle">
                <span className="font-serif text-xl font-bold text-gold-champagne group-hover:scale-105 transition">
                  M
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.18em] text-ivory uppercase leading-none group-hover:text-gold-light transition">
                  MIKHAEL
                </span>
                <span className="text-[9px] sm:text-[10px] tracking-[0.25em] text-gold-champagne uppercase font-medium mt-1">
                  Gold & Diamonds LLP
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-7">
              {navLinks.map((link) => {
                const isActive =
                  link.path === '/'
                    ? location.pathname === '/' && !location.search
                    : location.pathname + location.search === link.path ||
                      (location.pathname === '/products' && link.path.includes(location.search) && location.search !== '');
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={`text-xs uppercase tracking-[0.2em] font-medium transition-colors hover:text-gold-champagne ${
                      isActive ? 'text-gold-champagne font-semibold border-b border-gold-champagne pb-1' : 'text-ivory/80'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, WhatsApp & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Button */}
              <button
                onClick={onOpenSearch || (() => navigate('/products'))}
                className="p-2 text-ivory/80 hover:text-gold-champagne transition rounded-full hover:bg-white/5"
                aria-label="Search Jewellery Catalogue"
                title="Search Catalogue"
              >
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* WhatsApp Quick Connect */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold-champagne/60 text-xs font-semibold tracking-wider uppercase text-gold-champagne hover:bg-gold-champagne hover:text-luxury-black transition shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 text-ivory hover:text-gold-champagne transition"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Kasavu Gold Thread Divider */}
        <div className="kasavu-accent"></div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-luxury-black text-ivory shadow-2xl p-6 flex flex-col justify-between border-l border-gold-champagne/20 z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-gold-champagne/20">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full border border-gold-champagne flex items-center justify-center font-serif text-gold-champagne font-bold">
                    M
                  </span>
                  <span className="font-serif text-sm font-bold tracking-widest uppercase text-ivory">
                    MIKHAEL GOLD
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-ivory/70 hover:text-ivory rounded-full hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="mt-6 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-sm font-medium uppercase tracking-[0.18em] text-ivory/90 hover:text-gold-champagne py-2 flex items-center justify-between border-b border-white/5 transition"
                  >
                    <span>{link.name}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-gold-champagne/60" />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Mobile Footer Contact Details */}
            <div className="pt-6 border-t border-gold-champagne/20 space-y-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-full bg-gold-champagne text-luxury-black font-semibold text-xs uppercase tracking-widest hover:bg-gold-light transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Enquire via WhatsApp</span>
              </a>

              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border border-gold-champagne/40 text-gold-champagne text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{settings.phone}</span>
                </a>
              )}

              <p className="text-[11px] text-ivory/50 text-center leading-relaxed">
                Door No. 81 A, Mahima Complex, Punnayurkulam, Kerala
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
