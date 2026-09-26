import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mic, Cpu, Languages, Volume2, ArrowRight } from 'lucide-react';
import OlChikiText from '../components/OlChikiText';

gsap.registerPlugin(ScrollTrigger);

export const SolutionSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !containerRef.current || !stepsRef.current) {
      return;
    }

    const steps = stepsRef.current.querySelectorAll('.pipeline-step');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        steps,
        { opacity: 0.35, y: 15 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.25,
          duration: 0.6,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 75%',
            end: 'bottom 60%',
            scrub: 0.8,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const steps = [
    {
      num: '01',
      title: 'Classroom Voice Capture',
      desc: 'Teacher speaks instructional Hindi into the tablet mic or uploads pre-recorded audio.',
      engine: 'Web Audio API / MediaRecorder (Offline Input)',
      icon: Mic,
      sample: '“बच्चों, आज हम एक से दस तक की गिनती सीखेंगे।”',
      isOlChiki: false
    },
    {
      num: '02',
      title: 'Speech Recognition (ASR)',
      desc: 'Converts classroom speech to text in real-time, filtered for primary education vocabulary.',
      engine: 'IndicConformer ONNX Adapter (Prototype Local Engine)',
      icon: Cpu,
      sample: 'Transcript generated in < 0.6 sec',
      isOlChiki: false
    },
    {
      num: '03',
      title: 'Vernacular Translation (NMT)',
      desc: 'Context-aware neural translation mapping Hindi pedagogy phrases directly into Santali grammatical structures.',
      engine: 'IndicTrans2 Adapter (Prototype Local Engine)',
      icon: Languages,
      sample: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾',
      isOlChiki: true
    },
    {
      num: '04',
      title: 'Santali Voice Synthesis (TTS)',
      desc: 'Synthesizes natural, audible Santali speech for immediate classroom playback through tablet speakers.',
      engine: 'Indic Parler-TTS Adapter + Web Audio Synthesizer',
      icon: Volume2,
      sample: 'Playable offline directly to children',
      isOlChiki: false
    }
  ];

  return (
    <section
      id="solution"
      ref={containerRef}
      className="py-20 md:py-28 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            The Architecture Pipeline
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            How BhashaSetu Operates Locally
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            The speech-to-speech translation pipeline executes entirely within the device’s local runtime. Below is the sequenced workflow executing without internet.
          </p>
        </div>

        {/* Pipeline Steps Grid */}
        <div ref={stepsRef} className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="pipeline-step p-6 bg-white rounded-card border border-slate-200 shadow-sm flex flex-col justify-between relative transition-shadow hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-slate-400 font-mono">
                      STEP {step.num}
                    </span>
                    <div className="w-9 h-9 rounded-button bg-blue-50 text-blue-900 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100">
                  <div className="p-2.5 bg-slate-50 rounded text-xs text-slate-700 font-medium">
                    {step.isOlChiki ? (
                      <OlChikiText className="text-sm font-semibold text-teal-800 block">
                        {step.sample}
                      </OlChikiText>
                    ) : (
                      <span className="italic block text-slate-700">{step.sample}</span>
                    )}
                  </div>

                  <div className="mt-3 text-[11px] text-slate-500 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    <span>{step.engine}</span>
                  </div>
                </div>

                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-slate-300 pointer-events-none">
                    <ArrowRight className="w-5 h-5 text-slate-300" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Technical Honesty Note */}
        <div className="mt-8 p-3.5 bg-white border border-slate-200 rounded-button text-xs text-slate-600 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>
            <strong>Engineering Integrity Note:</strong> The current demonstration uses our verified local deterministic classroom pack adapter to emulate neural model inference while preserving exact timing measurement via <code className="px-1 py-0.5 bg-slate-100 rounded font-mono">performance.now()</code>.
          </span>
          <span className="text-blue-900 font-semibold whitespace-nowrap">
            Target Latency: &lt; 3.0s
          </span>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
