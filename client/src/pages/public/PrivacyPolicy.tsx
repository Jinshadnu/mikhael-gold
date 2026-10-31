import React from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />
      <main className="flex-grow pt-36 pb-24">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <div className="bg-[#FFFFFF] p-8 sm:p-14 rounded-3xl shadow-sm border border-[#E8D39A]">
            <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[#780817] block mb-2">
              Legal &amp; Compliance
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#780817] font-normal mb-3">
              Privacy Policy
            </h1>
            <p className="text-xs text-[#A89A83] mb-8 pb-6 border-b border-[#E8D39A]/40">
              Last updated: October 2026 • MIKHAEL GOLD AND DIAMONDS LLP
            </p>

            <div className="space-y-8 text-sm text-[#70665C] leading-relaxed">
              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">1. Overview</h2>
                <p>
                  MIKHAEL GOLD AND DIAMONDS LLP ("we", "us", or "our"), having our registered showroom
                  at Door No. 81 A, Althara, Mahima Complex, P.O. Punnayurkulam, Thrissur District, Kerala 679561, India,
                  values your privacy and is dedicated to preserving the absolute confidentiality of your personal data.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  2. Information We Collect
                </h2>
                <p>
                  When you submit an appointment enquiry, contact our jewellery concierge, or request bespoke
                  craftsmanship consultations, we may collect your name, phone number, email address, and specific
                  jewellery preferences (such as weight, karatage, or bridal set selections).
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  3. Purpose of Collection
                </h2>
                <p>
                  We utilize your information solely to deliver customized jewellery consultations, coordinate private
                  showroom visits at Punnayurkulam, and provide transparent rate quotations. We do not sell, rent, or lease
                  your personal records to third-party commercial brokers.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  4. Data Security &amp; Retention
                </h2>
                <p>
                  We employ rigorous administrative and digital safeguards to preserve the confidentiality of all customer
                  communications. Customer records are maintained only for as long as required to service your enquiries
                  or comply with statutory BIS hallmarking and tax regulations.
                </p>
              </section>

              <section>
                <h2 className="font-serif text-xl text-[#780817] font-normal mb-2">
                  5. Contact Our Privacy Officer
                </h2>
                <p>
                  If you have inquiries regarding how your data is handled, you may reach our compliance desk at{' '}
                  <strong className="text-[#780817] font-medium">contact@mikhaelgold.com</strong> or visit our Punnayurkulam showroom.
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
