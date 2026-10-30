import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, ZoomIn, Sparkles } from 'lucide-react';
import { api } from '../../api/client';
import { GalleryItem } from '../../types';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ['publicGallery', selectedCategory],
    queryFn: () => api.getGallery(selectedCategory),
  });

  const allCategories = ['All', 'Bridal', 'Necklaces', 'Bangles', 'Diamonds', 'Earrings'];

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
              <span>Showroom & Craft</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
              Jewellery Gallery
            </h1>
            <p className="mt-3 text-sm text-brand-muted">
              A curated photographic showcase of our handcrafted gold creations and diamond brilliance.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
            {allCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-luxury-black text-gold-champagne shadow-sm'
                    : 'bg-white text-brand-muted hover:text-luxury-black border border-brand-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs uppercase tracking-widest text-brand-muted">Loading gallery…</p>
            </div>
          ) : galleryItems.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-xl border border-brand-border">
              <p className="text-sm text-brand-muted">No images found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setActiveLightbox(item)}
                  className="group relative aspect-square rounded-xl overflow-hidden bg-ivory-muted cursor-pointer border border-brand-border/70 hover:border-gold-champagne shadow-sm transition"
                >
                  <img
                    src={item.image_url}
                    alt={item.alt_text || item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-luxury-black/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-ivory">
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-base font-semibold">{item.title}</p>
                      <ZoomIn className="w-4 h-4 text-gold-champagne shrink-0 ml-2" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-gold-champagne mt-0.5">
                      {item.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveLightbox(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveLightbox(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white rounded-full transition"
              aria-label="Close lightbox"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={activeLightbox.image_url}
              alt={activeLightbox.title}
              className="max-h-[80vh] w-auto object-contain rounded-lg shadow-2xl border border-gold-champagne/30"
            />
            <div className="mt-4 text-center text-ivory">
              <h4 className="font-serif text-xl font-bold">{activeLightbox.title}</h4>
              <p className="text-xs text-gold-champagne tracking-wider uppercase mt-1">
                {activeLightbox.category}
              </p>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

