import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { api } from '../../api/client';
import { Product } from '../../types';
import { AnnouncementBar } from '../../components/layout/AnnouncementBar';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { HeroSection } from '../../components/home/HeroSection';
import { CategorySection } from '../../components/home/CategorySection';
import { FeaturedSection } from '../../components/home/FeaturedSection';
import { AboutSection } from '../../components/home/AboutSection';
import { WhyChooseUs } from '../../components/home/WhyChooseUs';
import { BridalSection } from '../../components/home/BridalSection';
import { GallerySection } from '../../components/home/GallerySection';
import { StoreLocationSection } from '../../components/home/StoreLocationSection';
import { EnquirySection } from '../../components/home/EnquirySection';
import { EnquiryModal } from '../../components/common/EnquiryModal';

export const Home: React.FC = () => {
  const [enquiryModalProduct, setEnquiryModalProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: homepageData } = useQuery({
    queryKey: ['publicHomepage'],
    queryFn: api.getHomepage,
  });

  const { data: categories = [] } = useQuery({
    queryKey: ['publicCategories'],
    queryFn: api.getCategories,
  });

  const { data: productsData } = useQuery({
    queryKey: ['publicFeaturedProducts'],
    queryFn: () => api.getProducts({ featured: true, limit: 8 }),
  });

  const { data: galleryItems = [] } = useQuery({
    queryKey: ['publicGallery'],
    queryFn: () => api.getGallery(),
  });

  const handleEnquire = (product: Product) => {
    setEnquiryModalProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory">
      {/* 1. Announcement Bar */}
      <AnnouncementBar data={homepageData?.announcement_bar} />

      {/* 2. Header */}
      <Header />

      <main className="flex-grow">
        {/* 3. Hero Section */}
        <HeroSection data={homepageData?.hero_section} />

        {/* 4. Jewellery Categories */}
        <CategorySection categories={categories} />

        {/* 5. Featured Collections */}
        <FeaturedSection products={productsData?.data || []} onEnquire={handleEnquire} />

        {/* 6. About the Business */}
        <AboutSection data={homepageData?.about_section} />

        {/* 7. Why Choose Us */}
        <WhyChooseUs data={homepageData?.why_choose_us} />

        {/* 8. Bridal Jewellery Section */}
        <BridalSection data={homepageData?.bridal_section} />

        {/* 9. Gallery */}
        <GallerySection items={galleryItems} />

        {/* 10. Store Location */}
        <StoreLocationSection />

        {/* 11. Customer Enquiries */}
        <EnquirySection />
      </main>

      {/* 12. Footer */}
      <Footer />

      {/* Enquiry Modal */}
      <EnquiryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={enquiryModalProduct}
      />
    </div>
  );
};

