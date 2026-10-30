import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  MessageCircle,
  Share2,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Clock,
} from 'lucide-react';
import { api } from '../../api/client';
import { Product } from '../../types';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/common/ProductCard';
import { EnquiryModal } from '../../components/common/EnquiryModal';
import { useSettings } from '../../context/SettingsContext';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { formatPrice, getWhatsAppLink, settings } = useSettings();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['publicProduct', slug],
    queryFn: () => api.getProductBySlug(slug!),
    enabled: Boolean(slug),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20">
          <div className="w-10 h-10 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col bg-ivory">
        <Header />
        <div className="flex-grow flex items-center justify-center py-20 text-center px-4">
          <div className="max-w-md bg-white p-8 rounded-2xl shadow-luxury border border-brand-border">
            <h2 className="font-serif text-3xl font-bold text-luxury-black">Product Not Found</h2>
            <p className="text-sm text-brand-muted mt-2">
              The jewellery piece you are looking for may have been updated or moved.
            </p>
            <Link
              to="/products"
              className="mt-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-luxury-black text-ivory text-xs uppercase tracking-wider font-semibold hover:bg-gold-dark transition"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Catalogue</span>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const allImages = [
    product.main_image,
    ...(product.images?.map((img) => img.image_url) || []),
  ].filter(Boolean) as string[];

  const activeImage = selectedImage || allImages[0] || '';

  const whatsappMessage = `Hello Mikhael Gold and Diamonds, I am enquiring about "${product.name}" (Code: ${product.sku}). Please let me know its current availability and price details.`;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${product.name} | Mikhael Gold and Diamonds`,
          text: `Check out ${product.name} at Mikhael Gold and Diamonds LLP`,
          url: window.location.href,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const isPriceVisible = Boolean(product.display_price) && product.published_price !== null;

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      <Header />

      <main className="flex-grow py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs text-brand-muted mb-8 tracking-wider uppercase">
            <Link to="/" className="hover:text-gold-dark transition">
              Home
            </Link>
            <span>/</span>
            <Link to="/products" className="hover:text-gold-dark transition">
              Catalogue
            </Link>
            <span>/</span>
            {product.category_slug && (
              <>
                <Link
                  to={`/products?category=${product.category_slug}`}
                  className="hover:text-gold-dark transition"
                >
                  {product.category_name}
                </Link>
                <span>/</span>
              </>
            )}
            <span className="text-luxury-black font-semibold truncate">{product.name}</span>
          </nav>

          {/* Product Hero Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left: Gallery Showcase */}
            <div className="lg:col-span-7 space-y-4">
              {/* Primary Image */}
              <div className="aspect-square w-full rounded-2xl overflow-hidden bg-white border border-brand-border/80 shadow-luxury relative">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                />
                {product.purity && (
                  <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-luxury-black/90 text-gold-champagne backdrop-blur-sm border border-gold-champagne/40">
                    {product.purity}
                  </span>
                )}
              </div>

              {/* Thumbnails row */}
              {allImages.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-20 h-20 rounded-lg overflow-hidden border-2 shrink-0 transition ${
                        activeImage === img
                          ? 'border-gold-champagne shadow-md'
                          : 'border-brand-border/80 hover:border-gold-champagne/50'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Specifications & CTAs */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-gold-dark">
                    {product.category_name || product.material}
                  </span>
                  <span className="font-mono text-xs text-brand-muted bg-white px-2 py-0.5 rounded border border-brand-border">
                    {product.sku}
                  </span>
                </div>

                <h1 className="font-serif text-3xl sm:text-4xl font-bold text-luxury-black leading-tight">
                  {product.name}
                </h1>
              </div>

              {/* Price / Quote Block */}
              <div className="p-4 sm:p-5 rounded-xl bg-white border border-brand-border shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
                    Pricing
                  </span>
                  {isPriceVisible ? (
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-luxury-black">
                      {formatPrice(product.published_price)}
                    </span>
                  ) : (
                    <span className="text-sm font-semibold text-gold-dark uppercase tracking-wide">
                      Contact Showroom for Price
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-brand-muted block">
                    Availability
                  </span>
                  <span
                    className={`inline-block text-xs font-semibold uppercase tracking-wider ${
                      product.availability_status === 'in_stock'
                        ? 'text-emerald-700'
                        : product.availability_status === 'made_to_order'
                        ? 'text-amber-700'
                        : 'text-red-700'
                    }`}
                  >
                    {product.availability_status === 'in_stock'
                      ? 'In Showroom'
                      : product.availability_status === 'made_to_order'
                      ? 'Made to Order'
                      : 'Out of Stock'}
                  </span>
                </div>
              </div>

              {/* Short Description */}
              {product.short_description && (
                <p className="text-sm text-brand-muted leading-relaxed">
                  {product.short_description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href={getWhatsAppLink(whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition font-semibold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enquire on WhatsApp</span>
                </a>

                <div className="flex gap-3">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex-1 py-3.5 px-6 rounded-full bg-luxury-black text-ivory hover:bg-gold-dark transition font-semibold text-xs uppercase tracking-widest text-center"
                  >
                    Request Viewing / Enquiry
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3.5 rounded-full border border-brand-border bg-white text-luxury-black hover:border-gold-champagne transition"
                    title="Share Jewellery"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
                {copied && (
                  <p className="text-xs text-center text-emerald-700 font-medium">
                    Link copied to clipboard!
                  </p>
                )}
              </div>

              {/* Product Specifications Table */}
              <div className="pt-4 border-t border-brand-border">
                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-luxury-black mb-3">
                  Product Specifications
                </h3>
                <dl className="divide-y divide-brand-border text-xs">
                  <div className="py-2.5 flex justify-between">
                    <dt className="text-brand-muted">Material</dt>
                    <dd className="font-medium text-luxury-black">{product.material}</dd>
                  </div>
                  {product.purity && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-brand-muted">Purity</dt>
                      <dd className="font-medium text-luxury-black">{product.purity}</dd>
                    </div>
                  )}
                  {product.gross_weight && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-brand-muted">Gross Weight</dt>
                      <dd className="font-medium text-luxury-black">{product.gross_weight} grams</dd>
                    </div>
                  )}
                  {product.net_weight && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-brand-muted">Net Gold Weight</dt>
                      <dd className="font-medium text-luxury-black">{product.net_weight} grams</dd>
                    </div>
                  )}
                  {product.stone_weight && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-brand-muted">Stone Weight</dt>
                      <dd className="font-medium text-luxury-black">{product.stone_weight} carats/g</dd>
                    </div>
                  )}
                  {product.diamond_details && (
                    <div className="py-2.5 flex justify-between">
                      <dt className="text-brand-muted">Diamond Specifications</dt>
                      <dd className="font-medium text-luxury-black text-right max-w-xs">
                        {product.diamond_details}
                      </dd>
                    </div>
                  )}
                </dl>
              </div>

              {/* Genuine Authenticity Guarantee */}
              <div className="p-4 rounded-xl bg-ivory-light border border-gold-champagne/30 space-y-2">
                <div className="flex items-center gap-2 text-gold-dark font-semibold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-gold-champagne" />
                  <span>The Mikhael Purity Guarantee</span>
                </div>
                <p className="text-[11px] text-brand-muted leading-relaxed">
                  Every 22K jewellery item is certified with BIS 916 hallmarking. Verified at our
                  flagship showroom at Mahima Complex, Punnayurkulam.
                </p>
              </div>
            </div>
          </div>

          {/* Full Description */}
          {product.full_description && (
            <div className="mt-16 pt-10 border-t border-brand-border max-w-4xl">
              <h2 className="font-serif text-2xl font-bold text-luxury-black mb-4">
                About this Piece
              </h2>
              <div className="prose prose-stone text-sm text-brand-muted leading-relaxed">
                <p>{product.full_description}</p>
              </div>
            </div>
          )}

          {/* Related Collections */}
          {product.related && product.related.length > 0 && (
            <div className="mt-20 pt-12 border-t border-brand-border">
              <div className="text-center mb-10">
                <p className="text-xs uppercase tracking-[0.25em] font-semibold text-gold-dark mb-1">
                  Complementary Artistry
                </p>
                <h3 className="font-serif text-2xl sm:text-4xl font-bold text-luxury-black">
                  Related Jewellery
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {product.related.map((rel) => (
                  <ProductCard key={rel.id} product={rel} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={product}
      />
    </div>
  );
};
