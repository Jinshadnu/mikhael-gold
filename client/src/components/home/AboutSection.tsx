import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, HeartHandshake, ArrowRight } from 'lucide-react';
import { HomepageSections } from '../../types';

interface AboutSectionProps {
  data?: HomepageSections['about_section'];
}

export const AboutSection: React.FC<AboutSectionProps> = ({ data }) => {
  const heading = data?.heading || 'Crafted with Elegance. Chosen with Love.';
  const subheading = data?.subheading || 'Welcome to Mikhael Gold and Diamonds LLP';
  const paragraph1 =
    data?.paragraph1 ||
    'Located at Mahima Complex, Punnayurkulam, Mikhael Gold and Diamonds LLP brings you authentic Kerala gold craftsmanship and certified diamond creations.';
  const paragraph2 =
    data?.paragraph2 ||
    'Every piece in our showroom is selected with care, honoring enduring purity, transparent ethics, and the timeless heritage of South Indian jewellery artistry.';
  const highlight =
    data?.highlight || 'BIS Hallmarked 916 Pure Gold & Certified Natural Diamonds';
  const imageUrl =
    data?.image_url ||
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop';

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Imagery with Elegant Offset Frame */}
          <div className="relative">
            <div className="relative z-10 aspect-[4/5] rounded-xl overflow-hidden shadow-luxury border border-brand-border">
              <img
                src={imageUrl}
                alt="Mikhael Gold & Diamonds Jewellery Craftsmanship"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Background Decorative Gold Frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full rounded-xl border-2 border-gold-champagne/40 z-0 hidden sm:block"></div>

            {/* Float Highlight Badge */}
            <div className="absolute -bottom-6 left-6 z-20 bg-luxury-black text-ivory p-4 rounded-lg shadow-xl border border-gold-champagne/40 max-w-xs">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-gold-champagne shrink-0" />
                <div>
                  <p className="text-xs font-serif font-bold text-ivory leading-snug">{highlight}</p>
                  <p className="text-[10px] text-gold-champagne uppercase tracking-widest mt-0.5">
                    Guaranteed Purity
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Content */}
          <div className="lg:pl-6 space-y-6">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-2">
                {subheading}
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight leading-tight">
                {heading}
              </h2>
              <div className="w-16 h-0.5 bg-gold-champagne mt-4"></div>
            </div>

            <p className="text-base text-brand-text/80 leading-relaxed">{paragraph1}</p>
            <p className="text-base text-brand-muted leading-relaxed">{paragraph2}</p>

            {/* Feature Points */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <Award className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-luxury-black">Hallmark Certification</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Every gold item carries verifiable BIS 916 hallmarking.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-gold-dark shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-luxury-black">Warm Kerala Hospitality</h4>
                  <p className="text-xs text-brand-muted mt-0.5">
                    Attentive, personalised guidance for you and your family.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-luxury-black text-ivory text-xs uppercase tracking-widest font-semibold hover:bg-gold-dark transition"
              >
                <span>Read Our Heritage Story</span>
                <ArrowRight className="w-3.5 h-3.5 text-gold-champagne" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

