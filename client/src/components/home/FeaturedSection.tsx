import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../../types';
import { ProductCard } from '../common/ProductCard';

interface FeaturedSectionProps {
  products: Product[];
  onEnquire: (product: Product) => void;
}

export const FeaturedSection: React.FC<FeaturedSectionProps> = ({ products, onEnquire }) => {
  if (!products || products.length === 0) return null;

  return (
    <section className="py-20 bg-ivory-light border-y border-brand-border/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading with "View All" Link */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
              <span>Handpicked Creations</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
              Featured Collections
            </h2>
          </div>

          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-luxury-black hover:text-gold-dark border-b border-luxury-black hover:border-gold-dark pb-1 transition w-fit"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} onEnquire={onEnquire} />
          ))}
        </div>
      </div>
    </section>
  );
};
