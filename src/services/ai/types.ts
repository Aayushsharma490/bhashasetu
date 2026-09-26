export type LanguageCode = 'hi' | 'sat' | 'en' | 'ho' | 'unr';

export interface ASROptions {
  sampleRate?: number;
  language?: LanguageCode;
}

export interface ASRResult {
  transcript: string;
  confidence: number;
  durationMs: number;
  engineName: string;
  isPrototypeFallback: boolean;
}

export interface TranslationOptions {
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  domain?: 'classroom' | 'general' | 'pedagogy';
}

export interface TranslationResult {
  sourceText: string;
  targetText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  durationMs: number;
  engineName: string;
  isPrototypeFallback: boolean;
}

export interface TTSOptions {
  language: LanguageCode;
  rate?: number;
  pitch?: number;
}

export interface TTSResult {
  audioBlob?: Blob;
  audioUrl?: string;
  durationMs: number;
  engineName: string;
  isPrototypeFallback: boolean;
  playbackHandler: () => Promise<void>;
}

export interface PipelineExecutionMetrics {
  asrTimeMs: number;
  translationTimeMs: number;
  ttsTimeMs: number;
  totalTimeMs: number;
  meetsTarget: boolean; // <= 3000ms
  engineLabel: string;
}

export interface FullPipelineResult {
  inputMode: 'voice' | 'audio-file' | 'text';
  recognizedText: string;
  translatedText: string;
  sourceLang: LanguageCode;
  targetLang: LanguageCode;
  metrics: PipelineExecutionMetrics;
  playAudio: () => Promise<void>;
}

export interface ASREngine {
  name: string;
  isReady: boolean;
  transcribeAudio(audioBlob: Blob, options?: ASROptions): Promise<ASRResult>;
  transcribeStream?(stream: MediaStream): Promise<ASRResult>;
}

export interface TranslationEngine {
  name: string;
  isReady: boolean;
  translate(text: string, options: TranslationOptions): Promise<TranslationResult>;
}

export interface TTSEngine {
  name: string;
  isReady: boolean;
  synthesize(text: string, options: TTSOptions): Promise<TTSResult>;
}
