import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  FileText,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { assetUrl } from '../../utils/assets';

export const AdminLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Products', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Homepage CMS', path: '/admin/homepage', icon: FileText },
    { name: 'Gallery CMS', path: '/admin/gallery', icon: Image },
    { name: 'Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Store Settings', path: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex text-slate-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-950 flex-col justify-between border-r border-slate-800 shrink-0">
        <div>
          {/* Brand Emblem */}
          <div className="p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full ring-1 ring-gold/40 overflow-hidden bg-maroon shrink-0">
              <img src={assetUrl('/img/logo.png')} alt="Mikhael Gold & Diamonds" className="w-full h-full object-cover" />
            </div>
            <div>
              <p className="font-serif text-sm font-bold tracking-widest text-slate-100 uppercase">
                MIKHAEL GOLD
              </p>
              <p className="text-[10px] tracking-widest text-gold uppercase font-semibold">
                Admin Console
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive =
                location.pathname === item.path ||
                (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));

              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium transition ${
                    isActive
                      ? 'bg-gold-champagne text-slate-950 font-bold shadow-md'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-slate-900'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-slate-950' : 'text-slate-400'}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info & Actions */}
        <div className="p-4 border-t border-slate-800 space-y-3">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-400 hover:text-gold-champagne hover:bg-slate-900 transition"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-gold-champagne" />
              <span>View Live Website</span>
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="px-3.5 py-2 bg-slate-900/60 rounded-lg flex items-center justify-between">
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-200 truncate">{user?.name || 'Administrator'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 rounded transition"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 px-4 sm:px-8 flex items-center justify-between lg:justify-end">
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-slate-300 hover:text-white"
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6" />
            </button>
            <span className="font-serif font-bold text-sm tracking-widest text-gold-champagne uppercase">
              MIKHAEL ADMIN
            </span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 text-xs text-slate-300 hover:text-gold-champagne hover:border-gold-champagne transition"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Public Site</span>
            </Link>

            <span className="text-xs text-slate-400 hidden sm:inline">
              Signed in as <strong className="text-slate-200">{user?.email}</strong>
            </span>

            <button
              onClick={handleLogout}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium text-slate-400 hover:text-red-400 transition"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </header>

        {/* Main Routed Page Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto bg-slate-900">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-slate-950 p-6 flex flex-col justify-between border-r border-slate-800 z-50">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-8 h-8 rounded-full border border-gold-champagne flex items-center justify-center font-serif text-gold-champagne font-bold">
                    M
                  </span>
                  <span className="font-serif text-sm font-bold tracking-widest uppercase text-white">
                    Mikhael Admin
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive =
                    location.pathname === item.path ||
                    (item.path !== '/admin/dashboard' && location.pathname.startsWith(item.path));

                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider font-medium transition ${
                        isActive
                          ? 'bg-gold-champagne text-slate-950 font-bold'
                          : 'text-slate-400 hover:text-white hover:bg-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <Link
                to="/"
                target="_blank"
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-slate-700 text-xs text-slate-300 font-semibold uppercase tracking-wider"
              >
                <span>View Public Site</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-red-950/40 border border-red-800 text-red-300 text-xs font-semibold uppercase tracking-wider"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

