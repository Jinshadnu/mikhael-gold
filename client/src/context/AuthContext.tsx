import React, { createContext, useContext, useState, useEffect } from 'react';
import { AdminUser } from '../types';
import { api } from '../api/client';

interface AuthContextType {
  user: AdminUser | null;
  token: string | null;
  isLoading: boolean;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('mikhael_admin_token');
    const savedUser = localStorage.getItem('mikhael_admin_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
        // Verify with /auth/me in background
        api
          .getMe()
          .then((freshUser) => {
            setUser(freshUser);
            localStorage.setItem('mikhael_admin_user', JSON.stringify(freshUser));
          })
          .catch(() => {
            // Token might be expired
            logout();
          })
          .finally(() => {
            setIsLoading(false);
          });
      } catch (e) {
        logout();
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('mikhael_admin_token', newToken);
    localStorage.setItem('mikhael_admin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('mikhael_admin_token');
    localStorage.removeItem('mikhael_admin_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
