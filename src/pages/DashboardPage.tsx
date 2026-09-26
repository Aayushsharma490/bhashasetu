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
  Volume2,
  Sparkles,
  MessageSquare,
  Globe,
  Radio,
  Award,
  Zap,
  Play
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredTranslation } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';
import { useStorageEstimate } from '../hooks/useStorageEstimate';

export const DashboardPage: React.FC = () => {
  const [translations, setTranslations] = useState<StoredTranslation[]>([]);
  const [playingId, setPlayingId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState('');
  const estimate = useStorageEstimate();

  useEffect(() => {
    setTranslations(localDB.getTranslations());

    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handlePlaySantali = async (id: string, text: string) => {
    setPlayingId(id);
    try {
      const res = await defaultTTSEngine.synthesize(text, { language: 'sat', rate: 0.90 });
      await res.playbackHandler();
    } catch (e) {
      console.warn('Playback error:', e);
    } finally {
      setPlayingId(null);
    }
  };

  const primaryCards = [
    {
      to: '/translator',
      badge: 'Real-Time ASR + NMT',
      badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
      title: 'LIVE TRANSLATOR',
      subtitle: 'Instant Spoken & Written Translation',
      desc: 'Speak naturally in Hindi and hear & display authentic Santali in Ol Chiki script. Supports full classroom sentences without clipping.',
      icon: Mic,
      gradient: 'from-amber-600/30 via-orange-600/20 to-neutral-900/60',
      glow: 'group-hover:shadow-[0_0_35px_rgba(255,106,0,0.35)]',
      border: 'border-orange-500/30 hover:border-orange-400/60',
      iconBg: 'bg-gradient-to-br from-orange-500 to-amber-600 text-white',
      accentColor: 'text-amber-400'
    },
    {
      to: '/conversation',
      badge: 'Interactive Dialogue',
      badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      title: 'TWO-WAY CONVERSATION',
      subtitle: 'Teacher ↔ Student Bilingual Chat',
      desc: 'Facilitate classroom interactions where teachers speak in Hindi and students respond in mother tongue with automatic vocalization.',
      icon: MessageSquare,
      gradient: 'from-cyan-600/30 via-teal-600/20 to-neutral-900/60',
      glow: 'group-hover:shadow-[0_0_35px_rgba(20,184,166,0.35)]',
      border: 'border-cyan-500/30 hover:border-cyan-400/60',
      iconBg: 'bg-gradient-to-br from-cyan-500 to-teal-600 text-white',
      accentColor: 'text-cyan-400'
    },
    {
      to: '/lessons',
      badge: 'NIPUN Bharat Aligned',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      title: 'LESSON ASSISTANT',
      subtitle: 'Grades 1–5 Pedagogical Modules',
      desc: 'Generate complete 7-section dual-language lesson plans: Overview, Objective, Teacher Script, Activities, Assessments, and Home Tasks.',
      icon: BookOpen,
      gradient: 'from-purple-600/30 via-indigo-600/20 to-neutral-900/60',
      glow: 'group-hover:shadow-[0_0_35px_rgba(147,51,234,0.35)]',
      border: 'border-purple-500/30 hover:border-purple-400/60',
      iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      accentColor: 'text-purple-400'
    },
    {
      to: '/worksheets',
      badge: 'A4 Printable Worksheets',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      title: 'WORKSHEET BUILDER',
      subtitle: '6-Section Visual Printables',
      desc: 'Create printable bilingual student worksheets featuring Fractions for Gr 5, Multiplication for Gr 4, Addition for Gr 3, and Counting for Gr 1-2.',
      icon: FileSpreadsheet,
      gradient: 'from-emerald-600/30 via-teal-600/20 to-neutral-900/60',
      glow: 'group-hover:shadow-[0_0_35px_rgba(16,185,129,0.35)]',
      border: 'border-emerald-500/30 hover:border-emerald-400/60',
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white',
      accentColor: 'text-emerald-400'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12 relative">
      {/* ================= HERO BANNER: MULTI-COLOUR EMBER GLOW ================= */}
      <div className="relative rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl bg-gradient-to-br from-[#1c0802] via-[#100300] to-[#080d1a] p-6 sm:p-10 text-white">
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-600/20 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-teal-500/15 rounded-full blur-[90px] pointer-events-none"></div>
        <div className="absolute top-1/2 left-0 w-72 h-72 bg-purple-600/15 rounded-full blur-[80px] pointer-events-none"></div>

        {/* Diagonal Geometric Accent Lines */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ff6a00_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none"></div>

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-2xl space-y-4">
            {/* Badges Bar */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-orange-500/20 border border-orange-400/40 text-orange-300 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-orange-400 animate-ping"></span>
                <span>Government of Jharkhand · SIH26042</span>
              </span>

              <span className="px-3 py-1 bg-teal-500/20 border border-teal-400/40 text-teal-300 rounded-full text-xs font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Prototype Engine Active</span>
              </span>

              <span className="px-3 py-1 bg-white/10 border border-white/15 text-slate-300 rounded-full text-xs font-mono">
                {currentTime}
              </span>
            </div>

            {/* Main Headline */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
                Good Morning,{' '}
                <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-teal-300 bg-clip-text text-transparent">
                  Teacher
                </span>
              </h1>
              <p className="mt-2 text-base sm:text-lg text-slate-300 font-medium leading-relaxed">
                Teach in Hindi. Understand in Mother Tongue.{' '}
                <span className="text-orange-300 font-semibold block sm:inline">
                  100% Offline Pedagogy for Primary Classrooms.
                </span>
              </p>
            </div>

            {/* Language Pairs & Stats Pill */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <div className="px-4 py-2 bg-white/10 backdrop-blur-md rounded-xl border border-white/15 text-xs flex items-center gap-2">
                <span className="text-slate-400">Teacher:</span>
                <strong className="text-white font-hindi">हिन्दी (Hindi)</strong>
                <span className="text-orange-400 font-bold">&rarr;</span>
                <span className="text-slate-400">Classroom:</span>
                <strong className="text-teal-300 font-ol-chiki text-sm">
                  <OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>
                </strong>
              </div>

              <div className="px-3.5 py-2 bg-emerald-500/15 border border-emerald-400/30 rounded-xl text-xs font-semibold text-emerald-300 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero Latency Cloud Reliance</span>
              </div>
            </div>
          </div>

          {/* Right Status Card */}
          <div className="lg:w-80 p-5 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-xl space-y-3.5">
            <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" /> Classroom Focus
              </span>
              <span className="text-xs font-bold px-2 py-0.5 rounded bg-orange-500/30 text-orange-200">
                Grade 1–5
              </span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Curriculum:</span>
                <span className="font-bold text-white">NIPUN Bharat Aligned</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Active Mother Tongue:</span>
                <span className="font-bold text-teal-300">Santali (Ol Chiki)</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-300">Phase 2 Languages:</span>
                <span className="text-slate-400 italic">Ho &amp; Mundari (Coming Soon)</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/10">
                <span className="text-slate-300 flex items-center gap-1">
                  <HardDrive className="w-3 h-3 text-orange-400" /> Local Storage:
                </span>
                <span className="font-mono font-bold text-amber-300">
                  {estimate.isAvailable ? estimate.usageFormatted : '—'}
                </span>
              </div>
            </div>

            <Link
              to="/offline-demo"
              className="mt-2 block w-full py-2 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-center text-xs font-bold text-white rounded-xl shadow-md transition-all active:scale-98"
            >
              Test Offline Benchmark Demo &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* ================= 4 MULTI-COLOUR INTERACTIVE CARDS ================= */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-black text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-orange-600" />
              Primary Classroom Modules
            </h2>
            <p className="text-xs text-slate-500">
              Interactive pedagogy tools tailored for rural primary education
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-600 px-3 py-1 bg-slate-100 rounded-full border border-slate-200">
            Tablet-First Interface
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {primaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.to}
                to={card.to}
                className={`group relative p-7 rounded-3xl border bg-gradient-to-br ${card.gradient} bg-white transition-all duration-300 hover:-translate-y-1 ${card.glow} ${card.border} shadow-sm overflow-hidden flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-14 h-14 rounded-2xl ${card.iconBg} flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                      {card.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-slate-900 tracking-tight group-hover:text-blue-900 transition-colors">
                    {card.title}
                  </h3>
                  <p className={`text-xs font-bold uppercase tracking-wider ${card.accentColor} mt-1`}>
                    {card.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-500">
                    Offline Ready · Instant Inference
                  </span>
                  <div className="flex items-center gap-1 text-xs font-bold text-slate-900 group-hover:translate-x-1.5 transition-transform">
                    <span>Open Module</span>
                    <ArrowRight className="w-4 h-4 text-orange-600" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ================= 4 LIVE GLASS STAT CARDS ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-2xl border border-amber-300/40 shadow-xs space-y-1">
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wide block">
            Grades Supported
          </span>
          <span className="text-3xl font-black text-slate-900 block">5 Grades</span>
          <p className="text-[11px] text-slate-500">NIPUN Bharat Grade 1 to 5 mapped</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-cyan-500/10 via-white to-cyan-500/5 rounded-2xl border border-cyan-300/40 shadow-xs space-y-1">
          <span className="text-xs font-bold text-cyan-900 uppercase tracking-wide block">
            Offline Capability
          </span>
          <span className="text-3xl font-black text-slate-900 block">100%</span>
          <p className="text-[11px] text-slate-500">Zero cloud API dependency</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-purple-500/10 via-white to-purple-500/5 rounded-2xl border border-purple-300/40 shadow-xs space-y-1">
          <span className="text-xs font-bold text-purple-900 uppercase tracking-wide block">
            Measured Latency
          </span>
          <span className="text-3xl font-black text-slate-900 block">&lt; 500ms</span>
          <p className="text-[11px] text-slate-500">Fast on-device execution</p>
        </div>

        <div className="p-5 bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 rounded-2xl border border-emerald-300/40 shadow-xs space-y-1">
          <span className="text-xs font-bold text-emerald-900 uppercase tracking-wide block">
            Visual Flashcards
          </span>
          <span className="text-3xl font-black text-slate-900 block">26 Cards</span>
          <p className="text-[11px] text-slate-500">Pronunciation &amp; 7 categories</p>
        </div>
      </section>

      {/* ================= RECENT ACTIVITY SECTION ================= */}
      <section className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-500" />
              RECENT LOCAL ACTIVITY
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged in local device storage · Zero cloud telemetry
            </p>
          </div>

          <Link
            to="/history"
            className="text-xs font-bold text-blue-900 hover:underline flex items-center gap-1"
          >
            <span>View Full Audit Log</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {translations.length === 0 ? (
            <div className="py-8 text-center text-slate-500 text-xs space-y-2">
              <p>No classroom translation activity recorded in this session yet.</p>
              <Link
                to="/translator"
                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white font-bold rounded-xl inline-block shadow-sm text-xs"
              >
                Open Live Translator &rarr;
              </Link>
            </div>
          ) : (
            translations.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 hover:bg-slate-100/70 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono font-bold text-slate-700">
                      {item.timeFormatted}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="px-2 py-0.5 rounded-md bg-blue-100 text-blue-900 font-bold text-[11px]">
                      {item.mode === 'teacher' ? 'Hindi → Santali' : 'Santali → Hindi'}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-slate-500 text-[11px]">
                      Latency: {(item.latencyMs / 1000).toFixed(2)}s
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm pt-0.5">
                    <span className="text-slate-700 font-medium font-hindi">
                      {item.sourceText}
                    </span>
                    <span className="hidden sm:inline text-slate-400">&rarr;</span>
                    <span className="text-teal-950 font-bold font-ol-chiki text-base">
                      <OlChikiText>{item.targetText}</OlChikiText>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handlePlaySantali(item.id, item.targetText)}
                  disabled={playingId === item.id}
                  className="shrink-0 flex items-center gap-1.5 px-3.5 py-2 bg-white border border-slate-300 hover:bg-teal-50 text-slate-700 rounded-xl text-xs font-bold transition-all min-h-[40px] shadow-xs"
                >
                  <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                  <span>{playingId === item.id ? 'Playing...' : 'Play Audio'}</span>
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
