import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, MapPin, ArrowRight } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { StoreLocationSection } from '../../components/home/StoreLocationSection';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative py-24 bg-luxury-black text-ivory text-center overflow-hidden">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#C8A45D_1px,transparent_1px)] [background-size:24px_24px]"></div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-champagne block mb-3">
              Heritage & Craftsmanship
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
              About Mikhael Gold
            </h1>
            <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-6"></div>
            <p className="mt-6 text-base sm:text-lg text-ivory/80 leading-relaxed">
              Crafted with elegance. Chosen with love. Mikhael Gold and Diamonds LLP brings
              exceptional jewellery artistry and certified purity to Kerala.
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 kasavu-accent"></div>
        </div>

        {/* Narrative Section */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-2 block">
                  Our Showroom & Roots
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black leading-tight">
                  A Destination for Cherished Celebrations
                </h2>
                <div className="w-12 h-0.5 bg-gold-champagne my-4"></div>
                <p className="text-sm text-brand-muted leading-relaxed mb-4">
                  Located at Mahima Complex, Punnayurkulam in Thrissur district, Kerala, Mikhael
                  Gold and Diamonds LLP was founded to provide families with transparent,
                  hallmarked, and exquisitely crafted jewellery.
                </p>
                <p className="text-sm text-brand-muted leading-relaxed">
                  From traditional bridal ornaments like the Kasu Mala, Palakka Mala, and
                  Nagapadam Thaali to contemporary solitaire diamond rings and modern lightweight
                  chains, every design in our showroom is selected for enduring grace and
                  authenticity.
                </p>
              </div>

              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-luxury border border-brand-border">
                <img
                  src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1000&auto=format&fit=crop"
                  alt="Kerala Traditional Gold Craftsmanship"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Our Pillars */}
        <section className="py-20 bg-ivory-light border-y border-brand-border/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-dark mb-2 block">
                What Guides Us
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black">
                Our Core Principles
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-xl bg-white border border-brand-border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center border border-gold-champagne/40">
                  <ShieldCheck className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="font-serif text-xl font-bold text-luxury-black">Certified Purity</h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  All 22K gold jewellery adheres to strict BIS 916 hallmarking. Our diamonds are
                  thoroughly verified for cut, clarity, and authenticity.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white border border-brand-border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center border border-gold-champagne/40">
                  <Sparkles className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="font-serif text-xl font-bold text-luxury-black">
                  Artisanal Integrity
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  We collaborate with gifted master goldsmiths across Kerala to preserve centuries-old
                  temple repoussé, antique filigree, and royal stone settings.
                </p>
              </div>

              <div className="p-8 rounded-xl bg-white border border-brand-border shadow-sm space-y-3">
                <div className="w-10 h-10 rounded-full bg-ivory flex items-center justify-center border border-gold-champagne/40">
                  <Heart className="w-5 h-5 text-gold-dark" />
                </div>
                <h3 className="font-serif text-xl font-bold text-luxury-black">
                  Transparent Trust
                </h3>
                <p className="text-xs text-brand-muted leading-relaxed">
                  Full clarity in gross weights, net weights, stone weights, and making charges.
                  No hidden pricing formulas or exaggerated claims.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Store Location */}
        <StoreLocationSection />
      </main>

      <Footer />
    </div>
  );
};

