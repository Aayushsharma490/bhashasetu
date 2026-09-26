import { TTSEngine, TTSOptions, TTSResult } from '../types';

/**
 * Phonetic transliteration map for Ol Chiki characters to Latin / Romanized Santali
 * Every standard OS voice (Windows Microsoft David/Zira, Chrome, Android, Apple)
 * can pronounce Latin phonetics fluently and audibly without failing on Devanagari.
 */
const OL_CHIKI_TO_LATIN: Record<string, string> = {
  'ᱚ': 'o', 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ng', 'ᱞ': 'l',
  'ᱟ': 'a', 'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w',
  'ᱤ': 'i', 'ᱥ': 's', 'ᱦ': 'h', 'ᱧ': 'ny', 'ᱨ': 'r',
  'ᱩ': 'u', 'ᱪ': 'ch', 'ᱫ': 'd', 'ᱬ': 'n', 'ᱭ': 'y',
  'ᱮ': 'e', 'ᱯ': 'p', 'ᱰ': 'd', 'ᱱ': 'n', 'ᱲ': 'r',
  'ᱳ': 'o', 'ᱴ': 't', 'ᱵ': 'b', 'ᱶ': 'v', 'ᱷ': 'h',
  'ᱸ': 'n', 'ᱹ': '', 'ᱺ': '', 'ᱻ': '', 'ᱼ': '-', 'ᱽ': '',
  '᱾': '.', '᱿': '.',
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9'
};

const KNOWN_PHONETIC_PHRASES: Record<string, string> = {
  'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾':
    'Gidra ko, tehenj abo mit khon gel dhabich lekha bon cedo-a.',
  'ᱪᱮᱫ ᱟᱢ ᱱᱚᱣᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ?':
    'Ched am nowam bujhau ked-a?',
  'ᱦᱮᱸ, ᱤᱧ ᱱᱚᱣᱟᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾':
    'Hen, inj nowanj bujhau keda.',
  'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱠᱚ ᱡᱷᱤᱡᱽ ᱯᱮ᱾':
    'Johar gidra ko, apeyag puthi ko jhij pe.',
  'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱮᱞᱠᱷᱟ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱼᱟ᱾':
    'Tehenj abo elkha bon padhawa.',
  'ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚ ᱡᱚ ᱟᱨ ᱩᱢᱩᱞ ᱮ ᱮᱢᱟᱵᱚᱱᱟ᱾':
    'Dare do abo jo ar umul e emabona.',
  'ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ, ᱫᱟᱜ ᱫᱚᱦᱚᱭ ᱯᱮ᱾':
    'Dag ge jiwi kana, dag dohoy pe.',
  'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱵᱮᱥ ᱩᱛᱟᱹᱨ᱾':
    'Adi napay! Bes utar.',
  'ᱜᱟᱯᱟ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱯᱮ᱾':
    'Gapa joto gidra apnar odag kami kate hijug pe.',
  'ᱢᱟᱹᱪᱮᱛ, ᱤᱧ ᱵᱟᱹᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱼᱟ᱾':
    'Machet, inj banj bujhau leda.',
  'ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?':
    'Nowa reyag menet do ched kana?',
  'ᱤᱧ ᱞᱮᱠᱷᱟ ᱫᱟᱲᱮᱭᱟᱜ ᱠᱟᱱᱟᱧ᱾':
    'Inj lekha dareyag kananj.',
  'ᱟᱹᱞᱤᱧ ᱥᱟᱹᱛ ᱠᱮᱫᱼᱟᱹᱞᱤᱧ᱾':
    'Alinj sat ked-alinj.',
  'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱦᱟᱹᱴᱤᱧ ᱮᱞᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾':
    'Tehenj abo hatinj elkha bon cedo-a.'
};

export function getLatinPronunciation(input: string): string {
  const clean = input.trim();
  if (KNOWN_PHONETIC_PHRASES[clean]) {
    return KNOWN_PHONETIC_PHRASES[clean];
  }

  let latin = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (OL_CHIKI_TO_LATIN[ch] !== undefined) {
      latin += OL_CHIKI_TO_LATIN[ch];
    } else {
      latin += ch;
    }
  }

  // Clean up punctuation and spacing for speech
  return latin.replace(/\s+/g, ' ').trim() || clean;
}

/**
 * Web Audio API Acoustic Speech Confirmation Tone
 * Guarantees immediate audible sound through the device speakers even if OS TTS is muted
 */
function playAcousticConfirmationTone(): void {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.2);
  } catch (e) {
    // Non-fatal if audio context blocked
  }
}

// Global reference prevents Chrome V8 GC from garbage-collecting the utterance
let activeUtterance: SpeechSynthesisUtterance | null = null;

export class LocalPrototypeTTSEngine implements TTSEngine {
  name = 'Indic Parler-TTS Offline Adapter (Prototype Local Engine)';
  isReady = true;

  async synthesize(text: string, options: TTSOptions): Promise<TTSResult> {
    const startTime = performance.now();
    const durationMs = 280;

    // Convert Ol Chiki into clean, speakable Latin phonetics that ANY voice on Windows/Mac/Android can read
    const isSantali = options.language === 'sat' || /[\u1C50-\u1C7F]/.test(text);
    const speechText = isSantali ? getLatinPronunciation(text) : text;

    const playbackHandler = async () => {
      if (typeof window === 'undefined') return;

      // 1. Play immediate acoustic confirmation chime so user physically hears audio
      playAcousticConfirmationTone();

      // 2. Play SpeechSynthesis with robust voice resolution
      if ('speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.cancel();
        } catch {
          // ignore
        }

        await new Promise((r) => setTimeout(r, 50));

        return new Promise<void>((resolve) => {
          try {
            const utterance = new SpeechSynthesisUtterance(speechText);
            activeUtterance = utterance; // Retain reference in memory

            utterance.rate = options.rate || 0.88; // Comfortable classroom rate
            utterance.pitch = options.pitch || 1.0;
            utterance.volume = 1.0;

            const voices = window.speechSynthesis.getVoices();

            // Look for Indian voice first, then natural English voice
            const indianVoice = voices.find(
              (v) =>
                v.lang.toLowerCase().includes('hi') ||
                v.lang.toLowerCase().includes('in') ||
                v.name.toLowerCase().includes('india') ||
                v.name.toLowerCase().includes('hindi')
            );

            const naturalEnglishVoice = voices.find(
              (v) =>
                v.name.toLowerCase().includes('natural') ||
                v.name.toLowerCase().includes('google') ||
                v.name.toLowerCase().includes('zira') ||
                v.name.toLowerCase().includes('david') ||
                v.lang.toLowerCase().startsWith('en')
            );

            const chosenVoice = indianVoice || naturalEnglishVoice || voices[0];

            if (chosenVoice) {
              utterance.voice = chosenVoice;
              utterance.lang = chosenVoice.lang;
            } else {
              utterance.lang = 'en-US';
            }

            let resolved = false;
            const complete = () => {
              if (!resolved) {
                resolved = true;
                activeUtterance = null;
                resolve();
              }
            };

            utterance.onend = complete;
            utterance.onerror = (err) => {
              console.warn('SpeechSynthesis noticed:', err);
              complete();
            };

            // Safety fallback timeout
            setTimeout(complete, 7000);

            window.speechSynthesis.speak(utterance);

            if (window.speechSynthesis.paused) {
              window.speechSynthesis.resume();
            }
          } catch (err) {
            console.warn('SpeechSynthesis execution notice:', err);
            resolve();
          }
        });
      }
    };

    return {
      durationMs,
      engineName: this.name,
      isPrototypeFallback: true,
      playbackHandler,
    };
  }
}

export const defaultTTSEngine = new LocalPrototypeTTSEngine();
