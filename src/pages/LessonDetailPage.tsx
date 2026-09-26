import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, Volume2, Award } from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const LessonDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lessons = localDB.getLessons();
  const lesson = lessons.find((l) => l.id === id) || lessons[0];

  const handlePlayAudio = async (text: string) => {
    await defaultTTSEngine.synthesize(text, { language: 'sat' })
      .then((res) => res.playbackHandler());
  };

  if (!lesson) {
    return (
      <div className="p-8 text-center bg-white rounded-card border border-slate-200">
        <p className="text-slate-600">Lesson not found in local memory.</p>
        <Link to="/lessons" className="text-blue-900 font-bold underline mt-2 inline-block">
          Return to Lesson Assistant
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in">
      <div className="no-print flex items-center justify-between">
        <Link
          to="/lessons"
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 min-h-[44px]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Lesson Assistant</span>
        </Link>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-slate-900 text-white rounded-button text-xs font-semibold flex items-center gap-2 hover:bg-slate-800 min-h-[44px]"
        >
          <Printer className="w-4 h-4" />
          <span>Print / Export PDF</span>
        </button>
      </div>

      {/* Printable Sheet */}
      <article className="worksheet-a4-sheet bg-white p-8 md:p-12 rounded-card border border-slate-200 shadow-sm space-y-8">
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Department of Higher &amp; Technical Education · Government of Jharkhand
            </span>
            <h1 className="text-2xl font-black text-slate-900 mt-1">
              {lesson.title}
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Target Class: {lesson.grade} | Medium: {lesson.subject} | Language: {lesson.language}
            </p>
          </div>

          <div className="text-right sm:border-l sm:pl-4 border-slate-200">
            <span className="text-xs font-semibold text-teal-800 block">NIPUN Bharat Aligned</span>
            <span className="text-[11px] text-slate-500">SIH26042 Verified Plan</span>
          </div>
        </div>

        {/* Learning Outcome */}
        <div className="p-4 bg-teal-50/70 border border-teal-200 rounded-button">
          <span className="text-xs font-bold text-teal-900 uppercase block mb-1 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5" />
            NIPUN Bharat Competency
          </span>
          <p className="text-xs text-slate-800 font-medium">
            {lesson.learningOutcome}
          </p>
        </div>

        {/* Teacher Instructions Script */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              1. Teacher Pedagogical Script (Dual-Language)
            </h2>
            <button
              onClick={() => handlePlayAudio(lesson.teacherScript.sat)}
              className="no-print text-xs text-teal-700 hover:underline flex items-center gap-1 font-medium"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>Listen Santali</span>
            </button>
          </div>
          <div className="p-4 bg-slate-50 rounded-button border border-slate-200 space-y-2">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase block">Hindi:</span>
              <p className="text-sm text-slate-800 font-hindi">{lesson.teacherScript.hi}</p>
            </div>
            <div className="pt-2 border-t border-slate-200">
              <span className="text-[11px] font-semibold text-teal-800 uppercase block">Santali (<OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>):</span>
              <p className="text-base font-bold text-slate-900">
                <OlChikiText>{lesson.teacherScript.sat}</OlChikiText>
              </p>
            </div>
          </div>
        </div>

        {/* Classroom Activity */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            2. Classroom Participatory Activity
          </h2>
          <div className="p-4 bg-slate-50 rounded-button border border-slate-200 space-y-1">
            <p className="text-xs text-slate-700 font-hindi">{lesson.classroomActivity.hi}</p>
            <p className="text-sm text-teal-900 font-semibold pt-1">
              <OlChikiText>{lesson.classroomActivity.sat}</OlChikiText>
            </p>
          </div>
        </div>

        {/* Student Tasks & Assessment */}
        <div className="space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            3. Student Tasks &amp; Formative Assessment
          </h2>
          <div className="space-y-2">
            {lesson.assessmentQuestions.map((q, i) => (
              <div key={i} className="p-3 bg-slate-50 rounded border border-slate-200 text-xs">
                <p className="text-slate-800 font-hindi"><strong>प्र. {i + 1}:</strong> {q.hi}</p>
                <p className="text-teal-900 font-bold pt-0.5">
                  <OlChikiText>{q.sat}</OlChikiText>
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Family Engagement */}
        <div className="space-y-2">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            4. Mother-Tongue Family Engagement (Home Activity)
          </h2>
          <div className="p-4 bg-slate-50 rounded-button border border-slate-200 text-xs">
            <p className="text-slate-700 font-hindi">{lesson.homeActivity.hi}</p>
            <p className="text-sm text-teal-900 font-semibold pt-1">
              <OlChikiText>{lesson.homeActivity.sat}</OlChikiText>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 text-[11px] text-slate-500 flex justify-between">
          <span>BhashaSetu Pedagogical Assistant · Local Device Verified</span>
          <span>Jharkhand JCERT Primary Curriculum</span>
        </div>
      </article>
    </div>
  );
};

export default LessonDetailPage;
