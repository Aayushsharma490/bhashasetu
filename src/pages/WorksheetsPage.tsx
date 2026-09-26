import React, { useState, useEffect } from 'react';
import {
  Printer,
  Sparkles,
  Bookmark,
  Check,
  Award,
  Layers,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredWorksheet } from '../services/storage/localDatabase';
import {
  CURRICULUM_MAP,
  CurriculumTopic,
  GradeLevel,
  SubjectName,
  getCurriculumTopics
} from '../services/curriculum/curriculumMap';

export const WorksheetsPage: React.FC = () => {
  const [grade, setGrade] = useState<GradeLevel>('Grade 5');
  const [subject, setSubject] = useState<SubjectName>('Mathematics');
  const [availableTopics, setAvailableTopics] = useState<CurriculumTopic[]>([]);
  const [selectedTopicId, setSelectedTopicId] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  // Active curriculum topic data
  const [activeTopic, setActiveTopic] = useState<CurriculumTopic | null>(null);

  // Update available topics when grade or subject changes
  useEffect(() => {
    const topics = getCurriculumTopics(grade, subject);
    setAvailableTopics(topics);
    if (topics.length > 0) {
      setSelectedTopicId(topics[0].id);
      setActiveTopic(topics[0]);
    } else {
      setSelectedTopicId('');
      setActiveTopic(null);
    }
  }, [grade, subject]);

  // Handle topic change
  const handleTopicChange = (topicId: string) => {
    setSelectedTopicId(topicId);
    const found = availableTopics.find((t) => t.id === topicId);
    if (found) {
      setActiveTopic(found);
    }
  };

  // Generate / Regenerate worksheet for selected grade + subject + topic
  const handleGenerate = async () => {
    if (!activeTopic) return;
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 450));

    // Save to local DB as generated worksheet
    const newWs: StoredWorksheet = {
      id: 'ws-' + Date.now(),
      title: `कार्यपत्रक: ${activeTopic.topic} (${grade})`,
      grade,
      subject,
      topic: activeTopic.topic,
      language: 'Hindi + Santali (Ol Chiki)',
      instructionsHi: activeTopic.worksheet.instructionsHi,
      instructionsSat: activeTopic.worksheet.instructionsSat,
      questions: [
        {
          id: 1,
          questionHi: activeTopic.worksheet.activityTitle,
          questionSat: activeTopic.worksheet.instructionsSat,
          type: activeTopic.worksheet.activityType as any
        }
      ],
      matchingPairs: activeTopic.worksheet.matchingPairs,
      fillBlanks: activeTopic.worksheet.fillBlanks,
      mathProblems: activeTopic.worksheet.mathProblems,
      assessmentRubric: activeTopic.worksheet.assessmentRubric,
      createdAt: Date.now()
    };

    localDB.saveWorksheet(newWs);
    setIsGenerating(false);
    setSaved(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveOffline = () => {
    if (!activeTopic) return;
    const wsToSave: StoredWorksheet = {
      id: 'ws-' + Date.now(),
      title: `कार्यपत्रक: ${activeTopic.topic} (${grade})`,
      grade,
      subject,
      topic: activeTopic.topic,
      language: 'Hindi + Santali (Ol Chiki)',
      instructionsHi: activeTopic.worksheet.instructionsHi,
      instructionsSat: activeTopic.worksheet.instructionsSat,
      questions: [
        {
          id: 1,
          questionHi: activeTopic.worksheet.activityTitle,
          questionSat: activeTopic.worksheet.instructionsSat,
          type: activeTopic.worksheet.activityType as any
        }
      ],
      matchingPairs: activeTopic.worksheet.matchingPairs,
      fillBlanks: activeTopic.worksheet.fillBlanks,
      mathProblems: activeTopic.worksheet.mathProblems,
      assessmentRubric: activeTopic.worksheet.assessmentRubric,
      createdAt: Date.now()
    };
    localDB.saveWorksheet(wsToSave);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in pb-12">
      {/* Top Header Controls (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Printable Classroom Pedagogy Material
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            BILINGUAL WORKSHEET BUILDER
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate complete dual-language worksheets tailored specifically to Grade 1 through Grade 5.
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
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-xl flex items-center gap-2 shadow-sm transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Generator Configuration Panel (Hidden during print) */}
      <div className="no-print bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-slate-700">
          Worksheet Parameters (Select Grade &amp; Subject)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Grade Level
            </label>
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
            <label className="text-xs font-semibold text-slate-600 block mb-1.5">
              Subject
            </label>
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

        <div className="pt-2 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Selected: <strong className="text-slate-800">{grade} · {subject}</strong> &rarr; {activeTopic?.topic}
          </div>
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !activeTopic}
            className="px-6 py-2.5 bg-teal-800 hover:bg-teal-900 disabled:opacity-50 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Building Worksheet...' : 'Generate Grade Worksheet'}</span>
          </button>
        </div>
      </div>

      {/* Honest Empty State if no topic available */}
      {!activeTopic && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200 shadow-sm space-y-2">
          <Layers className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-700">Content for this grade/subject coming soon</h3>
          <p className="text-xs text-slate-500">
            Please choose another grade or subject combination above.
          </p>
        </div>
      )}

      {/* ================= A4 PRINTABLE WORKSHEET CANVAS ================= */}
      {activeTopic && (
        <div className="worksheet-a4-sheet bg-white p-8 md:p-12 rounded-2xl border-2 border-slate-300 shadow-lg space-y-8 max-w-[800px] mx-auto text-slate-900">
          {/* 1. Official Header */}
          <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Department of Higher &amp; Technical Education · Government of Jharkhand
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                कार्यपत्रक (Worksheet): {activeTopic.topic}
              </h2>
              <p className="text-xs text-slate-600 font-semibold mt-0.5">
                Class: {grade} · Subject: {subject} · Medium: Hindi + Santali (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>)
              </p>
            </div>

            <div className="text-right text-xs space-y-1.5 sm:border-l sm:pl-4 border-slate-200">
              <div>
                <span className="text-slate-500">नाम (Name): </span>
                <span className="inline-block border-b border-dotted border-slate-400 w-32"></span>
              </div>
              <div>
                <span className="text-slate-500">अनुक्रमांक (Roll No): </span>
                <span className="inline-block border-b border-dotted border-slate-400 w-16"></span>
                <span className="text-slate-500 ml-2">दिनांक: </span>
                <span className="inline-block border-b border-dotted border-slate-400 w-16"></span>
              </div>
            </div>
          </div>

          {/* 2. Bilingual Instructions Box */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-300 text-xs space-y-1.5">
            <p className="text-slate-900 font-hindi">
              <strong>निर्देश (Hindi):</strong> {activeTopic.worksheet.instructionsHi}
            </p>
            <p className="text-teal-950 font-bold text-sm">
              <strong>ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ (Santali):</strong> <OlChikiText>{activeTopic.worksheet.instructionsSat}</OlChikiText>
            </p>
          </div>

          {/* 3. SECTION A: Mathematical / Conceptual Activity */}
          <div className="space-y-4 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="font-hindi text-base">{activeTopic.worksheet.activityTitle}</p>
                <p className="text-teal-900 text-xs font-semibold">
                  <OlChikiText>{activeTopic.topicSat}</OlChikiText>
                </p>
              </div>
            </div>

            {/* If Counting Visual Items (Grade 1-2) */}
            {activeTopic.worksheet.visualItems && activeTopic.worksheet.visualItems.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {activeTopic.worksheet.visualItems.map((item, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-slate-700 block">{item.label}</span>
                      <div className="text-xl pt-1">
                        {Array.from({ length: item.count }).map((_, i) => (
                          <span key={i} className="inline-block mr-1">🟡</span>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[11px] text-slate-500 block">संख्या / ᱮᱞ:</span>
                      <div className="w-14 h-12 border-2 border-slate-400 rounded-lg bg-white flex items-center justify-center font-bold text-base text-slate-900 font-ol-chiki">
                        <OlChikiText>{item.satOlChiki}</OlChikiText>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* If Math Problems / Fractions / Multiplication (Grade 3, 4, 5) */}
            {activeTopic.worksheet.mathProblems && activeTopic.worksheet.mathProblems.length > 0 && (
              <div className="space-y-3">
                {activeTopic.worksheet.mathProblems.map((prob, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold font-hindi text-slate-900">
                        {idx + 1}. {prob.questionHi}
                      </p>
                      <p className="text-xs font-bold text-teal-900 font-ol-chiki">
                        <OlChikiText>{prob.questionSat}</OlChikiText>
                      </p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs text-slate-500 font-medium">उत्तर / ᱛᱮᱞᱟ:</span>
                      <div className="w-28 h-10 border-2 border-slate-400 rounded-lg bg-white flex items-center justify-center font-bold text-xs text-slate-800">
                        <span className="text-slate-300">यहाँ लिखें</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 4. SECTION B: Bilingual Column Matching Activity */}
          <div className="space-y-4 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="font-hindi text-base">
                  सही मिलान करें (Match the following pairs with Santali Ol Chiki):
                </p>
                <p className="text-teal-900 text-xs font-semibold">
                  <OlChikiText>ᱥᱟᱹᱨᱤ ᱡᱚᱲᱟᱣ ᱯᱮ (ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱥᱟᱶ ᱚᱞ ᱪᱤᱠᱤ ᱢᱮᱞᱟᱣ ᱯᱮ):</OlChikiText>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs font-semibold">
              {/* Column A */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  स्तम्भ (क) / Column A
                </span>
                {activeTopic.worksheet.matchingPairs.map((pair, idx) => (
                  <div key={idx} className="p-3 border border-slate-300 rounded-xl flex justify-between items-center bg-white">
                    <span className="text-slate-800 font-hindi">{pair.left}</span>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400"></span>
                  </div>
                ))}
              </div>

              {/* Column B */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-slate-500 uppercase block mb-1">
                  स्तम्भ (ख) / Column B
                </span>
                {activeTopic.worksheet.matchingPairs.map((pair, idx) => (
                  <div key={idx} className="p-3 border border-slate-300 rounded-xl flex justify-between items-center bg-teal-50/50">
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-slate-400"></span>
                    <span className="font-bold text-teal-950 font-ol-chiki text-sm">
                      <OlChikiText>{pair.rightOlChiki}</OlChikiText>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 5. SECTION C: Fill in the Blank Activity */}
          <div className="space-y-4 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="font-hindi text-base">
                  रिक्त स्थान की पूर्ति करें (Fill in the blanks):
                </p>
                <p className="text-teal-900 text-xs font-semibold">
                  <OlChikiText>ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡᱽ ᱯᱮ (ᱥᱟᱹᱨᱤ ᱮᱞ ᱥᱮ ᱟᱹᱲᱟᱹ ᱛᱮ):</OlChikiText>
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {activeTopic.worksheet.fillBlanks.map((fb, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <p className="text-sm font-hindi text-slate-900">
                    {idx + 1}. {fb.questionHi}
                  </p>
                  <p className="text-xs font-bold text-teal-900 font-ol-chiki">
                    <OlChikiText>{fb.questionSat}</OlChikiText>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* 6. SECTION D: Assessment & Teacher Observation Rubric */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-6 h-6 rounded-full bg-slate-900 text-white text-xs font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <p className="font-hindi text-base">
                  शिक्षक मूल्यांकन एवं टिप्पणी (Teacher Assessment Rubric):
                </p>
                <p className="text-teal-900 text-xs font-semibold">
                  <OlChikiText>ᱢᱟᱹᱪᱮᱛ ᱵᱤᱪᱟᱹᱨ ᱟᱨ ᱪᱤᱱᱦᱟᱹ (Teacher Rubric):</OlChikiText>
                </p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-300 rounded-xl overflow-hidden">
                <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-300">
                  <tr>
                    <th className="p-2.5">मूल्यांकन बिंदु (Assessment Criteria)</th>
                    <th className="p-2.5">Santali Indicator</th>
                    <th className="p-2.5 text-right">दक्षता स्तर (Proficiency)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {activeTopic.worksheet.assessmentRubric.map((rubric, idx) => (
                    <tr key={idx} className="hover:bg-slate-50">
                      <td className="p-2.5 font-hindi text-slate-800">{rubric.criteriaHi}</td>
                      <td className="p-2.5 font-bold text-teal-900 font-ol-chiki">
                        <OlChikiText>{rubric.criteriaSat}</OlChikiText>
                      </td>
                      <td className="p-2.5 text-right font-semibold text-emerald-800">
                        {rubric.level}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Printable Official Footer */}
          <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs text-slate-600">
            <div>
              <span>शिक्षक के हस्ताक्षर (Teacher Signature): </span>
              <span className="inline-block border-b border-slate-400 w-32 ml-1"></span>
            </div>

            <div className="flex items-center gap-2">
              <span>प्राप्तांक (Total Marks): </span>
              <div className="w-20 h-9 border-2 border-slate-500 rounded-lg flex items-center justify-center font-bold text-base text-slate-900">
                / 10
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorksheetsPage;
