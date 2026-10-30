import React, { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BusinessSettings } from '../types';
import { api } from '../api/client';

interface SettingsContextType {
  settings: BusinessSettings;
  isLoading: boolean;
  formatPrice: (amount?: number | null) => string;
  getWhatsAppLink: (customMessage?: string) => string;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data: settings = {}, isLoading } = useQuery({
    queryKey: ['publicSettings'],
    queryFn: api.getSettings,
    staleTime: 10 * 60 * 1000,
  });

  const formatPrice = (amount?: number | null): string => {
    if (amount === undefined || amount === null) return '';
    const symbol = settings.currency_symbol || '₹';
    return `${symbol} ${Number(amount).toLocaleString('en-IN')}`;
  };

  const getWhatsAppLink = (customMessage?: string): string => {
    const rawNumber = settings.whatsapp_number || '919447000000';
    const cleanNumber = rawNumber.replace(/[^0-9]/g, '');
    const defaultMsg = `Hello Mikhael Gold and Diamonds, I would like to enquire about your jewellery collections.`;
    const message = encodeURIComponent(customMessage || defaultMsg);
    return `https://wa.me/${cleanNumber}?text=${message}`;
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        isLoading,
        formatPrice,
        getWhatsAppLink,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
