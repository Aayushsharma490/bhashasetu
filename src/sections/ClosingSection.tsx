import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import OlChikiText from '../components/OlChikiText';

export const ClosingSection: React.FC = () => {
  return (
    <footer className="bg-white pt-16 pb-12 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 md:p-12 bg-slate-50 rounded-card border border-slate-200 text-center max-w-4xl mx-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold rounded-full mb-4">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-900" />
            Smart India Hackathon 2026 · PS SIH26042
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            BHASHASETU
          </h2>

          <p className="mt-2 text-xl font-bold text-blue-900">
            Teach in Hindi. Understand in Mother Tongue.
          </p>

          <p className="mt-2 text-sm text-slate-600 font-medium flex items-center justify-center gap-2">
            <span>Santali Prototype:</span>
            <OlChikiText className="text-teal-800 font-bold">
              ᱚᱞ ᱪᱤᱠᱤ ᱯᱟᱹᱨᱥᱤ ᱛᱮ ᱯᱟᱲᱦᱟᱣ
            </OlChikiText>
          </p>

          <p className="mt-4 text-sm text-slate-500 max-w-xl mx-auto">
            Offline-first pedagogical translation assistant designed for foundational primary classrooms across Jharkhand.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/translator"
              className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 text-white font-semibold rounded-button shadow-sm flex items-center gap-2 transition-colors min-h-[48px]"
            >
              <span>Try Live Translator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/offline-demo"
              className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-button shadow-sm flex items-center gap-2 transition-colors min-h-[48px]"
            >
              <span>Judge Offline Demonstration</span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>

        {/* Footer Meta Details */}
        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            <p className="font-semibold text-slate-700">
              Government of Jharkhand · Department of Higher &amp; Technical Education
            </p>
            <p className="mt-0.5">
              Theme: Smart Education | Problem Statement ID: SIH26042
            </p>
          </div>

          <div className="text-center md:text-right">
            <p>Team Submission · Smart India Hackathon 2026</p>
            <p className="mt-0.5 font-mono text-[11px] text-slate-400">
              React + TypeScript + Vite + Capacitor Android Offline Runtime
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ClosingSection;
