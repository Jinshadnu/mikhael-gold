import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, X, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { api } from '../../api/client';
import { Product } from '../../types';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/common/ProductCard';
import { EnquiryModal } from '../../components/common/EnquiryModal';

export const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || '';
  const searchParam = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchParam);
  const [sortBy, setSortBy] = useState('newest');
  const [page, setPage] = useState(1);
  const [enquiryProduct, setEnquiryProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync state with URL params
  useEffect(() => {
    setSelectedCategory(categoryParam);
    setSearchTerm(searchParam);
    setPage(1);
  }, [categoryParam, searchParam]);

  const { data: categories = [] } = useQuery({
    queryKey: ['publicCategories'],
    queryFn: api.getCategories,
  });

  const queryParams: Record<string, any> = {
    page,
    limit: 12,
    sort: sortBy,
  };
  if (selectedCategory) queryParams.category = selectedCategory;
  if (searchTerm) queryParams.search = searchTerm;

  const { data: productsResponse, isLoading } = useQuery({
    queryKey: ['publicProducts', queryParams],
    queryFn: () => api.getProducts(queryParams),
  });

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setPage(1);
    if (slug) {
      searchParams.set('category', slug);
    } else {
      searchParams.delete('category');
    }
    setSearchParams(searchParams);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    if (searchTerm) {
      searchParams.set('search', searchTerm);
    } else {
      searchParams.delete('search');
    }
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSearchTerm('');
    setSortBy('newest');
    setPage(1);
    setSearchParams({});
  };

  const products = productsResponse?.data || [];
  const pagination = productsResponse?.pagination || { page: 1, total: 0, totalPages: 1 };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb & Title */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
              <span>Certified Fine Jewellery</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-luxury-black tracking-tight">
              Jewellery Catalogue
            </h1>
            <p className="mt-3 text-sm text-brand-muted">
              Discover authentic 22K BIS-hallmarked gold and certified diamonds.
            </p>
          </div>

          {/* Search & Sort Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-xl border border-brand-border/70 shadow-sm mb-8 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Search Form */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search jewellery by name, SKU or material…"
                className="w-full pl-10 pr-10 py-2.5 rounded-full border border-brand-border text-xs focus:border-gold-champagne focus:outline-none transition"
              />
              <Search className="w-4 h-4 text-brand-muted absolute left-3.5 top-3" />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchTerm('');
                    searchParams.delete('search');
                    setSearchParams(searchParams);
                  }}
                  className="absolute right-3.5 top-3 text-brand-muted hover:text-luxury-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </form>

            {/* Sort & Filter Controls */}
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-muted font-medium uppercase tracking-wider">
                  Sort:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="px-3 py-2 rounded-lg border border-brand-border text-xs text-brand-text bg-white focus:border-gold-champagne outline-none"
                >
                  <option value="newest">Newest Arrivals</option>
                  <option value="name_asc">Name: A to Z</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                </select>
              </div>

              {(selectedCategory || searchTerm) && (
                <button
                  onClick={handleClearFilters}
                  className="px-3 py-2 rounded-lg text-xs font-semibold text-red-600 hover:bg-red-50 transition border border-red-200"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition ${
                selectedCategory === ''
                  ? 'bg-luxury-black text-gold-champagne shadow-sm'
                  : 'bg-white text-brand-muted hover:text-luxury-black border border-brand-border'
              }`}
            >
              All Jewellery
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.slug)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition ${
                  selectedCategory === cat.slug
                    ? 'bg-luxury-black text-gold-champagne shadow-sm'
                    : 'bg-white text-brand-muted hover:text-luxury-black border border-brand-border'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Products Grid or Empty State */}
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="w-10 h-10 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-xs uppercase tracking-widest text-brand-muted">
                Loading collections…
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-brand-border/60 p-8">
              <Filter className="w-12 h-12 text-gold-champagne/60 mx-auto mb-4" />
              <h3 className="font-serif text-2xl font-bold text-luxury-black">No Products Found</h3>
              <p className="text-sm text-brand-muted max-w-sm mx-auto mt-2 leading-relaxed">
                We could not find any jewellery matching your selected filters. Please adjust your
                search or browse our categories.
              </p>
              <button
                onClick={handleClearFilters}
                className="mt-6 px-6 py-2.5 rounded-full bg-luxury-black text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-gold-dark transition"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEnquire={(p) => {
                      setEnquiryProduct(p);
                      setIsModalOpen(true);
                    }}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-3">
                  <button
                    disabled={page <= 1}
                    onClick={() => {
                      setPage(page - 1);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-full border border-brand-border bg-white text-brand-text disabled:opacity-40 hover:border-gold-champagne transition"
                    aria-label="Previous Page"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  <span className="text-xs text-brand-muted tracking-wider uppercase font-medium">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>

                  <button
                    disabled={page >= pagination.totalPages}
                    onClick={() => {
                      setPage(page + 1);
                      window.scrollTo({ top: 200, behavior: 'smooth' });
                    }}
                    className="p-2.5 rounded-full border border-brand-border bg-white text-brand-text disabled:opacity-40 hover:border-gold-champagne transition"
                    aria-label="Next Page"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={enquiryProduct}
      />
    </div>
  );
};

