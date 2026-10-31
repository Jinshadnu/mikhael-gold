import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { X, ZoomIn, Sparkles, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { api } from '../../api/client';
import { GalleryItem } from '../../types';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { assetUrl } from '../../utils/assets';

export const Gallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeLightbox, setActiveLightbox] = useState<GalleryItem | null>(null);

  const { data: galleryItems = [], isLoading } = useQuery({
    queryKey: ['publicGallery', selectedCategory],
    queryFn: () => api.getGallery(selectedCategory),
  });

  const allCategories = ['All', 'Bridal Suite', 'Necklaces', 'Bangles', 'Diamonds', 'Craftsmanship'];

  const fallbackGallery: GalleryItem[] = [
    {
      id: 1,
      title: 'Lakshmi Kasu Mala Crafting',
      image_url: assetUrl('/img/kasu-mala.png'),
      category: 'Necklaces',
      alt_text: 'Hand die-struck Lakshmi gold coins strung on delicate bead chain in pure 22K hallmarked gold.',
      display_order: 1,
      is_visible: 1,
    },
    {
      id: 2,
      title: 'Palakka Mala Emerald Setting',
      image_url: assetUrl('/img/palakka-mala.png'),
      category: 'Necklaces',
      alt_text: 'Traditional Kerala cabochon glass and synthetic emerald setting in 22K gold.',
      display_order: 2,
      is_visible: 1,
    },
    {
      id: 3,
      title: 'Nagapadam Thaali Heritage',
      image_url: assetUrl('/img/nagapadam.png'),
      category: 'Necklaces',
      alt_text: 'Sacred serpent-hood shaped bridal pendant worn in royal traditional Kerala wedding suites.',
      display_order: 3,
      is_visible: 1,
    },
    {
      id: 4,
      title: 'Temple Jhumkas and Bells',
      image_url: assetUrl('/img/jhumka.png'),
      category: 'Craftsmanship',
      alt_text: 'Floral stud with tiered dome and hanging gold bells tuned by master karigars.',
      display_order: 4,
      is_visible: 1,
    },
    {
      id: 5,
      title: 'Imperial Kerala Bangles',
      image_url: assetUrl('/img/bangles.png'),
      category: 'Bangles',
      alt_text: 'Intricate filigree and repoussé craftsmanship handed down across three generations.',
      display_order: 5,
      is_visible: 1,
    },
    {
      id: 6,
      title: 'Master Goldsmith Atelier',
      image_url: assetUrl('/img/craft.png'),
      category: 'Craftsmanship',
      alt_text: 'Three generations at the same workbench shaping timeless heirlooms at Punnayurkulam.',
      display_order: 6,
      is_visible: 1,
    },
    {
      id: 7,
      title: 'Nila Brilliant Solitaire Diamond',
      image_url: assetUrl('/img/ring.png'),
      category: 'Diamonds',
      alt_text: 'Certified VVS-EF brilliant cut solitaire hand-set in 18K white and rose gold.',
      display_order: 7,
      is_visible: 1,
    },
    {
      id: 8,
      title: 'Complete Bridal Wedding Trousseau',
      image_url: assetUrl('/img/hero.png'),
      category: 'Bridal Suite',
      alt_text: 'A majestic multi-tiered Kerala bridal set featuring Kasu Mala, Palakka, and waist Odiyanam.',
      display_order: 8,
      is_visible: 1,
    },
  ];

  const itemsToDisplay = galleryItems.length > 0 ? galleryItems : fallbackGallery;

  const filteredItems = selectedCategory === 'All'
    ? itemsToDisplay
    : itemsToDisplay.filter(
        (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />

      <main className="pt-36 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          {/* Header intro */}
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-[0.35em] uppercase text-[#780817] mb-3">
              <span className="w-8 h-px bg-[#D4AF37]"></span>
              Visual Archive &amp; Atelier
              <span className="w-8 h-px bg-[#D4AF37]"></span>
            </span>
            <h1 className="mt-2 font-serif text-4xl sm:text-5xl lg:text-6xl text-[#780817] font-normal tracking-tight">
              The MIKHAEL Gallery
            </h1>
            <p className="mt-4 text-base text-[#70665C] leading-relaxed">
              A curated photographic record of authentic Kerala gold ornaments, royal bridal trousseaus,
              and master karigar workbench craftsmanship at our Punnayurkulam showroom.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-14">
            {allCategories.map((cat) => {
              const active = selectedCategory.toLowerCase() === cat.toLowerCase();
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.2em] transition-all duration-300 shadow-sm ${
                    active
                      ? 'bg-[#780817] text-[#FAF8F2] shadow-[#780817]/20 shadow-md ring-1 ring-[#780817]'
                      : 'bg-[#FFFFFF] text-[#292323] border border-[#E8D39A] hover:border-[#780817] hover:text-[#780817]'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveLightbox(item)}
                className="group relative aspect-[4/3] cursor-pointer overflow-hidden rounded-2xl border border-[#E8D39A]/60 bg-[#FFFFFF] shadow-sm hover:shadow-xl hover:border-[#780817] transition-all duration-500"
              >
                <img
                  src={assetUrl(item.image_url)}
                  alt={item.title || 'MIKHAEL Gold & Diamonds'}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                
                {/* Luxury gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#530510]/95 via-[#530510]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-end p-6">
                  {item.category && (
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
                      {item.category}
                    </span>
                  )}
                  <h3 className="font-serif text-xl text-[#FAF8F2] mt-1 font-normal tracking-wide">
                    {item.title}
                  </h3>
                  {item.alt_text && (
                    <p className="text-xs text-[#FAF8F2]/80 mt-1 line-clamp-2 leading-relaxed">
                      {item.alt_text}
                    </p>
                  )}
                  <div className="mt-3 flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-[#D4AF37] font-medium">
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>View Full Frame</span>
                  </div>
                </div>

                {/* Subtle gold corner badge */}
                <div className="absolute top-3 right-3 px-2 py-1 rounded bg-[#FAF8F2]/90 backdrop-blur-sm border border-[#E8D39A] text-[9px] font-semibold uppercase tracking-[0.15em] text-[#780817]">
                  {item.category || 'MIKHAEL'}
                </div>
              </div>
            ))}
          </div>

          {/* Showroom Invite Banner */}
          <div className="mt-20 rounded-2xl bg-gradient-to-r from-[#780817] via-[#530510] to-[#40030B] p-8 md:p-12 text-[#FAF8F2] shadow-xl border border-[#D4AF37]/30 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 text-center md:text-left">
              <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                Private Viewing Invitation
              </span>
              <h2 className="font-serif text-2xl md:text-3xl font-normal">
                Experience These Masterpieces In Person
              </h2>
              <p className="text-sm text-[#FAF8F2]/80 max-w-xl">
                Schedule a personal consultation in our VIP Bridal Lounge at Mahima Complex, Punnayurkulam.
                Try on bespoke jewellery crafted exclusively for your cherished celebrations.
              </p>
            </div>
            <a
              href="https://wa.me/919447124660?text=Hello%20Mikhael%20Gold,%20I%20would%20like%20to%20schedule%20a%20private%20bridal%20viewing."
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 rounded-full bg-[#D4AF37] hover:bg-[#E8D39A] text-[#292323] text-xs font-semibold uppercase tracking-[0.2em] transition-all shadow-md shrink-0"
            >
              Book Viewing on WhatsApp
            </a>
          </div>
        </div>
      </main>

      {/* Lightbox Modal */}
      {activeLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#40030B]/90 p-4 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setActiveLightbox(null)}
        >
          <button
            onClick={() => setActiveLightbox(null)}
            className="absolute top-6 right-6 rounded-full border border-[#D4AF37]/50 p-2.5 text-[#FAF8F2] hover:bg-[#780817] transition-all"
            aria-label="Close"
          >
            <X className="h-6 w-6" />
          </button>
          <div
            className="max-w-4xl w-full max-h-[90vh] overflow-hidden rounded-2xl border border-[#D4AF37]/40 bg-[#FAF8F2] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[68vh] overflow-hidden rounded-xl bg-[#F3EDE1] flex items-center justify-center">
              <img
                src={assetUrl(activeLightbox.image_url)}
                alt={activeLightbox.title}
                className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>
            <div className="pt-5 text-center">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#780817] font-semibold">
                {activeLightbox.category}
              </span>
              <h3 className="font-serif text-2xl text-[#780817] mt-1 font-normal">
                {activeLightbox.title}
              </h3>
              {activeLightbox.alt_text && (
                <p className="mt-2 text-sm text-[#70665C] max-w-xl mx-auto leading-relaxed">
                  {activeLightbox.alt_text}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};
