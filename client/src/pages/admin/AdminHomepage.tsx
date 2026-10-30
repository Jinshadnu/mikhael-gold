import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, CheckCircle, Upload, FileText, AlertCircle } from 'lucide-react';
import { api } from '../../api/client';

export const AdminHomepage: React.FC = () => {
  const queryClient = useQueryClient();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const { data: sections = [], isLoading } = useQuery({
    queryKey: ['adminHomepageSections'],
    queryFn: api.getAdminHomepage,
  });

  const [announcement, setAnnouncement] = useState({
    text: '',
    link_text: '',
    link_url: '',
    is_enabled: 1,
  });

  const [hero, setHero] = useState({
    eyebrow: '',
    heading: '',
    description: '',
    primary_cta_text: '',
    primary_cta_url: '',
    secondary_cta_text: '',
    secondary_cta_url: '',
    image_url: '',
    is_enabled: 1,
  });

  const [about, setAbout] = useState({
    heading: '',
    subheading: '',
    paragraph1: '',
    paragraph2: '',
    highlight: '',
    image_url: '',
    is_enabled: 1,
  });

  const [bridal, setBridal] = useState({
    heading: '',
    description: '',
    cta_text: '',
    cta_url: '',
    image_url: '',
    is_enabled: 1,
  });

  useEffect(() => {
    if (sections.length > 0) {
      const ann = sections.find((s) => s.section_key === 'announcement_bar');
      if (ann) {
        setAnnouncement({
          text: ann.content?.text || '',
          link_text: ann.content?.link_text || '',
          link_url: ann.content?.link_url || '',
          is_enabled: ann.is_enabled ? 1 : 0,
        });
      }

      const hr = sections.find((s) => s.section_key === 'hero_section');
      if (hr) {
        setHero({
          eyebrow: hr.content?.eyebrow || '',
          heading: hr.title || hr.content?.heading || '',
          description: hr.content?.description || '',
          primary_cta_text: hr.content?.primary_cta_text || '',
          primary_cta_url: hr.content?.primary_cta_url || '',
          secondary_cta_text: hr.content?.secondary_cta_text || '',
          secondary_cta_url: hr.content?.secondary_cta_url || '',
          image_url: hr.image_url || '',
          is_enabled: hr.is_enabled ? 1 : 0,
        });
      }

      const ab = sections.find((s) => s.section_key === 'about_section');
      if (ab) {
        setAbout({
          heading: ab.title || ab.content?.heading || '',
          subheading: ab.subtitle || ab.content?.subheading || '',
          paragraph1: ab.content?.paragraph1 || '',
          paragraph2: ab.content?.paragraph2 || '',
          highlight: ab.content?.highlight || '',
          image_url: ab.image_url || '',
          is_enabled: ab.is_enabled ? 1 : 0,
        });
      }

      const br = sections.find((s) => s.section_key === 'bridal_section');
      if (br) {
        setBridal({
          heading: br.title || br.content?.heading || '',
          description: br.content?.description || '',
          cta_text: br.content?.cta_text || '',
          cta_url: br.content?.cta_url || '',
          image_url: br.image_url || '',
          is_enabled: br.is_enabled ? 1 : 0,
        });
      }
    }
  }, [sections]);

  const updateSectionMutation = useMutation({
    mutationFn: ({ key, data }: { key: string; data: any }) =>
      api.updateHomepageSection(key, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['adminHomepageSections'] });
      queryClient.invalidateQueries({ queryKey: ['publicHomepage'] });
      setSuccessMessage('Homepage module updated successfully.');
      setTimeout(() => setSuccessMessage(''), 4000);
    },
    onError: (err: any) => {
      setErrorMessage(err.message || 'Failed to update section');
    },
  });

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const res = await api.uploadImage(file);
      setHero((prev) => ({ ...prev, image_url: res.url }));
    } catch (err: any) {
      setErrorMessage(err.message || 'Image upload failed');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center">
        <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-xs uppercase tracking-widest text-slate-400">Loading CMS modules…</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-100">
          Homepage Content Management (CMS)
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Customize website banners, copy, promotional announcements, and section visibility.
        </p>
      </div>

      {successMessage && (
        <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 shrink-0 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-100">Top Announcement Bar</h2>
            <p className="text-xs text-slate-400">Thin luxury bar above main navigation</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={Boolean(announcement.is_enabled)}
              onChange={(e) =>
                setAnnouncement({ ...announcement, is_enabled: e.target.checked ? 1 : 0 })
              }
              className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
            />
            <span>Enabled</span>
          </label>
        </div>

        <div className="space-y-4 text-xs">
          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Announcement Message
            </label>
            <input
              type="text"
              value={announcement.text}
              onChange={(e) => setAnnouncement({ ...announcement, text: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Link Button Text
              </label>
              <input
                type="text"
                value={announcement.link_text}
                onChange={(e) => setAnnouncement({ ...announcement, link_text: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Link Target URL
              </label>
              <input
                type="text"
                value={announcement.link_url}
                onChange={(e) => setAnnouncement({ ...announcement, link_url: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <button
            onClick={() =>
              updateSectionMutation.mutate({
                key: 'announcement_bar',
                data: {
                  title: 'Announcement Bar',
                  subtitle: announcement.text,
                  content: {
                    text: announcement.text,
                    link_text: announcement.link_text,
                    link_url: announcement.link_url,
                  },
                  is_enabled: announcement.is_enabled,
                },
              })
            }
            className="px-4 py-2 rounded-lg bg-gold-champagne text-slate-950 font-bold uppercase tracking-wider hover:bg-gold-light transition"
          >
            Update Announcement Bar
          </button>
        </div>
      </div>

      {/* 2. Hero Section */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-100">Hero Section</h2>
            <p className="text-xs text-slate-400">Primary visual banner at top of homepage</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={Boolean(hero.is_enabled)}
              onChange={(e) => setHero({ ...hero, is_enabled: e.target.checked ? 1 : 0 })}
              className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
            />
            <span>Enabled</span>
          </label>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Eyebrow Text
              </label>
              <input
                type="text"
                value={hero.eyebrow}
                onChange={(e) => setHero({ ...hero, eyebrow: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Main Heading
              </label>
              <input
                type="text"
                value={hero.heading}
                onChange={(e) => setHero({ ...hero, heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Description
            </label>
            <textarea
              rows={2}
              value={hero.description}
              onChange={(e) => setHero({ ...hero, description: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Primary CTA Label & Destination
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hero.primary_cta_text}
                  onChange={(e) => setHero({ ...hero, primary_cta_text: e.target.value })}
                  placeholder="Label"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
                <input
                  type="text"
                  value={hero.primary_cta_url}
                  onChange={(e) => setHero({ ...hero, primary_cta_url: e.target.value })}
                  placeholder="/products"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
              </div>
            </div>

            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Secondary CTA Label & Destination
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={hero.secondary_cta_text}
                  onChange={(e) => setHero({ ...hero, secondary_cta_text: e.target.value })}
                  placeholder="Label"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
                <input
                  type="text"
                  value={hero.secondary_cta_url}
                  onChange={(e) => setHero({ ...hero, secondary_cta_url: e.target.value })}
                  placeholder="/contact"
                  className="w-1/2 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block uppercase tracking-wider font-semibold text-slate-300">
              Hero Image URL or Upload
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={hero.image_url}
                onChange={(e) => setHero({ ...hero, image_url: e.target.value })}
                className="flex-1 px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 focus:border-gold-champagne outline-none"
              />
              <label className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 cursor-pointer border border-slate-700">
                <Upload className="w-3.5 h-3.5 text-gold-champagne" />
                <span>{isUploading ? 'Uploading…' : 'Upload File'}</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleHeroImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <button
            onClick={() =>
              updateSectionMutation.mutate({
                key: 'hero_section',
                data: {
                  title: hero.heading,
                  subtitle: hero.eyebrow,
                  image_url: hero.image_url,
                  content: {
                    eyebrow: hero.eyebrow,
                    heading: hero.heading,
                    description: hero.description,
                    primary_cta_text: hero.primary_cta_text,
                    primary_cta_url: hero.primary_cta_url,
                    secondary_cta_text: hero.secondary_cta_text,
                    secondary_cta_url: hero.secondary_cta_url,
                  },
                  is_enabled: hero.is_enabled,
                },
              })
            }
            className="px-4 py-2 rounded-lg bg-gold-champagne text-slate-950 font-bold uppercase tracking-wider hover:bg-gold-light transition"
          >
            Update Hero Section
          </button>
        </div>
      </div>

      {/* 3. About Section */}
      <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-100">About Section</h2>
            <p className="text-xs text-slate-400">Introduction to Mikhael Gold and Diamonds LLP</p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={Boolean(about.is_enabled)}
              onChange={(e) => setAbout({ ...about, is_enabled: e.target.checked ? 1 : 0 })}
              className="w-4 h-4 rounded border-slate-700 text-gold-champagne focus:ring-0"
            />
            <span>Enabled</span>
          </label>
        </div>

        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Subheading
              </label>
              <input
                type="text"
                value={about.subheading}
                onChange={(e) => setAbout({ ...about, subheading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
                Main Heading
              </label>
              <input
                type="text"
                value={about.heading}
                onChange={(e) => setAbout({ ...about, heading: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Paragraph 1
            </label>
            <textarea
              rows={2}
              value={about.paragraph1}
              onChange={(e) => setAbout({ ...about, paragraph1: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none resize-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Paragraph 2
            </label>
            <textarea
              rows={2}
              value={about.paragraph2}
              onChange={(e) => setAbout({ ...about, paragraph2: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none resize-none"
            />
          </div>

          <div>
            <label className="block uppercase tracking-wider font-semibold text-slate-300 mb-1">
              Highlight Badge
            </label>
            <input
              type="text"
              value={about.highlight}
              onChange={(e) => setAbout({ ...about, highlight: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-lg bg-slate-900 border border-slate-700 text-slate-100 text-sm focus:border-gold-champagne outline-none"
            />
          </div>

          <button
            onClick={() =>
              updateSectionMutation.mutate({
                key: 'about_section',
                data: {
                  title: about.heading,
                  subtitle: about.subheading,
                  image_url: about.image_url,
                  content: {
                    heading: about.heading,
                    subheading: about.subheading,
                    paragraph1: about.paragraph1,
                    paragraph2: about.paragraph2,
                    highlight: about.highlight,
                  },
                  is_enabled: about.is_enabled,
                },
              })
            }
            className="px-4 py-2 rounded-lg bg-gold-champagne text-slate-950 font-bold uppercase tracking-wider hover:bg-gold-light transition"
          >
            Update About Section
          </button>
        </div>
      </div>
    </div>
  );
};

