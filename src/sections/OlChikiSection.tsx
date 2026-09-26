import React from 'react';
import useSectionReveal from '../hooks/useSectionReveal';
import OlChikiText from '../components/OlChikiText';
import { Lock, CheckCircle2 } from 'lucide-react';

export const OlChikiSection: React.FC = () => {
  const sectionRef = useSectionReveal<HTMLElement>();

  const glyphSamples = [
    { glyph: 'ᱚ', name: 'La', ipa: '/ɔ/', english: 'First vowel of Ol Chiki' },
    { glyph: 'ᱞ', name: 'At', ipa: '/t’/', english: 'Consonant sound' },
    { glyph: 'ᱟ', name: 'Aak', ipa: '/a/', english: 'Open central vowel' },
    { glyph: 'ᱠ', name: 'Ak', ipa: '/k’/', english: 'Velar stop' },
    { glyph: 'ᱡ', name: 'Ich', ipa: '/c’/', english: 'Palatal stop' },
    { glyph: 'ᱪ', name: 'Uch', ipa: '/c/', english: 'Voiceless palatal' },
    { glyph: 'ᱮ', name: 'Ep', ipa: '/e/', english: 'Front close-mid' },
    { glyph: 'ᱯ', name: 'Ip', ipa: '/p’/', english: 'Bilabial stop' },
  ];

  return (
    <section
      id="ol-chiki"
      ref={sectionRef}
      className="py-16 md:py-24 bg-white border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Vernacular Foundation
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Why Santali & Ol Chiki First
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Santali is spoken by over 7 million people and is enshrined in the Eighth Schedule of the Indian Constitution. Created in 1925 by Pandit Raghunath Murmu, the <strong>Ol Chiki</strong> script was designed precisely for Santali phonology.
          </p>
        </div>

        {/* Live Glyph Rendering Proof */}
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">
              Live Font Stack Rendering Verification (Noto Sans Ol Chiki)
            </h3>
            <span className="text-xs text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200 font-medium">
              Zero Tofu Boxes · 100% Native Glyphs
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-3">
            {glyphSamples.map((item, idx) => (
              <div
                key={idx}
                className="p-4 bg-slate-50 rounded-card border border-slate-200 text-center flex flex-col items-center justify-center hover:border-slate-300 transition-colors"
              >
                <OlChikiText className="text-3xl font-bold text-slate-900 mb-1">
                  {item.glyph}
                </OlChikiText>
                <span className="text-xs font-semibold text-slate-700">{item.name}</span>
                <span className="text-[10px] text-slate-500 font-mono">{item.ipa}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Language Expansion Matrix */}
        <div className="mt-12">
          <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide mb-4">
            Jharkhand Tribal Language Expansion Matrix
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Santali - Active */}
            <div className="p-6 bg-white rounded-card border-2 border-teal-600 shadow-sm relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Active in Prototype
                </span>
                <span className="text-xs text-slate-500 font-mono">142.4 MB Pack</span>
              </div>
              <h4 className="text-lg font-bold text-slate-900">
                Santali (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ</OlChikiText>)
              </h4>
              <p className="text-xs text-slate-600 mt-1">
                Script: Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)
              </p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Full offline bidirectional speech-to-text, machine translation, audio synthesis, and Grade 1–5 primary worksheets.
              </p>
            </div>

            {/* Ho - Coming Soon */}
            <div className="p-6 bg-slate-50 rounded-card border border-slate-300 opacity-75 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Coming in Expansion
                </span>
                <span className="text-xs text-slate-400 font-mono">Phase 2</span>
              </div>
              <h4 className="text-lg font-bold text-slate-700">
                Ho (<span className="font-sans">ᱦᱳ</span>)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Script: Varang Kshiti (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)
              </p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Corpus collection and phonetic alignment scheduled for Kolhan division primary schools.
              </p>
            </div>

            {/* Mundari - Coming Soon */}
            <div className="p-6 bg-slate-50 rounded-card border border-slate-300 opacity-75 relative">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-0.5 bg-slate-200 text-slate-700 rounded-full flex items-center gap-1">
                  <Lock className="w-3.5 h-3.5" /> Coming in Expansion
                </span>
                <span className="text-xs text-slate-400 font-mono">Phase 2</span>
              </div>
              <h4 className="text-lg font-bold text-slate-700">
                Mundari (<span className="font-sans">ᱢᱩᱱᱰᱟᱨᱤ</span>)
              </h4>
              <p className="text-xs text-slate-500 mt-1">
                Script: Mundari Bani (ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱹᱱᱤ)
              </p>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Curriculum glossary under development with Dept. of Higher & Technical Education, Jharkhand.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OlChikiSection;
