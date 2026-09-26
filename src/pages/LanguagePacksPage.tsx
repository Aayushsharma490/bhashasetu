import React, { useState } from 'react';
import {
  Globe2,
  CheckCircle2,
  Lock,
  HardDrive,
  DownloadCloud,
  Check,
  RotateCw,
  Cpu,
  Layers,
  Radio,
  BookOpen,
  ShieldCheck
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { LANGUAGE_PACKS_DATA, LanguagePack } from '../services/storage/localDatabase';

export const LanguagePacksPage: React.FC = () => {
  const [packs, setPacks] = useState<LanguagePack[]>(LANGUAGE_PACKS_DATA);
  const [syncingPackId, setSyncingPackId] = useState<string | null>(null);
  const [syncStep, setSyncStep] = useState<number>(0);

  const steps = [
    'Step 1: Downloading vernacular language dictionaries...',
    'Step 2: Syncing quantized acoustic & ASR neural weights...',
    'Step 3: Storing JCERT NIPUN Bharat curriculum bank in local storage...',
    'Step 4: Compiling offline audio formant synthesis tables...',
    'Step 5: Verifying local sha256 checksums and model adapters...'
  ];

  const handleStartSync = async (packId: string) => {
    setSyncingPackId(packId);
    setSyncStep(1);

    for (let i = 1; i <= 5; i++) {
      setSyncStep(i);
      await new Promise((r) => setTimeout(r, 600));
    }

    setSyncingPackId(null);
    setSyncStep(0);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Offline Storage &amp; Neural Bundles
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            LANGUAGE PACK MANAGER
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Manage local vernacular language models for completely offline classroom inference.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>No internet required post-sync</span>
        </div>
      </div>

      {/* Sync simulation modal/card if active */}
      {syncingPackId && (
        <div className="p-6 bg-blue-50 border-2 border-blue-300 rounded-card shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-blue-950 uppercase tracking-wide flex items-center gap-2">
              <RotateCw className="w-4 h-4 animate-spin text-blue-900" />
              Initial Language Pack Synchronization in Progress
            </h2>
            <span className="text-xs font-mono font-bold text-blue-900">
              {syncStep} of 5 Steps Complete
            </span>
          </div>

          <div className="w-full bg-blue-200 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-blue-900 h-full transition-all duration-300 rounded-full"
              style={{ width: `${(syncStep / 5) * 100}%` }}
            ></div>
          </div>

          <p className="text-xs text-blue-900 font-medium font-mono">
            {steps[syncStep - 1]}
          </p>

          <p className="text-[11px] text-blue-800">
            Note: Once verified on the device, these weights remain permanently in IndexedDB/SQLite without requiring another network connection.
          </p>
        </div>
      )}

      {/* Language Pack Cards Grid */}
      <div className="space-y-6">
        {packs.map((pack) => {
          const isInstalled = pack.status === 'installed';
          return (
            <div
              key={pack.id}
              className={`p-6 rounded-card border shadow-sm transition-all ${
                isInstalled
                  ? 'bg-white border-teal-300 ring-1 ring-teal-600/20'
                  : 'bg-slate-50/80 border-slate-200 opacity-80'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-xl font-bold text-slate-900">
                      {pack.name} ({pack.nativeName})
                    </h3>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-semibold text-slate-600">
                      Script: {pack.script}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed max-w-2xl">
                    {pack.description}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isInstalled ? (
                    <span className="px-3 py-1.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Installed &amp; Offline Ready
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded-full flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5" /> Coming in Phase 2
                    </span>
                  )}
                </div>
              </div>

              {/* Subsystem Specifications */}
              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <Cpu className="w-3.5 h-3.5 text-blue-900" />
                    <span>Speech Recognition (ASR)</span>
                  </div>
                  <p className="font-medium text-slate-800">{pack.asrModel}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <Layers className="w-3.5 h-3.5 text-teal-700" />
                    <span>Translation (NMT)</span>
                  </div>
                  <p className="font-medium text-slate-800">{pack.translationModel}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <Radio className="w-3.5 h-3.5 text-teal-700" />
                    <span>Voice Synthesis (TTS)</span>
                  </div>
                  <p className="font-medium text-slate-800">{pack.ttsModel}</p>
                </div>

                <div className="p-3 bg-slate-50 rounded border border-slate-200">
                  <div className="flex items-center gap-1.5 text-slate-500 font-semibold mb-1">
                    <HardDrive className="w-3.5 h-3.5 text-slate-600" />
                    <span>Local Storage Allocation</span>
                  </div>
                  <p className="font-medium text-slate-800 font-mono">{pack.sizeMb} MB</p>
                </div>
              </div>

              {/* Action */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500">
                  Curriculum Alignment: <strong>{pack.curriculumVersion}</strong>
                </span>

                {isInstalled ? (
                  <button
                    onClick={() => handleStartSync(pack.id)}
                    className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-button flex items-center gap-1.5 transition-colors min-h-[44px]"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                    <span>Re-verify &amp; Check Integrity</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-3.5 py-2 bg-slate-100 text-slate-400 font-semibold rounded-button cursor-not-allowed min-h-[44px]"
                  >
                    Phase 2 Rollout Scheduled
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LanguagePacksPage;
