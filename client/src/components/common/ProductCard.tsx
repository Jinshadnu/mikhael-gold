import React from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Eye, ArrowUpRight } from 'lucide-react';
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

  const whatsappMessage = `Hello Mikhael Gold and Diamonds, I am interested in "${product.name}" (Code: ${product.sku}). Please share availability and current details.`;

  return (
    <div className="group bg-white rounded-lg overflow-hidden border border-brand-border/60 hover:border-gold-champagne/60 transition-all duration-300 shadow-sm hover:shadow-luxury flex flex-col justify-between">
      {/* Image Container with Badges */}
      <div className="relative aspect-square w-full bg-ivory-muted overflow-hidden">
        <Link to={`/products/${product.slug}`} className="block w-full h-full">
          <img
            src={product.main_image || defaultImg}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </Link>

        {/* Status Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.purity && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-luxury-black/85 text-gold-champagne backdrop-blur-sm border border-gold-champagne/30">
              {product.purity}
            </span>
          )}
          {Boolean(product.is_new_arrival) && (
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-wider uppercase bg-gold-champagne text-luxury-black">
              New
            </span>
          )}
        </div>

        {/* Quick actions hover overlay */}
        <div className="absolute inset-0 bg-luxury-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
          <Link
            to={`/products/${product.slug}`}
            className="p-2.5 rounded-full bg-white text-luxury-black hover:bg-gold-champagne transition shadow-md"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
          <a
            href={getWhatsAppLink(whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-full bg-emerald-600 text-white hover:bg-emerald-500 transition shadow-md"
            title="Enquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & SKU */}
          <div className="flex items-center justify-between text-[11px] text-brand-muted tracking-wider uppercase mb-1.5">
            <span>{product.category_name || product.material}</span>
            <span className="font-mono text-[10px] text-brand-muted/70">{product.sku}</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif text-lg font-bold text-luxury-black leading-snug group-hover:text-gold-dark transition line-clamp-2">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Specifications row */}
          <div className="mt-2.5 flex items-center gap-3 text-xs text-brand-muted">
            {product.gross_weight && (
              <span className="bg-ivory px-2 py-0.5 rounded text-[11px] border border-brand-border">
                Wt: {product.gross_weight}g
              </span>
            )}
            {product.availability_status === 'made_to_order' ? (
              <span className="text-[11px] text-amber-700 font-medium">Made to order</span>
            ) : (
              <span className="text-[11px] text-emerald-700 font-medium">In Showroom</span>
            )}
          </div>
        </div>

        {/* Price & CTA Row */}
        <div className="mt-5 pt-3.5 border-t border-brand-border/60 flex items-center justify-between gap-2">
          <div>
            {isPriceVisible ? (
              <div>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider block">Price</span>
                <span className="font-semibold text-luxury-black text-base">
                  {formatPrice(product.published_price)}
                </span>
              </div>
            ) : (
              <div>
                <span className="text-xs font-medium text-gold-dark tracking-wide">
                  Contact Us for Price
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onEnquire ? (
              <button
                onClick={() => onEnquire(product)}
                className="text-xs uppercase tracking-wider font-semibold text-luxury-black hover:text-gold-dark flex items-center gap-1 transition"
              >
                <span>Enquire</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <Link
                to={`/products/${product.slug}`}
                className="text-xs uppercase tracking-wider font-semibold text-luxury-black hover:text-gold-dark flex items-center gap-1 transition"
              >
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
