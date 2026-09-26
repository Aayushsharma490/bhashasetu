import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Volume2, Award, Copy, Check } from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lessons = localDB.getLessons();
  const lesson = lessons.find((l) => l.id === id) || lessons[0];
  const [playing, setPlaying] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const handlePlayAudio = async (text: string, key: string) => {
    setPlaying(key);
    try {
      const res = await defaultTTSEngine.synthesize(text, { language: 'sat', rate: 0.90 });
      await res.playbackHandler();
    } catch (e) {
      console.warn('Playback error:', e);
    } finally {
      setPlaying(null);
    }
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 1500);
  };

  if (!lesson) {
    return (
      <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
        <p className="text-slate-600">Lesson not found in local memory.</p>
        <Link to="/lessons" className="text-blue-900 font-bold underline mt-2 inline-block">
          Return to Lesson Assistant
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in pb-12">
      <div className="no-print flex items-center justify-between">
        <Link
          to="/lessons"
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson Assistant</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 bg-blue-900 text-white rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-blue-800 shadow-sm transition-colors min-h-[44px]"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <article className="worksheet-a4-sheet bg-white p-8 md:p-12 rounded-2xl border-2 border-slate-300 shadow-sm space-y-8 text-slate-900">
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Department of Higher &amp; Technical Education · Government of Jharkhand
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-1">
              {lesson.title}
            </h1>
            <p className="text-sm text-slate-600 font-semibold mt-0.5">
              Class: {lesson.grade} | Subject: {lesson.subject} | Language: {lesson.language}
            </p>
          </div>

          <div className="text-right sm:border-l sm:pl-4 border-slate-200">
            <span className="text-xs font-bold text-teal-900 block flex items-center gap-1 justify-end">
              <Award className="w-4 h-4 text-teal-700" />
              NIPUN Bharat Aligned
            </span>
            <span className="text-xs text-slate-500">SIH26042 Verified Plan</span>
          </div>
        </div>

        {/* 1. Overview */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">1</span>
            LESSON OVERVIEW (पाठ का सारांश)
          </span>
          <p className="text-sm text-slate-700 leading-relaxed font-hindi pt-1">
            {lesson.overview}
          </p>
        </div>

        {/* 2. Learning Objective */}
        <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-xl space-y-1">
          <span className="text-xs font-bold text-teal-900 uppercase tracking-wide flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[11px] flex items-center justify-center font-bold">2</span>
            LEARNING OBJECTIVE (सीखने के प्रतिफल / FLN)
          </span>
          <p className="text-sm text-slate-800 font-semibold leading-relaxed pt-1">
            {lesson.learningObjective}
          </p>
          <p className="text-xs text-teal-800 pt-1">
            <strong>Outcome:</strong> {lesson.learningOutcome}
          </p>
        </div>

        {/* 3. Teacher Script */}
        <div className="p-6 bg-white rounded-xl border-2 border-blue-900/15 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[11px] flex items-center justify-center font-bold">3</span>
              TEACHER PEDAGOGICAL SCRIPT (कक्षा निर्देश)
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePlayAudio(lesson.teacherScript.sat, 'ts')}
                disabled={playing === 'ts'}
                className="no-print px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-lg flex items-center gap-1.5 text-xs font-bold"
              >
                <Volume2 className="w-4 h-4 text-teal-800" />
                <span>{playing === 'ts' ? 'Playing...' : 'Listen Santali'}</span>
              </button>
              <button
                onClick={() => handleCopy(lesson.teacherScript.sat, 'ts')}
                className="no-print p-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs"
              >
                {copied === 'ts' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs font-bold text-slate-500 uppercase block mb-0.5">Teacher says in Hindi:</span>
              <p className="text-base text-slate-900 font-hindi leading-relaxed">{lesson.teacherScript.hi}</p>
            </div>
            <div className="p-4 bg-teal-50/70 rounded-lg border border-teal-200">
              <span className="text-xs font-bold text-teal-900 uppercase block mb-1">
                Santali in Ol Chiki (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>):
              </span>
              <p className="text-xl sm:text-2xl font-bold text-teal-950 font-ol-chiki leading-relaxed">
                <OlChikiText>{lesson.teacherScript.sat}</OlChikiText>
              </p>
            </div>
          </div>
        </div>

        {/* 4. Classroom Activity */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">4</span>
              CLASSROOM ACTIVITY (कक्षा गतिविधि)
            </span>
            <button
              onClick={() => handlePlayAudio(lesson.classroomActivity.sat, 'ca')}
              className="no-print text-xs text-teal-800 hover:underline font-bold flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> Listen
            </button>
          </div>
          <p className="text-sm text-slate-800 font-hindi leading-relaxed">{lesson.classroomActivity.hi}</p>
          <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
            <OlChikiText>{lesson.classroomActivity.sat}</OlChikiText>
          </p>
        </div>

        {/* 5. Student Activity */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <div className="flex items-center justify-between pb-1 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">5</span>
              STUDENT ACTIVITY (विद्यार्थी कार्य)
            </span>
            <button
              onClick={() => handlePlayAudio(lesson.studentActivity.sat, 'sa')}
              className="no-print text-xs text-teal-800 hover:underline font-bold flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> Listen
            </button>
          </div>
          <p className="text-sm text-slate-800 font-hindi leading-relaxed">{lesson.studentActivity.hi}</p>
          <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
            <OlChikiText>{lesson.studentActivity.sat}</OlChikiText>
          </p>
        </div>

        {/* 6. Assessment Questions */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 pb-1 border-b border-slate-200">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">6</span>
            ASSESSMENT QUESTIONS (मौखिक मूल्यांकन प्रश्न)
          </span>
          <div className="space-y-3">
            {lesson.assessmentQuestions.map((q, i) => (
              <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <p className="text-sm font-semibold text-slate-900 font-hindi">
                  <strong>प्रश्न {i + 1}:</strong> {q.hi}
                </p>
                <p className="text-base font-bold text-teal-950 font-ol-chiki">
                  <OlChikiText>{q.sat}</OlChikiText>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7. Home Activity */}
        <div className="p-5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 pb-1 border-b border-slate-200">
            <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">7</span>
            HOME ACTIVITY (गृहकार्य एवं पारिवारिक सहभागिता)
          </span>
          <p className="text-sm text-slate-800 font-hindi leading-relaxed">{lesson.homeActivity.hi}</p>
          <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
            <OlChikiText>{lesson.homeActivity.sat}</OlChikiText>
          </p>
        </div>

        <div className="pt-6 border-t-2 border-slate-900 text-xs text-slate-500 flex justify-between">
          <span>BhashaSetu Pedagogical Assistant · Local Device Verified</span>
          <span>Jharkhand JCERT Primary Curriculum</span>
        </div>
      </article>
    </div>
  );
};

export default LessonDetailPage;
