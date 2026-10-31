import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/common/ProductCard';
import { Product } from '../../types';
import { assetUrl } from '../../utils/assets';

const CATEGORIES = [
  { label: 'All', value: '' },
  { label: 'Necklaces', value: 'Necklaces' },
  { label: 'Earrings', value: 'Earrings' },
  { label: 'Bangles', value: 'Bangles' },
  { label: 'Rings', value: 'Rings' },
  { label: 'Coins & Bars', value: 'Coins & Bars' },
];

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['publicProducts', selectedCategory, searchParam],
    queryFn: () =>
      api.getProducts({
        category: selectedCategory || undefined,
        search: searchParam || undefined,
        limit: 30,
      }),
  });

  // Fallback items matching reference in case database is loading
  const fallbackPieces: Product[] = [
    {
      id: 1,
      name: 'Lakshmi Kasu Mala',
      slug: 'lakshmi-kasu-mala',
      category_id: 1,
      category_name: 'Necklaces',
      main_image: assetUrl('/img/kasu-mala.png'),
      purity: '22K',
      sku: 'MK-KM-01',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 2,
      name: 'Emerald Palakka Mala',
      slug: 'emerald-palakka-mala',
      category_id: 1,
      category_name: 'Necklaces',
      main_image: assetUrl('/img/palakka-mala.png'),
      purity: '22K',
      sku: 'MK-PK-02',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 3,
      name: 'Nagapadam Thaali',
      slug: 'nagapadam-thaali',
      category_id: 1,
      category_name: 'Necklaces',
      main_image: assetUrl('/img/nagapadam.png'),
      purity: '22K',
      sku: 'MK-NP-03',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 4,
      name: 'Mullamottu Mala',
      slug: 'mullamottu-mala',
      category_id: 1,
      category_name: 'Necklaces',
      main_image: assetUrl('/img/mullamottu.png'),
      purity: '22K',
      sku: 'MK-MM-04',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 5,
      name: 'Temple Jhumka',
      slug: 'temple-jhumka',
      category_id: 2,
      category_name: 'Earrings',
      main_image: assetUrl('/img/jhumka.png'),
      purity: '22K',
      sku: 'MK-TJ-05',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 6,
      name: 'Engraved Kerala Bangles',
      slug: 'engraved-kerala-bangles',
      category_id: 3,
      category_name: 'Bangles',
      main_image: assetUrl('/img/bangles.png'),
      purity: '22K',
      sku: 'MK-KB-06',
      material: '22K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 7,
      name: 'Nila Solitaire Ring',
      slug: 'nila-solitaire-ring',
      category_id: 4,
      category_name: 'Rings',
      main_image: assetUrl('/img/ring.png'),
      purity: '18K',
      sku: 'MK-NR-07',
      material: '18K Diamond',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
    {
      id: 8,
      name: 'Pure Gold Coins & Bars',
      slug: 'pure-gold-coins-bars',
      category_id: 5,
      category_name: 'Coins & Bars',
      main_image: assetUrl('/img/coin.png'),
      purity: '24K',
      sku: 'MK-GC-08',
      material: '24K Gold',
      availability_status: 'in_stock',
      publication_status: 'published',
      is_featured: 1,
      is_new_arrival: 0,
      display_price: 0,
    },
  ];

  const handleSelectCategory = (val: string) => {
    setSelectedCategory(val);
    if (val) {
      searchParams.set('category', val);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const rawProducts = productsResponse?.data || [];
  // Filter items if specific category is selected
  const displayedProducts = rawProducts.length > 0
    ? (selectedCategory
        ? rawProducts.filter((p: Product) =>
            p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
            p.name.toLowerCase().includes(selectedCategory.toLowerCase())
          )
        : rawProducts)
    : (selectedCategory
        ? fallbackPieces.filter((p) => p.category_name?.toLowerCase().includes(selectedCategory.toLowerCase()))
        : fallbackPieces);

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />

      <main>
        <div className="mx-auto max-w-7xl px-6 pb-28 pt-36 lg:pt-40 lg:px-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
            THE COLLECTIONS
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-[#780817] font-medium">
            Every Piece, <em className="not-italic text-[#D4AF37]">Made by Hand</em> in Kerala.
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base leading-relaxed text-[#70665C]">
            Prices follow the day’s published gold rate and are quoted transparently at the showroom or over a call — so you always pay for the exact certified gold you take home.
          </p>

          {/* Filter Pills */}
          <div className="mt-10 flex flex-wrap gap-3">
            {CATEGORIES.map((cat) => {
              const active =
                (!selectedCategory && cat.value === '') ||
                selectedCategory.toLowerCase() === cat.value.toLowerCase();
              return (
                <button
                  key={cat.label}
                  onClick={() => handleSelectCategory(cat.value)}
                  className={`rounded-full border px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.2em] transition ${
                    active
                      ? 'border-[#780817] bg-[#780817] text-[#FAF8F2] shadow-sm'
                      : 'border-[#E8D39A] bg-white text-[#70665C] hover:border-[#D4AF37] hover:text-[#780817]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>

          {/* Product Grid */}
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {isLoading && rawProducts.length === 0 ? (
              <div className="col-span-full py-20 text-center text-[#780817]">
                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-[#780817] border-t-transparent"></div>
                <p className="mt-4 text-xs uppercase tracking-widest text-[#70665C]">Loading catalogue...</p>
              </div>
            ) : displayedProducts.length > 0 ? (
              displayedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))
            ) : (
              <div className="col-span-full py-16 text-center text-[#70665C]">
                <p className="font-display text-2xl text-[#780817]">No pieces found in this category.</p>
                <button
                  onClick={() => handleSelectCategory('')}
                  className="mt-6 btn-luxury-primary text-xs"
                >
                  View All Collections
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
