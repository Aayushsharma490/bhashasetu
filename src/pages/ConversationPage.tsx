import React, { useState, useEffect } from 'react';
import {
  Mic,
  Volume2,
  Send,
  MessageSquare,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredConversation } from '../services/storage/localDatabase';
import { defaultTranslationEngine } from '../services/ai/translation/TranslationEngine';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const ConversationPage: React.FC = () => {
  const [conversations, setConversations] = useState<StoredConversation[]>([]);
  const [activeSpeaker, setActiveSpeaker] = useState<'teacher' | 'student'>('teacher');
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [playingId, setPlayingId] = useState<string | null>(null);

  useEffect(() => {
    setConversations(localDB.getConversations());
  }, []);

  // Quick prompt buttons
  const teacherPrompts = [
    'क्या तुम्हें यह समझ आया?',
    'बच्चों, अपनी किताबें खोलो।',
    'बहुत अच्छा! शाबाश।',
    'क्या कोई सवाल है?'
  ];

  const studentPrompts = [
    'ᱦᱮᱸ, ᱤᱧ ᱱᱚᱣᱟᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱠᱮᱫᱼᱟ᱾',
    'ᱢᱟᱹᱪᱮᱛ, ᱤᱧ ᱵᱟᱹᱧ ᱵᱩᱡᱷᱟᱹᱣ ᱞᱮᱫᱼᱟ᱾',
    'ᱱᱚᱣᱟ ᱨᱮᱭᱟᱜ ᱢᱮᱱᱮᱛ ᱫᱚ ᱪᱮᱫ ᱠᱟᱱᱟ?',
    'ᱟᱹᱞᱤᱧ ᱥᱟᱹᱛ ᱠᱮᱫᱼᱟᱹᱞᱤᱧ᱾'
  ];

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim() || isProcessing) return;

    setIsProcessing(true);
    const sourceLang = activeSpeaker === 'teacher' ? 'hi' : 'sat';
    const targetLang = activeSpeaker === 'teacher' ? 'sat' : 'hi';

    try {
      const transRes = await defaultTranslationEngine.translate(textToSend, {
        sourceLang,
        targetLang,
        domain: 'classroom'
      });

      const newEntry = localDB.saveConversation({
        speaker: activeSpeaker,
        sourceText: textToSend,
        targetText: transRes.targetText,
        sourceLang,
        targetLang
      });

      setConversations((prev) => [...prev, newEntry]);
      setInputText('');

      // Auto-play translation audio
      await defaultTTSEngine.synthesize(transRes.targetText, { language: targetLang })
        .then((res) => res.playbackHandler());
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  const handlePlayAudio = async (conv: StoredConversation) => {
    setPlayingId(conv.id);
    await defaultTTSEngine.synthesize(conv.targetText, { language: conv.targetLang as 'hi' | 'sat' })
      .then((res) => res.playbackHandler());
    setTimeout(() => setPlayingId(null), 1000);
  };

  const handleResetConversation = () => {
    localDB.clearHistory();
    setConversations([]);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Interactive Classroom Dialogue
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            TWO-WAY CLASSROOM MODE
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Let teachers speak Hindi and students respond in Santali naturally.
          </p>
        </div>

        <button
          onClick={handleResetConversation}
          className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-button transition-colors min-h-[44px]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Local Chat</span>
        </button>
      </div>

      {/* Two Large Mode Panels: Teacher vs Student */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Teacher Panel Switcher */}
        <button
          onClick={() => {
            setActiveSpeaker('teacher');
            setInputText(teacherPrompts[0]);
          }}
          className={`p-5 rounded-card border text-left transition-all min-h-[48px] ${
            activeSpeaker === 'teacher'
              ? 'bg-blue-50 border-blue-900 shadow-sm ring-2 ring-blue-900/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
              TEACHER MODE (HINDI)
            </span>
            <span className="text-xs text-slate-500 font-medium">Speaks Hindi &rarr; Plays Santali</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Ask questions, instruct the classroom, explain lesson topics.
          </p>
        </button>

        {/* Student Panel Switcher */}
        <button
          onClick={() => {
            setActiveSpeaker('student');
            setInputText(studentPrompts[0]);
          }}
          className={`p-5 rounded-card border text-left transition-all min-h-[48px] ${
            activeSpeaker === 'student'
              ? 'bg-teal-50 border-teal-700 shadow-sm ring-2 ring-teal-700/20'
              : 'bg-white border-slate-200 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-800 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              STUDENT MODE (SANTALI)
            </span>
            <span className="text-xs text-slate-500 font-medium">Speaks Santali &rarr; Plays Hindi</span>
          </div>
          <p className="text-xs text-slate-600 mt-2">
            Student answers in mother tongue, teacher hears translated Hindi.
          </p>
        </button>
      </div>

      {/* Conversation Timeline */}
      <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[460px]">
        {/* Timeline Header */}
        <div className="px-6 py-3 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs text-slate-600 font-medium">
          <span className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-slate-500" />
            Classroom Turn-by-Turn Timeline
          </span>
          <span className="text-slate-500 font-mono">
            {conversations.length} Exchanges Logged
          </span>
        </div>

        {/* Chat Stream */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {conversations.map((msg) => {
            const isTeacher = msg.speaker === 'teacher';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isTeacher ? 'items-start' : 'items-end'}`}
              >
                <div
                  className={`max-w-xl p-4 rounded-card border shadow-sm space-y-2 ${
                    isTeacher
                      ? 'bg-white border-blue-200 rounded-tl-none'
                      : 'bg-teal-50/90 border-teal-200 rounded-tr-none'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 text-xs pb-1 border-b border-slate-100">
                    <span
                      className={`font-bold uppercase tracking-wide ${
                        isTeacher ? 'text-blue-900' : 'text-teal-900'
                      }`}
                    >
                      {isTeacher ? 'Teacher (Hindi)' : 'Student (Santali)'}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">
                      {msg.timeFormatted}
                    </span>
                  </div>

                  {/* Original Input */}
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-slate-500 block">
                      Spoken:
                    </span>
                    <p className={`text-base font-medium ${isTeacher ? 'font-hindi text-slate-900' : 'text-slate-900'}`}>
                      {isTeacher ? msg.sourceText : <OlChikiText>{msg.sourceText}</OlChikiText>}
                    </p>
                  </div>

                  {/* Translated Output */}
                  <div className="pt-2 border-t border-slate-100/80">
                    <span className="text-[10px] uppercase font-semibold text-teal-800 block">
                      Translated Classroom Audio:
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
                      {isTeacher ? <span className="font-ol-chiki text-teal-950 text-xl sm:text-2xl"><OlChikiText>{msg.targetText}</OlChikiText></span> : <span className="font-hindi">{msg.targetText}</span>}
                    </p>
                  </div>

                  {/* Audio Playback button */}
                  <div className="pt-1 flex justify-end">
                    <button
                      onClick={() => handlePlayAudio(msg)}
                      disabled={playingId === msg.id}
                      className="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded flex items-center gap-1.5 transition-colors min-h-[36px]"
                    >
                      <Volume2 className="w-3.5 h-3.5 text-teal-700" />
                      <span>{playingId === msg.id ? 'Playing...' : 'Play Audio'}</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
          {/* Quick suggestions */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-medium text-slate-500 mr-1">Quick:</span>
            {(activeSpeaker === 'teacher' ? teacherPrompts : studentPrompts).map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setInputText(prompt);
                  handleSendMessage(prompt);
                }}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs rounded transition-colors text-left font-medium min-h-[36px]"
              >
                {activeSpeaker === 'teacher' ? prompt : <OlChikiText>{prompt}</OlChikiText>}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
              placeholder={
                activeSpeaker === 'teacher'
                  ? 'Type or speak teacher message in Hindi...'
                  : 'Type or speak student message in Santali...'
              }
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-button text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            />

            <button
              onClick={() => handleSendMessage(inputText)}
              disabled={isProcessing || !inputText.trim()}
              className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-button flex items-center gap-2 transition-colors min-h-[44px]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isProcessing ? 'Translating...' : 'Send'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConversationPage;
