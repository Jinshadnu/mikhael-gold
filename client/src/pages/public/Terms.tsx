import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />
      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#FFFFFF] p-8 sm:p-14 rounded-3xl shadow-sm border border-[#E8D39A]">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#780817] block mb-2">
              Customer Agreement
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#780817] font-normal mb-3">
              Terms &amp; Conditions
            </h1>
            <p className="text-xs text-[#A89A83] mb-8 pb-6 border-b border-[#E8D39A]/40">
              Last updated: October 2026 • MIKHAEL GOLD AND DIAMONDS LLP
            </p>

            <div className="space-y-8 text-sm text-[#70665C] leading-relaxed">
              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">1. Authenticity &amp; Hallmarking</h2>
                <p>
                  Every piece of 22-karat gold jewellery displayed on our website and sold at our showroom is guaranteed
                  to be 100% BIS 916 hallmarked bearing a verified HUID (Hallmark Unique Identification) code.
                  All diamond jewellery is accompanied by legitimate certification verifying cut, color, clarity, and carat weight.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  2. Pricing &amp; Daily Bullion Rates
                </h2>
                <p>
                  Gold jewellery prices reflect the prevailing Kerala Sarafa daily gold market rates on the date and time of
                  formal invoicing at our showroom. The final invoice reflects net gold weight, applicable stone weights,
                  making charges (wastage), and government taxes (GST).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl font-bold text-[#780817] font-normal mb-2">
                  3. Online Showcase &amp; Inquiries
                </h2>
                <p>
                  Our digital catalogue serves as an authoritative preview of available designs and atelier craftsmanship.
                  Final weights, dimensions, and gemstone arrangements can vary slightly due to handcrafted artistry.
                  Submitting an enquiry or booking does not constitute an instantaneous financial transaction until settled
                  in-showroom.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  4. Lifetime Exchange Policy
                </h2>
                <p>
                  MIKHAEL Gold &amp; Diamonds proudly honors lifetime exchange on all our jewellery. Gold is credited at the
                  prevailing 22K market rate at the time of exchange, with diamond valuations subject to authentic grading standards.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  5. Jurisdiction
                </h2>
                <p>
                  Any disputes or legal proceedings arising in connection with sales or services provided by MIKHAEL GOLD
                  AND DIAMONDS LLP shall be subject exclusively to the courts of Chavakkad / Thrissur, Kerala, India.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
