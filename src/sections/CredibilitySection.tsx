import React from 'react';
import useSectionReveal from '../hooks/useSectionReveal';
import { Tablet, HardDrive, Award, ShieldCheck } from 'lucide-react';

export const CredibilitySection: React.FC = () => {
  const sectionRef = useSectionReveal<HTMLElement>();

  const standards = [
    {
      title: 'Offline-First Local Architecture',
      desc: 'All speech models, vocabulary lookup, and worksheet layout generators reside on the tablet flash storage without requiring active cellular network connections.',
      icon: HardDrive
    },
    {
      title: '10-inch Tablet Touch Standards',
      desc: 'UI elements are architected with minimum 44–48px hit areas tailored for rapid classroom interactions and teacher demonstrations.',
      icon: Tablet
    },
    {
      title: 'NIPUN Bharat & NEP 2020 Aligned',
      desc: 'Structured around foundational learning outcomes (FLN) for Grade 1 to 5, fostering early literacy in the mother tongue as mandated by NEP 2020.',
      icon: Award
    },
    {
      title: 'Classroom Privacy & Data Sovereignty',
      desc: 'Classroom voices and student oral responses are processed locally in RAM and never uploaded to public cloud servers.',
      icon: ShieldCheck
    }
  ];

  return (
    <section
      id="credibility"
      ref={sectionRef}
      className="py-16 md:py-24 bg-slate-50 border-b border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Engineering & Pedagogical Standards
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            Built for Real Rural Classrooms
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Constructed according to the deployment constraints specified by the Department of Higher &amp; Technical Education, Government of Jharkhand.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          {standards.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-white rounded-card border border-slate-200 shadow-sm flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-button bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-blue-900" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CredibilitySection;
