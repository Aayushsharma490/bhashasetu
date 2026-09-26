import React from 'react';
import { Link } from 'react-router-dom';
import { motion, Variants } from 'framer-motion';
import { Mic, BookOpen, FileSpreadsheet, Layers, ArrowUpRight } from 'lucide-react';

export const FeatureGridSection: React.FC = () => {
  const features = [
    {
      to: '/translator',
      title: 'Live Translator',
      tagline: 'Two-way classroom voice translation.',
      desc: 'Seamless speech-to-speech translation between Hindi and Santali (Ol Chiki) with verified educational vocabulary and sub-3-second latency.',
      icon: Mic,
      color: 'bg-blue-50 text-blue-900 border-blue-200'
    },
    {
      to: '/lessons',
      title: 'Lesson Assistant',
      tagline: 'Create multilingual classroom activities.',
      desc: 'NIPUN Bharat-aligned lesson planning generator with bilingual teacher scripts, classroom games, student tasks, and oral assessments.',
      icon: BookOpen,
      color: 'bg-teal-50 text-teal-800 border-teal-200'
    },
    {
      to: '/worksheets',
      title: 'Worksheet Builder',
      tagline: 'Generate bilingual learning material.',
      desc: 'Instant generation of printable A4 worksheets with counting puzzles, matching exercises, and Ol Chiki script writing guides for primary grades.',
      icon: FileSpreadsheet,
      color: 'bg-indigo-50 text-indigo-900 border-indigo-200'
    },
    {
      to: '/flashcards',
      title: 'Visual Flashcards',
      tagline: 'Teach concepts visually in mother tongue.',
      desc: 'Interactive, visual vocabulary cards across 7 essential categories (Animals, Numbers, Colors, School, Family, Food, Nature) with audio pronunciation.',
      icon: Layers,
      color: 'bg-emerald-50 text-emerald-800 border-emerald-200'
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
            Pedagogical Toolkit
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            What Rural Primary Teachers Get
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600 leading-relaxed">
            Designed for teachers working in single-teacher or multi-grade schools across Jharkhand tribal districts.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {features.map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.to}
                variants={itemVariants}
                className="group p-6 bg-slate-50 rounded-card border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-button ${item.color} border flex items-center justify-center`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <Link
                      to={item.to}
                      aria-label={`Open ${item.title}`}
                      className="p-2 text-slate-400 group-hover:text-blue-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all min-h-[44px] min-w-[44px] flex items-center justify-center"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Link>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="text-sm font-semibold text-blue-900 mt-1">
                    {item.tagline}
                  </p>
                  <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60">
                  <Link
                    to={item.to}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 group-hover:text-blue-900 transition-colors"
                  >
                    <span>Launch Module</span>
                    <span aria-hidden="true">&rarr;</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGridSection;
