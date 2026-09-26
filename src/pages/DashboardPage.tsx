import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Mic,
  BookOpen,
  FileSpreadsheet,
  Layers,
  ArrowRight,
  Clock,
  HardDrive,
  Calendar,
  CheckCircle2,
  Volume2
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredTranslation } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';
import { useStorageEstimate } from '../hooks/useStorageEstimate';

export const DashboardPage: React.FC = () => {
  const [translations, setTranslations] = useState<StoredTranslation[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const estimate = useStorageEstimate();

  useEffect(() => {
    setTranslations(localDB.getTranslations());
  }, []);

  const handlePlaySantali = async (id: string, text: string) => {
    setPlayingId(id);
    await defaultTTSEngine.synthesize(text, { language: 'sat' }).then((res) => res.playbackHandler());
    setTimeout(() => setPlayingId(null), 1000);
  };

  const primaryCards = [
    {
      to: '/translator',
      title: 'LIVE TRANSLATOR',
      subtitle: 'Two-way classroom voice translation.',
      desc: 'Speak naturally in Hindi and hear/display instant Santali (Ol Chiki). Reverse mode enables listening to student responses.',
      icon: Mic,
      color: 'bg-blue-900 text-white',
      accent: 'border-blue-200'
    },
    {
      to: '/lessons',
      title: 'LESSON ASSISTANT',
      subtitle: 'Create multilingual classroom activities.',
      desc: 'Generate Grade 1–5 lesson plans with dual-language teacher scripts, participatory games, and oral comprehension checks.',
      icon: BookOpen,
      color: 'bg-teal-700 text-white',
      accent: 'border-teal-200'
    },
    {
      to: '/worksheets',
      title: 'WORKSHEET BUILDER',
      subtitle: 'Generate bilingual learning material.',
      desc: 'Produce printable A4 worksheets with counting objects, matching exercises, and Ol Chiki script tracing prompts.',
      icon: FileSpreadsheet,
      color: 'bg-indigo-700 text-white',
      accent: 'border-indigo-200'
    },
    {
      to: '/flashcards',
      title: 'FLASHCARDS',
      subtitle: 'Teach concepts visually in mother tongue.',
      desc: 'Visual word cards covering Animals, Numbers, Colors, Nature, Food, and School with audio pronunciation.',
      icon: Layers,
      color: 'bg-emerald-700 text-white',
      accent: 'border-emerald-200'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Welcome */}
      <div className="bg-white p-6 sm:p-8 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Government Primary School · Class 2
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-xs text-teal-800 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Prototype Engine Active
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Good Morning, Teacher
          </h1>

          <p className="mt-1 text-base text-slate-600">
            Teach confidently across languages — even without internet.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1 bg-slate-100 rounded-md text-slate-700 font-medium">
              Teacher: <strong>Hindi</strong>
            </span>
            <span className="text-slate-400">&rarr;</span>
            <span className="px-3 py-1 bg-teal-50 border border-teal-200 rounded-md text-teal-800 font-medium flex items-center gap-1">
              Classroom Mother Tongue: <strong>Santali (<OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>)</strong>
            </span>
          </div>
        </div>

        {/* Quick Classroom Status pill */}
        <div className="p-4 bg-slate-50 rounded-button border border-slate-200 text-xs space-y-2 shrink-0 md:w-64">
          <div className="flex items-center justify-between">
            <span className="text-slate-500 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Today's Focus
            </span>
            <span className="font-semibold text-slate-800">Mathematics</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-500">Curriculum:</span>
            <span className="font-semibold text-slate-800">Grades 1–5 Aligned</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-slate-500">
            <span className="flex items-center gap-1">
              <HardDrive className="w-3 h-3" /> Storage
            </span>
            <span className="font-mono text-[11px] text-slate-700">
              {estimate.isAvailable ? estimate.usageFormatted : '—'}
            </span>
          </div>
        </div>
      </div>

      {/* Main Feature Cards */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
            Classroom Tools
          </h2>
          <span className="text-xs text-slate-500">Optimized for 10-inch Tablet</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className="group p-6 bg-white rounded-card border border-slate-200 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-button ${card.color} flex items-center justify-center shadow-sm`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-semibold text-blue-900 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Open Module &rarr;
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm font-semibold text-teal-800 mt-1">
                    {card.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Offline Ready</span>
                  <span className="font-semibold text-slate-700">Sub-3.0s Latency Target</span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Local Activity */}
      <section className="bg-white p-6 sm:p-7 rounded-card border border-slate-200 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              RECENT LOCAL ACTIVITY
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged on this device memory · Zero cloud dependency
            </p>
          </div>

          <Link
            to="/history"
            className="text-xs font-semibold text-blue-900 hover:underline flex items-center gap-1"
          >
            <span>View Full History</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {translations.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs">
              <p>No classroom translation activity recorded in this session yet.</p>
              <Link
                to="/translator"
                className="mt-2 text-blue-900 font-semibold inline-block hover:underline"
              >
                Open Live Translator to start
              </Link>
            </div>
          ) : (
            translations.slice(0, 5).map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-button border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-semibold text-slate-700">
                      {item.timeFormatted}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold text-[11px]">
                      {item.mode === 'teacher' ? 'Hindi → Santali' : 'Santali → Hindi'}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 text-[11px]">
                      Latency: {(item.latencyMs / 1000).toFixed(2)}s
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                    <span className="text-slate-700 font-medium font-hindi">
                      {item.sourceText}
                    </span>
                    <span className="hidden sm:inline text-slate-400">&rarr;</span>
                    <span className="text-teal-900 font-bold">
                      <OlChikiText>{item.targetText}</OlChikiText>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlaySantali(item.id, item.targetText)}
                  disabled={playingId === item.id}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-button text-xs font-semibold transition-colors min-h-[44px]"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{playingId === item.id ? 'Playing...' : 'Play'}</span>
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default DashboardPage;
