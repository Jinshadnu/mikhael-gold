import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { HomepageSections } from '../../types';

interface HeroSectionProps {
  data?: HomepageSections['hero_section'];
}

export const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const eyebrow = data?.eyebrow || 'THE ART OF TIMELESS BEAUTY';
  const heading = data?.heading || 'Elegance That Lasts Forever';
  const description =
    data?.description ||
    'Discover exquisite gold and diamond jewellery crafted to celebrate your most precious moments.';
  const primaryCta = data?.primary_cta_text || 'Explore Our Collection';
  const primaryUrl = data?.primary_cta_url || '/products';
  const secondaryCta = data?.secondary_cta_text || 'Contact Us';
  const secondaryUrl = data?.secondary_cta_url || '/contact';
  const heroImage =
    data?.image_url ||
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1600&auto=format&fit=crop';

  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center justify-center overflow-hidden bg-luxury-black">
      {/* Background Photography with Sophisticated Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Mikhael Gold & Diamonds Fine Jewellery Collection"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000 ease-out"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-luxury-black via-luxury-black/75 to-luxury-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-luxury-black/50"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 w-full">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 backdrop-blur-sm mb-6">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-champagne">
              {eyebrow}
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ivory tracking-tight leading-[1.05] sm:leading-[1.1]">
            {heading.split(' ')[0]}{' '}
            <span className="italic font-normal gold-gradient-text">
              {heading.split(' ').slice(1).join(' ')}
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 text-base sm:text-lg text-ivory/80 font-normal leading-relaxed max-w-xl">
            {description}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <Link
              to={primaryUrl}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-gold-champagne text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-light hover:shadow-gold-glow transition-all duration-300"
            >
              <span>{primaryCta}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to={secondaryUrl}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-gold-champagne/60 text-gold-champagne font-semibold text-xs uppercase tracking-[0.2em] hover:bg-white/5 transition-all duration-300"
            >
              <span>{secondaryCta}</span>
            </Link>
          </div>

          {/* Trust Highlights */}
          <div className="mt-14 pt-8 border-t border-white/10 grid grid-cols-3 gap-4 text-ivory/70 max-w-lg">
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-ivory">BIS 916</p>
              <p className="text-[11px] tracking-wider uppercase text-gold-champagne/80 mt-0.5">
                Hallmarked Gold
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-ivory">IGI / SGL</p>
              <p className="text-[11px] tracking-wider uppercase text-gold-champagne/80 mt-0.5">
                Certified Diamonds
              </p>
            </div>
            <div>
              <p className="font-serif text-xl sm:text-2xl font-bold text-ivory">Kerala</p>
              <p className="text-[11px] tracking-wider uppercase text-gold-champagne/80 mt-0.5">
                Heritage Artistry
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 inset-x-0 kasavu-accent"></div>
    </section>
  );
};
