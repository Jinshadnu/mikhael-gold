import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Heart, Sparkles, MapPin, ArrowRight, Award, Clock, Gem } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />

      <main className="flex-grow pt-32 lg:pt-36">
        {/* Hero Section */}
        <div className="relative py-24 bg-gradient-to-b from-[#FAF8F2] via-[#F3EDE1] to-[#FAF8F2] text-center overflow-hidden border-b border-[#E8D39A]/40">
          <div className="relative z-10 max-w-4xl mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] font-semibold text-[#780817] mb-3">
              <span className="w-8 h-px bg-[#D4AF37]"></span>
              Heritage &amp; Artistry
              <span className="w-8 h-px bg-[#D4AF37]"></span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#780817] tracking-tight">
              Crafting Elegance, Creating Memories
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-6"></div>
            <p className="mt-6 text-base sm:text-lg text-[#70665C] leading-relaxed max-w-2xl mx-auto font-light">
              Founded on unyielding integrity and the timeless traditions of Kerala goldsmithing,
              <strong className="text-[#292323] font-medium"> MIKHAEL GOLD AND DIAMONDS LLP</strong> brings
              exceptional purity, certified diamonds, and bespoke bridal suites to families across generations.
            </p>
          </div>
        </div>

        {/* Narrative Section */}
        <section className="py-20 bg-[#FFFFFF]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#780817] mb-2 block">
                  Our Showroom &amp; Roots
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#780817] leading-tight">
                  A Destination For Cherished Celebrations
                </h2>
                <div className="w-16 h-0.5 bg-[#D4AF37] my-6"></div>
                <div className="space-y-4 text-sm sm:text-base text-[#70665C] leading-relaxed">
                  <p>
                    Nestled in the historic cultural precinct of Punnayurkulam, Thrissur district, Kerala,
                    Mikhael Gold and Diamonds LLP was established with a singular vision: to honor family
                    milestones with jewellery of unmatched artistic distinction and verified purity.
                  </p>
                  <p>
                    From sacred heritage suites — including the revered Lakshmi Kasu Mala, hand-set Palakka Mala,
                    and auspicious Nagapadam Thaali — to contemporary brilliant-cut solitaire rings and featherlight
                    daily gold chains, every single piece in our collection is curated to endure through centuries.
                  </p>
                  <p>
                    Our artisans follow centuries of master karigar techniques, fusing timeless Malayalam aesthetics
                    with state-of-the-art precision casting and laser hallmarking technology.
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-6 pt-4 border-t border-[#E8D39A]/40">
                  <div>
                    <p className="font-serif text-3xl font-normal text-[#780817]">39+</p>
                    <p className="text-xs uppercase tracking-wider text-[#A89A83] mt-1">Years Karigar Heritage</p>
                  </div>
                  <div className="w-px h-12 bg-[#E8D39A]/60"></div>
                  <div>
                    <p className="font-serif text-3xl font-normal text-[#780817]">100%</p>
                    <p className="text-xs uppercase tracking-wider text-[#A89A83] mt-1">BIS 916 HUID Hallmarked</p>
                  </div>
                  <div className="w-px h-12 bg-[#E8D39A]/60"></div>
                  <div>
                    <p className="font-serif text-3xl font-normal text-[#780817]">12,000+</p>
                    <p className="text-xs uppercase tracking-wider text-[#A89A83] mt-1">Bridal Celebrations</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-[#E8D39A]">
                  <img
                    src="/img/craft.png"
                    alt="Master goldsmith bench at Mikhael Gold"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-[#FAF8F2] p-5 rounded-2xl border border-[#E8D39A] shadow-lg max-w-xs hidden sm:block">
                  <p className="font-serif text-base text-[#780817] font-semibold">Atelier Punnayurkulam</p>
                  <p className="text-xs text-[#70665C] mt-1">Where master goldsmiths shape heirloom bridal suites with reverence and devotion.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Four Pillars of Trust */}
        <section className="py-24 bg-[#F3EDE1] border-y border-[#E8D39A]/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#780817] mb-2 block">
                Guiding Principles
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#780817]">
                The MIKHAEL Promise
              </h2>
              <div className="w-16 h-0.5 bg-[#D4AF37] mx-auto mt-4"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm space-y-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center border border-[#D4AF37]">
                  <ShieldCheck className="w-6 h-6 text-[#780817]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#780817]">Certified Purity</h3>
                <p className="text-xs text-[#70665C] leading-relaxed">
                  Every gram of 22K gold carries the government-certified BIS 916 HUID hallmark. Our diamonds are internationally certified for color, clarity, cut, and carat.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm space-y-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center border border-[#D4AF37]">
                  <Sparkles className="w-6 h-6 text-[#780817]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#780817]">Master Craftsmanship</h3>
                <p className="text-xs text-[#70665C] leading-relaxed">
                  Decades of karigar heritage ensure that our intricate filigree, nakshi repoussé, and stone setting meet the highest standards of international luxury.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm space-y-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center border border-[#D4AF37]">
                  <Award className="w-6 h-6 text-[#780817]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#780817]">Transparent Pricing</h3>
                <p className="text-xs text-[#70665C] leading-relaxed">
                  Complete clarity in daily gold rates, exact net weights, stone deductions, and competitive making charges with zero hidden markups.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm space-y-4 hover:shadow-md transition">
                <div className="w-12 h-12 rounded-full bg-[#FAF8F2] flex items-center justify-center border border-[#D4AF37]">
                  <Gem className="w-6 h-6 text-[#780817]" />
                </div>
                <h3 className="font-serif text-xl font-normal text-[#780817]">Lifetime Exchange</h3>
                <p className="text-xs text-[#70665C] leading-relaxed">
                  Permanent buyback and upgrade guarantees on gold value and certified diamonds across any of our collections at all times.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Showroom Concierge & Visit Section */}
        <section className="py-20 bg-[#FAF8F2]">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#780817] mb-2 block">
              Experience MIKHAEL
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#780817] font-normal">
              Visit Our Punnayurkulam Showroom
            </h2>
            <p className="mt-4 text-sm text-[#70665C] max-w-xl mx-auto leading-relaxed">
              Mahima Complex, Punnayurkulam, Thrissur, Kerala — 679561.
              Open Monday through Saturday, 9:30 AM to 7:30 PM.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to="/contact"
                className="px-8 py-3.5 rounded-full bg-[#780817] text-[#FAF8F2] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#530510] transition-all shadow-md"
              >
                Plan Your Showroom Visit
              </Link>
              <Link
                to="/products"
                className="px-8 py-3.5 rounded-full border border-[#D4AF37] text-[#780817] text-xs font-semibold uppercase tracking-[0.2em] hover:bg-[#FFFFFF] transition-all"
              >
                Explore Collections
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
