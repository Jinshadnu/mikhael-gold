import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import { api } from '../../api/client';
import { Product } from '../../types';
import { useSettings } from '../../context/SettingsContext';

export const AdminProducts: React.FC = () => {
  const queryClient = useQueryClient();
  const { formatPrice } = useSettings();

  const [search, setSearch] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [status, setStatus] = useState('all');
  const [page, setPage] = useState(1);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: api.getAdminCategories,
  });

  const queryParams: Record<string, any> = {
    page,
    limit: 15,
  };
  if (search) queryParams.search = search;
  if (categoryId) queryParams.category_id = categoryId;
  if (status !== 'all') queryParams.status = status;

  const { data: response, isLoading } = useQuery({
    queryKey: ['adminProductsList', queryParams],
    queryFn: () => api.getAdminProducts(queryParams),
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: number) => api.toggleProductPublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProductsList'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminProductsList'] });
      setProductToDelete(null);
    },
  });

  const products = response?.data || [];
  const pagination = response?.pagination || { page: 1, total: 0, totalPages: 1 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
            Product Catalogue Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Manage your gold and diamond jewellery inventory, specifications, and visibility.
          </p>
        </div>

        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </Link>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by name, SKU, or material…"
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:border-gold-champagne focus:outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={categoryId}
            onChange={(e) => {
              setCategoryId(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-gold-champagne outline-none"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:border-gold-champagne outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Loading products…</p>
          </div>
        ) : products.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No products match the selected criteria.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-900/40">
                  <th className="py-3.5 px-4 font-semibold">Jewellery</th>
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">Specifications</th>
                  <th className="py-3.5 px-4 font-semibold">Price</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-900/40 transition">
                    {/* Jewellery item */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                          {product.main_image ? (
                            <img
                              src={product.main_image}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              No img
                            </div>
                          )}
                        </div>
                        <div className="max-w-xs">
                          <p className="font-semibold text-slate-100 truncate">{product.name}</p>
                          <p className="text-[10px] font-mono text-slate-400 uppercase">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4 text-slate-300">
                      {product.category_name || 'Unassigned'}
                    </td>

                    {/* Specs */}
                    <td className="py-3.5 px-4 text-slate-400">
                      <div className="space-y-0.5">
                        {product.purity && (
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-gold-champagne border border-slate-700 mr-2">
                            {product.purity}
                          </span>
                        )}
                        {product.gross_weight && (
                          <span className="text-[11px] text-slate-300">
                            {product.gross_weight}g
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      {Boolean(product.display_price) && product.published_price ? (
                        <span className="font-semibold text-slate-200">
                          {formatPrice(product.published_price)}
                        </span>
                      ) : (
                        <span className="text-slate-500 text-[11px] italic">
                          Contact for Price
                        </span>
                      )}
                    </td>

                    {/* Status Toggle */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => togglePublishMutation.mutate(product.id)}
                        className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider border transition ${
                          product.publication_status === 'published'
                            ? 'bg-emerald-950/50 text-emerald-400 border-emerald-600/40 hover:bg-emerald-900/50'
                            : 'bg-amber-950/50 text-amber-400 border-amber-600/40 hover:bg-amber-900/50'
                        }`}
                      >
                        {product.publication_status}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/products/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-slate-400 hover:text-white rounded"
                          title="View on site"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/products/${product.id}/edit`}
                          className="p-1.5 text-slate-400 hover:text-gold-champagne rounded"
                          title="Edit product"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => setProductToDelete(product)}
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Footer */}
        {pagination.totalPages > 1 && (
          <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
            <span>
              Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} total
              products)
            </span>
            <div className="flex gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-40"
              >
                Previous
              </button>
              <button
                disabled={page >= pagination.totalPages}
                onClick={() => setPage(page + 1)}
                className="px-3 py-1 rounded bg-slate-900 border border-slate-700 disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6 shrink-0" />
              <h3 className="font-serif text-xl font-bold text-slate-100">Confirm Deletion</h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to delete{' '}
              <strong className="text-white">"{productToDelete.name}"</strong> (SKU:{' '}
              {productToDelete.sku})? This will permanently remove the product and its associated
              images.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(productToDelete.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-500"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

