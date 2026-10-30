import React, { useState } from 'react';
import { X, MessageCircle, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Product } from '../../types';
import { api } from '../../api/client';
import { useSettings } from '../../context/SettingsContext';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose, product }) => {
  const { getWhatsAppLink } = useSettings();

  const [formData, setFormData] = useState({
    full_name: '',
    mobile: '',
    email: '',
    category: product?.category_name || '',
    product_reference: product ? `${product.name} (${product.sku})` : '',
    message: product
      ? `I am interested in ${product.name} (Code: ${product.sku}). Please let me know its availability and customization options.`
      : '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

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
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit enquiry. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappText = `Hello Mikhael Gold and Diamonds, my name is ${
    formData.full_name || 'Customer'
  }. I would like to enquire about: ${
    formData.product_reference || 'Jewellery collection'
  }. ${formData.message}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white rounded-xl shadow-2xl max-w-lg w-full overflow-hidden border border-gold-champagne/30 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Header */}
        <div className="bg-luxury-black text-ivory p-6 border-b border-gold-champagne/20 flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl font-bold tracking-wide">Jewellery Enquiry</h3>
            <p className="text-xs text-gold-champagne tracking-wider uppercase mt-1">
              MIKHAEL GOLD AND DIAMONDS LLP
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-ivory/60 hover:text-ivory rounded-full hover:bg-white/10 transition"
            aria-label="Close enquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {success ? (
            <div className="py-8 text-center space-y-4">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto animate-bounce" />
              <h4 className="font-serif text-2xl font-bold text-luxury-black">
                Thank You, {formData.full_name}!
              </h4>
              <p className="text-sm text-brand-muted max-w-xs mx-auto leading-relaxed">
                Your enquiry has been received. Our jewellery advisor in Punnayurkulam will contact
                you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-3 rounded bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Name & Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full px-3.5 py-2.5 rounded border border-brand-border text-sm focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded border border-brand-border text-sm focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne outline-none transition"
                  />
                </div>
              </div>

              {/* Email & Product Ref */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                    Email Address <span className="text-brand-muted font-normal">(Optional)</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded border border-brand-border text-sm focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne outline-none transition"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                    Product Reference
                  </label>
                  <input
                    type="text"
                    value={formData.product_reference}
                    onChange={(e) => setFormData({ ...formData, product_reference: e.target.value })}
                    placeholder="e.g. Kasu Mala or SKU"
                    className="w-full px-3.5 py-2.5 rounded border border-brand-border text-sm bg-ivory/50 focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne outline-none transition"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-brand-text mb-1">
                  Message / Requirements *
                </label>
                <textarea
                  rows={3}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details regarding your preferred weight, occasion, or customisation needs…"
                  className="w-full px-3.5 py-2.5 rounded border border-brand-border text-sm focus:border-gold-champagne focus:ring-1 focus:ring-gold-champagne outline-none resize-none transition"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-3 px-6 rounded-full bg-luxury-black text-gold-champagne hover:bg-gold-champagne hover:text-luxury-black font-semibold text-xs uppercase tracking-widest transition flex items-center justify-center gap-2 border border-gold-champagne/40 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Submitting…' : 'Send Enquiry'}</span>
                </button>

                <a
                  href={getWhatsAppLink(whatsappText)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto py-3 px-5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 font-semibold text-xs uppercase tracking-wider transition flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
