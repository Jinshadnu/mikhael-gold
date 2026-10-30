import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles } from 'lucide-react';
import { HomepageSections } from '../../types';

interface AnnouncementBarProps {
  data?: HomepageSections['announcement_bar'];
}

export const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ data }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || !data || !data.text) {
    return null;
  }

  return (
    <div className="bg-luxury-black text-ivory border-b border-gold-champagne/20 text-xs py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center justify-center gap-2 text-center">
          <Sparkles className="w-3.5 h-3.5 text-gold-champagne shrink-0 hidden sm:inline" />
          <span className="font-medium tracking-wider text-ivory/95">{data.text}</span>
          {data.link_text && data.link_url && (
            <Link
              to={data.link_url}
              className="text-gold-champagne underline underline-offset-4 hover:text-gold-light ml-2 font-semibold transition"
            >
              {data.link_text} →
            </Link>
          )}
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="text-ivory/60 hover:text-ivory p-1 transition"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};

