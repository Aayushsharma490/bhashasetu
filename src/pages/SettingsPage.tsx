import React, { useState, useEffect } from 'react';
import {
  Settings,
  Languages,
  Volume2,
  HardDrive,
  Eye,
  ShieldCheck,
  Check,
  RotateCcw
} from 'lucide-react';
import { localDB, UserSettings } from '../services/storage/localDatabase';

export const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<UserSettings>(() => localDB.getSettings());
  const [savedNotice, setSavedNotice] = useState(false);

  const handleUpdate = (updated: Partial<UserSettings>) => {
    const next = { ...settings, ...updated };
    setSettings(next);
    localDB.saveSettings(next);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 1500);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Device Preferences &amp; Subsystems
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            SETTINGS
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Configure default classroom languages, audio cadence, and tablet accessibility.
          </p>
        </div>

        {savedNotice && (
          <span className="px-3 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-full flex items-center gap-1">
            <Check className="w-3.5 h-3.5" /> Settings Saved Locally
          </span>
        )}
      </div>

      {/* Language Section */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <Languages className="w-4 h-4 text-blue-900" />
          Classroom Language Configuration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Default Teacher Language</label>
            <select
              value={settings.teacherLang}
              onChange={(e) => handleUpdate({ teacherLang: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="hi">Hindi (हिन्दी)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Default Student Mother Tongue</label>
            <select
              value={settings.studentLang}
              onChange={(e) => handleUpdate({ studentLang: e.target.value })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="sat">Santali — Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)</option>
              <option value="ho" disabled>Ho — Coming Soon (Phase 2)</option>
              <option value="unr" disabled>Mundari — Coming Soon (Phase 2)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Audio Section */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <Volume2 className="w-4 h-4 text-teal-700" />
          Speech &amp; Synthesis Options
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">
              Classroom Speech Speed: {settings.speechRate}x
            </label>
            <input
              type="range"
              min="0.75"
              max="1.25"
              step="0.05"
              value={settings.speechRate}
              onChange={(e) => handleUpdate({ speechRate: parseFloat(e.target.value) })}
              className="w-full mt-2 accent-blue-900"
            />
            <div className="flex justify-between text-[11px] text-slate-400 mt-1">
              <span>Slower (0.75x)</span>
              <span>Default (0.95x)</span>
              <span>Faster (1.25x)</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-button border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">Auto-Play Santali Audio</span>
              <span className="text-[11px] text-slate-500">Play translation through speakers right after recognition</span>
            </div>
            <input
              type="checkbox"
              checked={settings.autoPlayAudio}
              onChange={(e) => handleUpdate({ autoPlayAudio: e.target.checked })}
              className="w-5 h-5 rounded text-blue-900 accent-blue-900 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Offline Storage Status */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-slate-600" />
          Offline Device Storage Allocation
        </h2>

        <div className="p-4 bg-slate-50 rounded-button border border-slate-200 space-y-3">
          <div className="flex justify-between text-xs text-slate-700">
            <span>Allocated for BhashaSetu Model Packs: <strong>142.4 MB</strong></span>
            <span>Available Tablet Flash: <strong>8.2 GB</strong></span>
          </div>

          <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
            <div className="bg-teal-600 h-full rounded-full" style={{ width: '4%' }}></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-[11px] text-slate-600">
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong>ASR Weights:</strong> 48.0 MB
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong>NMT Model:</strong> 68.0 MB
            </div>
            <div className="p-2 bg-white rounded border border-slate-200">
              <strong>TTS &amp; Glossaries:</strong> 26.4 MB
            </div>
          </div>
        </div>
      </div>

      {/* Accessibility */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
          <Eye className="w-4 h-4 text-indigo-900" />
          Classroom Accessibility &amp; Visibility
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Font Display Size</label>
            <select
              value={settings.fontSize}
              onChange={(e) => handleUpdate({ fontSize: e.target.value as UserSettings['fontSize'] })}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="standard">Standard (Recommended for Tablet)</option>
              <option value="large">Large (High Distance Visibility)</option>
              <option value="extra-large">Extra Large (Front of Classroom)</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-50 rounded-button border border-slate-200">
            <div>
              <span className="text-xs font-bold text-slate-800 block">High Contrast Mode</span>
              <span className="text-[11px] text-slate-500">Sharpen borders and contrast under bright sunlight</span>
            </div>
            <input
              type="checkbox"
              checked={settings.highContrast}
              onChange={(e) => handleUpdate({ highContrast: e.target.checked })}
              className="w-5 h-5 rounded text-blue-900 accent-blue-900 cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
