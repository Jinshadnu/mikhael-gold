import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../../api/client';

export const AdminSettings: React.FC = () => {
  const queryClient = useQueryClient();

  const [settings, setSettings] = useState({
    business_name: '',
    tagline: '',
    address: '',
    google_maps_url: '',
    phone: '',
    whatsapp_number: '',
    email: '',
    opening_hours: '',
    currency: 'INR',
    currency_symbol: '₹',
    seo_title: '',
    seo_description: '',
  });

  const [passwordState, setPasswordState] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [saveSuccess, setSaveSuccess] = useState('');
  const [saveError, setSaveError] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { data: serverSettings, isLoading } = useQuery({
    queryKey: ['adminSettings'],
    queryFn: api.getAdminSettings,
  });

  useEffect(() => {
    if (serverSettings) {
      setSettings({
        business_name: serverSettings.business_name || '',
        tagline: serverSettings.tagline || '',
        address: serverSettings.address || '',
        google_maps_url: serverSettings.google_maps_url || '',
        phone: serverSettings.phone || '',
        whatsapp_number: serverSettings.whatsapp_number || '',
        email: serverSettings.email || '',
        opening_hours: serverSettings.opening_hours || '',
        currency: serverSettings.currency || 'INR',
        currency_symbol: serverSettings.currency_symbol || '₹',
        seo_title: serverSettings.seo_title || '',
        seo_description: serverSettings.seo_description || '',
      });
    }
  }, [serverSettings]);

  const updateSettingsMutation = useMutation({
    mutationFn: (data: any) => api.updateAdminSettings(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminSettings'] });
      queryClient.invalidateQueries({ queryKey: ['publicSettings'] });
      setSaveSuccess('Business settings saved successfully.');
      setTimeout(() => setSaveSuccess(''), 4000);
    },
    onError: (err: any) => {
      setSaveError(err.message || 'Failed to update settings');
    },
  });

  const handleSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess('');
    setSaveError('');
    updateSettingsMutation.mutate(settings);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordSuccess('');
    setPasswordError('');

    if (passwordState.newPassword !== passwordState.confirmPassword) {
      setPasswordError('New passwords do not match.');
      return;
    }

    if (passwordState.newPassword.length < 8) {
      setPasswordError('New password must be at least 8 characters long.');
      return;
    }

    try {
      await api.changePassword({
        currentPassword: passwordState.currentPassword,
        newPassword: passwordState.newPassword,
      });
      setPasswordSuccess('Password changed successfully.');
      setPasswordState({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setTimeout(() => setPasswordSuccess(''), 4000);
    } catch (err: any) {
      setPasswordError(err.message || 'Failed to change password.');
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-slate-400">Loading settings…</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Store Settings & Configuration
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Update business identity, showroom address, contact telephone, WhatsApp links, and
          security.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSettingsSubmit} className="space-y-6">
        {saveSuccess && (
          <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{saveSuccess}</span>
          </div>
        )}

        {saveError && (
          <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{saveError}</span>
          </div>
        )}

        {/* Business Identity */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Business Identity
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Business Name
              </label>
              <input
                type="text"
                value={settings.business_name}
                onChange={(e) => setSettings({ ...settings, business_name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Brand Tagline
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>
        </div>

        {/* Showroom Location & Contact */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Showroom Location & Contact
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Showroom Physical Address
            </label>
            <input
              type="text"
              value={settings.address}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Google Maps Link
              </label>
              <input
                type="text"
                value={settings.google_maps_url}
                onChange={(e) => setSettings({ ...settings, google_maps_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Opening Hours
              </label>
              <input
                type="text"
                value={settings.opening_hours}
                onChange={(e) => setSettings({ ...settings, opening_hours: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Showroom Phone
              </label>
              <input
                type="text"
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+91 94470 00000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                WhatsApp Number (with country code)
              </label>
              <input
                type="text"
                value={settings.whatsapp_number}
                onChange={(e) => setSettings({ ...settings, whatsapp_number: e.target.value })}
                placeholder="919447000000"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="contact@mikhaelgold.com"
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>
        </div>

        {/* Currency & Defaults */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Currency & Regional Defaults
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Currency Code
              </label>
              <input
                type="text"
                value={settings.currency}
                onChange={(e) => setSettings({ ...settings, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Currency Symbol
              </label>
              <input
                type="text"
                value={settings.currency_symbol}
                onChange={(e) => setSettings({ ...settings, currency_symbol: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
              />
            </div>
          </div>
        </div>

        {/* SEO Defaults */}
        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
          <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3">
            Global Search Engine Optimization (SEO)
          </h2>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Default Meta Title
            </label>
            <input
              type="text"
              value={settings.seo_title}
              onChange={(e) => setSettings({ ...settings, seo_title: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Default Meta Description
            </label>
            <textarea
              rows={2}
              value={settings.seo_description}
              onChange={(e) => setSettings({ ...settings, seo_description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 focus:border-gold-champagne outline-none resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={updateSettingsMutation.isPending}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gold-champagne text-slate-950 font-bold text-xs uppercase tracking-widest hover:bg-gold-light hover:shadow-gold-glow transition"
          >
            <Save className="w-4 h-4" />
            <span>{updateSettingsMutation.isPending ? 'Saving…' : 'Save All Settings'}</span>
          </button>
        </div>
      </form>

      {/* Security: Change Password */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <h2 className="font-serif text-lg font-bold text-slate-100 border-b border-slate-800 pb-3 flex items-center gap-2">
          <Lock className="w-4 h-4 text-gold-champagne" />
          <span>Change Administrator Password</span>
        </h2>

        {passwordSuccess && (
          <div className="p-3.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{passwordSuccess}</span>
          </div>
        )}

        {passwordError && (
          <div className="p-3.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
            <span>{passwordError}</span>
          </div>
        )}

        <form onSubmit={handlePasswordSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Current Password *
            </label>
            <input
              type="password"
              required
              value={passwordState.currentPassword}
              onChange={(e) =>
                setPasswordState({ ...passwordState, currentPassword: e.target.value })
              }
              className="w-full sm:w-80 px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                New Password (minimum 8 characters) *
              </label>
              <input
                type="password"
                required
                value={passwordState.newPassword}
                onChange={(e) =>
                  setPasswordState({ ...passwordState, newPassword: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Confirm New Password *
              </label>
              <input
                type="password"
                required
                value={passwordState.confirmPassword}
                onChange={(e) =>
                  setPasswordState({ ...passwordState, confirmPassword: e.target.value })
                }
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-slate-800 text-slate-100 hover:text-gold-champagne hover:bg-slate-700 font-bold uppercase tracking-wider text-xs border border-slate-700 transition"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
