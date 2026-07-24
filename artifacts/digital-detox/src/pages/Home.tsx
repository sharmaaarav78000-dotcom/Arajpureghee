import React from 'react';
import LockScreen from '@/components/LockScreen';
import Header from '@/components/Header';
import ProjectOverview from '@/components/sections/ProjectOverview';
import ResearchSurvey from '@/components/sections/ResearchSurvey';
import ImpactSection from '@/components/sections/ImpactSection';
import InteractiveTools from '@/components/sections/InteractiveTools';
import SolutionsBenefits from '@/components/sections/SolutionsBenefits';
import SevenDayChallenge from '@/components/sections/SevenDayChallenge';
import ChatBot from '@/components/ChatBot';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <LockScreen />
      <Header />
      <div style={{ maxWidth: 900, margin: '0 auto 4rem', padding: '0 1.5rem' }}>
        <ProjectOverview />
        <ResearchSurvey />
        <ImpactSection />
        <InteractiveTools />
        <SolutionsBenefits />
        <SevenDayChallenge />
      </div>
      <Footer />
      <ChatBot />
    </>
  );
}
