export interface StoredTranslation {
  id: string;
  timestamp: number;
  timeFormatted: string;
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
  latencyMs: number;
  mode: 'teacher' | 'student' | 'worksheet' | 'lesson';
}

export interface StoredConversation {
  id: string;
  timestamp: number;
  timeFormatted: string;
  speaker: 'teacher' | 'student';
  sourceText: string;
  targetText: string;
  sourceLang: string;
  targetLang: string;
}

export interface StoredLesson {
  id: string;
  title: string;
  grade: string;
  subject: string;
  topic: string;
  language: string;
  learningOutcome: string;
  overview: string;
  learningObjective: string;
  teacherScript: { hi: string; sat: string };
  classroomActivity: { hi: string; sat: string };
  studentActivity: { hi: string; sat: string };
  assessmentQuestions: Array<{ hi: string; sat: string }>;
  homeActivity: { hi: string; sat: string };
  createdAt: number;
  saved: boolean;
}

export interface StoredWorksheet {
  id: string;
  title: string;
  grade: string;
  subject: string;
  topic: string;
  language: string;
  instructionsHi: string;
  instructionsSat: string;
  questions: Array<{
    id: number;
    questionHi: string;
    questionSat: string;
    type: 'count' | 'match' | 'fill' | 'choice';
    visualAsset?: string;
    options?: string[];
  }>;
  createdAt: number;
}

export interface FlashcardItem {
  id: string;
  category: 'animals' | 'numbers' | 'colors' | 'family' | 'food' | 'nature' | 'school';
  english: string;
  hindi: string;
  santaliOlChiki: string;
  santaliPronunciation: string;
  iconName: string;
  colorHint: string;
}

export interface LanguagePack {
  id: string;
  name: string;
  nativeName: string;
  script: string;
  status: 'installed' | 'available' | 'coming_soon';
  sizeMb: number;
  asrModel: string;
  translationModel: string;
  ttsModel: string;
  curriculumVersion: string;
  description: string;
}

export interface UserSettings {
  teacherLang: string;
  studentLang: string;
  speechRate: number;
  fontSize: 'standard' | 'large' | 'extra-large';
  autoPlayAudio: boolean;
  saveHistory: boolean;
  highContrast: boolean;
}

const STORAGE_KEYS = {
  TRANSLATIONS: 'bhashasetu_translations_v1',
  CONVERSATIONS: 'bhashasetu_conversations_v1',
  LESSONS: 'bhashasetu_lessons_v1',
  WORKSHEETS: 'bhashasetu_worksheets_v1',
  SETTINGS: 'bhashasetu_settings_v1',
  LANGUAGE_PACKS: 'bhashasetu_lang_packs_v1'
};

// Initial Activity History starts empty on fresh session — no fake historical data
const DEFAULT_TRANSLATIONS: StoredTranslation[] = [];

const DEFAULT_CONVERSATIONS: StoredConversation[] = [];

const DEFAULT_LESSONS: StoredLesson[] = [
  {
    id: 'les-grade2-math-counting',
    title: 'गिनती 1 से 10 (Counting 1–10)',
    grade: 'Grade 2',
    subject: 'Mathematics',
    topic: 'Counting 1–10 with Objects',
    language: 'Santali (Ol Chiki)',
    learningOutcome: 'NIPUN Bharat M2.1: Student identifies, reads and writes numbers from 1 to 10 and associates with concrete quantity.',
    overview: 'Introductory classroom pedagogy bridging Hindi instructional terms with Santali mother-tongue numerical concepts using local everyday items (pebbles, leaves).',
    learningObjective: 'Child can count up to 10 concrete objects, state the count in Santali (ᱢᱤᱫ to ᱜᱮᱞ) and associate with Ol Chiki and Devanagari numerals.',
    teacherScript: {
      hi: 'बच्चों, अपनी मेज पर 5 कंकड़ रखिए और एक-एक करके गिनिए।',
      sat: 'ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱟᱯᱮᱭᱟᱜ ᱢᱮᱡᱽ ᱪᱮᱛᱟᱱ ᱨᱮ ᱕ ᱜᱚᱴᱟᱝ ᱨᱩᱜᱽᱲᱤ ᱫᱚᱦᱚᱭ ᱯᱮ ᱟᱨ ᱢᱤᱫ-ᱢᱤᱫ ᱛᱮ ᱞᱮᱠᱷᱟᱭ ᱯᱮ᱾'
    },
    classroomActivity: {
      hi: 'कक्षा में 10 बच्चों की कतार बनाएं। प्रत्येक बच्चा अपना क्रम संख्या बोलेगा।',
      sat: 'ᱠᱞᱟᱥ ᱨᱮ ᱜᱮᱞ ᱦᱚᱲ ᱜᱤᱫᱽᱨᱟᱹ ᱛᱷᱟᱨ ᱵᱮᱱᱟᱣ ᱯᱮ᱾ ᱡᱚᱛᱚ ᱜᱤᱫᱽᱨᱟᱹ ᱟᱯᱱᱟᱨᱟᱜ ᱞᱮᱠᱷᱟ ᱮᱞ ᱞᱟᱹᱭ ᱯᱮ᱾'
    },
    studentActivity: {
      hi: 'विद्यार्थी अपनी कार्यपुस्तिका में 3 पत्तों और 4 फूलों के चित्र बनाएंगे और संख्या लिखेंगे।',
      sat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱚᱞ ᱯᱩᱛᱷᱤ ᱨᱮ ᱯᱮᱭᱟ ᱥᱟᱠᱟᱢ ᱟᱨ ᱯᱩᱱᱭᱟᱹ ᱵᱟᱦᱟ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱮᱞ ᱠᱚ ᱚᱞᱟ᱾'
    },
    assessmentQuestions: [
      {
        hi: 'चार के बाद कौन सी संख्या आती है?',
        sat: 'ᱯᱩᱱ ᱛᱟᱭᱚᱢ ᱫᱚ ᱚᱠᱟ ᱮᱞ ᱦᱤᱡᱩᱜᱼᱟ? (ᱢᱚᱬᱮ)'
      },
      {
        hi: 'अगर आपके पास 2 आम हैं और 1 और मिल जाए, तो कुल कितने हुए?',
        sat: 'ᱡᱩᱫᱤ ᱟᱢ ᱴᱷᱮᱱ ᱒ ᱩᱞ ᱢᱮᱱᱟᱜᱼᱟ ᱟᱨ ᱑ ᱟᱨᱦᱚᱸᱢ ᱧᱟᱢᱟ, ᱮᱱᱠᱷᱟᱱ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱮᱱᱟ? (ᱯᱮ)'
      }
    ],
    homeActivity: {
      hi: 'घर पर अपने परिवार के सदस्यों की गिनती कीजिए और कल कक्षा में बताइए।',
      sat: 'ᱚᱲᱟᱜ ᱨᱮ ᱟᱯᱱᱟᱨ ᱜᱷᱟᱨᱚᱸᱡᱽ ᱨᱤᱱ ᱦᱚᱲ ᱞᱮᱠᱷᱟ ᱠᱚᱯᱮ ᱟᱨ ᱜᱟᱯᱟ ᱟᱥᱲᱟ ᱨᱮ ᱞᱟᱹᱭ ᱯᱮ᱾'
    },
    createdAt: Date.now() - 1000 * 60 * 50,
    saved: true
  }
];

const DEFAULT_WORKSHEETS: StoredWorksheet[] = [
  {
    id: 'ws-grade2-math-1',
    title: 'कार्यपत्रक: संख्या और गिनती (1–10)',
    grade: 'Grade 2',
    subject: 'Mathematics',
    topic: 'Counting 1–10 (एल्खा ᱑–᱑᱐)',
    language: 'Hindi + Santali (Ol Chiki)',
    instructionsHi: 'दिए गए चित्रों को गिनें और सही संख्या Ol Chiki तथा देवनागरी में लिखें।',
    instructionsSat: 'ᱮᱢ ᱟᱠᱟᱱ ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ ᱟᱨ ᱥᱟᱹᱨᱤ ᱮᱞ ᱚᱞ ᱪᱤᱠᱤ ᱟᱨ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
    questions: [
      {
        id: 1,
        questionHi: 'पेड़ पर कितने सेब हैं? गिनकर लिखें:',
        questionSat: 'ᱫᱟᱨᱮ ᱨᱮ ᱛᱤᱱᱟᱹᱜ ᱥᱮᱣ ᱢᱮᱱᱟᱜᱼᱟ? ᱞᱮᱠᱷᱟ ᱠᱟᱛᱮ ᱚᱞ ᱯᱮ:',
        type: 'count',
        visualAsset: 'apples',
        options: ['3 (ᱯᱮ)', '5 (ᱢᱚᱬᱮ)', '7 (ᱮᱭᱟᱭ)']
      },
      {
        id: 2,
        questionHi: 'संख्या का सही नाम से मिलान करें:',
        questionSat: 'ᱮᱞ ᱥᱟᱶ ᱥᱟᱹᱨᱤ ᱧᱩᱛᱩᱢ ᱡᱚᱲᱟᱣ ᱯᱮ:',
        type: 'match',
        options: ['1 -> ᱢᱤᱫ', '2 -> ᱵᱟᱨ', '3 -> ᱯᱮ', '4 -> ᱯᱩᱱ']
      },
      {
        id: 3,
        questionHi: 'रिक्त स्थान भरें: 1, 2, __, 4, 5',
        questionSat: 'ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡᱽ ᱯᱮ: ᱑, ᱒, __, ᱔, ᱕',
        type: 'fill',
        options: ['3 (ᱯᱮ)']
      }
    ],
    createdAt: Date.now() - 1000 * 60 * 25
  }
];

export const FLASHCARDS_DATA: FlashcardItem[] = [
  // Animals
  { id: 'fc-1', category: 'animals', english: 'Cow', hindi: 'गाय', santaliOlChiki: 'ᱜᱟᱹᱭ', santaliPronunciation: 'Gại', iconName: 'Beef', colorHint: 'bg-amber-50 text-amber-700' },
  { id: 'fc-2', category: 'animals', english: 'Dog', hindi: 'कुत्ता', santaliOlChiki: 'ᱥᱮᱛᱟ', santaliPronunciation: 'Seta', iconName: 'Dog', colorHint: 'bg-orange-50 text-orange-700' },
  { id: 'fc-3', category: 'animals', english: 'Cat', hindi: 'बिल्ली', santaliOlChiki: 'ᱯᱩᱥᱤ', santaliPronunciation: 'Pusi', iconName: 'Cat', colorHint: 'bg-yellow-50 text-yellow-700' },
  { id: 'fc-4', category: 'animals', english: 'Bird', hindi: 'चिड़िया', santaliOlChiki: 'ᱪᱮᱬᱮ', santaliPronunciation: 'Ceṇẽ', iconName: 'Feather', colorHint: 'bg-sky-50 text-sky-700' },
  { id: 'fc-5', category: 'animals', english: 'Fish', hindi: 'मछली', santaliOlChiki: 'ᱦᱟᱹᱠᱩ', santaliPronunciation: 'Hạku', iconName: 'Fish', colorHint: 'bg-blue-50 text-blue-700' },
  { id: 'fc-6', category: 'animals', english: 'Elephant', hindi: 'हाथी', santaliOlChiki: 'ᱦᱟᱹᱛᱤ', santaliPronunciation: 'Hạti', iconName: 'Shield', colorHint: 'bg-slate-50 text-slate-700' },

  // Numbers
  { id: 'fc-7', category: 'numbers', english: 'One (1)', hindi: 'एक (१)', santaliOlChiki: 'ᱢᱤᱫ (᱑)', santaliPronunciation: 'Mit’', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },
  { id: 'fc-8', category: 'numbers', english: 'Two (2)', hindi: 'दो (२)', santaliOlChiki: 'ᱵᱟᱨ (᱒)', santaliPronunciation: 'Bar', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },
  { id: 'fc-9', category: 'numbers', english: 'Three (3)', hindi: 'तीन (३)', santaliOlChiki: 'ᱯᱮ (᱓)', santaliPronunciation: 'Pe', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },
  { id: 'fc-10', category: 'numbers', english: 'Four (4)', hindi: 'चार (४)', santaliOlChiki: 'ᱯᱩᱱ (᱔)', santaliPronunciation: 'Pun', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },
  { id: 'fc-11', category: 'numbers', english: 'Five (5)', hindi: 'पाँच (५)', santaliOlChiki: 'ᱢᱚᱬᱮ (᱕)', santaliPronunciation: 'Mõṛẽ', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },
  { id: 'fc-12', category: 'numbers', english: 'Ten (10)', hindi: 'दस (१०)', santaliOlChiki: 'ᱜᱮᱞ (᱑᱐)', santaliPronunciation: 'Gel', iconName: 'Hash', colorHint: 'bg-teal-50 text-teal-700' },

  // Colors
  { id: 'fc-13', category: 'colors', english: 'Red', hindi: 'लाल', santaliOlChiki: 'ᱟᱨᱟᱜ', santaliPronunciation: 'Arag', iconName: 'Palette', colorHint: 'bg-rose-50 text-rose-700' },
  { id: 'fc-14', category: 'colors', english: 'Green', hindi: 'हरा', santaliOlChiki: 'ᱦᱟᱹᱨᱤᱭᱟᱹᱲ', santaliPronunciation: 'Hạriyạṛ', iconName: 'Palette', colorHint: 'bg-emerald-50 text-emerald-700' },
  { id: 'fc-15', category: 'colors', english: 'White', hindi: 'सफेद', santaliOlChiki: 'ᱯᱩᱸᱰ', santaliPronunciation: 'Punḍ', iconName: 'Palette', colorHint: 'bg-slate-50 text-slate-700' },
  { id: 'fc-16', category: 'colors', english: 'Black', hindi: 'काला', santaliOlChiki: 'ᱦᱮᱸᱫᱮ', santaliPronunciation: 'Hẽnde', iconName: 'Palette', colorHint: 'bg-zinc-100 text-zinc-800' },

  // Nature
  { id: 'fc-17', category: 'nature', english: 'Tree', hindi: 'पेड़', santaliOlChiki: 'ᱫᱟᱨᱮ', santaliPronunciation: 'Dare', iconName: 'Trees', colorHint: 'bg-green-50 text-green-700' },
  { id: 'fc-18', category: 'nature', english: 'Water', hindi: 'पानी', santaliOlChiki: 'ᱫᱟᱜ', santaliPronunciation: 'Dag', iconName: 'Droplet', colorHint: 'bg-cyan-50 text-cyan-700' },
  { id: 'fc-19', category: 'nature', english: 'Flower', hindi: 'फूल', santaliOlChiki: 'ᱵᱟᱦᱟ', santaliPronunciation: 'Baha', iconName: 'SunMedium', colorHint: 'bg-pink-50 text-pink-700' },

  // School Objects
  { id: 'fc-20', category: 'school', english: 'Book', hindi: 'किताब', santaliOlChiki: 'ᱯᱩᱛᱷᱤ', santaliPronunciation: 'Puthi', iconName: 'BookOpen', colorHint: 'bg-indigo-50 text-indigo-700' },
  { id: 'fc-21', category: 'school', english: 'Pencil', hindi: 'पेंसिल', santaliOlChiki: 'ᱚᱞ ᱠᱟᱹᱴᱤ', santaliPronunciation: 'Ol kạti', iconName: 'PenTool', colorHint: 'bg-violet-50 text-violet-700' },
  { id: 'fc-22', category: 'school', english: 'School', hindi: 'विद्यालय', santaliOlChiki: 'ᱟᱥᱲᱟ', santaliPronunciation: 'Asṛa', iconName: 'GraduationCap', colorHint: 'bg-blue-50 text-blue-700' },

  // Family
  { id: 'fc-23', category: 'family', english: 'Mother', hindi: 'माँ', santaliOlChiki: 'ᱟᱭᱳ', santaliPronunciation: 'Ayo', iconName: 'Heart', colorHint: 'bg-red-50 text-red-700' },
  { id: 'fc-24', category: 'family', english: 'Father', hindi: 'पिता', santaliOlChiki: 'ᱵᱟᱵᱟ', santaliPronunciation: 'Baba', iconName: 'Users', colorHint: 'bg-blue-50 text-blue-700' },

  // Food
  { id: 'fc-25', category: 'food', english: 'Mango', hindi: 'आम', santaliOlChiki: 'ᱩᱞ', santaliPronunciation: 'Ul', iconName: 'Apple', colorHint: 'bg-amber-50 text-amber-700' },
  { id: 'fc-26', category: 'food', english: 'Rice', hindi: 'चावल / भात', santaliOlChiki: 'ᱫᱟᱠᱟ', santaliPronunciation: 'Daka', iconName: 'Utensils', colorHint: 'bg-orange-50 text-orange-700' }
];

export const LANGUAGE_PACKS_DATA: LanguagePack[] = [
  {
    id: 'pack-santali',
    name: 'Santali',
    nativeName: 'ᱥᱟᱱᱛᱟᱲᱤ',
    script: 'Ol Chiki (ᱚᱞ ᱪᱤᱠᱤ)',
    status: 'installed',
    sizeMb: 142.4,
    asrModel: 'IndicConformer-Santali-Quantized (48 MB)',
    translationModel: 'IndicTrans2-Hindi-Santali-ONNX (68 MB)',
    ttsModel: 'IndicParler-Santali-Vocoder (26.4 MB)',
    curriculumVersion: 'Jharkhand JCERT / NIPUN Bharat Gr 1-5',
    description: 'Complete offline pack with speech recognition, machine translation, speech synthesis and verified JCERT primary curriculum glossary.'
  },
  {
    id: 'pack-ho',
    name: 'Ho',
    nativeName: 'ᱦᱳ',
    script: 'Varang Kshiti (ᱣᱟᱨᱟᱝ ᱪᱤᱛᱤ)',
    status: 'coming_soon',
    sizeMb: 138.0,
    asrModel: 'In development (Phase 2)',
    translationModel: 'Vocabulary curation in progress',
    ttsModel: 'Acoustic recordings underway',
    curriculumVersion: 'Scheduled for Q3 2026',
    description: 'Coming in language expansion. Acoustic data collection and JCERT vernacular terminology verification under progress with Dept. of Higher & Technical Education.'
  },
  {
    id: 'pack-mundari',
    name: 'Mundari',
    nativeName: 'ᱢᱩᱱᱰᱟᱨᱤ',
    script: 'Mundari Bani (ᱢᱩᱱᱰᱟᱨᱤ ᱵᱟᱹᱱᱤ)',
    status: 'coming_soon',
    sizeMb: 145.2,
    asrModel: 'In development (Phase 2)',
    translationModel: 'Corpus preparation in progress',
    ttsModel: 'Phonetic lexicon mapping',
    curriculumVersion: 'Scheduled for Q4 2026',
    description: 'Coming in language expansion. Vernacular pedagogical alignment underway for West Singhbhum and Khunti primary school clusters.'
  }
];

export const DEFAULT_SETTINGS: UserSettings = {
  teacherLang: 'hi',
  studentLang: 'sat',
  speechRate: 0.95,
  fontSize: 'standard',
  autoPlayAudio: true,
  saveHistory: true,
  highContrast: false
};

// Safe localStorage fallback wrapper
class LocalDatabaseService {
  private get<T>(key: string, fallback: T): T {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : fallback;
    } catch {
      return fallback;
    }
  }

  private set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.warn('Storage write failed', e);
    }
  }

  getTranslations(): StoredTranslation[] {
    return this.get<StoredTranslation[]>(STORAGE_KEYS.TRANSLATIONS, DEFAULT_TRANSLATIONS);
  }

  saveTranslation(tr: Omit<StoredTranslation, 'id' | 'timestamp' | 'timeFormatted'>): StoredTranslation {
    const list = this.getTranslations();
    const now = new Date();
    const newTr: StoredTranslation = {
      ...tr,
      id: 'tr-' + Date.now(),
      timestamp: Date.now(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [newTr, ...list].slice(0, 50);
    this.set(STORAGE_KEYS.TRANSLATIONS, updated);
    return newTr;
  }

  getConversations(): StoredConversation[] {
    return this.get<StoredConversation[]>(STORAGE_KEYS.CONVERSATIONS, DEFAULT_CONVERSATIONS);
  }

  saveConversation(conv: Omit<StoredConversation, 'id' | 'timestamp' | 'timeFormatted'>): StoredConversation {
    const list = this.getConversations();
    const now = new Date();
    const newConv: StoredConversation = {
      ...conv,
      id: 'conv-' + Date.now(),
      timestamp: Date.now(),
      timeFormatted: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    const updated = [...list, newConv];
    this.set(STORAGE_KEYS.CONVERSATIONS, updated);
    return newConv;
  }

  getLessons(): StoredLesson[] {
    return this.get<StoredLesson[]>(STORAGE_KEYS.LESSONS, DEFAULT_LESSONS);
  }

  saveLesson(lesson: StoredLesson): void {
    const list = this.getLessons();
    const exists = list.findIndex((l) => l.id === lesson.id);
    let updated: StoredLesson[];
    if (exists >= 0) {
      updated = [...list];
      updated[exists] = lesson;
    } else {
      updated = [lesson, ...list];
    }
    this.set(STORAGE_KEYS.LESSONS, updated);
  }

  getWorksheets(): StoredWorksheet[] {
    return this.get<StoredWorksheet[]>(STORAGE_KEYS.WORKSHEETS, DEFAULT_WORKSHEETS);
  }

  saveWorksheet(ws: StoredWorksheet): void {
    const list = this.getWorksheets();
    const updated = [ws, ...list.filter((w) => w.id !== ws.id)];
    this.set(STORAGE_KEYS.WORKSHEETS, updated);
  }

  getSettings(): UserSettings {
    return this.get<UserSettings>(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
  }

  saveSettings(settings: UserSettings): void {
    this.set(STORAGE_KEYS.SETTINGS, settings);
  }

  getLanguagePacks(): LanguagePack[] {
    return this.get<LanguagePack[]>(STORAGE_KEYS.LANGUAGE_PACKS, LANGUAGE_PACKS_DATA);
  }

  updateLanguagePack(pack: LanguagePack): void {
    const list = this.getLanguagePacks();
    const idx = list.findIndex((p) => p.id === pack.id);
    if (idx >= 0) {
      list[idx] = pack;
      this.set(STORAGE_KEYS.LANGUAGE_PACKS, list);
    }
  }

  clearHistory(): void {
    this.set(STORAGE_KEYS.TRANSLATIONS, []);
    this.set(STORAGE_KEYS.CONVERSATIONS, []);
  }
}

export const localDB = new LocalDatabaseService();
