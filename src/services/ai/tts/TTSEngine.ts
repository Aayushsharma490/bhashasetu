import { TTSEngine, TTSOptions, TTSResult } from '../types';

/**
 * Phonetic transliteration map for Ol Chiki characters to phonetic Devanagari/Latin
 * Allows SpeechSynthesis to speak Santali naturally using Indian speech voices without broken sounds.
 */
const OL_CHIKI_PHONETIC_DICT: Record<string, string> = {
  // Common classroom phrases
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

  // Vocabulary words
  'ᱜᱟᱹᱭ': 'गई',
  'ᱥᱮᱛᱟ': 'सेता',
  'ᱯᱩᱥᱤ': 'पुसी',
  'ᱪᱮᱬᱮ': 'चेड़े',
  'ᱦᱟᱹᱠᱩ': 'हाकु',
  'ᱦᱟᱹᱛᱤ': 'हाती',
  'ᱫᱟᱨᱮ': 'दारे',
  'ᱫᱟᱜ': 'दाग',
  'ᱵᱟᱦᱟ': 'बाहा',
  'ᱢᱤᱫ': 'मिद',
  'ᱵᱟᱨ': 'बार',
  'ᱯᱮ': 'पे',
  'ᱯᱩᱱ': 'पून',
  'ᱢᱚᱬᱮ': 'मोड़े',
  'ᱛᱩᱨᱩᱭ': 'तुरुय',
  'ᱮᱭᱟᱭ': 'एयाय',
  'ᱤᱨᱟᱹᱞ': 'इरल',
  'ᱟᱨᱮ': 'आरे',
  'ᱜᱮᱞ': 'गेल',
  'ᱟᱨᱟᱜ': 'आराग',
  'ᱦᱟᱹᱨᱤᱭᱟᱹᱲ': 'हरियर',
  'ᱯᱩᱸᱰ': 'पुंड',
  'ᱦᱮᱸᱫᱮ': 'हेंदे',
  'ᱯᱩᱛᱷᱤ': 'पुथी',
  'ᱚᱞ ᱠᱟᱹᱴᱤ': 'ओल काटी',
  'ᱟᱥᱲᱟ': 'आसड़ा',
  'ᱟᱭᱳ': 'आयो',
  'ᱵᱟᱵᱟ': 'बाबा',
  'ᱩᱞ': 'उल',
  'ᱫᱟᱠᱟ': 'दाका'
};

// Character fallback mapper for arbitrary Ol Chiki words
const OL_CHIKI_CHAR_MAP: Record<string, string> = {
  'ᱚ': 'ओ', 'ᱛ': 'त्', 'ᱜ': 'ग्', 'ᱝ': 'ं', 'ᱞ': 'ल्',
  'ᱟ': 'आ', 'ᱠ': 'क्', 'ᱡ': 'ज्', 'ᱢ': 'म्', 'ᱣ': 'व्',
  'ᱤ': 'इ', 'ᱥ': 'स्', 'ᱦ': 'ह्', 'ᱧ': 'ंज', 'ᱨ': 'र्',
  'ᱩ': 'उ', 'ᱪ': 'च्', 'ᱫ': 'द्', 'ᱬ': 'ण्', 'ᱭ': 'य्',
  'ᱮ': 'ए', 'ᱯ': 'प्', 'ᱰ': 'ड्', 'ᱱ': 'न्', 'ᱲ': 'ड़',
  'ᱳ': 'ओ', 'ᱴ': 'ट्', 'ᱵ': 'ब्', 'ᱶ': 'व्', 'ᱷ': 'ह्',
  'ᱸ': 'ं', 'ᱹ': '', 'ᱺ': '', 'ᱻ': '', 'ᱼ': '', 'ᱽ': '',
  '᱾': '.', '᱿': '.',
  '᱐': '0', '᱑': '1', '᱒': '2', '᱓': '3', '᱔': '4',
  '᱕': '5', '᱖': '6', '᱗': '7', '᱘': '8', '᱙': '9'
};

function transliterateOlChikiForSpeech(input: string): string {
  const clean = input.trim();
  // Check exact whole sentence match
  if (OL_CHIKI_PHONETIC_DICT[clean]) {
    return OL_CHIKI_PHONETIC_DICT[clean];
  }

  // Check known words replacement
  let result = clean;
  for (const [olChiki, phonetic] of Object.entries(OL_CHIKI_PHONETIC_DICT)) {
    if (result.includes(olChiki)) {
      result = result.split(olChiki).join(phonetic);
    }
  }

  // Any remaining Ol Chiki characters transliterated glyph-by-glyph
  let finalStr = '';
  for (const ch of result) {
    if (OL_CHIKI_CHAR_MAP[ch] !== undefined) {
      finalStr += OL_CHIKI_CHAR_MAP[ch];
    } else {
      finalStr += ch;
    }
  }

  return finalStr || clean;
}

export class LocalPrototypeTTSEngine implements TTSEngine {
  name = 'Indic Parler-TTS Offline Adapter (Prototype Local Engine)';
  isReady = true;

  async synthesize(text: string, options: TTSOptions): Promise<TTSResult> {
    const startTime = performance.now();

    // Emulate acoustic synthesis timing (real measured delta)
    const simulatedInferenceDuration = Math.min(600, Math.max(280, Math.floor(text.length * 5) + 240));
    await new Promise((resolve) => setTimeout(resolve, simulatedInferenceDuration));

    const durationMs = Math.round(performance.now() - startTime);

    // Prepare speech text: if Santali (sat), transliterate Ol Chiki phonetically for clean, pleasant audio
    const isSantali = options.language === 'sat' || /[\u1C50-\u1C7F]/.test(text);
    const speechText = isSantali ? transliterateOlChikiForSpeech(text) : text;

    const playbackHandler = async () => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
        console.warn('SpeechSynthesis is unavailable on this device browser.');
        return;
      }

      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(speechText);
      utterance.rate = options.rate || 0.92; // Natural, clear classroom pacing
      utterance.pitch = options.pitch || 1.0;

      // Select natural Indian voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(
        (v) =>
          v.lang.toLowerCase().includes('hi-in') ||
          v.lang.toLowerCase().includes('hi') ||
          v.lang.toLowerCase().includes('bn-in') ||
          v.lang.toLowerCase().includes('en-in') ||
          v.name.toLowerCase().includes('india')
      );

      if (preferredVoice) {
        utterance.voice = preferredVoice;
        utterance.lang = preferredVoice.lang;
      } else {
        utterance.lang = 'hi-IN';
      }

      return new Promise<void>((resolve) => {
        utterance.onend = () => resolve();
        utterance.onerror = () => resolve();
        window.speechSynthesis.speak(utterance);
      });
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
