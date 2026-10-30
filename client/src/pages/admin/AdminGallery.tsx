import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Edit, Trash2, Upload, AlertCircle, X, Image as ImageIcon } from 'lucide-react';
import { api } from '../../api/client';
import { GalleryItem } from '../../types';

export const AdminGallery: React.FC = () => {
  const queryClient = useQueryClient();
  const [modalItem, setModalItem] = useState<Partial<GalleryItem> | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<GalleryItem | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['adminGalleryItems'],
    queryFn: api.getAdminGallery,
  });

  const saveMutation = useMutation({
    mutationFn: (item: Partial<GalleryItem>) => {
      if (item.id) {
        return api.updateGalleryImage(item.id, item);
      } else {
        return api.createGalleryImage(item);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminGalleryItems'] });
      queryClient.invalidateQueries({ queryKey: ['publicGallery'] });
      setModalItem(null);
      setErrorMessage('');
    },
    onError: (err: any) => {
      setErrorMessage(err.message || 'Failed to save gallery item');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => api.deleteGalleryImage(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminGalleryItems'] });
      queryClient.invalidateQueries({ queryKey: ['publicGallery'] });
      setDeleteConfirm(null);
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !modalItem) return;
    try {
      setIsUploading(true);
      const res = await api.uploadImage(file);
      setModalItem((prev) => ({ ...prev, image_url: res.url }));
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
            Gallery Management
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Upload, categorize, and organize jewellery photography for the public showroom gallery.
          </p>
        </div>

        <button
          onClick={() =>
            setModalItem({
              title: '',
              alt_text: '',
              category: 'Bridal',
              image_url: '',
              display_order: items.length + 1,
              is_visible: 1,
            })
          }
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition shadow-sm w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Gallery Image</span>
        </button>
      </div>

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{errorMessage}</span>
          </div>
          <button onClick={() => setErrorMessage('')} className="text-red-300 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Grid */}
      {isLoading ? (
        <div className="py-20 text-center">
          <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-xs uppercase tracking-widest text-slate-400">Loading gallery…</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 rounded-xl overflow-hidden border border-slate-800 shadow-sm flex flex-col justify-between"
            >
              <div className="aspect-square w-full relative bg-slate-900">
                <img
                  src={item.image_url}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <span className="absolute top-2 left-2 px-2.5 py-0.5 rounded text-[10px] font-semibold uppercase bg-slate-950/80 text-gold-champagne backdrop-blur-sm border border-slate-700">
                  {item.category}
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm truncate">{item.title}</h4>
                  <p className="text-[11px] text-slate-400">Order: {item.display_order}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <span
                    className={`text-[10px] font-semibold uppercase ${
                      Boolean(item.is_visible) ? 'text-emerald-400' : 'text-slate-500'
                    }`}
                  >
                    {Boolean(item.is_visible) ? 'Visible' : 'Hidden'}
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setModalItem(item)}
                      className="p-1.5 text-slate-400 hover:text-gold-champagne"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(item)}
                      className="p-1.5 text-slate-400 hover:text-red-400"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload/Edit Modal */}
      {modalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-lg w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-serif text-xl font-bold text-slate-100">
                {modalItem.id ? 'Edit Image' : 'Upload Gallery Photo'}
              </h3>
              <button
                onClick={() => setModalItem(null)}
                className="p-1 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                  Title / Caption *
                </label>
                <input
                  type="text"
                  required
                  value={modalItem.title || ''}
                  onChange={(e) => setModalItem({ ...modalItem, title: e.target.value })}
                  placeholder="e.g. Traditional Kasu Mala Suite"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
                />
              </div>

              <div>
                <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                  Category *
                </label>
                <select
                  value={modalItem.category || 'Bridal'}
                  onChange={(e) => setModalItem({ ...modalItem, category: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
                >
                  <option value="Bridal">Bridal</option>
                  <option value="Necklaces">Necklaces</option>
                  <option value="Bangles">Bangles</option>
                  <option value="Diamonds">Diamonds</option>
                  <option value="Earrings">Earrings</option>
                  <option value="Showroom">Showroom</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block uppercase tracking-wider font-semibold text-slate-300">
                  Image URL or Upload File
                </label>
                <input
                  type="text"
                  value={modalItem.image_url || ''}
                  onChange={(e) => setModalItem({ ...modalItem, image_url: e.target.value })}
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
                    value={modalItem.display_order ?? 0}
                    onChange={(e) =>
                      setModalItem({
                        ...modalItem,
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
                      checked={Boolean(modalItem.is_visible)}
                      onChange={(e) =>
                        setModalItem({
                          ...modalItem,
                          is_visible: e.target.checked ? 1 : 0,
                        })
                      }
                      className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
                    />
                    <span className="text-slate-300 font-semibold">Visible in Gallery</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-800">
              <button
                onClick={() => setModalItem(null)}
                className="px-4 py-2 rounded-lg border border-slate-700 text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (!modalItem.title || !modalItem.image_url) {
                    setErrorMessage('Title and Image are required.');
                    return;
                  }
                  saveMutation.mutate(modalItem);
                }}
                disabled={saveMutation.isPending}
                className="px-5 py-2 rounded-lg bg-gold-champagne text-slate-950 font-bold uppercase tracking-wider hover:bg-gold-light"
              >
                {saveMutation.isPending ? 'Saving…' : 'Save Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-red-500/30 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif text-xl font-bold text-slate-100">Delete Photo?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Are you sure you want to remove "{deleteConfirm.title}" from the gallery?
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
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
