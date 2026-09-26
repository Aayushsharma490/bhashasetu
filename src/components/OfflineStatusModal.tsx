import React from 'react';
import { X, CheckCircle2, HardDrive, Cpu, Radio, BookOpen, Layers, ShieldCheck } from 'lucide-react';
import OlChikiText from './OlChikiText';
import { useStorageEstimate } from '../hooks/useStorageEstimate';

interface OfflineStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OfflineStatusModal: React.FC<OfflineStatusModalProps> = ({ isOpen, onClose }) => {
  const estimate = useStorageEstimate();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div 
        className="w-full max-w-lg bg-white rounded-card shadow-xl border border-slate-200 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="offline-status-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-2.5">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <div>
              <h2 id="offline-status-title" className="text-base font-semibold text-slate-900">
                OFFLINE SYSTEM STATUS
              </h2>
              <p className="text-xs text-slate-500">Device Hardware &amp; Offline Services</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close status modal"
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-button transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Main Offline Banner */}
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-button flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-emerald-900">
                Classroom Ready: Internet Not Required
              </p>
              <p className="text-xs text-emerald-700 mt-0.5 leading-relaxed">
                All voice inference, translation tables, and educational generation run on local device memory without sending data to external servers.
              </p>
            </div>
          </div>

          {/* Subsystem checklist */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between p-3 rounded-button border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-slate-500" />
                <span className="text-sm font-medium text-slate-800">Internet Connectivity</span>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-slate-200 text-slate-700 rounded-full">
                Not Required
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-button border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Cpu className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-sm font-medium text-slate-800 block">Speech Recognition</span>
                  <span className="text-xs text-slate-500">IndicConformer Adapter</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full flex items-center gap-1 border border-teal-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prototype Engine Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-button border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Layers className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-sm font-medium text-slate-800 block">Translation Engine</span>
                  <span className="text-xs text-slate-500">IndicTrans2 Adapter (Hindi ↔ Santali)</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full flex items-center gap-1 border border-teal-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prototype Engine Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-button border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <Radio className="w-4 h-4 text-teal-600" />
                <div>
                  <span className="text-sm font-medium text-slate-800 block">Santali Voice Engine</span>
                  <span className="text-xs text-slate-500">Indic Parler-TTS Adapter</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full flex items-center gap-1 border border-teal-200">
                <CheckCircle2 className="w-3.5 h-3.5" /> Prototype Engine Active
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-button border border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4 text-blue-600" />
                <div>
                  <span className="text-sm font-medium text-slate-800 block">Lesson &amp; Worksheet Content</span>
                  <span className="text-xs text-slate-500">JCERT NIPUN Bharat Primary Bank</span>
                </div>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Available Locally
              </span>
            </div>
          </div>

          {/* Storage & Language Pack Info */}
          <div className="p-4 bg-slate-50 rounded-button border border-slate-200/80 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
                  Device Storage Allocation (Computed at Runtime)
                </span>
              </div>
              <span className="text-xs text-slate-600 font-mono">
                {estimate.isAvailable ? `${estimate.usageFormatted} used of ${estimate.quotaFormatted}` : '—'}
              </span>
            </div>
            
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-600 h-full rounded-full transition-all"
                style={{ width: `${Math.max(2, estimate.percentUsed)}%` }}
              ></div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs text-slate-600">
              <span>Active Pack: <strong>Santali / <OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText></strong></span>
              <span className="text-teal-800 font-medium">Prototype Engine Active</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-button transition-colors min-h-[44px]"
          >
            Close Status
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfflineStatusModal;
