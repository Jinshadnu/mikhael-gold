import React, { useState } from 'react';
import { X, ZoomIn, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GalleryItem } from '../../types';

interface GallerySectionProps {
  items: GalleryItem[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ items }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeLightboxImage, setActiveLightboxImage] = useState<GalleryItem | null>(null);

  if (!items || items.length === 0) return null;

  const categories = ['All', ...Array.from(new Set(items.map((i) => i.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  return (
    <section className="py-20 bg-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] font-semibold text-gold-dark mb-2">
              Visual Elegance
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
              Jewellery Gallery
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-luxury-black text-gold-champagne shadow-sm'
                    : 'bg-white text-brand-muted hover:text-luxury-black border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredItems.slice(0, 8).map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveLightboxImage(item)}
              className="group relative aspect-square rounded-lg overflow-hidden bg-ivory-muted cursor-pointer border border-brand-border/60 hover:border-gold-champagne/60 shadow-sm transition"
            >
              <img
                src={item.image_url}
                alt={item.alt_text || item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-luxury-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-ivory">
                <div className="flex items-center justify-between">
                  <p className="font-serif text-sm font-semibold truncate">{item.title}</p>
                  <ZoomIn className="w-4 h-4 text-gold-champagne shrink-0 ml-2" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-gold-champagne/80">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gallery CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-luxury-black text-luxury-black hover:bg-luxury-black hover:text-ivory text-xs uppercase tracking-widest font-semibold transition"
          >
            <span>View Full Showroom Gallery</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeLightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full transition"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightboxImage.image_url}
              alt={activeLightboxImage.title}
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-gold-champagne/30"
            />
            <div className="mt-4 text-center text-ivory">
              <h4 className="font-serif text-lg font-bold">{activeLightboxImage.title}</h4>
              <p className="text-xs text-gold-champagne tracking-wider uppercase mt-1">
                {activeLightboxImage.category}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
