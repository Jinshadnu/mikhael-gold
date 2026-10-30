import React from 'react';
import { MapPin, Clock, Phone, MessageCircle, ExternalLink, Navigation } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

export const StoreLocationSection: React.FC = () => {
  const { settings, getWhatsAppLink } = useSettings();

  const showroomAddress =
    settings.address ||
    'Door No. 81 A, Althara, Mahima Complex, P.O. Punnayurkulam, Kerala 679561, India.';
  const mapsUrl = settings.google_maps_url || 'https://maps.app.goo.gl/xW4Z3r6HhwbxB59BA';
  const openingHours =
    settings.opening_hours ||
    'Monday – Saturday: 9:30 AM – 7:30 PM | Sunday: 10:00 AM – 6:00 PM';

  return (
    <section className="py-20 bg-ivory-light border-t border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-dark mb-2">
            Visit Our Showroom
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
            Store Location & Hours
          </h2>
          <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-4"></div>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed">
            Experience our jewellery collections in person. Our advisors in Punnayurkulam are
            honored to welcome you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Details Card */}
          <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-luxury border border-brand-border/80 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold block mb-1">
                  Kerala Showroom
                </span>
                <h3 className="font-serif text-2xl font-bold text-luxury-black">
                  MIKHAEL GOLD AND DIAMONDS LLP
                </h3>
              </div>

              {/* Address */}
              <div className="flex items-start gap-3 text-sm text-brand-text">
                <div className="p-2.5 rounded-full bg-ivory border border-gold-champagne/40 shrink-0 text-gold-dark mt-0.5">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-muted">
                    Showroom Address
                  </h4>
                  <p className="mt-1 leading-relaxed">{showroomAddress}</p>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-3 text-sm text-brand-text">
                <div className="p-2.5 rounded-full bg-ivory border border-gold-champagne/40 shrink-0 text-gold-dark mt-0.5">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-brand-muted">
                    Opening Hours
                  </h4>
                  <p className="mt-1 leading-relaxed">{openingHours}</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-6 border-t border-brand-border/60 flex flex-col sm:flex-row gap-3">
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-full bg-luxury-black text-ivory hover:bg-gold-dark transition font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <Navigation className="w-4 h-4 text-gold-champagne" />
                <span>Get Directions</span>
              </a>

              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>

              {settings.phone && (
                <a
                  href={`tel:${settings.phone}`}
                  className="py-3 px-4 rounded-full border border-brand-border text-luxury-black hover:border-gold-champagne transition flex items-center justify-center text-center"
                  title="Call Showroom"
                >
                  <Phone className="w-4 h-4 text-gold-dark" />
                </a>
              )}
            </div>
          </div>

          {/* Right Embedded Map */}
          <div className="lg:col-span-7 bg-white rounded-2xl overflow-hidden shadow-luxury border border-brand-border/80 min-h-[360px] relative">
            <iframe
              title="Mikhael Gold and Diamonds LLP Google Maps Location"
              src="https://maps.google.com/maps?q=10.6657954,75.9890259&z=15&output=embed"
              className="w-full h-full min-h-[380px] border-0"
              loading="lazy"
              allowFullScreen
            />
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-md text-xs font-semibold text-luxury-black flex items-center gap-1.5 border border-gold-champagne/40">
              <MapPin className="w-3.5 h-3.5 text-gold-dark" />
              <span>Punnayurkulam, Kerala</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

