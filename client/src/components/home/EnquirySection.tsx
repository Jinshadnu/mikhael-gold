import React, { useState } from 'react';
import { Send, MessageCircle, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';
import { api } from '../../api/client';
import { useSettings } from '../../context/SettingsContext';

export const EnquirySection: React.FC = () => {
  const { getWhatsAppLink } = useSettings();

  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    category: 'Bridal Jewellery',
    product_reference: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.full_name.trim() || !formData.mobile.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in your name, mobile number, and message.');
      return;
    }

    try {
      setIsSubmitting(true);
      await api.submitEnquiry(formData);
      setSuccess(true);
      setFormData({
        full_name: '',
        mobile: '',
        email: '',
        category: 'Bridal Jewellery',
        product_reference: '',
        message: '',
      });
      setTimeout(() => setSuccess(false), 6000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappMessage = `Hello Mikhael Gold and Diamonds, my name is ${
    formData.full_name || 'Customer'
  }. I would like to enquire about: ${formData.category}. ${formData.message}`;

  return (
    <section id="enquiry" className="py-24 bg-luxury-black text-ivory relative">
      <div className="kasavu-accent"></div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-champagne/15 border border-gold-champagne/40 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
            <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-gold-champagne">
              Personalised Consultation
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Customer Enquiries
          </h2>
          <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-4"></div>
          <p className="mt-4 text-sm text-ivory/70 leading-relaxed">
            Whether choosing a traditional bridal haram or seeking an exclusive diamond solitaire,
            our advisors will assist you with care and transparency.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-luxury-dark rounded-2xl p-6 sm:p-10 border border-gold-champagne/30 shadow-2xl">
          {success ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-16 h-16 text-gold-champagne mx-auto animate-bounce" />
              <h3 className="font-serif text-3xl font-bold text-ivory">Enquiry Received</h3>
              <p className="text-sm text-ivory/70 max-w-md mx-auto leading-relaxed">
                Thank you for contacting Mikhael Gold and Diamonds LLP. Our team in Punnayurkulam
                will reach out to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-500/50 text-red-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Row 1: Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="e.g. Suresh Kumar"
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold-champagne focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98460 00000"
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold-champagne focus:outline-none transition"
                  />
                </div>
              </div>

              {/* Row 2: Email & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                    Email Address <span className="text-ivory/40 font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold-champagne focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                    Jewellery Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm focus:border-gold-champagne focus:outline-none transition"
                  >
                    <option value="Bridal Jewellery">Bridal Jewellery</option>
                    <option value="Gold Necklaces">Gold Necklaces</option>
                    <option value="Gold Chains">Gold Chains</option>
                    <option value="Gold Rings">Gold Rings</option>
                    <option value="Gold Bangles">Gold Bangles</option>
                    <option value="Gold Earrings">Gold Earrings</option>
                    <option value="Diamond Jewellery">Diamond Jewellery</option>
                    <option value="Traditional Jewellery">Traditional Jewellery</option>
                    <option value="Custom Design">Custom Design Request</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Product Reference */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                  Product Reference / SKU{' '}
                  <span className="text-ivory/40 font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.product_reference}
                  onChange={(e) => setFormData({ ...formData, product_reference: e.target.value })}
                  placeholder="e.g. Kasu Mala Heritage Necklace or SKU Code"
                  className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold-champagne focus:outline-none transition"
                />
              </div>

              {/* Row 4: Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-gold-champagne mb-2">
                  Message *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about the occasion, preferred gold purity or weight requirements…"
                  className="w-full px-4 py-3 rounded-lg bg-luxury-black border border-gold-champagne/30 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold-champagne focus:outline-none resize-none transition"
                />
              </div>

              {/* CTA Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-4 px-8 rounded-full bg-gold-champagne text-luxury-black font-semibold text-xs uppercase tracking-[0.2em] hover:bg-gold-light hover:shadow-gold-glow transition flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Enquiry…' : 'Submit Enquiry'}</span>
                </button>

                <a
                  href={getWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-4 px-6 rounded-full border border-emerald-500/70 text-emerald-400 hover:bg-emerald-600 hover:text-white font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Connect on WhatsApp</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};
