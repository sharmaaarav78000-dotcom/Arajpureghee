import React from 'react';
import Hero from '@/components/sections/Hero';
import TrustStrip from '@/components/sections/TrustStrip';
import VideoShowcase from '@/components/sections/VideoShowcase';
import GalleryUses from '@/components/sections/GalleryUses';
import Shop from '@/components/sections/Shop';
import TestimonialsStats from '@/components/sections/TestimonialsStats';
import LegacyFAQ from '@/components/sections/LegacyFAQ';
import ContactFooter from '@/components/sections/ContactFooter';

export default function Home() {
  return (
    <main className="w-full flex flex-col min-h-screen">
      <Hero />
      <TrustStrip />
      <VideoShowcase />
      <GalleryUses />
      <Shop />
      <TestimonialsStats />
      <LegacyFAQ />
      <ContactFooter />
    </main>
  );
}