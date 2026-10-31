import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '../../context/SettingsContext';
import { MapPin, Phone, Clock, MessageSquare, ExternalLink, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { settings, getWhatsAppLink } = useSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#40030B] text-[#FAF8F2] relative overflow-hidden">
      {/* Top Royal Kasavu Ribbon */}
      <div className="kasavu opacity-95"></div>

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-10">
          
          {/* Column 1: Brand Identity & Craftsmanship (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            <Link to="/" className="flex items-center gap-3.5 group">
              <div className="h-14 w-14 shrink-0 rounded-full ring-2 ring-[#D4AF37] overflow-hidden bg-[#780817] shadow-lg">
                <img
                  src="/img/logo.png"
                  alt="Mikhael Gold & Diamonds"
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  width={56}
                  height={56}
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-display text-2xl sm:text-3xl font-semibold text-[#FAF8F2] tracking-[0.2em] uppercase leading-none">
                  MIKHAEL
                </span>
                <span className="mt-1 text-[10.5px] font-bold tracking-[0.26em] text-[#D4AF37] uppercase leading-tight">
                  GOLD &amp; DIAMONDS LLP
                </span>
                <span className="mt-0.5 text-[8px] font-medium tracking-[0.24em] text-[#E8D39A] uppercase leading-tight">
                  PUNNAYURKULAM · KERALA
                </span>
              </div>
            </Link>

            <p className="max-w-md text-sm leading-relaxed text-[#FAF8F2]/80 font-sans">
              Handcrafted 22K BIS-hallmarked gold and certified natural diamonds. Celebrating Kerala’s rich bridal trousseau heritage, backed by transparent billing and a lifetime exchange guarantee.
            </p>

            <div className="flex items-center gap-2.5 pt-2 text-[#D4AF37] text-xs font-semibold tracking-wider uppercase">
              <ShieldCheck className="h-4 w-4 shrink-0 text-[#E8D39A]" />
              <span>100% BIS 916 Hallmarked &amp; IGI Certified</span>
            </div>
          </div>

          {/* Column 2: Quick Links (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] border-b border-[#D4AF37]/25 pb-2 inline-block">
              Explore
            </p>
            <ul className="mt-5 space-y-3 text-xs tracking-wider uppercase font-medium text-[#FAF8F2]/80">
              <li>
                <Link to="/collections" className="hover:text-[#E8D39A] transition">
                  All Collections
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Bridal" className="hover:text-[#E8D39A] transition">
                  Bridal Suite
                </Link>
              </li>
              <li>
                <a href="/#heritage" className="hover:text-[#E8D39A] transition">
                  Our Karigars
                </a>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-[#E8D39A] transition">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <a href="/#visit" className="hover:text-[#E8D39A] transition">
                  Private Viewing
                </a>
              </li>
              <li>
                <Link to="/admin/login" className="hover:text-[#E8D39A] opacity-60 transition text-[10px]">
                  Staff Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Jewellery Categories (2 cols) */}
          <div className="lg:col-span-2">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] border-b border-[#D4AF37]/25 pb-2 inline-block">
              Creations
            </p>
            <ul className="mt-5 space-y-3 text-xs tracking-wider uppercase font-medium text-[#FAF8F2]/80">
              <li>
                <Link to="/collections?category=Necklaces" className="hover:text-[#E8D39A] transition">
                  Gold Necklaces
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Bangles" className="hover:text-[#E8D39A] transition">
                  Kerala Bangles
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Rings" className="hover:text-[#E8D39A] transition">
                  Solitaire Rings
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Earrings" className="hover:text-[#E8D39A] transition">
                  Temple Jhumkas
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Traditional" className="hover:text-[#E8D39A] transition">
                  Palakka &amp; Kasu Mala
                </Link>
              </li>
              <li>
                <Link to="/collections?category=Coins" className="hover:text-[#E8D39A] transition">
                  24K Pure Coins
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Showroom & Concierge (3 cols) */}
          <div className="lg:col-span-3">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4AF37] border-b border-[#D4AF37]/25 pb-2 inline-block">
              Showroom
            </p>
            <address className="mt-5 space-y-3 text-xs not-italic text-[#FAF8F2]/80 leading-relaxed">
              <div className="flex items-start gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-[#D4AF37] mt-0.5" />
                <span>
                  Mahima Complex, Door No. 81 A,<br />
                  Althara, P.O. Punnayurkulam,<br />
                  Kerala 679561, India.
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Clock className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                <span>Mon – Sat · 9:30 AM – 7:30 PM</span>
              </div>

              {settings.google_maps_url && (
                <div className="pt-1">
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-[#E8D39A] hover:text-[#FAF8F2] underline underline-offset-4 transition font-medium"
                  >
                    <span>Get Google Maps Directions</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              )}

              <div className="pt-3">
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37] bg-[#780817] px-4 py-2 text-xs font-semibold tracking-wider uppercase text-[#FAF8F2] hover:bg-[#530510] hover:border-[#E8D39A] transition shadow-md"
                >
                  <MessageSquare className="h-3.5 w-3.5 text-[#D4AF37]" />
                  <span>WhatsApp Concierge</span>
                </a>
              </div>
            </address>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="mt-14 pt-8 border-t border-[#D4AF37]/20 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F2]/60">
          <p>© {currentYear} MIKHAEL GOLD AND DIAMONDS LLP. All rights reserved.</p>

          <div className="flex items-center space-x-6 text-xs text-[#FAF8F2]/70">
            <Link to="/privacy-policy" className="hover:text-[#E8D39A] transition">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#E8D39A] transition">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
