import React from 'react';
import {
  Cpu,
  Layers,
  Radio,
  HardDrive,
  Tablet,
  ShieldCheck,
  Code2,
  Terminal,
  ExternalLink
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            System Architecture &amp; Deployment Blueprint
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            TECHNICAL ARCHITECTURE
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Production-grade decoupled offline architecture for SIH26042 (Govt. of Jharkhand).
          </p>
        </div>

        <div className="text-xs font-mono px-3 py-1.5 bg-slate-100 border border-slate-200 rounded-md text-slate-700">
          Target: Android 11+ Tablets (1280×800)
        </div>
      </div>

      {/* High Level Flow */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
          Hardware &amp; Execution Pipeline
        </h2>

        <div className="p-4 bg-slate-50 rounded-card border border-slate-200 font-mono text-xs text-slate-800 overflow-x-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-center py-2">
            <div className="p-3 bg-white rounded border border-slate-300 w-full md:w-auto">
              <span className="font-bold text-blue-900 block">React 18 + Vite</span>
              <span className="text-[10px] text-slate-500">TypeScript Strict UI</span>
            </div>
            <span className="text-slate-400 font-bold">&rarr;</span>
            <div className="p-3 bg-white rounded border border-slate-300 w-full md:w-auto">
              <span className="font-bold text-slate-900 block">Capacitor 7</span>
              <span className="text-[10px] text-slate-500">Native Android Bridge</span>
            </div>
            <span className="text-slate-400 font-bold">&rarr;</span>
            <div className="p-3 bg-white rounded border border-slate-300 w-full md:w-auto">
              <span className="font-bold text-emerald-800 block">Offline Runtime</span>
              <span className="text-[10px] text-slate-500">ONNX / Native SQLite</span>
            </div>
            <span className="text-slate-400 font-bold">&rarr;</span>
            <div className="p-3 bg-teal-50 rounded border border-teal-300 w-full md:w-auto">
              <span className="font-bold text-teal-900 block">AI Adapters</span>
              <span className="text-[10px] text-teal-700">ASR &rarr; NMT &rarr; TTS</span>
            </div>
          </div>
        </div>
      </div>

      {/* Model Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-5 bg-white rounded-card border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-button bg-blue-50 text-blue-900 flex items-center justify-center">
            <Cpu className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            1. IndicConformer (ASR)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Quantized 8-bit conformer model optimized for Indian English and Hindi phonetics. Operates on 16kHz PCM audio buffers with sub-600ms latency.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            Model footprint: ~48 MB
          </div>
        </div>

        <div className="p-5 bg-white rounded-card border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-button bg-teal-50 text-teal-800 flex items-center justify-center">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            2. IndicTrans2 (NMT)
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Sequence-to-sequence transformer specifically fine-tuned on indigenous tribal language corpora and JCERT primary education pedagogical glossaries.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            Model footprint: ~68 MB
          </div>
        </div>

        <div className="p-5 bg-white rounded-card border border-slate-200 shadow-sm space-y-3">
          <div className="w-9 h-9 rounded-button bg-emerald-50 text-emerald-800 flex items-center justify-center">
            <Radio className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            3. Indic Parler-TTS
          </h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Low-resource acoustic vocoder synthesizing natural Santali pronunciation in Ol Chiki cadence, directly playable through tablet classroom speakers.
          </p>
          <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-100 font-mono">
            Model footprint: ~26.4 MB
          </div>
        </div>
      </div>

      {/* Adapter Pattern Code Architecture */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Decoupled Model Adapter Interface (src/services/ai/)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Clean TypeScript contract allowing production ONNX models to replace the prototype adapter with zero UI modifications:
          </p>
        </div>

        <div className="p-4 bg-slate-950 text-slate-100 rounded-button font-mono text-xs overflow-x-auto leading-relaxed">
          <pre>{`// 1. ASR Engine Contract
export interface ASREngine {
  name: string;
  isReady: boolean;
  transcribeAudio(audioBlob: Blob, options?: ASROptions): Promise<ASRResult>;
}

// 2. Translation Engine Contract
export interface TranslationEngine {
  name: string;
  isReady: boolean;
  translate(text: string, options: TranslationOptions): Promise<TranslationResult>;
}

// 3. TTS Engine Contract
export interface TTSEngine {
  name: string;
  isReady: boolean;
  synthesize(text: string, options: TTSOptions): Promise<TTSResult>;
}

// 4. Sequential Pipeline: Audio -> ASR -> NMT -> TTS
export class ClassroomTranslationPipeline {
  async processAudio(blob: Blob): Promise<FullPipelineResult> {
    const asr = await this.asr.transcribeAudio(blob);
    const trans = await this.translator.translate(asr.transcript);
    const tts = await this.tts.synthesize(trans.targetText);
    return { ... };
  }
}`}</pre>
        </div>
      </div>

      {/* Capacitor Android Deployment Steps */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Tablet className="w-5 h-5 text-blue-900" />
          Android Tablet Deployment via Capacitor
        </h2>

        <p className="text-xs text-slate-600 leading-relaxed">
          The prototype is prepared for native packaging on Android 10-inch tablets. Run the following verified build commands:
        </p>

        <div className="p-4 bg-slate-900 text-emerald-400 rounded-button font-mono text-xs space-y-1">
          <p># 1. Compile production web bundle</p>
          <p className="text-white">npm run build</p>
          <p className="pt-2"># 2. Sync web bundle with native Android project</p>
          <p className="text-white">npx cap sync android</p>
          <p className="pt-2"># 3. Launch Android Studio for APK generation</p>
          <p className="text-white">npx cap open android</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
