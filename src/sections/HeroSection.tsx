import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, ShieldCheck } from 'lucide-react';
import OlChikiText from '../components/OlChikiText';

export const HeroSection: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Honest Badge Row */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold rounded-full">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
          Smart India Hackathon 2026
        </span>
        <span className="inline-flex items-center px-3 py-1 bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold rounded-full">
          PS ID: SIH26042
        </span>
        <span className="inline-flex items-center px-3 py-1 bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold rounded-full">
          Govt. of Jharkhand · Dept. of Higher & Technical Education
        </span>
      </div>

      {/* Main Headline */}
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
          Teach in Hindi.{' '}
          <span className="block text-blue-900 mt-2">
            Understand in Mother Tongue.
          </span>
        </h1>

        {/* Visual Script Signature */}
        <div className="mt-4 flex flex-wrap items-baseline gap-3 text-slate-600 font-medium">
          <span className="font-hindi text-base md:text-lg">
            हिन्दी में पढ़ाइए
          </span>
          <span className="text-slate-300">/</span>
          <span className="text-base md:text-lg flex items-center gap-1.5 text-teal-800">
            <OlChikiText>ᱟᱯᱱᱟᱨ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ</OlChikiText>
            <span className="text-xs text-slate-500 font-sans">(Santali · Ol Chiki)</span>
          </span>
        </div>

        {/* Subhead */}
        <p className="mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl leading-relaxed">
          An offline-first classroom speech translation and pedagogy assistant designed for primary school teachers in tribal clusters — operating completely without internet connectivity.
        </p>

        {/* Call to Actions */}
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button
            onClick={() => scrollTo('offline-proof')}
            className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-button shadow-sm flex items-center gap-2.5 transition-colors min-h-[48px]"
          >
            <Play className="w-4 h-4 fill-white" />
            Watch Offline Proof Demo
          </button>

          <Link
            to="/dashboard"
            className="px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-semibold rounded-button shadow-sm flex items-center gap-2 transition-colors min-h-[48px]"
          >
            Open Teacher Dashboard
            <ArrowRight className="w-4 h-4 text-slate-500" />
          </Link>
        </div>

        {/* Honest Architecture Notice */}
        <div className="mt-10 p-3 bg-slate-50 border border-slate-200 rounded-button max-w-2xl text-xs text-slate-600 flex items-center justify-between">
          <span>Active Working Prototype Language: <strong>Santali (Ol Chiki Script)</strong></span>
          <span className="text-slate-500 font-medium">Ho & Mundari in Phase 2</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
