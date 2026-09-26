import React from 'react';
import useSectionReveal from '../hooks/useSectionReveal';
import OlChikiText from '../components/OlChikiText';
import { HelpCircle, AlertCircle, WifiOff } from 'lucide-react';

export const ProblemSection: React.FC = () => {
  const sectionRef = useSectionReveal<HTMLElement>();

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            The Ground Reality · SIH26042
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            The Language Chasm in Tribal Primary Classrooms
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            In primary schools across Santhal Pargana and Kolhan divisions, teachers post-recruitment predominantly speak Hindi, while 1st and 2nd graders speak Santali or Ho at home.
          </p>
        </div>

        {/* 3 Sourced-feeling statements */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-slate-50 rounded-card border border-slate-200">
            <div className="w-10 h-10 rounded-button bg-amber-100 text-amber-800 flex items-center justify-center font-bold mb-4">
              <AlertCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              The Pedagogical Gap
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              When Grade 1 children do not understand the medium of instruction, foundational literacy and numeracy (NIPUN Bharat) outcomes decline before Grade 3.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-card border border-slate-200">
            <div className="w-10 h-10 rounded-button bg-blue-100 text-blue-900 flex items-center justify-center font-bold mb-4">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Teacher Dilemma
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Dedicated educators want to communicate effectively but lack mother-tongue vocabulary in Santali (Ol Chiki), resulting in one-way instruction.
            </p>
          </div>

          <div className="p-6 bg-slate-50 rounded-card border border-slate-200">
            <div className="w-10 h-10 rounded-button bg-slate-200 text-slate-800 flex items-center justify-center font-bold mb-4">
              <WifiOff className="w-5 h-5" />
            </div>
            <h3 className="text-base font-semibold text-slate-900">
              Zero Internet Dependency
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Classrooms in remote blocks of Dumka, Pakur, and Sahibganj experience frequent network outages. Cloud-dependent translation tools fail completely on site.
            </p>
          </div>
        </div>

        {/* Classroom Split Visual */}
        <div className="mt-12 p-6 md:p-8 bg-slate-50 rounded-card border border-slate-200">
          <div className="text-center mb-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Classroom Dynamics: Without vs. With BhashaSetu
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Without BhashaSetu */}
            <div className="p-5 bg-white rounded-button border border-rose-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-rose-100">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wide">
                  Standard Classroom (Disconnected)
                </span>
                <span className="text-xs text-rose-500 font-medium">Silent Barrier</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 block mb-1">Teacher (Hindi)</span>
                  <p className="text-sm text-slate-800 font-hindi">
                    “बच्चों, अपनी मेज पर पाँच कंकड़ रखिए।”
                  </p>
                </div>
                <div className="p-3 bg-rose-50/60 rounded border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                  <span className="text-lg">❓</span>
                  <span>Student is hesitant; terms like "पाँच" and "कंकड़" not familiar in mother tongue.</span>
                </div>
              </div>
            </div>

            {/* With BhashaSetu */}
            <div className="p-5 bg-white rounded-button border border-teal-200 space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-2 border-b border-teal-100">
                <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">
                  With BhashaSetu (Offline Assist)
                </span>
                <span className="text-xs text-emerald-600 font-medium">Instant Comprehension</span>
              </div>
              <div className="space-y-3">
                <div className="p-3 bg-teal-50/50 rounded border border-teal-200">
                  <span className="text-xs font-semibold text-teal-800 block mb-1">BhashaSetu Offline Audio & Script</span>
                  <p className="text-sm text-slate-900 font-semibold leading-relaxed">
                    <OlChikiText>“ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱢᱮᱡᱽ ᱪᱮᱛᱟᱱ ᱨᱮ ᱕ ᱜᱚᱴᱟᱝ ᱨᱩᱜᱽᱲᱤ ᱫᱚᱦᱚᱭ ᱯᱮ᱾”</OlChikiText>
                  </p>
                </div>
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
                  <span className="text-lg">✓</span>
                  <span>Students immediately reach for pebbles and begin counting with smiles.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
