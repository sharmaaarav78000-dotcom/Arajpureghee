import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import BrandTriptych from '@/components/sections/BrandTriptych';
import VideoShowcase from '@/components/sections/VideoShowcase';
import BilonaProcess from '@/components/sections/BilonaProcess';
import GalleryUses from '@/components/sections/GalleryUses';
import Shop from '@/components/sections/Shop';
import TestimonialsStats from '@/components/sections/TestimonialsStats';
import FinalProductCTA from '@/components/sections/FinalProductCTA';
import LegacyFAQ from '@/components/sections/LegacyFAQ';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen overflow-x-hidden">
      <Hero />
      <TrustStrip />
      <BrandTriptych />
      <VideoShowcase />
      <BilonaProcess />
      <GalleryUses />
      <Shop />
      <TestimonialsStats />
      <FinalProductCTA />
      <LegacyFAQ />
      <ContactFooter />
    </main>
  );
}
