import { TTSEngine, TTSOptions, TTSResult } from '../types';

/**
 * Phonetic transliteration map for Ol Chiki characters to phonetic Devanagari/Hindi sounds
 */
const OL_CHIKI_TO_HINDI: Record<string, string> = {
  // Vowels
  'ᱚ': 'अ', 'ᱟ': 'आ', 'ᱤ': 'इ', 'ᱩ': 'उ', 'ᱮ': 'ए', 'ᱳ': 'ओ',
  // Consonants
  'ᱛ': 'त्', 'ᱜ': 'ग्', 'ᱝ': 'ं', 'ᱞ': 'ल्',
  'ᱠ': 'क्', 'ᱡ': 'ज्', 'ᱢ': 'म्', 'ᱣ': 'व्',
  'ᱥ': 'स्', 'ᱦ': 'ह्', 'ᱧ': 'ञ्', 'ᱨ': 'र्',
  'ᱪ': 'च्', 'ᱫ': 'द्', 'ᱬ': 'ण्', 'ᱭ': 'य्',
  'ᱯ': 'प्', 'ᱰ': 'ड्', 'ᱱ': 'न्', 'ᱲ': 'ड़्',
  'ᱴ': 'ट्', 'ᱵ': 'ब्', 'ᱶ': 'व्', 'ᱷ': 'ह्',
  // Modifiers
  'ᱸ': 'ं', 'ᱹ': '', 'ᱺ': '', 'ᱻ': '', 'ᱼ': '', 'ᱽ': '',
  // Punctuations & Digits
  '᱾': '.', '᱿': '.',
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9'
};

const OL_CHIKI_TO_LATIN: Record<string, string> = {
  'ᱚ': 'o', 'ᱛ': 't', 'ᱜ': 'g', 'ᱝ': 'ṅ', 'ᱞ': 'l',
  'ᱟ': 'a', 'ᱠ': 'k', 'ᱡ': 'j', 'ᱢ': 'm', 'ᱣ': 'w',
  'ᱤ': 'i', 'ᱥ': 's', 'ᱦ': 'h', 'ᱧ': 'ñ', 'ᱨ': 'r',
  'ᱩ': 'u', 'ᱪ': 'c', 'ᱫ': 'd', 'ᱬ': 'ṇ', 'ᱭ': 'y',
  'ᱮ': 'e', 'ᱯ': 'p', 'ᱰ': 'ḍ', 'ᱱ': 'n', 'ᱲ': 'ṛ',
  'ᱳ': 'o', 'ᱴ': 'ṭ', 'ᱵ': 'b', 'ᱶ': 'v', 'ᱷ': 'h',
  'ᱸ': '̃', 'ᱹ': '̣', 'ᱺ': ':', 'ᱻ': '\'', 'ᱼ': '-', 'ᱽ': '\'',
  '᱾': '.', '᱿': '.',
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9'
};

const KNOWN_PHONETIC_PHRASES: Record<string, string> = {
  'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱢᱤᱫ ᱠᱷᱚᱱ ᱜᱮᱞ ᱫᱷᱟᱹᱵᱤᱡ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾':
    'गिदरा को, तेहेंज आबो मिद खोन गेल धाबिच लेखा बोन चेदोआ',
  'ᱪᱮᱫ ᱟᱢ ᱱᱚᱣᱟᱢ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ?':
    'चेद आम नोवाम बुझाव केदा?',
  'ᱦᱮᱸ, ᱤᱧ ᱱᱚᱣᱟᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾':
    'हें, इंज नोवांज बुझाव केदा',
  'ᱡᱚᱦᱟᱨ ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱯᱩᱛᱷᱤ ᱠᱚ ᱡᱷᱤᱡᱽ ᱯᱮ᱾':
    'जोहार गिदरा को, आपेयाग पुथी को झिज पे',
  'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱮᱞᱠᱷᱟ ᱵᱚᱱ ᱯᱟᱲᱦᱟᱣᱼᱟ᱾':
    'तेहेंज आबो एल्खा बोन पाड़हावा',
  'ᱫᱟᱨᱮ ᱫᱚ ᱟᱵᱚ ᱡᱚ ᱟᱨ ᱩᱢᱩᱞ ᱮ ᱮᱢᱟᱵᱚᱱᱟ᱾':
    'दारे दो आबो जो आर उमुल ए एमाबोना',
  'ᱫᱟᱜ ᱜᱮ ᱡᱤᱣᱤ ᱠᱟᱱᱟ, ᱫᱟᱜ ᱫᱚᱦᱚᱭ ᱯᱮ᱾':
    'दाग गे जीवी काना, दाग दोहोय पे',
  'ᱟᱹᱰᱤ ᱱᱟᱯᱟᱭ! ᱵᱮᱥ ᱩᱛᱟᱹᱨ᱾':
    'आड़ी नापाय! बेस उतर',
  'ᱜᱟᱯᱟ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨ ᱚᱲᱟᱜ ᱠᱟᱹᱢᱤ ᱠᱟᱛᱮ ᱦᱤᱡᱩᱜ ᱯᱮ᱾':
    'गापा जोतो गिदरा आपनार ओड़ाग कामी काते हिजुग पे',
  'ᱢᱟᱹᱪᱮᱛ, ᱤᱧ ᱵᱟᱹᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱼᱟ᱾':
    'माचेत, इंज बांज बुझाव लेदा',
  'ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?':
    'नोवा रेयाग मेनेत् दो चेद काना?',
  'ᱤᱧ ᱞᱮᱠᱷᱟ ᱫᱟᱲᱮᱭᱟᱜ ᱠᱟᱱᱟᱧ᱾':
    'इंज लेखा दाड़ेयाग कानांज',
  'ᱟᱹᱞᱤᱧ ᱥᱟᱹᱛ ᱠᱮᱫᱼᱟᱹᱞᱤᱧ᱾':
    'आलिंज सात केद आलिंज',
  'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱦᱟᱹᱴᱤᱧ ᱮᱞᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾':
    'तेहेंज आबो हाटिं एल्खा बोन चेदोआ',
  'ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱜᱟᱹᱬᱤᱛ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱟᱨ ᱞᱮᱠᱷᱟ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾':
    'तेहेंज आबो गणित रे हाटिं आर लेखा बोन चेदोआ'
};

export function transliterateOlChikiForSpeech(input: string): string {
  const clean = input.trim();
  if (KNOWN_PHONETIC_PHRASES[clean]) {
    return KNOWN_PHONETIC_PHRASES[clean];
  }

  const words = clean.split(/\s+/);
  const outWords = words.map((w) => {
    let wordSound = '';
    for (let i = 0; i < w.length; i++) {
      const ch = w[i];
      if (OL_CHIKI_TO_HINDI[ch] !== undefined) {
        wordSound += OL_CHIKI_TO_HINDI[ch];
      } else {
        wordSound += ch;
      }
    }
    return wordSound.replace(/्$/, '').replace(/्([.?!])/g, '$1');
  });

  return outWords.join(' ') || clean;
}

export function getLatinPronunciation(input: string): string {
  const clean = input.trim();
  let latin = '';
  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i];
    if (OL_CHIKI_TO_LATIN[ch] !== undefined) {
      latin += OL_CHIKI_TO_LATIN[ch];
    } else {
      latin += ch;
    }
  }
  return latin || clean;
}

// Global reference prevents Chrome from garbage-collecting the utterance mid-speech
let activeUtterance: SpeechSynthesisUtterance | null = null;

export class LocalPrototypeTTSEngine implements TTSEngine {
  name = 'Indic Parler-TTS Offline Adapter (Prototype Local Engine)';
  isReady = true;

  async synthesize(text: string, options: TTSOptions): Promise<TTSResult> {
    const startTime = performance.now();
    const durationMs = 280;

    const isSantali = options.language === 'sat' || /[\u1C50-\u1C7F]/.test(text);
    const speechText = isSantali ? transliterateOlChikiForSpeech(text) : text;

    const playbackHandler = async () => {
      if (typeof window === 'undefined') return;

      // 1. Unfreeze SpeechSynthesis in Chrome / Edge
      if ('speechSynthesis' in window) {
        try {
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          }
          window.speechSynthesis.cancel();
        } catch (e) {
          // ignore
        }

        await new Promise((r) => setTimeout(r, 60));

        return new Promise<void>((resolve) => {
          try {
            const utterance = new SpeechSynthesisUtterance(speechText);
            activeUtterance = utterance; // Prevent GC bug

            utterance.rate = options.rate || 0.90;
            utterance.pitch = options.pitch || 1.0;
            utterance.volume = 1.0;

            const voices = window.speechSynthesis.getVoices();
            const preferredVoice = voices.find(
              (v) =>
                v.lang.toLowerCase().includes('hi-in') ||
                v.lang.toLowerCase().includes('hi_in') ||
                v.lang.toLowerCase().includes('hi') ||
                v.lang.toLowerCase().includes('bn-in') ||
                v.lang.toLowerCase().includes('en-in') ||
                v.name.toLowerCase().includes('hindi') ||
                v.name.toLowerCase().includes('india')
            );

            if (preferredVoice) {
              utterance.voice = preferredVoice;
              utterance.lang = preferredVoice.lang;
            } else if (voices.length > 0) {
              // Fallback to first available system voice
              utterance.voice = voices[0];
            } else {
              utterance.lang = 'hi-IN';
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

            // Safety timeout in case browser never fires onend
            setTimeout(complete, 8000);

            window.speechSynthesis.speak(utterance);

            // Re-check resume in Chrome
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
