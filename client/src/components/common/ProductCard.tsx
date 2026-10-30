import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Product } from '../../types';
import { useSettings } from '../../context/SettingsContext';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onEnquire }) => {
  const { formatPrice, getWhatsAppLink } = useSettings();

  const isPriceVisible = Boolean(product.display_price) && product.published_price !== null;

  const defaultImg =
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=800&auto=format&fit=crop';

  const whatsappMessage = `Hello Mikhael Gold and Diamonds, I am interested in "${product.name}" (Code: ${product.sku}). Please share availability and details.`;

  return (
    <div className="group bg-white rounded-xl overflow-hidden border border-brand-border/80 hover:border-gold-champagne/80 transition-all duration-500 shadow-subtle hover:shadow-luxury flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative aspect-[4/5] w-full bg-ivory-muted overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={product.main_image || defaultImg}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.purity && (
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-luxury-black/90 text-gold-champagne backdrop-blur-md border border-gold-champagne/40 shadow-sm">
              {product.purity}
            </span>
          )}
          {Boolean(product.is_new_arrival) && (
            <span className="px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gold-champagne text-luxury-black shadow-sm">
              New Arrival
            </span>
          )}
        </div>

        {/* Quick actions hover overlay */}
        <div className="absolute inset-0 bg-luxury-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="p-3 rounded-full bg-white text-luxury-black hover:bg-gold-champagne transition shadow-md"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted tracking-wider uppercase mb-1.5 font-medium">
            <span className="text-gold-dark font-semibold">{product.category_name || product.material}</span>
            <span className="font-mono text-[10px] text-brand-muted/80">{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-bold text-luxury-black leading-snug group-hover:text-gold-dark transition-colors duration-200 line-clamp-2">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Specifications row */}
          <div className="mt-3 flex items-center gap-2.5 text-xs text-brand-muted">
            {product.gross_weight && (
              <span className="bg-ivory px-2.5 py-1 rounded text-[11px] border border-brand-border font-medium text-brand-text">
                Wt: {product.gross_weight}g
              </span>
            )}
            {product.availability_status === 'made_to_order' ? (
              <span className="text-[11px] text-amber-700 font-medium">Made to order</span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                <span>In Showroom</span>
              </span>
            )}
          </div>
        </div>

        {/* Price & CTA Row */}
        <div className="mt-5 pt-3.5 border-t border-brand-border/70 flex items-center justify-between gap-2">
          <div>
            {isPriceVisible ? (
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block font-medium">
                  Showroom Price
                </span>
                <span className="font-serif font-bold text-luxury-black text-lg">
                  {formatPrice(product.published_price)}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-xs font-semibold text-gold-dark tracking-wide uppercase">
                  Contact for Price
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onEnquire ? (
              <button
                onClick={() => onEnquire(product)}
                className="text-xs uppercase tracking-wider font-bold text-luxury-black hover:text-gold-dark flex items-center gap-1 transition"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold-champagne" />
              </button>
            ) : (
              <Link
                to={`/products/${product.slug}`}
                className="text-xs uppercase tracking-wider font-bold text-luxury-black hover:text-gold-dark flex items-center gap-1 transition"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gold-champagne" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
