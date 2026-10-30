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
      setScrolled(window.scrollY > 20);
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
    { name: 'Gold Jewellery', path: '/products?category=gold-necklaces' },
    { name: 'Diamond Jewellery', path: '/products?category=diamond-jewellery' },
    { name: 'Bridal Suite', path: '/products?category=bridal-jewellery' },
    { name: 'Collections', path: '/products' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {/* Top Showroom Micro-Bar */}
      <div className="bg-luxury-black text-ivory/80 text-[11px] border-b border-gold-champagne/15 py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-ivory/70">
              <MapPin className="w-3.5 h-3.5 text-gold-champagne shrink-0" />
              <span>Door No. 81 A, Mahima Complex, Punnayurkulam, Kerala</span>
            </div>
            <div className="flex items-center gap-1.5 text-gold-champagne/90 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-champagne shrink-0" />
              <span>100% BIS 916 Hallmarked Gold • Certified Natural Diamonds</span>
            </div>
          </div>

          <div className="flex items-center gap-5 text-ivory/80">
            {settings.phone && (
              <a
                href={`tel:${settings.phone}`}
                className="flex items-center gap-1 hover:text-gold-champagne transition"
              >
                <Phone className="w-3 h-3 text-gold-champagne" />
                <span>{settings.phone}</span>
              </a>
            )}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-gold-champagne hover:text-gold-light transition font-semibold"
            >
              <MessageCircle className="w-3 h-3" />
              <span>WhatsApp Concierge</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Luxury Navigation Header */}
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-luxury-black/95 backdrop-blur-md shadow-luxury border-b border-gold-champagne/25 text-ivory py-3'
            : 'bg-luxury-black text-ivory border-b border-gold-champagne/20 py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Identity & Nav Heading */}
            <Link to="/" className="flex items-center gap-3.5 sm:gap-4 group">
              {/* Luxury Monogram Crest */}
              <div className="relative w-11 h-11 sm:w-12 sm:h-12 rounded-full border border-gold-champagne/60 flex items-center justify-center bg-gradient-to-br from-luxury-black via-luxury-dark to-luxury-black shadow-gold-glow group-hover:border-gold-champagne transition-all duration-300">
                <div className="absolute inset-0.5 rounded-full border border-gold-champagne/25 border-dashed"></div>
                <span className="font-serif text-2xl font-bold gold-gradient-text group-hover:scale-105 transition-transform duration-300">
                  M
                </span>
              </div>

              {/* Brand Typography & Nav Heading */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1.5">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.24em] text-ivory uppercase leading-none group-hover:text-gold-light transition duration-300">
                    MIKHAEL
                  </span>
                </div>
                <span className="text-[9px] sm:text-[10px] tracking-[0.34em] text-gold-champagne uppercase font-semibold mt-1 leading-none">
                  GOLD AND DIAMONDS LLP
                </span>
                <span className="text-[8px] tracking-[0.25em] text-ivory/50 uppercase font-light mt-0.5 hidden sm:block">
                  Punnayurkulam • Kerala
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-6 lg:space-x-7">
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
                    className={`nav-link text-[11px] uppercase tracking-[0.22em] font-medium transition-colors ${
                      isActive
                        ? 'active text-gold-champagne font-semibold'
                        : 'text-ivory/85 hover:text-gold-champagne'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* Right Controls: Search, WhatsApp Concierge & Mobile Toggle */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Trigger */}
              <button
                onClick={onOpenSearch || (() => navigate('/products'))}
                className="p-2 sm:px-3 sm:py-2 text-ivory/80 hover:text-gold-champagne hover:bg-white/5 rounded-full sm:rounded-lg border border-transparent sm:border-white/10 transition flex items-center gap-2"
                aria-label="Search Catalogue"
                title="Search Jewellery Catalogue"
              >
                <Search className="w-4 h-4 text-gold-champagne" />
                <span className="text-xs uppercase tracking-wider text-ivory/70 hidden md:inline">
                  Search
                </span>
              </button>

              {/* WhatsApp Concierge Button */}
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold-champagne/70 bg-gold-champagne/10 text-xs font-semibold tracking-wider uppercase text-gold-champagne hover:bg-gold-champagne hover:text-luxury-black transition-all duration-300 shadow-sm"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Enquire</span>
              </a>

              {/* Mobile Drawer Trigger */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 text-ivory hover:text-gold-champagne transition"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6 text-gold-champagne" />
              </button>
            </div>
          </div>
        </div>

        {/* Kasavu Gold Thread Divider */}
        <div className="kasavu-accent mt-3 sm:mt-4"></div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-luxury-black text-ivory shadow-2xl p-6 sm:p-8 flex flex-col justify-between border-l border-gold-champagne/25 z-50 animate-in slide-in-from-right duration-300">
            <div>
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-6 border-b border-gold-champagne/20">
                <div className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full border border-gold-champagne flex items-center justify-center font-serif text-gold-champagne font-bold text-lg bg-luxury-dark">
                    M
                  </span>
                  <div>
                    <span className="font-serif text-base font-bold tracking-[0.2em] uppercase text-ivory block leading-none">
                      MIKHAEL
                    </span>
                    <span className="text-[9px] tracking-[0.3em] text-gold-champagne uppercase font-medium mt-1 block">
                      Gold & Diamonds LLP
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-ivory/70 hover:text-ivory rounded-full hover:bg-white/10 transition"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <nav className="mt-6 flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="text-xs font-semibold uppercase tracking-[0.22em] text-ivory/85 hover:text-gold-champagne py-3 px-2 flex items-center justify-between border-b border-white/5 transition hover:bg-white/[0.02] rounded"
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
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-full border border-gold-champagne/40 text-gold-champagne text-xs font-semibold uppercase tracking-wider hover:bg-white/5 transition"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {settings.phone}</span>
                </a>
              )}

              <div className="text-center text-[11px] text-ivory/50 space-y-1 pt-2">
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
