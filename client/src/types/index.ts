export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  image_url: string | null;
  parent_id?: number | null;
  display_order: number;
  is_active: number | boolean;
  seo_title?: string | null;
  seo_description?: string | null;
  product_count?: number;
}

export interface ProductImage {
  id: number;
  product_id?: number;
  image_url: string;
  alt_text?: string | null;
  display_order: number;
  is_primary: number | boolean;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  slug: string;
  short_description?: string | null;
  full_description?: string | null;
  main_image?: string | null;
  category_id: number;
  subcategory_id?: number | null;
  category_name?: string;
  category_slug?: string;
  material: string;
  purity?: string | null;
  gross_weight?: number | null;
  net_weight?: number | null;
  stone_weight?: number | null;
  diamond_details?: string | null;
  making_charges?: number | null;
  published_price?: number | null;
  display_price: number | boolean;
  availability_status: 'in_stock' | 'made_to_order' | 'out_of_stock';
  is_featured: number | boolean;
  is_new_arrival: number | boolean;
  publication_status: 'published' | 'draft' | 'archived';
  seo_title?: string | null;
  seo_description?: string | null;
  created_at?: string;
  updated_at?: string;
  images?: ProductImage[];
  related?: Product[];
}

export interface HomepageSections {
  announcement_bar?: {
    text: string;
    link_text?: string;
    link_url?: string;
  };
  hero_section?: {
    eyebrow?: string;
    heading?: string;
    description?: string;
    primary_cta_text?: string;
    primary_cta_url?: string;
    secondary_cta_text?: string;
    secondary_cta_url?: string;
    image_url?: string;
  };
  about_section?: {
    heading?: string;
    subheading?: string;
    paragraph1?: string;
    paragraph2?: string;
    highlight?: string;
    image_url?: string;
  };
  why_choose_us?: {
    items?: Array<{
      title: string;
      description: string;
      icon?: string;
    }>;
  };
  bridal_section?: {
    heading?: string;
    description?: string;
    cta_text?: string;
    cta_url?: string;
    highlights?: string[];
    image_url?: string;
  };
}

export interface GalleryItem {
  id: number;
  title: string;
  alt_text?: string | null;
  category: string;
  image_url: string;
  display_order: number;
  is_visible: number | boolean;
  created_at?: string;
}

export interface EnquiryNote {
  id: number;
  enquiry_id: number;
  admin_id?: number | null;
  admin_name: string;
  note: string;
  created_at: string;
}

export interface Enquiry {
  id: number;
  full_name: string;
  mobile: string;
  email?: string | null;
  category?: string | null;
  product_reference?: string | null;
  message: string;
  status: 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Archived';
  created_at: string;
  updated_at?: string;
  notes?: EnquiryNote[];
}

export interface BusinessSettings {
  business_name?: string;
  tagline?: string;
  address?: string;
  google_maps_url?: string;
  google_maps_embed?: string;
  phone?: string;
  whatsapp_number?: string;
  email?: string;
  opening_hours?: string;
  currency?: string;
  currency_symbol?: string;
  instagram_url?: string;
  facebook_url?: string;
  seo_title?: string;
  seo_description?: string;
  [key: string]: string | undefined;
}

export interface AdminUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export interface DashboardStats {
  publishedProducts: number;
  draftProducts: number;
  activeCategories: number;
  totalEnquiries: number;
  newEnquiries: number;
}

