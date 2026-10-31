import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { api } from '../../api/client';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'General Enquiry',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) {
      setErrorMessage('Please provide your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await api.submitEnquiry({
        full_name: formData.name,
        mobile: formData.phone,
        email: formData.email,
        category: formData.category,
        message: formData.message,
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'General Enquiry',
        message: '',
      });
    } catch (err: any) {
      setErrorMessage(err?.response?.data?.message || 'Unable to submit enquiry. Please call us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />

      <main className="flex-grow pt-32 lg:pt-36">
        {/* Banner Section */}
        <div className="relative py-20 bg-gradient-to-b from-[#FAF8F2] via-[#F3EDE1] to-[#FAF8F2] text-center border-b border-[#E8D39A]/40">
          <div className="max-w-3xl mx-auto px-6">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] font-semibold text-[#780817] mb-3">
              <span className="w-8 h-px bg-[#D4AF37]"></span>
              Personal Jewellery Concierge
              <span className="w-8 h-px bg-[#D4AF37]"></span>
            </span>
            <h1 className="font-serif text-4xl sm:text-6xl font-normal text-[#780817] tracking-tight">
              Contact &amp; Showroom Visit
            </h1>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-5"></div>
            <p className="mt-5 text-base text-[#70665C] leading-relaxed max-w-xl mx-auto font-light">
              We welcome you to experience certified pure gold and exquisite diamond collections at our flagship
              showroom in Punnayurkulam, Kerala.
            </p>
          </div>
        </div>

        {/* Contact Grid & Form */}
        <section className="py-20 bg-[#FAF8F2]">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
              
              {/* Showroom Information */}
              <div className="lg:col-span-5 space-y-8">
                <div>
                  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#780817] block mb-2">
                    Showroom Address
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl font-normal text-[#780817]">
                    MIKHAEL Gold &amp; Diamonds LLP
                  </h2>
                  <p className="mt-2 text-sm text-[#70665C]">
                    Mahima Complex, Punnayurkulam, Thrissur District, Kerala — 679561
                  </p>
                </div>

                {/* Details Cards */}
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F2] border border-[#D4AF37] flex items-center justify-center shrink-0">
                      <MapPin className="w-5 h-5 text-[#780817]" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#780817]">Showroom Location</h3>
                      <p className="text-sm text-[#292323] mt-1">Mahima Complex, Punnayurkulam</p>
                      <p className="text-xs text-[#70665C]">Thrissur District, Kerala 679561, India</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F2] border border-[#D4AF37] flex items-center justify-center shrink-0">
                      <Phone className="w-5 h-5 text-[#780817]" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#780817]">Direct Telephones</h3>
                      <p className="text-sm text-[#292323] mt-1 font-medium">+91 94471 24660</p>
                      <p className="text-xs text-[#70665C]">Available during showroom operating hours</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F2] border border-[#D4AF37] flex items-center justify-center shrink-0">
                      <Clock className="w-5 h-5 text-[#780817]" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#780817]">Showroom Timings</h3>
                      <p className="text-sm text-[#292323] mt-1">Monday – Saturday: 9:30 AM – 7:30 PM</p>
                      <p className="text-xs text-[#70665C]">Sunday: 10:00 AM – 6:00 PM</p>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-[#FFFFFF] border border-[#E8D39A]/60 shadow-sm flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#FAF8F2] border border-[#D4AF37] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-[#780817]" />
                    </div>
                    <div>
                      <h3 className="text-xs uppercase tracking-wider font-semibold text-[#780817]">Email Concierge</h3>
                      <p className="text-sm text-[#292323] mt-1 font-medium">contact@mikhaelgold.com</p>
                      <p className="text-xs text-[#70665C]">Corporate, wholesale &amp; custom jewellery enquiries</p>
                    </div>
                  </div>
                </div>

                {/* WhatsApp Quick CTA */}
                <a
                  href="https://wa.me/919447124660?text=Hello%20Mikhael%20Gold,%20I%20would%20like%20to%20enquire%20about%20your%20jewellery%20collection."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  Connect With Us On WhatsApp
                </a>
              </div>

              {/* Consultation / Viewing Form */}
              <div className="lg:col-span-7">
                <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFFFF] border border-[#E8D39A] shadow-lg">
                  <span className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#780817] block mb-2">
                    Private Appointment
                  </span>
                  <h2 className="font-serif text-2xl sm:text-3xl text-[#780817] font-normal">
                    Schedule a Consultation
                  </h2>
                  <p className="text-xs sm:text-sm text-[#70665C] mt-2 mb-8 leading-relaxed">
                    Leave your contact details and preferred jewellery interests. Our jewellery consultant will
                    reach out to arrange your bespoke private viewing in our bridal suite.
                  </p>

                  {isSuccess ? (
                    <div className="p-8 rounded-2xl bg-[#FAF8F2] border border-[#D4AF37] text-center space-y-4">
                      <CheckCircle2 className="w-12 h-12 text-[#780817] mx-auto" />
                      <h3 className="font-serif text-2xl text-[#780817]">Thank You For Your Enquiry</h3>
                      <p className="text-sm text-[#70665C] max-w-md mx-auto">
                        Your appointment request has been safely received. Our Punnayurkulam showroom team will
                        reach out promptly to confirm your visit.
                      </p>
                      <button
                        onClick={() => setIsSuccess(false)}
                        className="mt-4 px-6 py-2.5 rounded-full border border-[#780817] text-[#780817] text-xs font-semibold uppercase tracking-wider hover:bg-[#780817] hover:text-white transition"
                      >
                        Send Another Enquiry
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {errorMessage && (
                        <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs border border-red-200">
                          {errorMessage}
                        </div>
                      )}

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292323] mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Sreedevi Menon"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8D39A] bg-[#FAF8F2] text-[#292323] text-sm focus:border-[#780817] focus:ring-1 focus:ring-[#780817] outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292323] mb-2">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 98765 43210"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8D39A] bg-[#FAF8F2] text-[#292323] text-sm focus:border-[#780817] focus:ring-1 focus:ring-[#780817] outline-none transition"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292323] mb-2">
                            Email Address (Optional)
                          </label>
                          <input
                            type="email"
                            placeholder="e.g. yourname@domain.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8D39A] bg-[#FAF8F2] text-[#292323] text-sm focus:border-[#780817] focus:ring-1 focus:ring-[#780817] outline-none transition"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292323] mb-2">
                            Category of Interest
                          </label>
                          <select
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-[#E8D39A] bg-[#FAF8F2] text-[#292323] text-sm focus:border-[#780817] focus:ring-1 focus:ring-[#780817] outline-none transition"
                          >
                            <option value="Bridal Jewellery Suite">Bridal Jewellery Suite</option>
                            <option value="Gold Necklaces & Chains">Gold Necklaces &amp; Chains</option>
                            <option value="Diamond Solitaire & Rings">Diamond Solitaire &amp; Rings</option>
                            <option value="Gold Bangles & Kadas">Gold Bangles &amp; Kadas</option>
                            <option value="Gold Mint Coins & Bullion">Gold Mint Coins &amp; Bullion</option>
                            <option value="General Enquiry">General Consultation</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#292323] mb-2">
                          Your Message or Preferred Appointment Date
                        </label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about your requirements, specific designs, or preferred timing for a private showroom visit..."
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-[#E8D39A] bg-[#FAF8F2] text-[#292323] text-sm focus:border-[#780817] focus:ring-1 focus:ring-[#780817] outline-none transition resize-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-[#780817] hover:bg-[#530510] text-[#FAF8F2] text-xs font-semibold uppercase tracking-[0.25em] transition shadow-md disabled:opacity-50"
                      >
                        <Send className="w-4 h-4" />
                        {isSubmitting ? 'Submitting Request...' : 'Submit Consultation Request'}
                      </button>
                    </form>
                  )}
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Embedded Showroom Map Section */}
        <section className="py-16 bg-[#F3EDE1] border-t border-[#E8D39A]/50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center max-w-xl mx-auto mb-10">
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#780817] block mb-1">
                Directions
              </span>
              <h2 className="font-serif text-3xl text-[#780817] font-normal">
                How To Reach Us
              </h2>
              <p className="text-xs text-[#70665C] mt-2">
                Situated prominently on the main junction at Mahima Complex, Punnayurkulam with dedicated customer parking.
              </p>
            </div>

            <div className="aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#E8D39A] shadow-md bg-white">
              <iframe
                title="Mikhael Gold and Diamonds Punnayurkulam Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.936605051918!2d75.9818815!3d10.6698662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7954a2a472a15%3A0xc3c5f850e0513904!2sPunnayurkulam%2C%20Kerala!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};
