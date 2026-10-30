import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Public Pages
import { Home } from './pages/public/Home';
import { Products } from './pages/public/Products';
import { ProductDetail } from './pages/public/ProductDetail';
import { About } from './pages/public/About';
import { Gallery } from './pages/public/Gallery';
import { Contact } from './pages/public/Contact';
import { PrivacyPolicy } from './pages/public/PrivacyPolicy';
import { Terms } from './pages/public/Terms';

// Admin Pages
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './pages/admin/DashboardOverview';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminProductEdit } from './pages/admin/AdminProductEdit';
import { AdminCategories } from './pages/admin/AdminCategories';
import { AdminHomepage } from './pages/admin/AdminHomepage';
import { AdminGallery } from './pages/admin/AdminGallery';
import { AdminEnquiries } from './pages/admin/AdminEnquiries';
import { AdminSettings } from './pages/admin/AdminSettings';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { token, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gold-champagne border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
};

export const App: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetail />} />
      <Route path="/about" element={<About />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms" element={<Terms />} />

      {/* Admin Login */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Console */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardOverview />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="products/new" element={<AdminProductEdit />} />
        <Route path="products/:id/edit" element={<AdminProductEdit />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="homepage" element={<AdminHomepage />} />
        <Route path="gallery" element={<AdminGallery />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default App;

