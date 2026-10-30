import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';
import { ArrowLeft, Save, Upload, X, AlertCircle, CheckCircle, Image as ImageIcon } from 'lucide-react';
import { api } from '../../api/client';

export const AdminProductEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    sku: '',
    slug: '',
    short_description: '',
    full_description: '',
    main_image: '',
    category_id: 1,
    material: '22K Gold (916 BIS Hallmarked)',
    purity: '22K (916)',
    gross_weight: '' as any,
    net_weight: '' as any,
    stone_weight: '' as any,
    diamond_details: '',
    making_charges: '' as any,
    published_price: '' as any,
    display_price: 0,
    availability_status: 'in_stock',
    is_featured: 0,
    is_new_arrival: 0,
    publication_status: 'published',
    seo_title: '',
    seo_description: '',
    gallery_images: [] as string[],
  });

  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { data: categories = [] } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: api.getAdminCategories,
  });

  const { data: existingProduct, isLoading: isLoadingProduct } = useQuery({
    queryKey: ['adminProductDetail', id],
    queryFn: () => api.getAdminProductById(id!),
    enabled: isEditing,
  });

  useEffect(() => {
    if (existingProduct) {
      setFormData({
        name: existingProduct.name || '',
        sku: existingProduct.sku || '',
        slug: existingProduct.slug || '',
        short_description: existingProduct.short_description || '',
        full_description: existingProduct.full_description || '',
        main_image: existingProduct.main_image || '',
        category_id: existingProduct.category_id || 1,
        material: existingProduct.material || '22K Gold (916 BIS Hallmarked)',
        purity: existingProduct.purity || '22K (916)',
        gross_weight: existingProduct.gross_weight ?? '',
        net_weight: existingProduct.net_weight ?? '',
        stone_weight: existingProduct.stone_weight ?? '',
        diamond_details: existingProduct.diamond_details || '',
        making_charges: existingProduct.making_charges ?? '',
        published_price: existingProduct.published_price ?? '',
        display_price: existingProduct.display_price ? 1 : 0,
        availability_status: existingProduct.availability_status || 'in_stock',
        is_featured: existingProduct.is_featured ? 1 : 0,
        is_new_arrival: existingProduct.is_new_arrival ? 1 : 0,
        publication_status: existingProduct.publication_status || 'published',
        seo_title: existingProduct.seo_title || '',
        seo_description: existingProduct.seo_description || '',
        gallery_images: existingProduct.images?.map((i) => i.image_url) || [],
      });
    }
  }, [existingProduct]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const res = await api.uploadImage(file);
      setFormData((prev) => ({
        ...prev,
        main_image: res.url,
      }));
    } catch (err: any) {
      setErrorMessage(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.sku.trim()) {
      setErrorMessage('Product name and SKU are required.');
      return;
    }

    const payload = {
      ...formData,
      category_id: Number(formData.category_id),
      gross_weight: formData.gross_weight ? parseFloat(formData.gross_weight) : null,
      net_weight: formData.net_weight ? parseFloat(formData.net_weight) : null,
      stone_weight: formData.stone_weight ? parseFloat(formData.stone_weight) : null,
      making_charges: formData.making_charges ? parseFloat(formData.making_charges) : null,
      published_price: formData.published_price ? parseFloat(formData.published_price) : null,
    };

    try {
      if (isEditing) {
        await api.updateProduct(id!, payload);
        setSuccessMessage('Product updated successfully.');
      } else {
        await api.createProduct(payload);
        navigate('/admin/products');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to save product.');
    }
  };

  if (isEditing && isLoadingProduct) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-slate-400">Loading product…</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/admin/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </Link>

        <h1 className="font-serif text-2xl font-bold text-slate-100">
          {isEditing ? 'Edit Jewellery Piece' : 'Add New Jewellery Piece'}
        </h1>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2.5">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            General Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Product Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Lakshmi Kasu Mala Heritage Necklace"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                SKU / Code *
              </label>
              <input
                type="text"
                required
                value={formData.sku}
                onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                placeholder="e.g. MGD-NL-001"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm font-mono text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Category *
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: Number(e.target.value) })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                URL Slug (Optional)
              </label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="auto-generated-if-empty"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Short Description
            </label>
            <textarea
              rows={2}
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="Brief summary for product cards and search results…"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Full Description
            </label>
            <textarea
              rows={4}
              value={formData.full_description}
              onChange={(e) => setFormData({ ...formData, full_description: e.target.value })}
              placeholder="Detailed craft narrative, motifs, and styling advice…"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
            />
          </div>
        </div>

        {/* Specifications */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Specifications & Weight Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Material
              </label>
              <input
                type="text"
                value={formData.material}
                onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                placeholder="e.g. 22K Gold"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Purity
              </label>
              <input
                type="text"
                value={formData.purity}
                onChange={(e) => setFormData({ ...formData, purity: e.target.value })}
                placeholder="e.g. 22K (916)"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Gross Weight (grams)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.gross_weight}
                onChange={(e) => setFormData({ ...formData, gross_weight: e.target.value })}
                placeholder="e.g. 48.500"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Net Gold Weight (grams)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.net_weight}
                onChange={(e) => setFormData({ ...formData, net_weight: e.target.value })}
                placeholder="e.g. 48.500"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Stone Weight (grams / carats)
              </label>
              <input
                type="number"
                step="0.001"
                value={formData.stone_weight}
                onChange={(e) => setFormData({ ...formData, stone_weight: e.target.value })}
                placeholder="0.000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Making Charges (₹)
              </label>
              <input
                type="number"
                step="1"
                value={formData.making_charges}
                onChange={(e) => setFormData({ ...formData, making_charges: e.target.value })}
                placeholder="Optional"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Diamond / Gemstone Details
            </label>
            <input
              type="text"
              value={formData.diamond_details}
              onChange={(e) => setFormData({ ...formData, diamond_details: e.target.value })}
              placeholder="e.g. 1.10 ct, Round Brilliant, VVS1, E Color, IGI Certified"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
            />
          </div>
        </div>

        {/* Pricing & Visibility Toggles */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Pricing & Display Options
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Published Price (₹)
              </label>
              <input
                type="number"
                step="1"
                value={formData.published_price}
                onChange={(e) => setFormData({ ...formData, published_price: e.target.value })}
                placeholder="e.g. 185000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div className="pt-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.display_price)}
                  onChange={(e) =>
                    setFormData({ ...formData, display_price: e.target.checked ? 1 : 0 })
                  }
                  className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
                />
                <span className="text-xs text-slate-200 font-semibold">
                  Show published price on website
                </span>
              </label>
              <p className="text-[11px] text-slate-400 mt-1 pl-7">
                If unchecked, the website displays "Contact Us for Price".
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Availability
              </label>
              <select
                value={formData.availability_status}
                onChange={(e) =>
                  setFormData({ ...formData, availability_status: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              >
                <option value="in_stock">In Showroom</option>
                <option value="made_to_order">Made to Order</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Publication Status
              </label>
              <select
                value={formData.publication_status}
                onChange={(e) =>
                  setFormData({ ...formData, publication_status: e.target.value as any })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              >
                <option value="published">Published (Visible)</option>
                <option value="draft">Draft (Hidden)</option>
              </select>
            </div>

            <div className="space-y-2 pt-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.is_featured)}
                  onChange={(e) =>
                    setFormData({ ...formData, is_featured: e.target.checked ? 1 : 0 })
                  }
                  className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
                />
                <span className="text-xs text-slate-300 font-medium">Featured Collection</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={Boolean(formData.is_new_arrival)}
                  onChange={(e) =>
                    setFormData({ ...formData, is_new_arrival: e.target.checked ? 1 : 0 })
                  }
                  className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
                />
                <span className="text-xs text-slate-300 font-medium">New Arrival Badge</span>
              </label>
            </div>
          </div>
        </div>

        {/* Image Management */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Product Photography
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Upload or URL input */}
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Main Image URL or Upload
                </label>
                <input
                  type="text"
                  value={formData.main_image}
                  onChange={(e) => setFormData({ ...formData, main_image: e.target.value })}
                  placeholder="https://... or upload below"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
                />
              </div>

              <div>
                <label className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 hover:bg-slate-700 cursor-pointer text-xs font-semibold tracking-wider uppercase border border-slate-700 transition">
                  <Upload className="w-4 h-4 text-gold-champagne" />
                  <span>{isUploading ? 'Uploading Image…' : 'Upload Image File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                </label>
                <p className="text-[11px] text-slate-500 mt-1">
                  Supported formats: JPEG, PNG, WEBP, AVIF (Max 5MB)
                </p>
              </div>
            </div>

            {/* Preview */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Image Preview
              </label>
              <div className="w-36 h-36 rounded-xl overflow-hidden bg-slate-900 border border-slate-800 flex items-center justify-center">
                {formData.main_image ? (
                  <img
                    src={formData.main_image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-8 h-8 text-slate-700" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* SEO Metadata */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Search Engine Optimization (SEO)
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Custom Page Title
            </label>
            <input
              type="text"
              value={formData.seo_title}
              onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
              placeholder="e.g. Lakshmi Kasu Mala 22K Gold Necklace | Mikhael Gold"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Meta Description
            </label>
            <textarea
              rows={2}
              value={formData.seo_description}
              onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
              placeholder="Concise summary for Google search listings…"
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none resize-none"
            />
          </div>
        </div>

        {/* Submit Bar */}
        <div className="flex items-center justify-end gap-3 pt-4">
          <Link
            to="/admin/products"
            className="px-5 py-3 rounded-lg border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold uppercase tracking-wider transition"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-light hover:shadow-gold-glow transition"
          >
            <Save className="w-4 h-4" />
            <span>{isEditing ? 'Save Changes' : 'Create Product'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

