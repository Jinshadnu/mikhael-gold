import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const Terms: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-brand-border">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mb-6">
            Terms & Conditions
          </h1>
          <p className="text-xs text-brand-muted mb-8">
            Last updated: October 2026 • MIKHAEL GOLD AND DIAMONDS LLP
          </p>

          <div className="space-y-6 text-sm text-brand-text/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">1. Introduction</h2>
              <p>
                Welcome to the official website of MIKHAEL GOLD AND DIAMONDS LLP. By accessing or
                browsing our catalogue, you agree to comply with and be bound by these terms.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                2. Product Representation & Pricing
              </h2>
              <p>
                All jewellery photographs and specifications represent authentic showroom pieces.
                Because daily gold rates and diamond markets fluctuate, prices published or quoted
                are indicative and subject to prevailing market rates at the time of showroom
                purchase or order finalization.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                3. Purity & Hallmarking
              </h2>
              <p>
                All 22 Karat gold articles sold by Mikhael Gold and Diamonds LLP bear genuine BIS
                hallmarking (916) in compliance with Bureau of Indian Standards regulations.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                4. Intellectual Property
              </h2>
              <p>
                The name "MIKHAEL GOLD AND DIAMONDS LLP", brand logos, and original media content
                are the intellectual property of Mikhael Gold and Diamonds LLP.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
