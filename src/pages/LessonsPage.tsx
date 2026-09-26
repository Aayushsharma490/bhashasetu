import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Sparkles,
  Volume2,
  Copy,
  Bookmark,
  Check,
  Award,
  ArrowRight,
  Printer,
  Layers,
  AlertCircle
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredLesson } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';
import {
  CURRICULUM_MAP,
  CurriculumTopic,
  GradeLevel,
  SubjectName,
  getCurriculumTopics
} from '../services/curriculum/curriculumMap';

export const LessonsPage: React.FC = () => {
  const [grade, setGrade] = useState<GradeLevel>('Grade 5');
  const [subject, setSubject] = useState<SubjectName>('Mathematics');
  const [availableTopics, setAvailableTopics] = useState<CurriculumTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [activeCurriculumTopic, setActiveCurriculumTopic] = useState<CurriculumTopic | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLesson, setActiveLesson] = useState<StoredLesson | null>(null);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [playingSection, setPlayingSection] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  // Synchronize available curriculum topics when Grade or Subject changes
  useEffect(() => {
    const topics = getCurriculumTopics(grade, subject);
    setAvailableTopics(topics);
    if (topics.length > 0) {
      setSelectedTopicId(topics[0].id);
      setActiveCurriculumTopic(topics[0]);
    } else {
      setSelectedTopicId('');
      setActiveCurriculumTopic(null);
    }
  }, [grade, subject]);

  // Initial load: generate initial Grade 5 lesson
  useEffect(() => {
    if (activeCurriculumTopic && !activeLesson) {
      buildLessonFromCurriculum(activeCurriculumTopic, grade, subject);
    }
  }, [activeCurriculumTopic]);

  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    const found = availableTopics.find((t) => t.id === topicId);
    if (found) {
      setActiveCurriculumTopic(found);
    }
  };

  const buildLessonFromCurriculum = (
    cTopic: CurriculumTopic,
    g: GradeLevel,
    s: SubjectName
  ) => {
    const generated: StoredLesson = {
      id: 'les-' + Date.now(),
      title: `${cTopic.topic} (${g} ${s})`,
      grade: g,
      subject: s,
      topic: cTopic.topic,
      language: 'Santali (Ol Chiki)',
      learningOutcome: `${cTopic.nipunCode}: ${cTopic.outcome}`,
      overview: cTopic.overview,
      learningObjective: cTopic.objective,
      teacherScript: {
        hi: cTopic.teacherScriptHi,
        sat: cTopic.teacherScriptSat
      },
      classroomActivity: {
        hi: cTopic.classroomActivityHi,
        sat: cTopic.classroomActivitySat
      },
      studentActivity: {
        hi: cTopic.studentActivityHi,
        sat: cTopic.studentActivitySat
      },
      assessmentQuestions: cTopic.assessmentQuestions,
      homeActivity: {
        hi: cTopic.homeActivityHi,
        sat: cTopic.homeActivitySat
      },
      createdAt: Date.now(),
      saved: true
    };

    localDB.saveLesson(generated);
    setActiveLesson(generated);
  };

  const handleGenerate = async () => {
    if (!activeCurriculumTopic) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 450));
    buildLessonFromCurriculum(activeCurriculumTopic, grade, subject);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingSection(id);
    try {
      const res = await defaultTTSEngine.synthesize(text, { language: 'sat', rate: 0.90 });
      await res.playbackHandler();
    } catch (e) {
      console.warn('Playback error:', e);
    } finally {
      setPlayingSection(null);
    }
  };

  const handleSaveOffline = () => {
    if (activeLesson) {
      localDB.saveLesson(activeLesson);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in pb-12">
      {/* Top Header */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Multilingual Lesson Builder · NIPUN Bharat Aligned
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            LESSON ASSISTANT (पाठ योजना)
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate 7-section bilingual lesson plans (Hindi ↔ Santali Ol Chiki) aligned to Grade 1 through Grade 5.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveOffline}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'Saved Locally' : 'Save Offline'}</span>
          </button>

          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>Print Lesson</span>
          </button>
        </div>
      </div>

      {/* Generator Configuration Grid */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Lesson Configuration Parameters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">Grade Level</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as GradeLevel)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Grade 1">Grade 1 (कक्षा 1 / बालवाटिका)</option>
              <option value="Grade 2">Grade 2 (कक्षा 2)</option>
              <option value="Grade 3">Grade 3 (कक्षा 3)</option>
              <option value="Grade 4">Grade 4 (कक्षा 4)</option>
              <option value="Grade 5">Grade 5 (कक्षा 5)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value as SubjectName)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Mathematics">Mathematics (गणित / ᱮᱞᱠᱷᱟ)</option>
              <option value="Foundational Literacy">Foundational Literacy (भाषा / ᱯᱟᱹᱨᱥᱤ)</option>
              <option value="Environmental Studies">Environmental Studies (पर्यावरण / ᱥᱟᱪᱟᱨᱦᱮ)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Topic (Curriculum Mapped)
            </label>
            {availableTopics.length > 0 ? (
              <select
                value={selectedTopicId}
                onChange={(e) => handleTopicChange(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
              >
                {availableTopics.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.topic}
                  </option>
                ))}
              </select>
            ) : (
              <div className="p-2.5 bg-slate-100 rounded-xl text-xs text-slate-500">
                Content for this grade/subject coming soon
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Outcome: <strong className="text-slate-800">{activeCurriculumTopic ? `${activeCurriculumTopic.nipunCode}: ${activeCurriculumTopic.outcome}` : '—'}</strong>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !activeCurriculumTopic}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Structuring Lesson...' : 'GENERATE LESSON'}</span>
          </button>
        </div>
      </div>

      {/* Honest Empty State if combination has no curriculum data */}
      {!activeCurriculumTopic && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Content for this grade/subject coming soon</h3>
          <p className="text-xs text-slate-500">
            Please choose another grade or subject combination above.
          </p>
        </div>
      )}

      {/* Generated Lesson Display Card with ALL 7 MANDATORY SECTIONS */}
      {activeLesson && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900">
          {/* Header Bar */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide">
                <span>{activeLesson.grade}</span>
                <span>·</span>
                <span>{activeLesson.subject}</span>
                <span>·</span>
                <span className="text-teal-800">{activeLesson.language}</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mt-1">
                {activeLesson.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">
                {activeLesson.learningOutcome}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/lessons/${activeLesson.id}`}
                className="px-3.5 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors min-h-[44px]"
              >
                <span>Full Page View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Lesson Content: 7 Full Sections */}
          <div className="p-6 space-y-6">
            {/* SECTION 1: Lesson Overview */}
            <div className="p-5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-1.5">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wide flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">1</span>
                LESSON OVERVIEW (पाठ का सारांश)
              </span>
              <p className="text-sm text-slate-700 leading-relaxed font-hindi pt-1">
                {activeLesson.overview || 'Unable to generate — retry'}
              </p>
            </div>

            {/* SECTION 2: Learning Objective (NIPUN Bharat aligned) */}
            <div className="p-5 bg-teal-50/70 rounded-xl border border-teal-200 space-y-1.5">
              <span className="text-xs font-bold text-teal-900 uppercase tracking-wide flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-teal-800 text-white text-[11px] flex items-center justify-center font-bold">2</span>
                LEARNING OBJECTIVE (सीखने के प्रतिफल / FLN)
              </span>
              <p className="text-sm text-teal-950 font-semibold leading-relaxed pt-1">
                {activeLesson.learningObjective || 'Unable to generate — retry'}
              </p>
            </div>

            {/* SECTION 3: Teacher Script (Bilingual Hindi + Ol Chiki) */}
            <div className="p-6 bg-white rounded-xl border-2 border-blue-900/15 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-blue-950 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-900 text-white text-[11px] flex items-center justify-center font-bold">3</span>
                  TEACHER SCRIPT (कक्षा निर्देश: हिन्दी एवं संताली Ol Chiki)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePlayAudio(activeLesson.teacherScript.sat, 'ts')}
                    disabled={playingSection === 'ts'}
                    className="px-3 py-1.5 bg-teal-50 hover:bg-teal-100 text-teal-900 border border-teal-200 rounded-lg flex items-center gap-1.5 text-xs font-bold"
                  >
                    <Volume2 className="w-4 h-4 text-teal-800" />
                    <span>{playingSection === 'ts' ? 'Playing...' : '▶ Listen Santali'}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(activeLesson.teacherScript.sat, 'ts')}
                    className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs"
                    title="Copy Ol Chiki"
                  >
                    {copiedSection === 'ts' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                  <strong className="text-xs text-slate-500 uppercase block mb-0.5">Teacher says in Hindi:</strong>
                  <p className="text-base text-slate-900 font-hindi leading-relaxed">
                    {activeLesson.teacherScript.hi || 'Unable to generate — retry'}
                  </p>
                </div>

                <div className="p-4 bg-teal-50/70 rounded-lg border border-teal-200">
                  <strong className="text-xs text-teal-900 uppercase block mb-1">
                    Santali in Ol Chiki (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>):
                  </strong>
                  <p className="text-xl sm:text-2xl font-bold text-teal-950 font-ol-chiki leading-relaxed">
                    <OlChikiText>{activeLesson.teacherScript.sat || 'Unable to generate — retry'}</OlChikiText>
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION 4: Classroom Activity (Step-by-step participatory) */}
            <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">4</span>
                  CLASSROOM ACTIVITY (कक्षा गतिविधि)
                </span>
                <button
                  onClick={() => handlePlayAudio(activeLesson.classroomActivity.sat, 'ca')}
                  className="text-xs text-teal-800 hover:underline font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </button>
              </div>
              <p className="text-sm text-slate-800 font-hindi leading-relaxed">{activeLesson.classroomActivity.hi}</p>
              <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
                <OlChikiText>{activeLesson.classroomActivity.sat}</OlChikiText>
              </p>
            </div>

            {/* SECTION 5: Student Activity (Hands-on practice) */}
            <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">5</span>
                  STUDENT ACTIVITY (विद्यार्थी कार्य)
                </span>
                <button
                  onClick={() => handlePlayAudio(activeLesson.studentActivity.sat, 'sa')}
                  className="text-xs text-teal-800 hover:underline font-bold flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Listen
                </button>
              </div>
              <p className="text-sm text-slate-800 font-hindi leading-relaxed">{activeLesson.studentActivity.hi}</p>
              <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
                <OlChikiText>{activeLesson.studentActivity.sat}</OlChikiText>
              </p>
            </div>

            {/* SECTION 6: Assessment Questions (Bilingual checking) */}
            <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-3">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 pb-1 border-b border-slate-200">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">6</span>
                ASSESSMENT QUESTIONS (मौखिक मूल्यांकन प्रश्न)
              </span>
              <div className="space-y-3">
                {activeLesson.assessmentQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                    <p className="text-sm font-semibold text-slate-900 font-hindi">
                      <strong>प्रश्न {idx + 1}:</strong> {q.hi}
                    </p>
                    <p className="text-base font-bold text-teal-950 font-ol-chiki">
                      <OlChikiText>{q.sat}</OlChikiText>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 7: Home Activity (Family Engagement) */}
            <div className="p-5 bg-slate-50/80 rounded-xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 pb-1 border-b border-slate-200">
                <span className="w-5 h-5 rounded-full bg-slate-800 text-white text-[11px] flex items-center justify-center font-bold">7</span>
                HOME ACTIVITY (गृहकार्य एवं पारिवारिक सहभागिता)
              </span>
              <p className="text-sm text-slate-800 font-hindi leading-relaxed">{activeLesson.homeActivity.hi}</p>
              <p className="text-base font-bold text-teal-900 font-ol-chiki pt-1">
                <OlChikiText>{activeLesson.homeActivity.sat}</OlChikiText>
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
