import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />
      <main className="flex-grow py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-white p-8 sm:p-12 rounded-2xl shadow-sm border border-brand-border">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black mb-6">
            Privacy Policy
          </h1>
          <p className="text-xs text-brand-muted mb-8">
            Last updated: October 2026 • MIKHAEL GOLD AND DIAMONDS LLP
          </p>

          <div className="space-y-6 text-sm text-brand-text/90 leading-relaxed">
            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">1. Overview</h2>
              <p>
                MIKHAEL GOLD AND DIAMONDS LLP ("we", "us", or "our"), having our principal showroom
                at Door No. 81 A, Althara, Mahima Complex, P.O. Punnayurkulam, Kerala 679561, India,
                values your privacy and is committed to protecting your personal data.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                2. Information We Collect
              </h2>
              <p>
                When you submit an enquiry through our website or request custom jewellery
                assistance, we collect your name, contact telephone number, optional email address,
                and details regarding your jewellery preferences.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                3. Purpose of Collection
              </h2>
              <p>
                We use this information exclusively to communicate with you about your requested
                jewellery, schedule showroom viewings, and provide accurate product guidance. We do
                not sell or share your personal data with third-party marketers.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">
                4. Data Security
              </h2>
              <p>
                Our server and database implement strict access controls, encrypted transport
                protocols, and server-side authentication to safeguard customer records.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-xl font-bold text-luxury-black mb-2">5. Contact Us</h2>
              <p>
                For questions regarding your privacy, contact us at contact@mikhaelgold.com or visit
                our showroom in Punnayurkulam, Kerala.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};
