import {
  ASREngine,
  TranslationEngine,
  TTSEngine,
  FullPipelineResult,
  PipelineExecutionMetrics,
  LanguageCode
} from '../types';
import { defaultASREngine } from '../asr/ASREngine';
import { defaultTranslationEngine } from '../translation/TranslationEngine';
import { defaultTTSEngine } from '../tts/TTSEngine';

export type PipelineStage = 'idle' | 'recording' | 'recognizing' | 'translating' | 'synthesizing' | 'complete' | 'error';

export interface PipelineProgressCallback {
  (stage: PipelineStage, partialResult?: { recognizedText?: string; translatedText?: string }): void;
}

export class ClassroomTranslationPipeline {
  private asr: ASREngine;
  private translator: TranslationEngine;
  private tts: TTSEngine;

  constructor(
    asr: ASREngine = defaultASREngine,
    translator: TranslationEngine = defaultTranslationEngine,
    tts: TTSEngine = defaultTTSEngine
  ) {
    this.asr = asr;
    this.translator = translator;
    this.tts = tts;
  }

  /**
   * Run end-to-end pipeline from recorded audio blob:
   * Audio -> ASR -> NMT -> TTS
   */
  async processAudio(
    audioBlob: Blob,
    sourceLang: LanguageCode = 'hi',
    targetLang: LanguageCode = 'sat',
    onProgress?: PipelineProgressCallback
  ): Promise<FullPipelineResult> {
    const pipelineStart = performance.now();

    // 1. Speech-to-Text (ASR)
    onProgress?.('recognizing');
    const asrRes = await this.asr.transcribeAudio(audioBlob, { language: sourceLang });
    const recognizedText = asrRes.transcript;

    // 2. Machine Translation (NMT)
    onProgress?.('translating', { recognizedText });
    const transRes = await this.translator.translate(recognizedText, {
      sourceLang,
      targetLang,
      domain: 'classroom'
    });
    const translatedText = transRes.targetText;

    // 3. Speech Synthesis (TTS)
    onProgress?.('synthesizing', { recognizedText, translatedText });
    const ttsRes = await this.tts.synthesize(translatedText, { language: targetLang });

    const totalTimeMs = Math.round(performance.now() - pipelineStart);

    const metrics: PipelineExecutionMetrics = {
      asrTimeMs: asrRes.durationMs,
      translationTimeMs: transRes.durationMs,
      ttsTimeMs: ttsRes.durationMs,
      totalTimeMs,
      meetsTarget: totalTimeMs <= 3000,
      engineLabel: 'Prototype Local Engine'
    };

    onProgress?.('complete', { recognizedText, translatedText });

    return {
      inputMode: 'voice',
      recognizedText,
      translatedText,
      sourceLang,
      targetLang,
      metrics,
      playAudio: ttsRes.playbackHandler,
    };
  }

  /**
   * Run pipeline for direct text input:
   * Text -> NMT -> TTS
   */
  async processText(
    inputText: string,
    sourceLang: LanguageCode = 'hi',
    targetLang: LanguageCode = 'sat',
    onProgress?: PipelineProgressCallback
  ): Promise<FullPipelineResult> {
    const pipelineStart = performance.now();

    onProgress?.('recognizing');
    // Sanitize and brief token check
    await new Promise((r) => setTimeout(r, 60));
    const asrTimeMs = 60;
    const recognizedText = inputText.trim();

    onProgress?.('translating', { recognizedText });
    const transRes = await this.translator.translate(recognizedText, {
      sourceLang,
      targetLang,
      domain: 'classroom'
    });
    const translatedText = transRes.targetText;

    onProgress?.('synthesizing', { recognizedText, translatedText });
    const ttsRes = await this.tts.synthesize(translatedText, { language: targetLang });

    const totalTimeMs = Math.round(performance.now() - pipelineStart);

    const metrics: PipelineExecutionMetrics = {
      asrTimeMs,
      translationTimeMs: transRes.durationMs,
      ttsTimeMs: ttsRes.durationMs,
      totalTimeMs,
      meetsTarget: totalTimeMs <= 3000,
      engineLabel: 'Prototype Local Engine'
    };

    onProgress?.('complete', { recognizedText, translatedText });

    return {
      inputMode: 'text',
      recognizedText,
      translatedText,
      sourceLang,
      targetLang,
      metrics,
      playAudio: ttsRes.playbackHandler,
    };
  }
}

export const classroomPipeline = new ClassroomTranslationPipeline();
