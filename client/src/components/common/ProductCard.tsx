import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { Product } from '../../types';

interface ProductCardProps {
  product: Product;
  onEnquire?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Map common product names or categories to traditional Malayalam script if applicable
  const getMalayalamSubtitle = (name: string, category?: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('kasu')) return 'കാശു മാല';
    if (lower.includes('palakka')) return 'പാലക്ക മാല';
    if (lower.includes('nagapadam')) return 'നാഗപടം';
    if (lower.includes('mullamottu')) return 'മുല്ലമൊട്ട് മാല';
    if (lower.includes('jhumka') || lower.includes('jimikki')) return 'ജിമിക്കി';
    if (lower.includes('bangle')) return 'വളകൾ';
    if (lower.includes('ring')) return 'മോതിരം';
    if (lower.includes('coin') || lower.includes('bar')) return 'സ്വർണ്ണ നാണയം';
    if (category?.toLowerCase().includes('necklace')) return 'മാല';
    if (category?.toLowerCase().includes('earring')) return 'കമ്മൽ';
    return '';
  };

  const malayalam = getMalayalamSubtitle(product.name, product.category_name);
  const purityLabel = product.purity || (product.material?.includes('Diamond') ? 'DIAMOND' : '22K · 916');

  return (
    <Link to={`/products/${product.slug}`} className="group block h-full">
      {/* Pure White Luxury Card Container with Champagne Gold Border */}
      <div className="flex flex-col h-full rounded-2xl bg-white border border-[#E8D39A]/70 p-3 shadow-[0_4px_20px_rgba(41,35,35,0.05)] transition-all duration-500 group-hover:border-[#D4AF37] group-hover:shadow-[0_16px_36px_rgba(120,8,23,0.12)] group-hover:-translate-y-1">
        
        {/* Arched Image Frame */}
        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[999px] rounded-b-xl bg-[#F3EDE1]">
          <img
            src={product.main_image || '/img/kasu-mala.png'}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-108"
          />

          {/* Ambient subtle vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-60" />

          {/* Rotated purity label */}
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 -rotate-90 origin-left text-[10px] font-semibold uppercase tracking-[0.25em] text-[#780817] bg-[#FAF8F2]/95 backdrop-blur-sm px-2.5 py-0.5 rounded-full border border-[#E8D39A]">
            {purityLabel}
          </span>

          {/* Hover Arrow Circle */}
          <span className="absolute bottom-3.5 right-3.5 grid h-9 w-9 place-items-center rounded-full bg-[#780817] text-[#D4AF37] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-105 shadow-md">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>

        {/* Card Typography & Details */}
        <div className="pt-4 pb-2 px-1 text-left flex-1 flex flex-col justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#D4AF37]">
              {product.category_name || 'Traditional Jewellery'}
            </p>
            <h3 className="mt-1 font-display text-[22px] leading-snug font-medium text-[#780817] transition-colors duration-200 group-hover:text-[#530510]">
              {product.name}
            </h3>
            {malayalam && (
              <p className="text-xs text-[#70665C] font-sans mt-0.5">{malayalam}</p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-[#E8D39A]/40 flex items-center justify-between text-xs text-[#70665C]">
            <span className="text-[11px] uppercase tracking-wider text-[#A89A83]">
              {product.gross_weight ? `Wt: ${product.gross_weight}g` : 'BIS Hallmarked'}
            </span>
            <span className="font-semibold text-[#780817] group-hover:text-[#D4AF37] uppercase tracking-wider text-[11px] transition-colors flex items-center gap-1">
              <span>View Piece</span>
              <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
