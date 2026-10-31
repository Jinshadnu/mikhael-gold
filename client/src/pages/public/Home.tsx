import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  RefreshCcw,
  Scale,
  Sparkles,
  MapPin,
  Clock,
  Phone,
  MessageSquare,
  CheckCircle2,
  Star,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import { api } from '../../api/client';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ProductCard } from '../../components/common/ProductCard';
import { useSettings } from '../../context/SettingsContext';
import { Product } from '../../types';

export const Home: React.FC = () => {
  const { settings, getWhatsAppLink } = useSettings();

  // Enquiry form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    category: 'Bridal collection',
    message: '',
    visitDate: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Fetch featured products from database
  const { data: productsData } = useQuery({
    queryKey: ['publicFeaturedProducts'],
    queryFn: () => api.getProducts({ featured: true, limit: 8 }),
  });

  const featuredProducts: Product[] = productsData?.data && productsData.data.length > 0
    ? productsData.data
    : [
        {
          id: 1,
          name: 'Emerald Palakka Mala',
          slug: 'emerald-palakka-mala',
          category_id: 1,
          category_name: 'Necklaces',
          main_image: '/img/palakka-mala.png',
          purity: '22K · 916',
          sku: 'MK-PK-01',
          material: '22K Gold & Emerald',
          gross_weight: 36.0,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 0,
          display_price: 0,
        },
        {
          id: 2,
          name: 'Nagapadam Thaali',
          slug: 'nagapadam-thaali',
          category_id: 1,
          category_name: 'Necklaces',
          main_image: '/img/nagapadam.png',
          purity: '22K · 916',
          sku: 'MK-NP-02',
          material: '22K Gold',
          gross_weight: 32.0,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 0,
          display_price: 0,
        },
        {
          id: 3,
          name: 'Mullamottu Mala',
          slug: 'mullamottu-mala',
          category_id: 1,
          category_name: 'Necklaces',
          main_image: '/img/mullamottu.png',
          purity: '22K · 916',
          sku: 'MK-MM-03',
          material: '22K Gold',
          gross_weight: 44.0,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 0,
          display_price: 0,
        },
        {
          id: 4,
          name: 'Temple Jhumka',
          slug: 'temple-jhumka',
          category_id: 2,
          category_name: 'Earrings',
          main_image: '/img/jhumka.png',
          purity: '22K · 916',
          sku: 'MK-TJ-04',
          material: '22K Gold',
          gross_weight: 18.0,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 0,
          display_price: 0,
        },
        {
          id: 5,
          name: 'Engraved Kerala Bangles',
          slug: 'engraved-kerala-bangles',
          category_id: 3,
          category_name: 'Bangles',
          main_image: '/img/bangles.png',
          purity: '22K · 916',
          sku: 'MK-KB-05',
          material: '22K Gold',
          gross_weight: 38.0,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 0,
          display_price: 0,
        },
        {
          id: 6,
          name: 'Nila Solitaire Ring',
          slug: 'nila-solitaire-ring',
          category_id: 4,
          category_name: 'Rings',
          main_image: '/img/ring.png',
          purity: '18K Diamond',
          sku: 'MK-NR-06',
          material: '18K Gold & Certified Diamond',
          gross_weight: 4.2,
          availability_status: 'in_stock',
          publication_status: 'published',
          is_featured: 1,
          is_new_arrival: 1,
          display_price: 0,
        },
      ];

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      await api.submitEnquiry({
        full_name: formData.name,
        mobile: formData.phone,
        email: formData.email || undefined,
        category: formData.category,
        message: `${formData.message}${formData.visitDate ? ` | Preferred Date: ${formData.visitDate}` : ''}`,
      });
      setIsSubmitted(true);
      setFormData({
        name: '',
        phone: '',
        email: '',
        category: 'Bridal collection',
        message: '',
        visitDate: '',
      });
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit enquiry. Please try again or WhatsApp us.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F2] text-[#292323] font-sans selection:bg-[#780817] selection:text-[#FAF8F2]">
      {/* 1. Header Navigation */}
      <Header />

      <main>
        {/* =================================================================== */}
        {/* SECTION 1: LUXURY HERO SECTION                                      */}
        {/* =================================================================== */}
        <section className="relative flex min-h-[92svh] lg:min-h-[96svh] items-center justify-center overflow-hidden bg-[#FAF8F2] pt-24 lg:pt-[104px]">
          {/* Hero Photography with Warm Luxury Vignette Overlay */}
          <div className="absolute inset-0">
            <img
              src="/img/hero.png"
              alt="Mikhael Gold & Diamonds Fine Jewellery Suite"
              className="h-full w-full object-cover object-[75%_center] lg:object-center brightness-[0.88] contrast-[1.05]"
            />
            {/* Multi-stage luxury gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#292323]/85 via-[#292323]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#FAF8F2] via-transparent to-[#292323]/30" />
          </div>

          <div className="relative mx-auto w-full max-w-7xl px-6 py-28 lg:px-10 lg:py-36">
            {/* Eyebrow badge */}
            <div className="rise inline-flex items-center gap-2.5 rounded-full border border-[#E8D39A]/60 bg-[#780817]/85 backdrop-blur-md px-4 py-1.5 shadow-md">
              <Sparkles className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.28em] text-[#FAF8F2]">
                THE ART OF TIMELESS BEAUTY · PUNNAYURKULAM
              </span>
            </div>

            {/* Headline */}
            <h1 className="rise mt-6 max-w-3xl font-display text-5xl leading-[1.02] text-[#FAF8F2] [animation-delay:150ms] sm:text-7xl lg:text-8xl">
              Elegance That <em className="not-italic text-[#E8D39A]">Lasts Forever</em>
            </h1>

            {/* Subheading */}
            <p className="rise mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-[#FAF8F2]/90 [animation-delay:300ms]">
              Discover timeless gold and diamond jewellery crafted to celebrate your most beautiful moments. Authentic Kerala craftsmanship, BIS 916 hallmarked for generations.
            </p>

            {/* CTA Buttons */}
            <div className="rise mt-10 flex flex-wrap items-center gap-4 [animation-delay:450ms]">
              <Link
                to="/collections"
                className="btn-luxury-primary"
              >
                <span>EXPLORE COLLECTIONS</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#signature"
                className="btn-luxury-secondary bg-[#FAF8F2]/90 text-[#780817] hover:bg-[#780817] hover:text-[#FAF8F2] backdrop-blur-sm"
              >
                <span>DISCOVER MORE</span>
              </a>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 2: GOLD JEWELLERY SHOWCASE (Warm Ivory #FAF8F2)              */}
        {/* =================================================================== */}
        <section className="bg-[#FAF8F2] py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#E8D39A]/50">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  22K BIS 916 HALLMARKED
                </p>
                <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#780817] font-medium">
                  Gold Jewellery Creations
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#70665C]">
                  From traditional kasu malas to handcrafted bangles and temple jhumkas, each piece carries the generational warmth of Kerala’s master karigars.
                </p>
              </div>

              <Link
                to="/collections?category=Necklaces"
                className="btn-luxury-secondary self-start md:self-end"
              >
                <span>VIEW ALL GOLD JEWELLERY</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Product Grid on Pure White Cards */}
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 3: THE SIGNATURE PIECE (Soft Cream #F3EDE1)                 */}
        {/* =================================================================== */}
        <section id="signature" className="bg-[#F3EDE1] py-24 lg:py-32 border-y border-[#E8D39A]/60">
          <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 lg:grid-cols-12 lg:px-10">
            {/* Image Frame Left (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative">
                <div className="absolute -inset-4 -z-10 rounded-[2rem] border border-[#D4AF37]/50 bg-white/60 shadow-lg" />
                <div className="overflow-hidden rounded-[1.5rem] bg-white border border-[#E8D39A] shadow-xl">
                  <img
                    src="/img/kasu-mala.png"
                    alt="Lakshmi Kasu Mala Heritage Necklace"
                    loading="lazy"
                    className="aspect-[3/2] w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            </div>

            {/* Details Right (5 cols) */}
            <div className="lg:col-span-5">
              <span className="inline-block rounded-full bg-[#780817]/10 border border-[#780817]/25 px-3.5 py-1 text-[10.5px] font-bold uppercase tracking-[0.24em] text-[#780817]">
                THE SIGNATURE PIECE
              </span>

              <h2 className="mt-4 font-display text-4xl sm:text-5xl text-[#780817] font-medium leading-tight">
                Lakshmi Kasu Mala
              </h2>
              <p className="mt-1 font-display text-2xl text-[#70665C]">കാശു മാല</p>

              <p className="mt-6 text-sm leading-relaxed text-[#70665C]">
                The kasu mala is the soul of a Kerala wedding trousseau. Each of the 41 coins is individually die-struck with the Lakshmi motif, polished by hand and strung on a flexible gold-bead chain so the necklace drapes like silk against the neckline.
              </p>

              {/* Specification Grid in Pure White Box */}
              <div className="mt-8 rounded-xl bg-white p-6 border border-[#E8D39A]/70 shadow-sm grid grid-cols-2 gap-6">
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    Purity
                  </dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-[#780817]">
                    22K · 916 Hallmarked
                  </dd>
                </div>
                <div>
                  <dt className="text-[10.5px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    Weight
                  </dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-[#780817]">
                    approx. 48 g
                  </dd>
                </div>
              </div>

              <div className="mt-9">
                <Link
                  to="/products/lakshmi-kasu-mala"
                  className="btn-luxury-primary"
                >
                  <span>EXPLORE LAKSHMI KASU MALA</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 4: DIAMOND JEWELLERY SECTION (Pure White #FFFFFF)           */}
        {/* =================================================================== */}
        <section className="bg-white py-24 lg:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-12 border-b border-[#E8D39A]/50">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                  IGI CERTIFIED NATURAL SOLITAIRES
                </p>
                <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#780817] font-medium">
                  Certified Diamond Excellence
                </h2>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#70665C]">
                  Precision-cut natural diamonds graded for supreme fire and scintillation, cradled in handcrafted 18K gold bands.
                </p>
              </div>

              <Link
                to="/collections?category=Rings"
                className="btn-luxury-secondary self-start md:self-end"
              >
                <span>EXPLORE DIAMOND CREATIONS</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Diamond Cards Grid */}
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {/* Card 1: Nila Solitaire Ring */}
              <div className="luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F2] mb-6">
                    <img
                      src="/img/ring.png"
                      alt="Nila Solitaire Ring"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    Natural Solitaire
                  </span>
                  <h3 className="font-display text-2xl text-[#780817] font-semibold mt-1">
                    Nila Solitaire Ring
                  </h3>
                  <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                    A brilliant-cut diamond perched on an 18K yellow gold band inspired by the curve of the river Bharathapuzha.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8D39A]/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#780817]">18K Diamond</span>
                  <Link
                    to="/products/nila-solitaire-ring"
                    className="text-xs font-bold uppercase tracking-wider text-[#780817] hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>View Ring</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Card 2: 24K Pure Coins & Bars */}
              <div className="luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F2] mb-6">
                    <img
                      src="/img/coin.png"
                      alt="Pure Gold Coins & Bars"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    24K Pure Mint
                  </span>
                  <h3 className="font-display text-2xl text-[#780817] font-semibold mt-1">
                    Pure Gold Coins &amp; Bars
                  </h3>
                  <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                    999 fine 24K investment coins stamped with holy Lakshmi motifs and tamper-proof assay certification.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8D39A]/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#780817]">24K · 999 Fine</span>
                  <Link
                    to="/products/pure-gold-coins-bars"
                    className="text-xs font-bold uppercase tracking-wider text-[#780817] hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>View Coins</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>

              {/* Card 3: Engraved Kerala Bangles */}
              <div className="luxury-card rounded-2xl overflow-hidden p-6 flex flex-col justify-between">
                <div>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FAF8F2] mb-6">
                    <img
                      src="/img/bangles.png"
                      alt="Engraved Kerala Bangles"
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#D4AF37] font-bold">
                    Heirloom Kadas
                  </span>
                  <h3 className="font-display text-2xl text-[#780817] font-semibold mt-1">
                    Engraved Kerala Bangles
                  </h3>
                  <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                    Solid 22K gold kadas engraved with floral repoussé work, complete with threaded safety pins for bridal trousseaus.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-[#E8D39A]/40 flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#780817]">22K · 916 Hallmarked</span>
                  <Link
                    to="/products/engraved-kerala-bangles"
                    className="text-xs font-bold uppercase tracking-wider text-[#780817] hover:text-[#D4AF37] flex items-center gap-1"
                  >
                    <span>View Bangles</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 5: BRIDAL COLLECTION (Soft Cream #F3EDE1 with Burgundy)     */}
        {/* =================================================================== */}
        <section className="bg-[#F3EDE1] py-24 lg:py-32 border-y border-[#E8D39A]/60 relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">
                THE WEDDING SUITE
              </span>
              <h2 className="mt-3 font-display text-4xl sm:text-6xl text-[#780817] font-medium leading-tight">
                Celebrate Forever in Elegance
              </h2>
              <div className="kasavu w-32 mx-auto mt-6 opacity-80" />
              <p className="mt-6 text-sm sm:text-base leading-relaxed text-[#70665C]">
                Handcrafted wedding trousseaus that honor centuries of Kerala tradition — layered necklaces, sacred thaalis, and matching kadas made to be worn and passed down with love.
              </p>
            </div>

            {/* 3 Bridal Feature Cards */}
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-2xl p-8 border border-[#E8D39A]/70 text-center shadow-sm hover:shadow-md transition">
                <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-[#780817]/10 text-[#780817] mb-5">
                  <Heart className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl text-[#780817] font-semibold">
                  Complete Trousseaus
                </h3>
                <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                  Harmonized suites from the neck-hugging choker to the longest kasu mala for your wedding morning.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#E8D39A]/70 text-center shadow-sm hover:shadow-md transition">
                <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-[#780817]/10 text-[#780817] mb-5">
                  <ShieldCheck className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl text-[#780817] font-semibold">
                  Custom Karigar Craft
                </h3>
                <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                  Sit with our master goldsmiths to redesign ancestral pieces or create unique personalized motifs.
                </p>
              </div>

              <div className="bg-white rounded-2xl p-8 border border-[#E8D39A]/70 text-center shadow-sm hover:shadow-md transition">
                <span className="grid h-12 w-12 mx-auto place-items-center rounded-full bg-[#780817]/10 text-[#780817] mb-5">
                  <Sparkles className="h-6 w-6" />
                </span>
                <h3 className="font-display text-2xl text-[#780817] font-semibold">
                  Lifetime Value Promise
                </h3>
                <p className="text-xs text-[#70665C] mt-2 leading-relaxed">
                  BIS hallmarking with 100% exchange value on gold weight whenever your family desires.
                </p>
              </div>
            </div>

            <div className="mt-14 text-center">
              <Link
                to="/collections?category=Bridal"
                className="btn-luxury-primary"
              >
                <span>EXPLORE BRIDAL COLLECTION</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 6: ABOUT MIKHAEL (Soft Cream #F3EDE1)                       */}
        {/* =================================================================== */}
        <section id="heritage" className="bg-[#F3EDE1] py-24 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-14 px-6 lg:grid-cols-2 lg:px-10 items-center">
            {/* Image Left */}
            <div className="relative order-2 lg:order-1">
              <div className="overflow-hidden rounded-b-[999px] rounded-t-2xl border border-[#D4AF37]/50 bg-white p-2 shadow-2xl">
                <img
                  src="/img/craft.png"
                  alt="Mikhael Goldsmith Hand-engraving a Gold Bangle"
                  loading="lazy"
                  className="aspect-[11/13] w-full rounded-b-[999px] rounded-t-xl object-cover"
                />
              </div>

              {/* Floating Stat Badge in Royal Burgundy */}
              <div className="absolute -bottom-6 -right-2 rounded-2xl bg-[#780817] text-[#FAF8F2] border border-[#E8D39A] px-7 py-5 sm:-right-6 shadow-2xl">
                <p className="font-display text-5xl text-[#E8D39A] font-semibold">39+</p>
                <p className="text-[10.5px] uppercase tracking-[0.24em] text-[#FAF8F2]/90">
                  years of craft
                </p>
              </div>
            </div>

            {/* Content Right */}
            <div className="order-1 flex flex-col justify-center lg:order-2">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                HERITAGE &amp; TRUST
              </span>

              <h2 className="mt-3 font-display text-4xl sm:text-5xl text-[#780817] font-medium leading-tight">
                Crafting Elegance, Creating Memories
              </h2>

              <p className="mt-6 text-sm leading-relaxed text-[#70665C]">
                Mikhael Gold began as a dedicated goldsmith’s workshop rooted in the heart of Kerala’s artisanal capital. Today our karigars still work the way they always have — melting, drawing, engraving and setting by hand — so that each creation carries the quiet soul only authentic handwork can give.
              </p>

              <p className="mt-4 text-sm leading-relaxed text-[#70665C]">
                We create jewellery for the moments that define a lifetime: the first rice-feeding, Onam and Vishu festivals, wedding mornings, and the treasured moment a mother places her mala around her daughter’s neck.
              </p>

              {/* 3 Metrics Counter in White Cards */}
              <div className="mt-10 grid grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-4 border border-[#E8D39A]/60 text-center shadow-sm">
                  <dt className="font-display text-3xl font-semibold text-[#780817]">120+</dt>
                  <dd className="text-[10px] uppercase tracking-wider text-[#A89A83] mt-1 font-semibold">
                    Master Karigars
                  </dd>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E8D39A]/60 text-center shadow-sm">
                  <dt className="font-display text-3xl font-semibold text-[#780817]">916</dt>
                  <dd className="text-[10px] uppercase tracking-wider text-[#A89A83] mt-1 font-semibold">
                    BIS Hallmark
                  </dd>
                </div>
                <div className="bg-white rounded-xl p-4 border border-[#E8D39A]/60 text-center shadow-sm">
                  <dt className="font-display text-3xl font-semibold text-[#780817]">40k+</dt>
                  <dd className="text-[10px] uppercase tracking-wider text-[#A89A83] mt-1 font-semibold">
                    Families Served
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 7: THE MIKHAEL PROMISE (Warm Ivory #FAF8F2)                 */}
        {/* =================================================================== */}
        <section id="promise" className="bg-[#FAF8F2] py-24 lg:py-32 border-b border-[#E8D39A]/60">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                THE MIKHAEL PROMISE
              </span>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#780817] font-medium">
                Pure Gold. Honest Bills. Lifelong Care.
              </h2>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="bg-white p-8 rounded-2xl border border-[#E8D39A]/70 shadow-sm hover:shadow-md transition">
                <BadgeCheck className="h-8 w-8 text-[#780817]" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-[#780817] font-semibold">
                  BIS Hallmarked &amp; HUID
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#70665C]">
                  Every creation carries a laser-etched six-digit HUID code verifiable on the official BIS CARE app.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#E8D39A]/70 shadow-sm hover:shadow-md transition">
                <RefreshCcw className="h-8 w-8 text-[#780817]" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-[#780817] font-semibold">
                  Lifetime Exchange
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#70665C]">
                  Bring back any Mikhael piece, any year, and receive full gold weight value at the day’s published rate.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#E8D39A]/70 shadow-sm hover:shadow-md transition">
                <Scale className="h-8 w-8 text-[#780817]" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-[#780817] font-semibold">
                  Transparent Pricing
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#70665C]">
                  Gross gold weight, stone deduction, and making charges detailed transparently on every single bill.
                </p>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-[#E8D39A]/70 shadow-sm hover:shadow-md transition">
                <Sparkles className="h-8 w-8 text-[#780817]" strokeWidth={1.5} />
                <h3 className="mt-5 font-display text-2xl text-[#780817] font-semibold">
                  Custom Bridal Design
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-[#70665C]">
                  Sit with our master karigars to create a one-of-a-kind trousseau tailored to your exact wedding dreams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 8: TESTIMONIALS (Royal Burgundy #780817)                    */}
        {/* =================================================================== */}
        <section className="bg-[#780817] py-24 lg:py-32 text-[#FAF8F2] relative">
          <div className="mx-auto max-w-7xl px-6 lg:px-10">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                CLIENT VOICES
              </span>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#FAF8F2] font-medium">
                Generations of Trust
              </h2>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-[#530510]/80 rounded-2xl p-8 border border-[#E8D39A]/30 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl italic leading-snug text-[#FAF8F2]">
                    &ldquo;My grandmother bought her kasu mala here. Forty years later, so did I — and it hangs with the same quiet dignity.&rdquo;
                  </blockquote>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#E8D39A] font-semibold">
                  Lakshmi &amp; Rahul · Punnayurkulam
                </p>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-[#530510]/80 rounded-2xl p-8 border border-[#E8D39A]/30 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl italic leading-snug text-[#FAF8F2]">
                    &ldquo;The finish on the palakka mala is unlike anything machine-made. You can feel the goldsmith’s hand in every emerald setting.&rdquo;
                  </blockquote>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#E8D39A] font-semibold">
                  Dr. Priya Nambiar · Guruvayur
                </p>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-[#530510]/80 rounded-2xl p-8 border border-[#E8D39A]/30 flex flex-col justify-between shadow-lg">
                <div>
                  <div className="flex gap-1 text-[#D4AF37] mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="font-display text-xl sm:text-2xl italic leading-snug text-[#FAF8F2]">
                    &ldquo;Transparent billing, zero hidden wastage percentages, and warmth that feels like family. The only jeweller we trust.&rdquo;
                  </blockquote>
                </div>
                <p className="mt-6 text-xs uppercase tracking-[0.22em] text-[#E8D39A] font-semibold">
                  Thomas &amp; Mary · Thrissur
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* SECTION 9: CONTACT & ENQUIRY (Warm Ivory #FAF8F2)                   */}
        {/* =================================================================== */}
        <section id="enquire" className="bg-[#FAF8F2] py-24 lg:py-32">
          <div id="visit" className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-12 lg:px-10 items-start">
            {/* Showroom Details Left (5 cols) */}
            <div className="lg:col-span-5">
              <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#D4AF37]">
                SHOWROOM CONSULTATION
              </span>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl text-[#780817] font-medium leading-tight">
                Our Punnayurkulam Showroom
              </h2>

              <p className="mt-5 text-sm leading-relaxed text-[#70665C]">
                Every piece in our catalogue is available for private inspection in our consultation room. We serve cardamom tea, take your measurements and walk you through purity marks under high magnification.
              </p>

              <div className="mt-8 space-y-5 text-xs text-[#292323]">
                <div className="flex items-start gap-3.5">
                  <MapPin className="h-5 w-5 shrink-0 text-[#780817] mt-0.5" />
                  <div>
                    <p className="font-semibold text-sm text-[#780817]">Mahima Complex, Door No. 81 A</p>
                    <p className="text-[#70665C] mt-0.5">Althara, P.O. Punnayurkulam, Kerala 679561</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <Clock className="h-5 w-5 shrink-0 text-[#780817]" />
                  <span className="text-[#70665C]">Mon – Sat · 9:30 AM – 7:30 PM</span>
                </div>

                <div className="flex items-center gap-3.5">
                  <Phone className="h-5 w-5 shrink-0 text-[#780817]" />
                  <span className="text-[#70665C]">Direct Assistance &amp; WhatsApp Support</span>
                </div>
              </div>

              {settings.google_maps_url && (
                <div className="mt-8">
                  <a
                    href={settings.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-luxury-secondary text-xs"
                  >
                    <span>GET DIRECTIONS ON GOOGLE MAPS</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              )}
            </div>

            {/* Viewing Request Form in Pure White Card Right (7 cols) */}
            <div className="rounded-3xl border border-[#E8D39A]/80 bg-white p-8 sm:p-12 lg:col-span-7 shadow-[0_12px_40px_rgba(41,35,35,0.08)]">
              {isSubmitted ? (
                <div className="py-12 text-center">
                  <CheckCircle2 className="mx-auto h-16 w-16 text-[#780817] mb-4 animate-bounce" />
                  <h3 className="font-display text-3xl text-[#780817] font-semibold">Thank You</h3>
                  <p className="mt-3 text-sm text-[#70665C] max-w-md mx-auto">
                    Your private consultation request has been received. Our showroom team will reach out promptly to confirm your visit.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="mt-8 btn-luxury-secondary text-xs"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="grid gap-6 sm:grid-cols-2">
                  <div className="sm:col-span-2 pb-2 border-b border-[#E8D39A]/50">
                    <h3 className="font-display text-2xl text-[#780817] font-semibold">
                      Request a Private Viewing
                    </h3>
                    <p className="text-xs text-[#70665C] mt-1">
                      Reserve our showroom suite to examine selected jewellery pieces in private.
                    </p>
                  </div>

                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Your Name *
                    </span>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] placeholder:text-[#A89A83] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                      placeholder="Anjali Menon"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Phone / WhatsApp *
                    </span>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] placeholder:text-[#A89A83] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                      placeholder="+91 98xxx xxxxx"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Email (Optional)
                    </span>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] placeholder:text-[#A89A83] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                      placeholder="you@example.com"
                    />
                  </label>

                  <label className="block">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Preferred Visit Date
                    </span>
                    <input
                      type="date"
                      value={formData.visitDate}
                      onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-2.5 text-sm text-[#292323] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                    />
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      I’m Interested In
                    </span>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] focus:border-[#780817] focus:bg-white focus:outline-none transition"
                    >
                      <option value="Bridal collection">A Complete Bridal Set</option>
                      <option value="Lakshmi Kasu Mala">Lakshmi Kasu Mala Heritage Necklace</option>
                      <option value="Emerald Palakka Mala">Emerald Palakka Mala</option>
                      <option value="Nagapadam Thaali">Nagapadam Thaali</option>
                      <option value="Mullamottu Mala">Mullamottu Mala</option>
                      <option value="Temple Jhumka">Temple Jhumka Earrings</option>
                      <option value="Engraved Kerala Bangles">Engraved Kerala Bangles</option>
                      <option value="Nila Solitaire Ring">Nila Solitaire Diamond Ring</option>
                      <option value="Pure Gold Coins & Bars">Pure Gold Coins &amp; Bars</option>
                      <option value="Custom design">A Custom Karigar Design</option>
                    </select>
                  </label>

                  <label className="block sm:col-span-2">
                    <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#780817]">
                      Message / Custom Preferences
                    </span>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="mt-1.5 w-full rounded-lg border border-[#E8D39A] bg-[#FAF8F2] px-3.5 py-3 text-sm text-[#292323] placeholder:text-[#A89A83] focus:border-[#780817] focus:bg-white focus:outline-none transition resize-none"
                      placeholder="Tell us about the occasion, preferred gold purity or budget..."
                    />
                  </label>

                  {errorMessage && (
                    <div className="sm:col-span-2 text-xs text-rose-700 bg-rose-50 p-3 rounded-lg border border-rose-200">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 sm:col-span-2 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-luxury-primary disabled:opacity-60"
                    >
                      {isSubmitting ? 'Submitting...' : 'REQUEST A VIEWING'}
                    </button>

                    <a
                      href={getWhatsAppLink()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#780817] hover:text-[#530510] transition py-3 px-4"
                    >
                      <MessageSquare className="h-4 w-4 text-[#D4AF37]" />
                      <span>Chat on WhatsApp</span>
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* 11. Footer in Deep Wine #40030B */}
      <Footer />
    </div>
  );
};
