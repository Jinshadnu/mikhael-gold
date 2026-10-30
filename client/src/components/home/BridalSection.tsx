import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { HomepageSections } from '../../types';

interface BridalSectionProps {
  data?: HomepageSections['bridal_section'];
}

export const BridalSection: React.FC<BridalSectionProps> = ({ data }) => {
  const heading = data?.heading || 'The Royal Kerala Bridal Collection';
  const description =
    data?.description ||
    'From sacred Kasu Mala and vibrant Palakka to regal Nagapadam thaalis and multi-tiered jhumkas, discover bridal jewellery designed to be treasured for generations.';
  const ctaText = data?.cta_text || 'Discover Bridal Collection';
  const ctaUrl = data?.cta_url || '/products?category=bridal-jewellery';
  const imageUrl =
    data?.image_url ||
    'https://images.unsplash.com/photo-1543290956-bd4023ab3447?q=80&w=1200&auto=format&fit=crop';
  const highlights = data?.highlights || [
    'Sacred Temple Chokers & Long Harams',
    'Traditional Palakka & Nagapadam Necklaces',
    'Intricate Antique Gold Bangles & Kadas',
    'Royal Bell Jhumkas with Pure Gold Droplets',
  ];

  return (
    <section className="py-24 bg-luxury-black text-ivory relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-champagne block">
              For Your Auspicious Day
            </span>

            <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
              {heading}
            </h2>

            <div className="w-16 h-0.5 bg-gold-champagne"></div>

            <p className="text-sm sm:text-base text-ivory/80 leading-relaxed max-w-lg">
              {description}
            </p>

            {/* Bridal Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {highlights.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-ivory/90">
                  <div className="w-5 h-5 rounded-full bg-gold-champagne/20 flex items-center justify-center shrink-0 border border-gold-champagne/40">
                    <Check className="w-3 h-3 text-gold-champagne" />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="pt-6">
              <Link
                to={ctaUrl}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gold-champagne text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-light transition duration-300 shadow-gold-glow"
              >
                <span>{ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Imagery Showcase */}
          <div className="lg:col-span-6">
            <div className="relative rounded-2xl overflow-hidden border border-gold-champagne/30 shadow-2xl aspect-[4/3] sm:aspect-[16/11]">
              <img
                src={imageUrl}
                alt="Kerala Traditional Gold Bridal Jewellery"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-luxury-black/70 backdrop-blur-md border border-gold-champagne/20">
                <p className="font-serif text-lg font-bold text-ivory">Handcrafted Bridal Elegance</p>
                <p className="text-xs text-gold-champagne mt-0.5">
                  Custom weight configurations and bride-specific sizing available.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

