import React, { useState } from 'react';
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
  Printer
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredLesson } from '../services/storage/localDatabase';
import { defaultTTSEngine } from '../services/ai/tts/TTSEngine';

export const LessonsPage: React.FC = () => {
  const [grade, setGrade] = useState('Grade 2');
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Counting 1–10 with Objects');
  const [learningOutcome, setLearningOutcome] = useState('NIPUN Bharat M2.1: Associates count with concrete quantity');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeLesson, setActiveLesson] = useState<StoredLesson>(() => {
    const list = localDB.getLessons();
    return list[0];
  });
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [playingSection, setPlayingSection] = useState<string | null>(null);

  const sampleTopics: Record<string, Array<{ topic: string; nipun: string }>> = {
    Mathematics: [
      { topic: 'Counting 1–10 with Objects', nipun: 'NIPUN Bharat M2.1: Identifies and reads numbers 1–10' },
      { topic: 'Basic Addition using Pebbles', nipun: 'NIPUN Bharat M2.3: Performs single-digit concrete addition' },
      { topic: 'Comparing Quantities (More / Less)', nipun: 'NIPUN Bharat M1.4: Compares group sets' },
    ],
    'Foundational Literacy': [
      { topic: 'Mother Tongue Storytelling & Sounds', nipun: 'NIPUN Bharat L2.2: Oral narrative comprehension' },
      { topic: 'Phonemic Awareness & Vowel Sounds', nipun: 'NIPUN Bharat L1.5: Identifies starting letter sound' },
    ],
    'Environmental Studies': [
      { topic: 'Local Trees, Leaves and Birds', nipun: 'JCERT EVS Gr2: Recognizes local flora & fauna' },
      { topic: 'Water Conservation in Village', nipun: 'JCERT EVS Gr2: Basic water hygiene and sources' },
    ]
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 600));

    // Construct tailored bilingual lesson
    const generated: StoredLesson = {
      id: 'les-' + Date.now(),
      title: `${topic} (${grade} ${subject})`,
      grade,
      subject,
      topic,
      language: 'Santali (Ol Chiki)',
      learningOutcome,
      overview: `A bilingual, foundational classroom pedagogy module bridging Hindi classroom instructions with Santali mother-tongue concepts for ${grade} students.`,
      learningObjective: `Students will understand the core concepts of ${topic} through everyday village objects, articulate understanding in Santali (Ol Chiki), and connect to Hindi classroom terms.`,
      teacherScript: {
        hi: `बच्चों, आज हम ${topic} को अपनी मातृभाषा में खेल-खेल में समझेंगे।`,
        sat: `ᱜᱤᱫᱽᱨᱟᱹ ᱠᱚ, ᱛᱮᱦᱮᱧ ᱟᱵᱚ ᱱᱚᱣᱟ ᱯᱟᱲᱦᱟᱣ ᱟᱵᱚᱣᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱮᱱᱮᱡ-ᱮᱱᱮᱡ ᱛᱮ ᱵᱚᱱ ᱪᱮᱫᱚᱜᱼᱟ᱾`
      },
      classroomActivity: {
        hi: 'कक्षा को छोटे समूहों में बांटें। प्रत्येक समूह स्थानीय वस्तुओं (पत्ते, बीज, कंकड़) से प्रदर्शन करेगा।',
        sat: 'ᱠᱞᱟᱥ ᱨᱤᱱ ᱜᱤᱫᱽᱨᱟᱹ ᱦᱩᱰᱤᱧ ᱫᱚᱞ ᱨᱮ ᱦᱟᱹᱴᱤᱧ ᱠᱚᱯᱮ᱾ ᱡᱚᱛᱚ ᱫᱚᱞ ᱟᱥᱲᱟ ᱥᱩᱨ ᱨᱮᱱᱟᱜ ᱥᱟᱠᱟᱢ, ᱡᱟᱝ, ᱨᱩᱜᱽᱲᱤ ᱛᱮ ᱠᱟᱹᱢᱤ ᱩᱫᱩᱜ ᱯᱮ᱾'
      },
      studentActivity: {
        hi: 'विद्यार्थी अपनी स्लेट या कॉपी पर चित्र बनाएंगे और संताली तथा देवनागरी में लिखेंगे।',
        sat: 'ᱯᱟᱹᱴᱷᱩᱣᱟᱹ ᱠᱚ ᱟᱠᱚᱣᱟᱜ ᱥᱞᱮᱴ ᱪᱮᱛᱟᱱ ᱨᱮ ᱪᱤᱛᱟᱹᱨ ᱵᱮᱱᱟᱣ ᱠᱟᱛᱮ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ᱾'
      },
      assessmentQuestions: [
        {
          hi: 'इस गतिविधि से आपने क्या सीखा?',
          sat: 'ᱱᱚᱣᱟ ᱠᱟᱹᱢᱤ ᱠᱷᱚᱱ ᱟᱢ ᱪᱮᱫ ᱮᱢ ᱪᱮᱫ ᱠᱮᱫᱼᱟ?'
        },
        {
          hi: 'क्या आप इसे अपनी मातृभाषा में एक वाक्य में बता सकते हैं?',
          sat: 'ᱪᱮᱫ ᱟᱢ ᱱᱚᱣᱟ ᱟᱢᱟᱜ ᱟᱭᱳ ᱟᱲᱟᱝ ᱛᱮ ᱞᱟᱹᱭ ᱫᱟᱲᱮᱭᱟᱜᱼᱟᱢ?'
        }
      ],
      homeActivity: {
        hi: 'घर जाकर अपने माता-पिता या दादा-दादी को आज का पाठ संताली में सुनाएं।',
        sat: 'ᱚᱲᱟᱜ ᱪᱟᱞᱟᱣ ᱠᱟᱛᱮ ᱟᱯᱱᱟᱨ ᱟᱭᱳ-ᱵᱟᱵᱟ ᱟᱨ ᱜᱚᱲᱚᱢ ᱦᱟᱲᱟᱢ ᱛᱟᱹᱠᱤᱱ ᱛᱮᱦᱮᱧᱟᱜ ᱯᱟᱲᱦᱟᱣ ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱞᱟᱹᱭ ᱟᱹᱠᱤᱱ ᱯᱮ᱾'
      },
      createdAt: Date.now(),
      saved: true
    };

    localDB.saveLesson(generated);
    setActiveLesson(generated);
    setIsGenerating(false);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 1500);
  };

  const handlePlayAudio = async (text: string, id: string) => {
    setPlayingSection(id);
    await defaultTTSEngine.synthesize(text, { language: 'sat' })
      .then((res) => res.playbackHandler());
    setTimeout(() => setPlayingSection(null), 1200);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in">
      {/* Header */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Multilingual Lesson Builder
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            LESSON ASSISTANT
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate NIPUN Bharat aligned lesson plans with bilingual teacher scripts and oral activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 border border-teal-200 text-teal-800 rounded-full flex items-center gap-1">
            <Award className="w-3.5 h-3.5" /> NIPUN Bharat Aligned
          </span>
        </div>
      </div>

      {/* Generator Configuration Grid */}
      <div className="bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Lesson Configuration Parameters
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Grade Level</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Grade 1">Grade 1 (बालवाटिका / कक्षा 1)</option>
              <option value="Grade 2">Grade 2 (कक्षा 2)</option>
              <option value="Grade 3">Grade 3 (कक्षा 3)</option>
              <option value="Grade 4">Grade 4 (कक्षा 4)</option>
              <option value="Grade 5">Grade 5 (कक्षा 5)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => {
                const s = e.target.value;
                setSubject(s);
                const first = sampleTopics[s]?.[0];
                if (first) {
                  setTopic(first.topic);
                  setLearningOutcome(first.nipun);
                }
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Mathematics">Mathematics (गणित / ᱮᱞᱠᱷᱟ)</option>
              <option value="Foundational Literacy">Foundational Literacy (भाषा / ᱯᱟᱹᱨᱥᱤ)</option>
              <option value="Environmental Studies">Environmental Studies (पर्यावरण अध्ययन)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Classroom Mother Tongue</label>
            <input
              type="text"
              readOnly
              value="Santali (Ol Chiki)"
              className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-button text-xs font-bold text-teal-900 min-h-[44px]"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Topic Preset</label>
            <select
              value={topic}
              onChange={(e) => {
                const t = e.target.value;
                setTopic(t);
                const match = sampleTopics[subject]?.find((item) => item.topic === t);
                if (match) setLearningOutcome(match.nipun);
              }}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              {sampleTopics[subject]?.map((t, idx) => (
                <option key={idx} value={t.topic}>
                  {t.topic}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-slate-500">
            Outcome: <strong className="text-slate-700">{learningOutcome}</strong>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-6 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-button flex items-center justify-center gap-2 shadow-sm transition-colors min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Structuring Lesson...' : 'GENERATE LESSON'}</span>
          </button>
        </div>
      </div>

      {/* Generated Lesson Display Card */}
      {activeLesson && (
        <div className="bg-white rounded-card border border-slate-200 shadow-sm overflow-hidden">
          {/* Top meta */}
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-900 uppercase tracking-wide">
                <span>{activeLesson.grade}</span>
                <span>·</span>
                <span>{activeLesson.subject}</span>
                <span>·</span>
                <span className="text-teal-800">{activeLesson.language}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                {activeLesson.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                {activeLesson.learningOutcome}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/lessons/${activeLesson.id}`}
                className="px-3 py-2 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-button flex items-center gap-1.5 transition-colors min-h-[44px]"
              >
                <span>Full Page View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <button
                onClick={() => window.print()}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-button flex items-center gap-1.5 transition-colors min-h-[44px]"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Lesson</span>
              </button>
            </div>
          </div>

          {/* Lesson Content Sections */}
          <div className="p-6 space-y-6">
            {/* Section 1: Overview & Learning Objective */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-button border border-slate-200">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block mb-1">
                  LESSON OVERVIEW
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {activeLesson.overview}
                </p>
              </div>

              <div className="p-4 bg-teal-50/60 rounded-button border border-teal-200">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wide block mb-1">
                  LEARNING OBJECTIVE (FLN)
                </span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {activeLesson.learningObjective}
                </p>
              </div>
            </div>

            {/* Section 2: Teacher Script (Bilingual) */}
            <div className="p-5 bg-white rounded-button border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                  TEACHER SCRIPT (HINDI &amp; SANTALI OL CHIKI)
                </span>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handlePlayAudio(activeLesson.teacherScript.sat, 'ts')}
                    disabled={playingSection === 'ts'}
                    className="p-1.5 text-teal-700 hover:bg-teal-50 rounded flex items-center gap-1 text-xs font-semibold"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{playingSection === 'ts' ? 'Playing...' : 'Listen Santali'}</span>
                  </button>
                  <button
                    onClick={() => handleCopy(activeLesson.teacherScript.sat, 'ts')}
                    className="p-1.5 text-slate-500 hover:bg-slate-100 rounded text-xs"
                  >
                    {copiedSection === 'ts' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-xs text-slate-500">
                  <strong className="text-slate-700">Teacher says in Hindi:</strong>
                  <p className="text-sm text-slate-800 font-hindi mt-0.5">{activeLesson.teacherScript.hi}</p>
                </div>
                <div className="text-xs text-teal-800 pt-1">
                  <strong className="text-teal-900">Santali Translation (<OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>):</strong>
                  <p className="text-base text-slate-900 font-bold mt-0.5">
                    <OlChikiText>{activeLesson.teacherScript.sat}</OlChikiText>
                  </p>
                </div>
              </div>
            </div>

            {/* Section 3: Classroom Activity & Student Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-button border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    CLASSROOM ACTIVITY
                  </span>
                  <button
                    onClick={() => handlePlayAudio(activeLesson.classroomActivity.sat, 'ca')}
                    className="text-xs text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Listen
                  </button>
                </div>
                <p className="text-xs text-slate-600 font-hindi">{activeLesson.classroomActivity.hi}</p>
                <p className="text-xs text-teal-900 font-semibold pt-1">
                  <OlChikiText>{activeLesson.classroomActivity.sat}</OlChikiText>
                </p>
              </div>

              <div className="p-5 bg-slate-50 rounded-button border border-slate-200 space-y-2">
                <div className="flex items-center justify-between pb-1 border-b border-slate-200">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                    STUDENT ACTIVITY
                  </span>
                  <button
                    onClick={() => handlePlayAudio(activeLesson.studentActivity.sat, 'sa')}
                    className="text-xs text-teal-700 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Listen
                  </button>
                </div>
                <p className="text-xs text-slate-600 font-hindi">{activeLesson.studentActivity.hi}</p>
                <p className="text-xs text-teal-900 font-semibold pt-1">
                  <OlChikiText>{activeLesson.studentActivity.sat}</OlChikiText>
                </p>
              </div>
            </div>

            {/* Section 4: Assessment Questions & Home Activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-slate-50 rounded-button border border-slate-200 space-y-3">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block pb-1 border-b border-slate-200">
                  ASSESSMENT QUESTIONS
                </span>
                {activeLesson.assessmentQuestions.map((q, idx) => (
                  <div key={idx} className="space-y-0.5 text-xs">
                    <p className="text-slate-700 font-hindi"><strong>Q{idx + 1}:</strong> {q.hi}</p>
                    <p className="text-teal-900 font-bold">
                      <OlChikiText>{q.sat}</OlChikiText>
                    </p>
                  </div>
                ))}
              </div>

              <div className="p-5 bg-slate-50 rounded-button border border-slate-200 space-y-2">
                <span className="text-xs font-bold text-slate-800 uppercase tracking-wide block pb-1 border-b border-slate-200">
                  HOME ACTIVITY (FAMILY ENGAGEMENT)
                </span>
                <p className="text-xs text-slate-600 font-hindi">{activeLesson.homeActivity.hi}</p>
                <p className="text-xs text-teal-900 font-semibold pt-1">
                  <OlChikiText>{activeLesson.homeActivity.sat}</OlChikiText>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonsPage;
