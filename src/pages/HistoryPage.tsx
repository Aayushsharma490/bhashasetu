import React, { useState, useEffect } from 'react';
import {
  History,
  Calendar,
  Filter,
  Trash2,
  Volume2,
  BookOpen,
  FileSpreadsheet,
  Mic,
  MessageSquare
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import {
  localDB,
  StoredTranslation,
  StoredConversation,
  StoredLesson,
  StoredWorksheet
} from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const HistoryPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'translations' | 'conversations' | 'lessons' | 'worksheets'>('translations');
  const [filterPeriod, setFilterPeriod] = useState<'today' | 'week' | 'all'>('today');

  const [translations, setTranslations] = useState<StoredTranslation[]>([]);
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [lessons, setLessons] = useState<StoredLesson[]>([]);
  const [worksheets, setWorksheets] = useState<StoredWorksheet[]>([]);

  useEffect(() => {
    setTranslations(localDB.getTranslations());
    setConversations(localDB.getConversations());
    setLessons(localDB.getLessons());
    setWorksheets(localDB.getWorksheets());
  }, []);

  const handleClearHistory = () => {
    if (confirm('Clear local history on this device?')) {
      localDB.clearHistory();
      setTranslations([]);
      setConversations([]);
    }
  };

  const handlePlayAudio = async (text: string, lang: 'hi' | 'sat') => {
    await defaultTTSEngine.synthesize(text, { language: lang })
      .then((res) => res.playbackHandler());
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Local Device Audit Trail
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            CLASSROOM HISTORY
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Review past classroom translations, conversation logs, and generated pedagogical materials.
          </p>
        </div>

        <button
          onClick={handleClearHistory}
          className="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 text-xs font-semibold rounded-button flex items-center gap-1.5 transition-colors min-h-[44px]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          <span>Clear Local Logs</span>
        </button>
      </div>

      {/* Tabs & Period Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-1">
        {/* Module Tabs */}
        <div className="flex items-center gap-1 p-1 bg-white border border-slate-200 rounded-button text-xs font-semibold overflow-x-auto">
          <button
            onClick={() => setActiveTab('translations')}
            className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 min-h-[40px] whitespace-nowrap ${
              activeTab === 'translations' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            <span>Translations ({translations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('conversations')}
            className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 min-h-[40px] whitespace-nowrap ${
              activeTab === 'conversations' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Conversations ({conversations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('lessons')}
            className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 min-h-[40px] whitespace-nowrap ${
              activeTab === 'lessons' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Lessons ({lessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('worksheets')}
            className={`px-3 py-2 rounded transition-colors flex items-center gap-1.5 min-h-[40px] whitespace-nowrap ${
              activeTab === 'worksheets' ? 'bg-blue-900 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Worksheets ({worksheets.length})</span>
          </button>
        </div>

        {/* Filter Period */}
        <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-button p-1 text-xs">
          <button
            onClick={() => setFilterPeriod('today')}
            className={`px-3 py-1.5 rounded min-h-[36px] font-medium transition-colors ${
              filterPeriod === 'today' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setFilterPeriod('week')}
            className={`px-3 py-1.5 rounded min-h-[36px] font-medium transition-colors ${
              filterPeriod === 'week' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setFilterPeriod('all')}
            className={`px-3 py-1.5 rounded min-h-[36px] font-medium transition-colors ${
              filterPeriod === 'all' ? 'bg-slate-200 text-slate-900 font-bold' : 'text-slate-600'
            }`}
          >
            All
          </button>
        </div>
      </div>

      {/* Content Stream */}
      <div className="bg-white rounded-card border border-slate-200 shadow-sm p-6 space-y-4">
        {activeTab === 'translations' && (
          <div className="space-y-3">
            {translations.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No translation records logged on this device yet.</p>
            ) : (
              translations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 rounded-button border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-slate-700">{item.timeFormatted}</span>
                      <span className="text-slate-300">·</span>
                      <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-semibold text-[11px]">
                        {item.mode === 'teacher' ? 'Hindi → Santali' : 'Santali → Hindi'}
                      </span>
                      <span className="text-slate-300">·</span>
                      <span className="text-slate-500 text-[11px]">
                        Latency: {(item.latencyMs / 1000).toFixed(2)}s
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm">
                      <span className="text-slate-700 font-medium font-hindi">{item.sourceText}</span>
                      <span className="hidden sm:inline text-slate-400">&rarr;</span>
                      <span className="text-teal-900 font-bold">
                        <OlChikiText>{item.targetText}</OlChikiText>
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(item.targetText, item.targetLang as 'hi' | 'sat')}
                    className="shrink-0 p-2 text-slate-600 hover:text-teal-800 hover:bg-slate-200 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                    title="Play Audio"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'conversations' && (
          <div className="space-y-3">
            {conversations.length === 0 ? (
              <p className="text-xs text-slate-500 py-6 text-center">No conversation history recorded.</p>
            ) : (
              conversations.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-slate-50 rounded-button border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-bold text-slate-700">{item.timeFormatted}</span>
                      <span className="text-slate-300">·</span>
                      <span className="font-semibold text-slate-800">
                        {item.speaker === 'teacher' ? 'Teacher' : 'Student'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-slate-800">
                      {item.speaker === 'teacher' ? (
                        <span className="font-hindi">{item.sourceText}</span>
                      ) : (
                        <OlChikiText>{item.sourceText}</OlChikiText>
                      )}
                    </p>
                    <p className="text-sm font-bold text-teal-900">
                      {item.speaker === 'teacher' ? (
                        <OlChikiText>{item.targetText}</OlChikiText>
                      ) : (
                        <span className="font-hindi">{item.targetText}</span>
                      )}
                    </p>
                  </div>

                  <button
                    onClick={() => handlePlayAudio(item.targetText, item.targetLang as 'hi' | 'sat')}
                    className="shrink-0 p-2 text-slate-600 hover:text-teal-800 hover:bg-slate-200 rounded min-h-[44px] min-w-[44px] flex items-center justify-center"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'lessons' && (
          <div className="space-y-3">
            {lessons.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-button border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-blue-900 uppercase">
                    {item.grade} · {item.subject}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{item.learningOutcome}</p>
                </div>

                <a
                  href={`/lessons/${item.id}`}
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  View Plan
                </a>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'worksheets' && (
          <div className="space-y-3">
            {worksheets.map((item) => (
              <div
                key={item.id}
                className="p-4 bg-slate-50 rounded-button border border-slate-200 flex items-center justify-between"
              >
                <div>
                  <span className="text-[11px] font-bold text-indigo-900 uppercase">
                    {item.grade} · {item.subject}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Bilingual A4 Sheet Template</p>
                </div>

                <a
                  href="/worksheets"
                  className="px-3 py-1.5 bg-white border border-slate-300 rounded text-xs font-semibold text-slate-700 hover:bg-slate-100"
                >
                  Print Layout
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
