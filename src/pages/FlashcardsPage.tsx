import React, { useState } from 'react';
import {
  Layers,
  Volume2,
  ChevronLeft,
  ChevronRight,
  RotateCw,
  Hash,
  Palette,
  Trees,
  BookOpen,
  Users,
  Apple,
  Beef,
  Sparkles
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { FLASHCARDS_DATA, FlashcardItem } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const FlashcardsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'animals', label: 'Animals (ᱡᱤᱭᱟᱹᱞᱤ)' },
    { id: 'numbers', label: 'Numbers (ᱞᱮᱠᱷᱟ)' },
    { id: 'colors', label: 'Colors (ᱨᱚᱝ)' },
    { id: 'nature', label: 'Nature (ᱥᱤᱨᱡᱚᱱ)' },
    { id: 'school', label: 'School (ᱟᱥᱲᱟ)' },
    { id: 'family', label: 'Family (ᱜᱷᱟᱨᱚᱸᱡᱽ)' },
    { id: 'food', label: 'Food (ᱡᱚᱢᱟᱜ)' },
  ];

  const filteredCards = selectedCategory === 'all'
    ? FLASHCARDS_DATA
    : FLASHCARDS_DATA.filter((c) => c.category === selectedCategory);

  const currentCard: FlashcardItem = filteredCards[currentIndex] || filteredCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handlePlayAudio = async () => {
    setIsPlaying(true);
    await defaultTTSEngine.synthesize(currentCard.santaliOlChiki, { language: 'sat' })
      .then((res) => res.playbackHandler());
    setTimeout(() => setIsPlaying(false), 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Visual Pedagogical Vocabulary
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            VISUAL FLASHCARDS
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Teach foundational classroom concepts visually with bilingual pronunciation.
          </p>
        </div>

        <div className="text-xs text-slate-500 font-medium">
          Card <strong>{currentIndex + 1}</strong> of <strong>{filteredCards.length}</strong>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3.5 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-colors min-h-[44px] ${
              selectedCategory === cat.id
                ? 'bg-blue-900 text-white shadow-sm'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Hero Flashcard Stage */}
      {currentCard && (
        <div className="bg-white rounded-card border-2 border-slate-300 shadow-md overflow-hidden max-w-lg mx-auto">
          {/* Top Card Badge */}
          <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-500">
            <span className="uppercase font-bold tracking-wider text-slate-600">
              {currentCard.category}
            </span>
            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="text-blue-900 font-semibold flex items-center gap-1 hover:underline min-h-[36px]"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>{isFlipped ? 'View Hindi / English' : 'View Santali Script'}</span>
            </button>
          </div>

          {/* Flashcard Main Surface */}
          <div className="p-8 sm:p-12 text-center space-y-6">
            {/* Visual Icon Illustration Box */}
            <div className={`w-28 h-28 mx-auto rounded-card ${currentCard.colorHint} flex items-center justify-center shadow-inner`}>
              <span className="text-5xl font-bold">
                {currentCard.category === 'animals' && '🐄'}
                {currentCard.category === 'numbers' && '#' + currentCard.english.slice(-2, -1)}
                {currentCard.category === 'colors' && '🎨'}
                {currentCard.category === 'nature' && '🌿'}
                {currentCard.category === 'school' && '📖'}
                {currentCard.category === 'family' && '👨‍👩‍👧'}
                {currentCard.category === 'food' && '🥭'}
              </span>
            </div>

            {/* Word details based on flip */}
            {!isFlipped ? (
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-slate-400">
                  English / Hindi
                </span>
                <h2 className="text-3xl font-extrabold text-slate-900">
                  {currentCard.english}
                </h2>
                <p className="text-2xl font-bold text-slate-700 font-hindi">
                  {currentCard.hindi}
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold text-teal-800">
                  Santali Mother Tongue (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ</OlChikiText>)
                </span>
                <h2 className="text-4xl font-extrabold text-teal-900">
                  <OlChikiText>{currentCard.santaliOlChiki}</OlChikiText>
                </h2>
                <p className="text-base text-slate-600 italic">
                  Pronunciation: "{currentCard.santaliPronunciation}"
                </p>
              </div>
            )}

            {/* Audio Button */}
            <div className="pt-2">
              <button
                onClick={handlePlayAudio}
                disabled={isPlaying}
                className="px-6 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-button text-xs font-bold inline-flex items-center gap-2 shadow-sm transition-colors min-h-[44px]"
              >
                <Volume2 className="w-4 h-4" />
                <span>{isPlaying ? 'Synthesizing Audio...' : '🔊 Listen Santali Pronunciation'}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls Bar */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-button text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <span className="text-xs text-slate-500 font-medium">
              Tap card or flip to test
            </span>

            <button
              onClick={handleNext}
              className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 rounded-button text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[44px]"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlashcardsPage;
