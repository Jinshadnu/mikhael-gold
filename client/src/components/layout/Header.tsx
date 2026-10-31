import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  X,
  MessageSquare,
  ChevronDown,
  ArrowRight,
  Phone,
  MapPin,
  Clock,
} from 'lucide-react';

interface SubmenuItem {
  name: string;
  href: string;
  description?: string;
}

interface DropdownConfig {
  title: string;
  href: string;
  subtitle: string;
  items: SubmenuItem[];
  featured: {
    title: string;
    description: string;
    image: string;
    href: string;
  };
}

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const location = useLocation();
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Smooth scroll listener for sticky header transition
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on navigation
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname, location.hash, location.search]);

  // Handle ESC key to dismiss drawer or dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMobileMenuOpen(false);
        setActiveDropdown(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Mega-Menu Configurations exactly per specification
  const dropdowns: Record<string, DropdownConfig> = {
    gold: {
      title: 'Gold Jewellery',
      href: '/collections?category=Necklaces',
      subtitle: 'BIS 916 Hallmarked Pure Gold',
      items: [
        { name: 'Gold Rings', href: '/collections?category=Rings', description: 'Solitaire & handcrafted floral bands' },
        { name: 'Gold Chains', href: '/collections?category=Chains', description: 'Hand-woven traditional chains' },
        { name: 'Gold Bangles', href: '/collections?category=Bangles', description: 'Kadas, vala & filigree pairs' },
        { name: 'Gold Necklaces', href: '/collections?category=Necklaces', description: 'Kasu Mala, Palakka & choker suites' },
        { name: 'Gold Earrings', href: '/collections?category=Earrings', description: 'Temple jhumkas, drops & studs' },
      ],
      featured: {
        title: 'Lakshmi Kasu Mala',
        description: 'Heirloom bridal necklace with 41 hand-struck Lakshmi coins in pure 22K gold.',
        image: '/img/kasu-mala.png',
        href: '/products/lakshmi-kasu-mala',
      },
    },
    diamond: {
      title: 'Diamond Jewellery',
      href: '/collections?category=Rings',
      subtitle: 'Certified Natural Solitaires',
      items: [
        { name: 'Diamond Rings', href: '/collections?category=Rings', description: 'Brilliant round & cushion solitaires' },
        { name: 'Diamond Necklaces', href: '/collections?category=Necklaces', description: 'Delicate collarettes & bridal pendants' },
        { name: 'Diamond Earrings', href: '/collections?category=Earrings', description: 'Solitaire studs, drops & chandeliers' },
        { name: 'Diamond Bracelets', href: '/collections?category=Bangles', description: 'Classic tennis bracelets & kadas' },
      ],
      featured: {
        title: 'Nila Solitaire Ring',
        description: 'IGI certified brilliant-cut diamond set in a sculptural 18K gold basket.',
        image: '/img/ring.png',
        href: '/products/nila-solitaire-ring',
      },
    },
    collections: {
      title: 'Collections',
      href: '/collections',
      subtitle: 'Curated Karigar Suites',
      items: [
        { name: 'Latest Collections', href: '/collections?sort=newest', description: 'Newest contemporary & festive arrivals' },
        { name: 'Exclusive Collections', href: '/collections?exclusive=true', description: 'One-of-a-kind master goldsmith creations' },
        { name: 'Traditional Collections', href: '/collections?category=Traditional', description: 'Palakka, Nagapadam & temple motifs' },
        { name: 'Wedding Collections', href: '/collections?category=Bridal', description: 'Comprehensive Kerala bridal trousseaus' },
      ],
      featured: {
        title: 'Emerald Palakka Mala',
        description: 'Authentic royal Kerala choker adorned with deep green cabochon stones.',
        image: '/img/palakka-mala.png',
        href: '/products/emerald-palakka-mala',
      },
    },
  };

  const handleMouseEnter = (key: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const isLinkActive = (path: string, hash?: string) => {
    if (hash) {
      return location.pathname === '/' && location.hash === hash;
    }
    return location.pathname === path && !location.hash;
  };

  const isHomePage = location.pathname === '/' && !location.hash;
  const isTransparent = isHomePage && !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-out ${
          isTransparent
            ? 'bg-transparent border-b border-transparent'
            : 'bg-[#530510]/95 backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,0.35)] border-b border-[#D4AF37]/40'
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
          <div
            className={`flex items-center justify-between transition-all duration-300 ease-out ${
              scrolled ? 'h-20 lg:h-[82px]' : 'h-24 lg:h-[104px]'
            }`}
          >
            {/* =============================================================== */}
            {/* 1. LEFT SECTION: BRAND IDENTITY & CIRCULAR LOGO                */}
            {/* =============================================================== */}
            <div className="flex items-center shrink-0">
              <Link
                to="/"
                className="group flex items-center gap-3.5 sm:gap-4 focus:outline-none"
                aria-label="MIKHAEL Gold & Diamonds Home"
              >
                {/* Preserved Original Circular Logo: 68-76px on desktop (72px top, 58px sticky) */}
                <div
                  className={`relative shrink-0 rounded-full overflow-hidden border border-[#D4AF37]/60 bg-[#780817] shadow-sm transition-all duration-300 ease-out group-hover:border-[#D4AF37] group-hover:shadow-[0_0_12px_rgba(212,175,55,0.35)] ${
                    scrolled
                      ? 'w-12 h-12 sm:w-[54px] sm:h-[54px] lg:w-[58px] lg:h-[58px]'
                      : 'w-13 h-13 sm:w-16 sm:h-16 lg:w-[72px] lg:h-[72px]'
                  }`}
                >
                  <img
                    src="/img/logo.png"
                    alt="Mikhael Gold & Diamonds Official Emblem"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={72}
                    height={72}
                  />
                </div>

                {/* Brand Name & Location Hierarchy */}
                <div className="flex flex-col text-left justify-center">
                  <span className="font-serif text-[22px] sm:text-2xl lg:text-[26px] font-normal tracking-[0.2em] text-white uppercase leading-none transition-colors duration-300 group-hover:text-[#D4AF37]">
                    MIKHAEL
                  </span>
                  <span className="mt-1 text-[9px] sm:text-[9.5px] lg:text-[10px] font-semibold tracking-[0.26em] text-[#D4AF37] uppercase leading-tight">
                    GOLD &amp; DIAMONDS
                  </span>
                  <span className="mt-0.5 text-[7.5px] sm:text-[8px] font-medium tracking-[0.22em] text-[#E8D39A] uppercase leading-tight">
                    PUNNAYURKULAM · KERALA
                  </span>
                </div>
              </Link>
            </div>

            {/* =============================================================== */}
            {/* 2. CENTER SECTION: SINGLE-ROW NAVIGATION (DESKTOP)             */}
            {/* =============================================================== */}
            <nav
              className="hidden xl:flex items-center justify-center gap-3.5 xl:gap-4 2xl:gap-6 h-full flex-nowrap"
              aria-label="Main Navigation"
            >
              {/* HOME */}
              <Link
                to="/"
                className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap ${
                  isLinkActive('/') ? 'is-active' : ''
                }`}
              >
                HOME
              </Link>

              {/* GOLD JEWELLERY with Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter('gold')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/collections?category=Necklaces"
                  className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap flex items-center gap-1 ${
                    activeDropdown === 'gold' || location.search.includes('Necklaces') || location.search.includes('Bangles')
                      ? 'is-active'
                      : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'gold'}
                >
                  <span>GOLD JEWELLERY</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-300 ${
                      activeDropdown === 'gold' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Mega-Menu Panel: GOLD JEWELLERY */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-out z-50 ${
                    activeDropdown === 'gold'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-[520px] rounded-2xl border border-[#D4AF37]/40 bg-[#780817] p-6 shadow-[0_20px_50px_rgba(120,8,23,0.35)] text-[#FAF8F2]">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/30">
                      <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                        {dropdowns.gold.subtitle}
                      </span>
                      <Link
                        to="/collections?category=Necklaces"
                        className="text-[10.5px] uppercase tracking-[0.18em] text-[#E8D39A] hover:text-[#FAF8F2] flex items-center gap-1 transition"
                      >
                        <span>View All</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-12 gap-5 items-center">
                      <div className="col-span-7 space-y-1">
                        {dropdowns.gold.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="group/item flex flex-col px-3 py-2 rounded-lg transition duration-200 hover:bg-[#530510]"
                          >
                            <span className="font-serif text-[15px] font-medium text-[#FAF8F2] group-hover/item:text-[#D4AF37] transition flex items-center justify-between">
                              <span>{sub.name}</span>
                              <ArrowRight className="h-3 w-3 text-[#D4AF37] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                            </span>
                            {sub.description && (
                              <span className="text-[11px] text-[#FAF8F2]/75 group-hover/item:text-[#FAF8F2]">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="col-span-5">
                        <Link
                          to={dropdowns.gold.featured.href}
                          className="group/card block rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#530510] p-3 text-left transition hover:border-[#D4AF37]"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#40030B]">
                            <img
                              src={dropdowns.gold.featured.image}
                              alt={dropdowns.gold.featured.title}
                              className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                            />
                          </div>
                          <p className="mt-2.5 font-serif text-[14px] text-[#FAF8F2] font-semibold group-hover/card:text-[#D4AF37] transition">
                            {dropdowns.gold.featured.title}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-[#FAF8F2]/75 line-clamp-2 leading-relaxed">
                            {dropdowns.gold.featured.description}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* DIAMOND JEWELLERY with Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter('diamond')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/collections?category=Rings"
                  className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap flex items-center gap-1 ${
                    activeDropdown === 'diamond' ? 'is-active' : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'diamond'}
                >
                  <span>DIAMOND JEWELLERY</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-300 ${
                      activeDropdown === 'diamond' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Mega-Menu Panel: DIAMOND JEWELLERY */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-out z-50 ${
                    activeDropdown === 'diamond'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-[500px] rounded-2xl border border-[#D4AF37]/40 bg-[#780817] p-6 shadow-[0_20px_50px_rgba(120,8,23,0.35)] text-[#FAF8F2]">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/30">
                      <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                        {dropdowns.diamond.subtitle}
                      </span>
                      <Link
                        to="/collections?category=Rings"
                        className="text-[10.5px] uppercase tracking-[0.18em] text-[#E8D39A] hover:text-[#FAF8F2] flex items-center gap-1 transition"
                      >
                        <span>View All</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-12 gap-5 items-center">
                      <div className="col-span-7 space-y-1">
                        {dropdowns.diamond.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="group/item flex flex-col px-3 py-2 rounded-lg transition duration-200 hover:bg-[#530510]"
                          >
                            <span className="font-serif text-[15px] font-medium text-[#FAF8F2] group-hover/item:text-[#D4AF37] transition flex items-center justify-between">
                              <span>{sub.name}</span>
                              <ArrowRight className="h-3 w-3 text-[#D4AF37] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                            </span>
                            {sub.description && (
                              <span className="text-[11px] text-[#FAF8F2]/75 group-hover/item:text-[#FAF8F2]">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="col-span-5">
                        <Link
                          to={dropdowns.diamond.featured.href}
                          className="group/card block rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#530510] p-3 text-left transition hover:border-[#D4AF37]"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#40030B]">
                            <img
                              src={dropdowns.diamond.featured.image}
                              alt={dropdowns.diamond.featured.title}
                              className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                            />
                          </div>
                          <p className="mt-2.5 font-serif text-[14px] text-[#FAF8F2] font-semibold group-hover/card:text-[#D4AF37] transition">
                            {dropdowns.diamond.featured.title}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-[#FAF8F2]/75 line-clamp-2 leading-relaxed">
                            {dropdowns.diamond.featured.description}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* BRIDAL SUITE */}
              <Link
                to="/collections?category=Bridal"
                className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap ${
                  location.search.includes('Bridal') ? 'is-active' : ''
                }`}
              >
                BRIDAL SUITE
              </Link>

              {/* COLLECTIONS with Dropdown */}
              <div
                className="relative h-full flex items-center"
                onMouseEnter={() => handleMouseEnter('collections')}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  to="/collections"
                  className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap flex items-center gap-1 ${
                    activeDropdown === 'collections' || (location.pathname === '/collections' && !location.search)
                      ? 'is-active'
                      : ''
                  }`}
                  aria-haspopup="true"
                  aria-expanded={activeDropdown === 'collections'}
                >
                  <span>COLLECTIONS</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 text-[#D4AF37] transition-transform duration-300 ${
                      activeDropdown === 'collections' ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                {/* Mega-Menu Panel: COLLECTIONS */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 transition-all duration-300 ease-out z-50 ${
                    activeDropdown === 'collections'
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-[500px] rounded-2xl border border-[#D4AF37]/40 bg-[#780817] p-6 shadow-[0_20px_50px_rgba(120,8,23,0.35)] text-[#FAF8F2]">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D4AF37]/30">
                      <span className="text-[10.5px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                        {dropdowns.collections.subtitle}
                      </span>
                      <Link
                        to="/collections"
                        className="text-[10.5px] uppercase tracking-[0.18em] text-[#E8D39A] hover:text-[#FAF8F2] flex items-center gap-1 transition"
                      >
                        <span>Explore All</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-12 gap-5 items-center">
                      <div className="col-span-7 space-y-1">
                        {dropdowns.collections.items.map((sub) => (
                          <Link
                            key={sub.name}
                            to={sub.href}
                            className="group/item flex flex-col px-3 py-2 rounded-lg transition duration-200 hover:bg-[#530510]"
                          >
                            <span className="font-serif text-[15px] font-medium text-[#FAF8F2] group-hover/item:text-[#D4AF37] transition flex items-center justify-between">
                              <span>{sub.name}</span>
                              <ArrowRight className="h-3 w-3 text-[#D4AF37] opacity-0 -translate-x-1 transition-all duration-200 group-hover/item:opacity-100 group-hover/item:translate-x-0" />
                            </span>
                            {sub.description && (
                              <span className="text-[11px] text-[#FAF8F2]/75 group-hover/item:text-[#FAF8F2]">
                                {sub.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="col-span-5">
                        <Link
                          to={dropdowns.collections.featured.href}
                          className="group/card block rounded-xl overflow-hidden border border-[#D4AF37]/30 bg-[#530510] p-3 text-left transition hover:border-[#D4AF37]"
                        >
                          <div className="aspect-[4/3] w-full overflow-hidden rounded-lg bg-[#40030B]">
                            <img
                              src={dropdowns.collections.featured.image}
                              alt={dropdowns.collections.featured.title}
                              className="h-full w-full object-cover transition duration-500 group-hover/card:scale-105"
                            />
                          </div>
                          <p className="mt-2.5 font-serif text-[14px] text-[#FAF8F2] font-semibold group-hover/card:text-[#D4AF37] transition">
                            {dropdowns.collections.featured.title}
                          </p>
                          <p className="mt-0.5 text-[10.5px] text-[#FAF8F2]/75 line-clamp-2 leading-relaxed">
                            {dropdowns.collections.featured.description}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* GALLERY */}
              <Link
                to="/gallery"
                className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap ${
                  isLinkActive('/gallery') ? 'is-active' : ''
                }`}
              >
                GALLERY
              </Link>

              {/* ABOUT US */}
              <Link
                to="/about"
                className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap ${
                  isLinkActive('/about') ? 'is-active' : ''
                }`}
              >
                ABOUT US
              </Link>

              {/* CONTACT */}
              <Link
                to="/contact"
                className={`nav-link-burgundy text-white tracking-[1.2px] text-[12.5px] xl:text-[13px] uppercase py-2 whitespace-nowrap ${
                  isLinkActive('/contact') ? 'is-active' : ''
                }`}
              >
                CONTACT
              </Link>
            </nav>

            {/* =============================================================== */}
            {/* 3. RIGHT SECTION: ENQUIRE CTA ACTION                            */}
            {/* =============================================================== */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
              {/* ENQUIRE BUTTON: Burgundy filled button, ivory text, message icon, champagne gold hover */}
              <a
                href="/contact"
                className="group inline-flex items-center gap-2 rounded-full bg-[#780817] px-4.5 sm:px-5 py-2 sm:py-2.5 text-[11px] font-semibold uppercase tracking-[1.4px] text-[#FAF8F2] border border-[#D4AF37]/50 shadow-md transition-all duration-300 hover:bg-[#530510] hover:border-[#E8D39A] hover:text-[#FAF8F2] hover:shadow-[0_4px_16px_rgba(212,175,55,0.3)] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                aria-label="Enquire or book private showroom appointment"
              >
                <MessageSquare className="h-3.5 w-3.5 text-[#E8D39A] transition-transform duration-300 group-hover:-translate-y-0.5" />
                <span>ENQUIRE</span>
              </a>

              {/* MOBILE HAMBURGER BUTTON (Visible below xl screens) */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="xl:hidden p-2 rounded-full border border-white/40 text-white hover:text-[#D4AF37] hover:border-[#D4AF37] transition duration-200 focus:outline-none"
                aria-label="Open navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Delicate Kasavu Ribbon Accent Line */}
        <div className={`kasavu transition-opacity duration-300 ${scrolled ? 'opacity-85' : 'opacity-0'}`}></div>
      </header>

      {/* ===================================================================== */}
      {/* 4. SLIDE-IN BURGUNDY LUXURY MOBILE DRAWER                             */}
      {/* ===================================================================== */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden" role="dialog" aria-modal="true">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#292323]/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer container (Deep Burgundy Background #530510) */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#530510] p-6 shadow-2xl border-l border-[#D4AF37]/40 flex flex-col justify-between overflow-y-auto text-[#FAF8F2] animate-slideInRight">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D4AF37]/30">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 shrink-0 rounded-full border border-[#D4AF37] overflow-hidden bg-[#780817]">
                    <img
                      src="/img/logo.png"
                      alt="Mikhael Gold & Diamonds"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-serif text-[19px] font-normal text-[#FAF8F2] uppercase tracking-[0.2em] leading-none">
                      MIKHAEL
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4AF37] leading-tight mt-1">
                      GOLD &amp; DIAMONDS
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] hover:text-[#FAF8F2] hover:border-[#FAF8F2] transition"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Navigation Items with Accordions */}
              <nav className="mt-6 flex flex-col space-y-1 text-xs uppercase tracking-[1.4px] font-medium text-[#FAF8F2]">
                {/* HOME */}
                <Link
                  to="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition"
                >
                  <span>HOME</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                </Link>

                {/* GOLD JEWELLERY Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'gold' ? null : 'gold'
                      )
                    }
                    className="flex w-full items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition text-left"
                  >
                    <span>GOLD JEWELLERY</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#D4AF37] transition-transform ${
                        mobileExpandedSection === 'gold' ? 'rotate-180 text-[#FAF8F2]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'gold' && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-[#40030B] rounded-lg my-1 border-l-2 border-[#D4AF37]">
                      {dropdowns.gold.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[11px] text-[#FAF8F2]/90 hover:text-[#D4AF37] py-1.5 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* DIAMOND JEWELLERY Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'diamond' ? null : 'diamond'
                      )
                    }
                    className="flex w-full items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition text-left"
                  >
                    <span>DIAMOND JEWELLERY</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#D4AF37] transition-transform ${
                        mobileExpandedSection === 'diamond' ? 'rotate-180 text-[#FAF8F2]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'diamond' && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-[#40030B] rounded-lg my-1 border-l-2 border-[#D4AF37]">
                      {dropdowns.diamond.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[11px] text-[#FAF8F2]/90 hover:text-[#D4AF37] py-1.5 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* BRIDAL SUITE */}
                <Link
                  to="/collections?category=Bridal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition"
                >
                  <span>BRIDAL SUITE</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                </Link>

                {/* COLLECTIONS Accordion */}
                <div>
                  <button
                    onClick={() =>
                      setMobileExpandedSection(
                        mobileExpandedSection === 'collections' ? null : 'collections'
                      )
                    }
                    className="flex w-full items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition text-left"
                  >
                    <span>COLLECTIONS</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#D4AF37] transition-transform ${
                        mobileExpandedSection === 'collections' ? 'rotate-180 text-[#FAF8F2]' : ''
                      }`}
                    />
                  </button>
                  {mobileExpandedSection === 'collections' && (
                    <div className="pl-4 pr-2 py-2 space-y-2 bg-[#40030B] rounded-lg my-1 border-l-2 border-[#D4AF37]">
                      {dropdowns.collections.items.map((sub) => (
                        <Link
                          key={sub.name}
                          to={sub.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block text-[11px] text-[#FAF8F2]/90 hover:text-[#D4AF37] py-1.5 transition"
                        >
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                {/* GALLERY */}
                <Link
                  to="/gallery"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition"
                >
                  <span>GALLERY</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                </Link>

                {/* ABOUT US */}
                <Link
                  to="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition"
                >
                  <span>ABOUT US</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                </Link>

                {/* CONTACT */}
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between py-3.5 px-3 rounded-lg hover:text-[#D4AF37] hover:bg-[#780817] transition"
                >
                  <span>CONTACT</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#D4AF37]" />
                </Link>
              </nav>

              {/* Enquire Mobile CTA Button */}
              <div className="mt-8 pt-4 border-t border-[#D4AF37]/30">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full rounded-full bg-[#D4AF37] py-4 text-center text-xs font-bold uppercase tracking-[1.6px] text-[#530510] hover:bg-[#E8D39A] transition shadow-lg"
                >
                  <MessageSquare className="h-4 w-4 text-[#530510]" />
                  <span>ENQUIRE NOW</span>
                </Link>
              </div>
            </div>

            {/* Bottom Showroom Info */}
            <div className="mt-8 pt-6 border-t border-[#D4AF37]/25 text-[11px] text-[#FAF8F2]/80 space-y-2">
              <div className="flex items-center gap-2 text-[#FAF8F2]">
                <MapPin className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Mahima Complex, Punnayurkulam, Kerala</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>+91 94471 24660 · Concierge Desk</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                <span>Mon – Sat: 9:30 AM – 7:30 PM</span>
              </div>
              <p className="text-[10px] text-[#D4AF37] pt-1 uppercase tracking-wider font-semibold">
                BIS 916 Hallmarked Pure Gold &amp; Certified Diamonds
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
