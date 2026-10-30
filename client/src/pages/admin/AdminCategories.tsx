import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Layers, AlertCircle, X, Upload } from 'lucide-react';
import { api } from '../../api/client';
import { Category } from '../../types';

export const AdminCategories: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalCategory, setModalCategory] = useState<Partial<Category> | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<Category | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['adminCategories'],
    queryFn: api.getAdminCategories,
  });

  const saveMutation = useMutation({
    mutationFn: (cat: Partial<Category>) => {
      if (cat.id) {
        return api.updateCategory(cat.id, cat);
      } else {
        return api.createCategory(cat);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setModalCategory(null);
      setErrorMessage('');
    },
    onError: (err: any) => {
      setErrorMessage(err.message || 'Failed to save category');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminCategories'] });
      setDeleteConfirm(null);
      setErrorMessage('');
    },
    onError: (err: any) => {
      setErrorMessage(err.message || 'Cannot delete category');
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !modalCategory) return;
    try {
      setIsUploading(true);
      const res = await api.uploadImage(file);
      setModalCategory((prev) => ({ ...prev, image_url: res.url }));
    } catch (err: any) {
      setErrorMessage(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
            Category Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Organise and structure your jewellery collections and catalogue navigation.
          </p>
        </div>

        <button
          onClick={() =>
            setModalCategory({
              name: '',
              slug: '',
              description: '',
              image_url: '',
              display_order: categories.length + 1,
              is_active: 1,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-red-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Categories Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Loading categories…</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-900/40">
                  <th className="py-3.5 px-4 font-semibold">Category</th>
                  <th className="py-3.5 px-4 font-semibold">URL Slug</th>
                  <th className="py-3.5 px-4 font-semibold">Products</th>
                  <th className="py-3.5 px-4 font-semibold">Order</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {categories.map((cat) => (
                  <tr key={cat.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-800 shrink-0 border border-slate-700">
                          {cat.image_url ? (
                            <img src={cat.image_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-slate-600">
                              <Layers className="w-5 h-5" />
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-100">{cat.name}</p>
                          <p className="text-[11px] text-slate-400 line-clamp-1">{cat.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{cat.slug}</td>
                    <td className="py-3.5 px-4 text-slate-300 font-semibold">{cat.product_count || 0} items</td>
                    <td className="py-3.5 px-4 text-slate-300">{cat.display_order}</td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          Boolean(cat.is_active)
                            ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-600/40'
                            : 'bg-slate-800 text-slate-400 border border-slate-700'
                        }`}
                      >
                        {Boolean(cat.is_active) ? 'Active' : 'Disabled'}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setModalCategory(cat)}
                          className="p-1.5 text-slate-400 hover:text-gold-champagne rounded"
                          title="Edit category"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(cat)}
                          className="p-1.5 text-slate-400 hover:text-red-400 rounded"
                          title="Delete category"
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
      </div>

      {/* Add / Edit Category Modal */}
      {modalCategory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-100">
                {modalCategory.id ? 'Edit Category' : 'Create Category'}
              </h3>
              <button
                onClick={() => setModalCategory(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  value={modalCategory.name || ''}
                  onChange={(e) => setModalCategory({ ...modalCategory, name: e.target.value })}
                  placeholder="e.g. Gold Necklaces"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                  Slug (Optional)
                </label>
                <input
                  type="text"
                  value={modalCategory.slug || ''}
                  onChange={(e) => setModalCategory({ ...modalCategory, slug: e.target.value })}
                  placeholder="auto-generated-from-name"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                  Short Description
                </label>
                <textarea
                  rows={2}
                  value={modalCategory.description || ''}
                  onChange={(e) =>
                    setModalCategory({ ...modalCategory, description: e.target.value })
                  }
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="block uppercase tracking-wider font-semibold text-slate-300">
                  Category Image
                </label>
                <input
                  type="text"
                  value={modalCategory.image_url || ''}
                  onChange={(e) => setModalCategory({ ...modalCategory, image_url: e.target.value })}
                  placeholder="https://... or upload"
                  className="w-full px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none"
                />
                <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer border border-slate-700">
                  <Upload className="w-3.5 h-3.5 text-gold-champagne" />
                  <span>{isUploading ? 'Uploading…' : 'Upload File'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={modalCategory.display_order ?? 0}
                    onChange={(e) =>
                      setModalCategory({
                        ...modalCategory,
                        display_order: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none"
                  />
                </div>

                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(modalCategory.is_active)}
                      onChange={(e) =>
                        setModalCategory({
                          ...modalCategory,
                          is_active: e.target.checked ? 1 : 0,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
                    />
                    <span className="text-slate-300 font-semibold">Active Category</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setModalCategory(null)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => saveMutation.mutate(modalCategory)}
                disabled={saveMutation.isPending}
                className="px-5 py-2 rounded-lg bg-gold-champagne text-slate-950 font-bold uppercase tracking-wider hover:bg-gold-light"
              >
                {saveMutation.isPending ? 'Saving…' : 'Save Category'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-100">
              Delete "{deleteConfirm.name}"?
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              If this category has active products attached to it, deletion will be blocked by the
              database until those products are reassigned or removed.
            </p>
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm.id)}
                className="px-4 py-2 rounded-lg bg-red-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-red-500"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
