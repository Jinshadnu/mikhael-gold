import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Package,
  Layers,
  Inbox,
  Sparkles,
  ArrowRight,
  Plus,
  Eye,
  CheckCircle,
  Clock,
} from 'lucide-react';
import { api } from '../../api/client';
import { useSettings } from '../../context/SettingsContext';

export const DashboardOverview: React.FC = () => {
  const queryClient = useQueryClient();
  const { formatPrice } = useSettings();

  const { data, isLoading } = useQuery({
    queryKey: ['adminDashboard'],
    queryFn: api.getDashboardStats,
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.updateEnquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });

  const togglePublishMutation = useMutation({
    mutationFn: (id: number) => api.toggleProductPublish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminDashboard'] });
    },
  });

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-slate-400">Loading dashboard metrics…</p>
      </div>
    );
  }

  const stats = data?.stats || {
    publishedProducts: 0,
    draftProducts: 0,
    activeCategories: 0,
    totalEnquiries: 0,
    newEnquiries: 0,
  };

  const recentEnquiries = data?.recentEnquiries || [];
  const recentProducts = data?.recentProducts || [];

  return (
    <div className="space-y-8">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
            Showroom Overview
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time status of products, customer requests, and website content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-wider hover:bg-gold-light transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Product</span>
          </Link>
          <Link
            to="/admin/enquiries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 font-semibold text-xs uppercase tracking-wider transition border border-slate-700"
          >
            <Inbox className="w-4 h-4 text-gold-champagne" />
            <span>Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Published</span>
            <Package className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-100">{stats.publishedProducts}</p>
          <p className="text-[11px] text-emerald-400/90 mt-1">Live in catalogue</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Drafts</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-100">{stats.draftProducts}</p>
          <p className="text-[11px] text-amber-400/90 mt-1">Unpublished items</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Categories</span>
            <Layers className="w-4 h-4 text-gold-champagne" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-100">{stats.activeCategories}</p>
          <p className="text-[11px] text-slate-400 mt-1">Active collections</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider">New Enquiries</span>
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-amber-400">{stats.newEnquiries}</p>
          <p className="text-[11px] text-slate-400 mt-1">Awaiting response</p>
        </div>

        <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 shadow-sm">
          <div className="flex items-center justify-between text-slate-400 mb-3">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Enquiries</span>
            <Inbox className="w-4 h-4 text-blue-400" />
          </div>
          <p className="font-serif text-3xl font-bold text-slate-100">{stats.totalEnquiries}</p>
          <p className="text-[11px] text-slate-400 mt-1">All time received</p>
        </div>
      </div>

      {/* Two Column Grid: Recent Enquiries & Recent Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recent Enquiries (7 cols) */}
        <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">
                  Recent Customer Enquiries
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Direct requests from website visitors</p>
              </div>
              <Link
                to="/admin/enquiries"
                className="text-xs font-semibold text-gold-champagne hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentEnquiries.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No customer enquiries recorded yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px]">
                      <th className="pb-3 font-semibold">Customer</th>
                      <th className="pb-3 font-semibold">Interest</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {recentEnquiries.map((enq) => (
                      <tr key={enq.id} className="hover:bg-slate-900/40 transition">
                        <td className="py-3">
                          <p className="font-semibold text-slate-200">{enq.full_name}</p>
                          <p className="text-[11px] text-slate-400">{enq.mobile}</p>
                        </td>
                        <td className="py-3 text-slate-300">
                          {enq.category || 'General'}
                        </td>
                        <td className="py-3">
                          <select
                            value={enq.status}
                            onChange={(e) =>
                              updateStatusMutation.mutate({ id: enq.id, status: e.target.value })
                            }
                            className={`px-2 py-1 rounded text-[11px] font-semibold border bg-slate-900 outline-none ${
                              enq.status === 'New'
                                ? 'text-amber-400 border-amber-500/40'
                                : enq.status === 'Contacted'
                                ? 'text-blue-400 border-blue-500/40'
                                : 'text-emerald-400 border-emerald-500/40'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Completed</option>
                            <option value="Archived">Archived</option>
                          </select>
                        </td>
                        <td className="py-3 text-right">
                          <Link
                            to={`/admin/enquiries`}
                            className="p-1.5 text-slate-400 hover:text-gold-champagne inline-block"
                            title="View Enquiry Details"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Recent Products (5 cols) */}
        <div className="lg:col-span-5 bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-serif text-lg font-bold text-slate-100">Recent Products</h3>
                <p className="text-xs text-slate-400 mt-0.5">Recently edited catalogue items</p>
              </div>
              <Link
                to="/admin/products"
                className="text-xs font-semibold text-gold-champagne hover:underline flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentProducts.length === 0 ? (
              <div className="py-12 text-center text-slate-500 text-xs">
                No products found in catalogue.
              </div>
            ) : (
              <div className="space-y-3">
                {recentProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900/60 border border-slate-800/60 hover:border-slate-700 transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md overflow-hidden bg-slate-800 shrink-0">
                        {prod.main_image && (
                          <img
                            src={prod.main_image}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="truncate max-w-[150px] sm:max-w-[200px]">
                        <p className="text-xs font-semibold text-slate-200 truncate">{prod.name}</p>
                        <p className="text-[10px] text-slate-400 uppercase font-mono">{prod.sku}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => togglePublishMutation.mutate(prod.id)}
                        className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider border transition ${
                          prod.publication_status === 'published'
                            ? 'bg-emerald-950/40 text-emerald-400 border-emerald-600/40 hover:bg-emerald-900/40'
                            : 'bg-amber-950/40 text-amber-400 border-amber-600/40 hover:bg-amber-900/40'
                        }`}
                      >
                        {prod.publication_status}
                      </button>

                      <Link
                        to={`/admin/products/${prod.id}/edit`}
                        className="p-1 text-slate-400 hover:text-gold-champagne"
                        title="Edit product"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

