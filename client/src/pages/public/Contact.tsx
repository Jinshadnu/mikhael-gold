import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { StoreLocationSection } from '../../components/home/StoreLocationSection';
import { EnquirySection } from '../../components/home/EnquirySection';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-grow">
        {/* Banner */}
        <div className="relative py-20 bg-luxury-black text-ivory text-center">
          <div className="max-w-2xl mx-auto px-4">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-champagne block mb-2">
              We Look Forward To Welcoming You
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight">
              Contact & Visit Showroom
            </h1>
            <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-4"></div>
            <p className="mt-4 text-sm text-ivory/80 leading-relaxed">
              Visit our showroom at Mahima Complex, Punnayurkulam or get in touch for jewellery
              consultations, bridal viewings, and custom requests.
            </p>
          </div>
          <div className="absolute bottom-0 inset-x-0 kasavu-accent"></div>
        </div>

        {/* Location & Embedded Map */}
        <StoreLocationSection />

        {/* Enquiry Form */}
        <EnquirySection />
      </main>

      <Footer />
    </div>
  );
};
