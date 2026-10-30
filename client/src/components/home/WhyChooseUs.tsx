import React from 'react';
import { Sparkles, HeartHandshake, ShieldCheck, Crown } from 'lucide-react';
import { HomepageSections } from '../../types';

interface WhyChooseUsProps {
  data?: HomepageSections['why_choose_us'];
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ data }) => {
  const defaultItems = [
    {
      title: 'Elegant Jewellery Collections',
      description: 'Carefully curated gold, diamond, and antique bridal collections crafted for unforgettable moments.',
      icon: 'Sparkles',
    },
    {
      title: 'Personalised Customer Assistance',
      description: 'Dedicated one-on-one attention from experienced jewellery advisors to guide your selection.',
      icon: 'HeartHandshake',
    },
    {
      title: 'Gold and Diamond Selection',
      description: 'Strict 916 BIS hallmark compliance on gold and rigorously certified genuine diamonds.',
      icon: 'ShieldCheck',
    },
    {
      title: 'Special Occasion Jewellery',
      description: 'Bespoke sets designed specifically for weddings, betrothals, and traditional celebrations.',
      icon: 'Crown',
    },
  ];

  const items = data?.items && data.items.length > 0 ? data.items : defaultItems;

  const getIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-gold-champagne" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-6 h-6 text-gold-champagne" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-6 h-6 text-gold-champagne" />;
      case 'Crown':
      default:
        return <Crown className="w-6 h-6 text-gold-champagne" />;
    }
  };

  return (
    <section className="py-20 bg-luxury-black text-ivory relative">
      <div className="kasavu-accent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-champagne mb-2">
            The Mikhael Promise
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight">
            Why Choose Us
          </h2>
          <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-4"></div>
          <p className="mt-4 text-sm text-ivory/70 leading-relaxed">
            Built on transparency, certified purity, and timeless South Indian artistry in
            Punnayurkulam.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-luxury-dark border border-gold-champagne/20 hover:border-gold-champagne/60 transition-all duration-300 group hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-full border border-gold-champagne/40 bg-luxury-black flex items-center justify-center mb-6 group-hover:border-gold-champagne transition">
                {getIcon(item.icon)}
              </div>
              <h3 className="font-serif text-xl font-bold text-ivory mb-2 group-hover:text-gold-champagne transition">
                {item.title}
              </h3>
              <p className="text-xs text-ivory/70 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
