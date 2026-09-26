import React from 'react';
import SmoothScroll from '../components/SmoothScroll';
import LandingNav from '../components/LandingNav';
import HeroSection from '../sections/HeroSection';
import ProblemSection from '../sections/ProblemSection';
import SolutionSection from '../sections/SolutionSection';
import OlChikiSection from '../sections/OlChikiSection';
import OfflineProofSection from '../sections/OfflineProofSection';
import FeatureGridSection from '../sections/FeatureGridSection';
import CredibilitySection from '../sections/CredibilitySection';
import ClosingSection from '../sections/ClosingSection';

export const LandingPage: React.FC = () => {
  return (
    <SmoothScroll>
      <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-teal-100 selection:text-teal-900">
        <LandingNav />
        <main>
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <OlChikiSection />
          <OfflineProofSection />
          <FeatureGridSection />
          <CredibilitySection />
          <ClosingSection />
        </main>
      </div>
    </SmoothScroll>
  );
};

export default LandingPage;
