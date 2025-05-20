
import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSlider from '@/components/HeroSlider';
import FeatureSection from '@/components/FeatureSection';
import AboutSection from '@/components/AboutSection';
import RoomPreview from '@/components/RoomPreview';
import TestimonialsSection from '@/components/TestimonialsSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      <FeatureSection />
      <AboutSection />
      <RoomPreview />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default Index;
