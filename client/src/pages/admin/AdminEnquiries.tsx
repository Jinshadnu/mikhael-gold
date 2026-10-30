import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Download,
  Search,
  Inbox,
  Clock,
  Eye,
  MessageCircle,
  Phone,
  Mail,
  Send,
  X,
  User,
} from 'lucide-react';
import { api } from '../../api/client';
import { Enquiry } from '../../types';
import { useSettings } from '../../context/SettingsContext';

export const AdminEnquiries: React.FC = () => {
  const queryClient = useQueryClient();
  const { getWhatsAppLink } = useSettings();

  const [status, setStatus] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [newNote, setNewNote] = useState('');

  const queryParams: Record<string, any> = { page, limit: 15 };
  if (status !== 'all') queryParams.status = status;
  if (search) queryParams.search = search;

  const { data: response, isLoading } = useQuery({
    queryKey: ['adminEnquiries', queryParams],
    queryFn: () => api.getAdminEnquiries(queryParams),
  });

  const { data: enquiryDetail, refetch: refetchDetail } = useQuery({
    queryKey: ['adminEnquiryDetail', selectedEnquiry?.id],
    queryFn: () => api.getAdminEnquiryById(selectedEnquiry!.id),
    enabled: Boolean(selectedEnquiry),
  });

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }: { id: number; status: string }) =>
      api.updateEnquiryStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminEnquiries'] });
      if (selectedEnquiry) refetchDetail();
    },
  });

  const addNoteMutation = useMutation({
    mutationFn: ({ id, note }: { id: number; note: string }) => api.addEnquiryNote(id, note),
    onSuccess: () => {
      setNewNote('');
      refetchDetail();
    },
  });

  const handleExportCsv = () => {
    const token = localStorage.getItem('mikhael_admin_token');
    fetch('/api/admin/enquiries/export/csv', {
      headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    })
      .then((res) => res.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `mikhael_customer_enquiries_${Date.now()}.csv`;
        a.click();
      });
  };

  const enquiries = response?.data || [];
  const pagination = response?.pagination || { page: 1, total: 0, totalPages: 1 };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
            Customer Enquiries & Leads
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review customer interest, track follow-ups, and manage bridal consultation appointments.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-slate-200 hover:text-white hover:bg-slate-700 font-semibold text-xs uppercase tracking-wider transition border border-slate-700 w-fit"
        >
          <Download className="w-4 h-4 text-gold-champagne" />
          <span>Export Enquiries CSV</span>
        </button>
      </div>

      {/* Filter Tabs & Search */}
      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0">
          {['all', 'New', 'Contacted', 'In Progress', 'Completed', 'Archived'].map((s) => (
            <button
              key={s}
              onClick={() => {
                setStatus(s);
                setPage(1);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition whitespace-nowrap ${
                status === s
                  ? 'bg-gold-champagne text-slate-950 font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200'
              }`}
            >
              {s === 'all' ? 'All Leads' : s}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            placeholder="Search by customer, phone, SKU…"
            className="w-full pl-9 pr-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-xs focus:border-gold-champagne outline-none"
          />
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="py-20 text-center">
            <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-xs uppercase tracking-widest text-slate-400">Loading enquiries…</p>
          </div>
        ) : enquiries.length === 0 ? (
          <div className="py-16 text-center text-slate-500 text-xs">
            No customer enquiries found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] bg-slate-900/40">
                  <th className="py-3.5 px-4 font-semibold">Customer</th>
                  <th className="py-3.5 px-4 font-semibold">Contact Info</th>
                  <th className="py-3.5 px-4 font-semibold">Interest / SKU</th>
                  <th className="py-3.5 px-4 font-semibold">Date</th>
                  <th className="py-3.5 px-4 font-semibold">Status</th>
                  <th className="py-3.5 px-4 font-semibold text-right">Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {enquiries.map((enq) => (
                  <tr key={enq.id} className="hover:bg-slate-900/40 transition">
                    <td className="py-3.5 px-4">
                      <p className="font-semibold text-slate-100">{enq.full_name}</p>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <div className="space-y-0.5">
                        <a
                          href={`tel:${enq.mobile}`}
                          className="hover:text-gold-champagne flex items-center gap-1.5"
                        >
                          <Phone className="w-3 h-3 text-slate-500" />
                          <span>{enq.mobile}</span>
                        </a>
                        {enq.email && (
                          <span className="text-[11px] text-slate-400 flex items-center gap-1.5">
                            <Mail className="w-3 h-3 text-slate-500" />
                            <span>{enq.email}</span>
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-slate-300">
                      <p className="font-medium text-slate-200">{enq.category || 'General'}</p>
                      {enq.product_reference && (
                        <p className="text-[11px] text-gold-champagne truncate max-w-xs">
                          Ref: {enq.product_reference}
                        </p>
                      )}
                    </td>

                    <td className="py-3.5 px-4 text-slate-400 text-[11px]">
                      {new Date(enq.created_at).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>

                    <td className="py-3.5 px-4">
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

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedEnquiry(enq)}
                        className="px-3 py-1.5 rounded bg-slate-900 text-slate-300 hover:text-white border border-slate-700 text-xs font-semibold transition"
                      >
                        View Full Lead
                      </button>
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
              Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} leads)
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

      {/* Enquiry Detail & Notes Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 max-w-2xl w-full shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="font-serif text-xl font-bold text-slate-100">
                  Customer Enquiry Details
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Received on {new Date(selectedEnquiry.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="p-1.5 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs">
              <div>
                <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                  Customer Name
                </span>
                <span className="font-semibold text-slate-100 text-sm">
                  {selectedEnquiry.full_name}
                </span>
              </div>

              <div>
                <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                  Mobile Number
                </span>
                <div className="flex items-center gap-3 mt-0.5">
                  <a
                    href={`tel:${selectedEnquiry.mobile}`}
                    className="font-semibold text-slate-100 hover:text-gold-champagne text-sm"
                  >
                    {selectedEnquiry.mobile}
                  </a>
                  <a
                    href={`https://wa.me/${selectedEnquiry.mobile.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      `Hello ${selectedEnquiry.full_name}, this is from Mikhael Gold and Diamonds regarding your recent jewellery enquiry.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2 py-0.5 rounded bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 text-[10px] uppercase font-bold"
                  >
                    WhatsApp
                  </a>
                </div>
              </div>

              {selectedEnquiry.email && (
                <div>
                  <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                    Email Address
                  </span>
                  <span className="text-slate-200">{selectedEnquiry.email}</span>
                </div>
              )}

              <div>
                <span className="text-slate-400 uppercase tracking-wider block text-[10px]">
                  Category & Reference
                </span>
                <span className="text-slate-200">
                  {selectedEnquiry.category || 'General'}
                  {selectedEnquiry.product_reference && ` • ${selectedEnquiry.product_reference}`}
                </span>
              </div>
            </div>

            {/* Message */}
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-300 block mb-2">
                Customer Message
              </span>
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedEnquiry.message}
              </div>
            </div>

            {/* Internal Notes History */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider font-semibold text-slate-300 block">
                Internal Staff Notes & Follow-up History
              </span>

              {enquiryDetail?.notes && enquiryDetail.notes.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {enquiryDetail.notes.map((note) => (
                    <div
                      key={note.id}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 text-xs space-y-1"
                    >
                      <div className="flex items-center justify-between text-slate-400 text-[10px]">
                        <span className="font-semibold text-gold-champagne">{note.admin_name}</span>
                        <span>{new Date(note.created_at).toLocaleString()}</span>
                      </div>
                      <p className="text-slate-200">{note.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-500 italic">No internal notes added yet.</p>
              )}

              {/* Add Note Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  placeholder="Add note (e.g. Called customer, scheduled viewing on Sunday 3 PM)…"
                  className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-100 focus:border-gold-champagne outline-none"
                />
                <button
                  onClick={() => {
                    if (newNote.trim()) {
                      addNoteMutation.mutate({ id: selectedEnquiry.id, note: newNote });
                    }
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-200 hover:text-white font-semibold text-xs transition border border-slate-700"
                >
                  Add Note
                </button>
              </div>
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs font-semibold hover:text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

