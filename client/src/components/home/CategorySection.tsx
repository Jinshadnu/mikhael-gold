import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Category } from '../../types';

interface CategorySectionProps {
  categories: Category[];
}

export const CategorySection: React.FC<CategorySectionProps> = ({ categories }) => {
  if (!categories || categories.length === 0) return null;

  return (
    <section className="py-24 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-[11px] uppercase tracking-[0.34em] font-semibold text-gold-dark mb-2">
            Curated For Every Milestone
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
            Jewellery Categories
          </h2>
          <div className="w-16 h-0.5 bg-gold-champagne mx-auto mt-4"></div>
          <p className="mt-4 text-sm text-brand-muted leading-relaxed">
            Explore our curated collections of 22K hallmarked gold, brilliant certified diamonds,
            and traditional Kerala wedding heirlooms.
          </p>
        </div>

        {/* Categories Grid (2 cols mobile, 3 cols tablet, 4 cols desktop) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              to={`/products?category=${cat.slug}`}
              className="group relative bg-luxury-black rounded-xl overflow-hidden border border-brand-border/80 hover:border-gold-champagne/80 shadow-subtle hover:shadow-luxury transition-all duration-500 flex flex-col justify-between"
            >
              <div className="aspect-[4/5] w-full overflow-hidden bg-ivory-muted relative">
                <img
                  src={
                    cat.image_url ||
                    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop'
                  }
                  alt={cat.name}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/90 via-luxury-black/35 to-transparent"></div>

                <div className="absolute bottom-4 left-4 right-4 text-ivory">
                  <h3 className="font-serif text-lg sm:text-2xl font-bold leading-tight group-hover:text-gold-light transition duration-300">
                    {cat.name}
                  </h3>
                  {cat.description && (
                    <p className="text-[11px] text-ivory/70 line-clamp-2 mt-1 hidden sm:block leading-relaxed">
                      {cat.description}
                    </p>
                  )}
                  <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-semibold tracking-wider uppercase text-gold-champagne">
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
