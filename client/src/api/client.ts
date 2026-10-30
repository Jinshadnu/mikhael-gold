import {
  Category,
  Product,
  HomepageSections,
  GalleryItem,
  Enquiry,
  BusinessSettings,
  AdminUser,
  DashboardStats,
} from '../types';

const API_BASE = '/api';

function getAuthHeader(): Record<string, string> {
  const token = localStorage.getItem('mikhael_admin_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(
  url: string,
  options: RequestInit = {}
): Promise<{ success: boolean; data: T; message?: string; pagination?: any }> {
  const headers = {
    'Content-Type': 'application/json',
    ...getAuthHeader(),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers,
  });

  const json = await res.json().catch(() => ({ success: false, error: 'Network response was not JSON' }));

  if (!res.ok || json.success === false) {
    if (res.status === 401 && url.startsWith('/admin')) {
      localStorage.removeItem('mikhael_admin_token');
      localStorage.removeItem('mikhael_admin_user');
      window.location.href = '/admin/login';
    }
    throw new Error(json.error || json.message || `Request failed with status ${res.status}`);
  }

  return json;
}

// ========================
// PUBLIC API
// ========================

export const api = {
  getSettings: () => request<BusinessSettings>('/public/settings').then((r) => r.data),
  getHomepage: () => request<HomepageSections>('/public/homepage').then((r) => r.data),
  getCategories: () => request<Category[]>('/public/categories').then((r) => r.data),
  getProducts: (params: Record<string, any> = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request<Product[]>(`/public/products${qs ? `?${qs}` : ''}`);
  },
  getProductBySlug: (slug: string) => request<Product>(`/public/products/${slug}`).then((r) => r.data),
  getGallery: (category?: string) => {
    const qs = category && category !== 'All' ? `?category=${encodeURIComponent(category)}` : '';
    return request<GalleryItem[]>(`/public/gallery${qs}`).then((r) => r.data);
  },
  submitEnquiry: (data: {
    full_name: string;
    mobile: string;
    email?: string;
    category?: string;
    product_reference?: string;
    message: string;
  }) =>
    request<{ id: number }>('/public/enquiries', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  // ========================
  // ADMIN API
  // ========================

  adminLogin: (credentials: { email: string; password: string }) =>
    request<{ token: string; admin: AdminUser }>('/admin/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),

  getMe: () => request<AdminUser>('/admin/auth/me').then((r) => r.data),

  changePassword: (data: { currentPassword: string; newPassword: string }) =>
    request('/admin/auth/change-password', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  getDashboardStats: () =>
    request<{
      stats: DashboardStats;
      recentEnquiries: Enquiry[];
      recentProducts: Product[];
      recentAuditLogs: any[];
    }>('/admin/dashboard').then((r) => r.data),

  getAdminProducts: (params: Record<string, any> = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request<Product[]>(`/admin/products${qs ? `?${qs}` : ''}`);
  },

  getAdminProductById: (id: number | string) =>
    request<Product>(`/admin/products/${id}`).then((r) => r.data),

  createProduct: (data: any) =>
    request<{ id: number; slug: string }>('/admin/products', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateProduct: (id: number | string, data: any) =>
    request(`/admin/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteProduct: (id: number | string) =>
    request(`/admin/products/${id}`, {
      method: 'DELETE',
    }),

  toggleProductPublish: (id: number | string) =>
    request<{ publication_status: string }>(`/admin/products/${id}/toggle-publish`, {
      method: 'PATCH',
    }),

  getAdminCategories: () => request<Category[]>('/admin/categories').then((r) => r.data),

  createCategory: (data: any) =>
    request<{ id: number; slug: string }>('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateCategory: (id: number | string, data: any) =>
    request(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteCategory: (id: number | string) =>
    request(`/admin/categories/${id}`, {
      method: 'DELETE',
    }),

  getAdminHomepage: () => request<any[]>('/admin/homepage').then((r) => r.data),

  updateHomepageSection: (key: string, data: any) =>
    request(`/admin/homepage/${key}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  getAdminGallery: () => request<GalleryItem[]>('/admin/gallery').then((r) => r.data),

  createGalleryImage: (data: any) =>
    request<{ id: number }>('/admin/gallery', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  updateGalleryImage: (id: number | string, data: any) =>
    request(`/admin/gallery/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  deleteGalleryImage: (id: number | string) =>
    request(`/admin/gallery/${id}`, {
      method: 'DELETE',
    }),

  getAdminEnquiries: (params: Record<string, any> = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request<Enquiry[]>(`/admin/enquiries${qs ? `?${qs}` : ''}`);
  },

  getAdminEnquiryById: (id: number | string) =>
    request<Enquiry>(`/admin/enquiries/${id}`).then((r) => r.data),

  updateEnquiryStatus: (id: number | string, status: string) =>
    request(`/admin/enquiries/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),

  addEnquiryNote: (id: number | string, note: string) =>
    request(`/admin/enquiries/${id}/notes`, {
      method: 'POST',
      body: JSON.stringify({ note }),
    }),

  getAdminSettings: () => request<BusinessSettings>('/admin/settings').then((r) => r.data),

  updateAdminSettings: (data: BusinessSettings) =>
    request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    }),

  uploadImage: async (file: File): Promise<{ url: string; filename: string }> => {
    const token = localStorage.getItem('mikhael_admin_token');
    const formData = new FormData();
    formData.append('image', file);

    const res = await fetch(`${API_BASE}/admin/upload`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.success) {
      throw new Error(json.error || 'Failed to upload image');
    }
    return json.data;
  },
};
