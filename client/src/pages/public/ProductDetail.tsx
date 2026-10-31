import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowLeft,
  ArrowRight,
  MessageCircle,
  Share2,
  CheckCircle2,
  Phone,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import { api } from '../../api/client';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/common/ProductCard';
import { useSettings } from '../../context/SettingsContext';
import { Product } from '../../types';
import { assetUrl } from '../../utils/assets';

export const ProductDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { getWhatsAppLink, settings } = useSettings();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['publicProduct', slug],
    queryFn: () => api.getProductBySlug(slug!),
    enabled: Boolean(slug),
  });

  const { data: relatedData } = useQuery({
    queryKey: ['publicRelatedProducts', product?.category_id],
    queryFn: () => api.getProducts({ limit: 4 }),
    enabled: Boolean(product),
  });

  // Malayalam title map
  const getMalayalam = (name: string = '') => {
    const l = name.toLowerCase();
    if (l.includes('kasu')) return 'കാശു മാല';
    if (l.includes('palakka')) return 'പാലക്ക മാല';
    if (l.includes('nagapadam')) return 'നാഗപടം';
    if (l.includes('mullamottu')) return 'മുല്ലമൊട്ട് മാല';
    if (l.includes('jhumka') || l.includes('jimikki')) return 'ജിമിക്കി';
    if (l.includes('bangle')) return 'വളകൾ';
    if (l.includes('ring')) return 'മോതിരം';
    if (l.includes('coin') || l.includes('bar')) return 'സ്വർണ്ണ നാണയം';
    return '';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product?.name} — Mikhael Gold and Diamonds`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;
    setIsSubmitting(true);
    try {
      await api.submitEnquiry({
        full_name: formData.name,
        mobile: formData.phone,
        email: formData.email || undefined,
        category: product.category_name,
        product_reference: product.name,
        message: `Product Enquiry for ${product.name} (SKU: ${product.sku}). Note: ${formData.message}`,
      });
      setIsSubmitted(true);
    } catch (err) {
      // ignore
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAF8F2] text-[#292323] flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center py-40">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-[#780817] border-t-transparent"></div>
        </div>
        <Footer />
      </div>
    );
  }

  // Fallback product info if not in db yet
  const activeProduct: Product = product || {
    id: 1,
    name: 'Lakshmi Kasu Mala',
    slug: slug || 'lakshmi-kasu-mala',
    category_id: 1,
    category_name: 'Necklaces',
    main_image: assetUrl('/img/kasu-mala.png'),
    purity: '22K · 916 Hallmarked',
    gross_weight: 48,
    sku: 'MK-KM-01',
    material: '22K Gold',
    availability_status: 'in_stock',
    publication_status: 'published',
    is_featured: 1,
    is_new_arrival: 0,
    full_description:
      'The kasu mala is the soul of a Kerala wedding trousseau. Each of the 41 coins is individually die-struck with the Lakshmi motif, polished by hand and strung on a flexible gold-bead chain so the necklace drapes like silk against the neckline.',
    display_price: 0,
  };

  const allImages = [
    activeProduct.main_image,
    ...(activeProduct.images?.map((img) => img.image_url) || []),
  ].filter(Boolean) as string[];

  const currentImage = selectedImage || allImages[0] || assetUrl('/img/kasu-mala.png');
  const malayalam = getMalayalam(activeProduct.name);
  const whatsappMsg = `Hello Mikhael Gold and Diamonds, I am interested in "${activeProduct.name}" (Code: ${activeProduct.sku}). Please let me know its availability and price details.`;

  const relatedList = relatedData?.data?.filter((p) => p.slug !== activeProduct.slug).slice(0, 3) || [];

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      <Header />

      <main>
        {/* Main Product Showcase (Warm Ivory Background) */}
        <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-36 lg:pt-40 lg:grid-cols-12 lg:px-10">
          {/* Images Left */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-[#E8D39A] bg-white p-3 shadow-xl">
              <img
                src={assetUrl(currentImage)}
                alt={activeProduct.name}
                className="aspect-[4/3] w-full rounded-xl object-cover transition duration-700 hover:scale-105"
              />
            </div>

            {/* Thumbnail selector */}
            {allImages.length > 1 && (
              <div className="mt-4 flex gap-4 overflow-x-auto pb-2">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border p-1 bg-white transition ${
                      currentImage === img
                        ? 'border-[#780817] ring-1 ring-[#780817]'
                        : 'border-[#E8D39A] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img src={assetUrl(img)} alt="" className="h-full w-full object-cover rounded-lg" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details Right */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link
                to={`/collections?category=${activeProduct.category_name || 'Necklaces'}`}
                className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#780817] hover:text-[#530510] transition"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>{activeProduct.category_name || 'Jewellery'}</span>
              </Link>

              <h1 className="mt-4 font-display text-4xl sm:text-5xl text-[#780817] font-medium leading-tight">
                {activeProduct.name}
              </h1>

              {malayalam && (
                <p className="mt-1 font-display text-2xl text-[#70665C]">{malayalam}</p>
              )}

              <p className="mt-6 text-sm leading-relaxed text-[#70665C]">
                {activeProduct.full_description || activeProduct.short_description ||
                  'Meticulously handcrafted in authentic Kerala tradition, hallmarked with the unique BIS HUID seal for lifetime purity and trust.'}
              </p>

              {/* Specs Definition List in Pure White Card */}
              <dl className="mt-8 grid grid-cols-2 gap-5 rounded-2xl bg-white border border-[#E8D39A] p-6 shadow-sm">
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">Purity</dt>
                  <dd className="mt-1 text-[#780817] font-display text-lg font-semibold">
                    {activeProduct.purity || '22K · 916 Hallmarked'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">Weight</dt>
                  <dd className="mt-1 text-[#780817] font-display text-lg font-semibold">
                    {activeProduct.gross_weight ? `approx. ${activeProduct.gross_weight} g` : 'approx. 48 g'}
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">Occasion</dt>
                  <dd className="mt-1 text-[#292323] text-sm font-medium">Bridal &amp; Heirloom</dd>
                </div>
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">Craft</dt>
                  <dd className="mt-1 text-[#292323] text-sm font-medium">Hand die-struck &amp; strung</dd>
                </div>
              </dl>
            </div>

            {/* CTAs */}
            <div className="mt-8 space-y-4">
              <div className="flex flex-wrap gap-4">
                <a
                  href={getWhatsAppLink(whatsappMsg)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-luxury-primary flex-1 py-4"
                >
                  <MessageCircle className="h-4 w-4 text-[#D4AF37]" />
                  <span>ENQUIRE ON WHATSAPP</span>
                </a>

                <button
                  onClick={handleShare}
                  className="btn-luxury-secondary px-5"
                  title="Share this jewellery piece"
                >
                  <Share2 className="h-4 w-4" />
                  <span>{copied ? 'Copied' : 'Share'}</span>
                </button>
              </div>

              <div className="flex items-center gap-3 pt-2 text-xs text-[#70665C]">
                <ShieldCheck className="h-4 w-4 text-[#780817] shrink-0" />
                <span>BIS Hallmarked &amp; verified on the official BIS CARE app.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Private Viewing Form Section (Soft Cream Background) */}
        <section className="bg-[#F3EDE1] py-24 border-t border-[#E8D39A]">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <div className="text-center">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                PRIVATE CONSULTATION
              </span>
              <h2 className="mt-2 font-display text-4xl text-[#780817] font-medium">
                Request a Viewing of {activeProduct.name}
              </h2>
              <p className="mt-2 text-sm text-[#70665C]">
                Visit our Punnayurkulam showroom to hold and inspect this piece in private.
              </p>
            </div>

            <div className="mt-12 rounded-3xl border border-[#E8D39A] bg-white p-8 sm:p-12 shadow-xl">
              {isSubmitted ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-[#780817] mb-3" />
                  <p className="font-display text-2xl text-[#780817]">Viewing Request Received</p>
                  <p className="mt-2 text-sm text-[#70665C]">
                    We have saved your request for {activeProduct.name}. Our master jeweller will get in touch soon.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid gap-6 sm:grid-cols-2">
                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Your Name *
                    </span>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                      placeholder="Anjali Menon"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Phone Number *
                    </span>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                      placeholder="+91 98xxx xxxxx"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Message / Special Requests
                    </span>
                    <textarea
                      rows={2}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] focus:border-[#780817] focus:bg-white focus:outline-none transition resize-none"
                      placeholder="Let us know your preferred date, wedding occasion, or custom weight preferences..."
                    />
                  </label>

                  <div className="sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury-primary w-full sm:w-auto"
                    >
                      {isSubmitting ? 'Submitting...' : 'SUBMIT VIEWING REQUEST'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Related Pieces */}
        {relatedList.length > 0 && (
          <section className="bg-[#FAF8F2] py-24 border-t border-[#E8D39A]">
            <div className="mx-auto max-w-7xl px-6 lg:px-10">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                COMPLETE THE SUITE
              </span>
              <h2 className="mt-2 font-display text-4xl text-[#780817] font-medium">Heirloom Companions</h2>
              <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {relatedList.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};
