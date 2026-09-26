import React, { useState } from 'react';
import {
  FileSpreadsheet,
  Printer,
  Sparkles,
  Bookmark,
  Check,
  Award,
  RefreshCw
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { localDB, StoredWorksheet } from '../services/storage/localDatabase';

export const WorksheetsPage: React.FC = () => {
  const [grade, setGrade] = useState('Grade 2');
  const [subject, setSubject] = useState('Mathematics');
  const [topic, setTopic] = useState('Counting 1–10 (एल्खा ᱑–᱑᱐)');
  const [difficulty, setDifficulty] = useState('Standard');
  const [isGenerating, setIsGenerating] = useState(false);
  const [saved, setSaved] = useState(false);

  const [activeWorksheet, setActiveWorksheet] = useState<StoredWorksheet>(() => {
    const list = localDB.getWorksheets();
    return list[0];
  });

  const handleGenerate = async () => {
    setIsGenerating(true);
    await new Promise((r) => setTimeout(r, 550));

    const newWs: StoredWorksheet = {
      id: 'ws-' + Date.now(),
      title: `कार्यपत्रक: ${topic} (${grade})`,
      grade,
      subject,
      topic,
      language: 'Hindi + Santali (Ol Chiki)',
      instructionsHi: 'सभी प्रश्नों को ध्यानपूर्वक हल करें और संख्या देवनागरी तथा Ol Chiki दोनों में लिखें।',
      instructionsSat: 'ᱡᱚᱛᱚ ᱠᱩᱠᱞᱤ ᱱᱟᱯᱟᱭ ᱛᱮ ᱥᱟᱹᱛ ᱯᱮ ᱟᱨ ᱮᱞ ᱫᱮᱵᱽᱱᱟᱜᱽᱨᱤ ᱟᱨ ᱚᱞ ᱪᱤᱠᱤ ᱵᱟᱱᱟᱨ ᱛᱮ ᱚᱞ ᱯᱮ᱾',
      questions: [
        {
          id: 1,
          questionHi: 'चित्रों को गिनें और खाली बॉक्स में सही संख्या Ol Chiki में लिखें:',
          questionSat: 'ᱪᱤᱛᱟᱹᱨ ᱠᱚ ᱞᱮᱠᱷᱟᱭ ᱯᱮ ᱟᱨ ᱠᱷᱟᱹᱞᱤ ᱵᱟᱠᱥᱟ ᱨᱮ ᱥᱟᱹᱨᱤ ᱮᱞ ᱚᱞ ᱪᱤᱠᱤ ᱛᱮ ᱚᱞ ᱯᱮ:',
          type: 'count',
          visualAsset: 'apples',
          options: ['4 (ᱯᱩᱱ)', '6 (ᱛᱩᱨᱩᱭ)', '8 (ᱤᱨᱟᱹᱞ)']
        },
        {
          id: 2,
          questionHi: 'संख्या का Santali Ol Chiki नाम से सही मिलान करें:',
          questionSat: 'ᱮᱞ ᱥᱟᱶ ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ ᱧᱩᱛᱩᱢ ᱡᱚᱲᱟᱣ ᱯᱮ:',
          type: 'match',
          options: ['1 (१) — ᱢᱤᱫ', '2 (२) — ᱵᱟᱨ', '3 (३) — ᱯᱮ', '4 (४) — ᱯᱩᱱ', '5 (५) — ᱢᱚᱬᱮ']
        },
        {
          id: 3,
          questionHi: 'खाली स्थान भरिए (संख्या क्रम पूरा करें):',
          questionSat: 'ᱠᱷᱟᱹᱞᱤ ᱴᱷᱟᱶ ᱯᱮᱨᱮᱡᱽ ᱯᱮ (ᱮᱞ ᱛᱷᱟᱨ ᱯᱩᱨᱟᱹᱣ ᱯᱮ):',
          type: 'fill',
          options: ['१, २, __, ४, ५ (Santali: ᱑, ᱒, __, ᱔, ᱕)']
        },
        {
          id: 4,
          questionHi: 'शब्द समस्या: आपके पास 3 बेर हैं, शिक्षक ने 2 और दिए। कुल कितने बेर हुए?',
          questionSat: 'ᱠᱩᱠᱞᱤ: ᱟᱢ ᱴᱷᱮᱱ ᱓ ᱡᱟᱹᱱᱩᱢ ᱢᱮᱱᱟᱜᱼᱟ, ᱢᱟᱹᱪᱮᱛ ᱟᱨᱦᱚᱸ ᱒ ᱮᱢᱟᱫ ᱢᱮᱭᱟ᱾ ᱡᱚᱛᱚ ᱛᱮ ᱛᱤᱱᱟᱹᱜ ᱦᱩᱭᱮᱱᱟ?',
          type: 'choice',
          options: ['4 (ᱯᱩᱱ)', '5 (ᱢᱚᱬᱮ)', '6 (ᱛᱩᱨᱩᱭ)']
        }
      ],
      createdAt: Date.now()
    };

    localDB.saveWorksheet(newWs);
    setActiveWorksheet(newWs);
    setIsGenerating(false);
    setSaved(false);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleSaveOffline = () => {
    localDB.saveWorksheet(activeWorksheet);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-in fade-in">
      {/* Configuration Header */}
      <div className="no-print bg-white p-6 rounded-card border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
            Printable Primary Learning Material
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            BILINGUAL WORKSHEET BUILDER
          </h1>
          <p className="text-sm text-slate-600 mt-1">
            Generate dual-language worksheets with visual counting and Ol Chiki tracing prompts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleSaveOffline}
            className="px-4 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-button flex items-center gap-1.5 transition-colors min-h-[44px]"
          >
            {saved ? <Check className="w-4 h-4 text-emerald-600" /> : <Bookmark className="w-4 h-4" />}
            <span>{saved ? 'Saved Locally' : 'Save Offline'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-xs font-bold rounded-button flex items-center gap-2 shadow-sm transition-colors min-h-[44px]"
          >
            <Printer className="w-4 h-4" />
            <span>Download PDF / Print</span>
          </button>
        </div>
      </div>

      {/* Generator Controls Form */}
      <div className="no-print bg-white p-6 rounded-card border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Grade</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Subject</label>
            <select
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Mathematics">Mathematics</option>
              <option value="Foundational Literacy">Foundational Literacy</option>
              <option value="Environmental Studies">Environmental Studies</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Topic</label>
            <select
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Counting 1–10 (एल्खा ᱑–᱑᱐)">Counting 1–10 (ᱮᱞᱠᱷᱟ ᱑–᱑᱐)</option>
              <option value="Counting 1–20 (एल्खा ᱑–᱒᱐)">Counting 1–20 (ᱮᱞᱠᱷᱟ ᱑–᱒᱐)</option>
              <option value="Addition with Objects">Addition with Objects</option>
              <option value="Common Animals Vocabulary">Common Animals Vocabulary</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-600 block mb-1">Difficulty</label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-button text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-900 min-h-[44px]"
            >
              <option value="Standard">Standard (FLN Baseline)</option>
              <option value="Visual Focus">Visual Focus (Concrete items)</option>
              <option value="Advanced">Advanced Tracing</option>
            </select>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-teal-800 hover:bg-teal-900 text-white text-xs font-bold rounded-button flex items-center gap-2 transition-colors min-h-[44px]"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isGenerating ? 'Building Worksheet...' : 'Regenerate Worksheet Variations'}</span>
          </button>
        </div>
      </div>

      {/* A4 PRINTABLE WORKSHEET CANVAS */}
      <div className="worksheet-a4-sheet bg-white p-8 md:p-12 rounded-card border-2 border-slate-300 shadow-lg space-y-8 max-w-[800px] mx-auto">
        {/* Official Header */}
        <div className="border-b-2 border-slate-900 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Department of Higher &amp; Technical Education · Government of Jharkhand
            </span>
            <h2 className="text-xl font-black text-slate-900 mt-0.5">
              {activeWorksheet.title}
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Medium: Hindi + Santali (<OlChikiText>ᱥᱟᱱᱛᱟᱲᱤ ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>)
            </p>
          </div>

          <div className="text-right text-xs space-y-1 sm:border-l sm:pl-4 border-slate-200">
            <div>
              <span className="text-slate-500">Student Name: </span>
              <span className="inline-block border-b border-dotted border-slate-400 w-32"></span>
            </div>
            <div>
              <span className="text-slate-500">Roll No: </span>
              <span className="inline-block border-b border-dotted border-slate-400 w-16"></span>
              <span className="text-slate-500 ml-2">Date: </span>
              <span className="inline-block border-b border-dotted border-slate-400 w-16"></span>
            </div>
          </div>
        </div>

        {/* Bilingual Instructions Box */}
        <div className="p-3.5 bg-slate-50 rounded border border-slate-300 text-xs space-y-1">
          <p className="text-slate-800 font-hindi">
            <strong>निर्देश:</strong> {activeWorksheet.instructionsHi}
          </p>
          <p className="text-teal-900 font-bold">
            <strong>ᱫᱤᱥᱟᱹ-ᱩᱫᱩᱜ:</strong> <OlChikiText>{activeWorksheet.instructionsSat}</OlChikiText>
          </p>
        </div>

        {/* Questions Section */}
        <div className="space-y-8">
          {/* Question 1: Counting Visual */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <p className="font-hindi">{activeWorksheet.questions[0].questionHi}</p>
                <p className="text-teal-900 text-xs font-semibold mt-0.5">
                  <OlChikiText>{activeWorksheet.questions[0].questionSat}</OlChikiText>
                </p>
              </div>
            </div>

            {/* Visual counting items */}
            <div className="p-4 bg-slate-50 rounded border border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3 text-2xl">
                <span>🍎</span>
                <span>🍎</span>
                <span>🍎</span>
                <span>🍎</span>
                <span>🍎</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">उत्तर / ᱛᱮᱞᱟ:</span>
                <div className="w-14 h-12 border-2 border-slate-400 rounded bg-white flex items-center justify-center font-bold text-lg text-slate-800">
                  <span className="text-slate-300 text-xs">...</span>
                </div>
              </div>
            </div>
          </div>

          {/* Question 2: Column Matching */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <p className="font-hindi">{activeWorksheet.questions[1].questionHi}</p>
                <p className="text-teal-900 text-xs font-semibold mt-0.5">
                  <OlChikiText>{activeWorksheet.questions[1].questionSat}</OlChikiText>
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 text-xs font-semibold">
              <div className="space-y-3">
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span>1 (१)</span>
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                </div>
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span>2 (२)</span>
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                </div>
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span>3 (३)</span>
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                  <span className="font-bold text-teal-900"><OlChikiText>ᱯᱮ (Pe)</OlChikiText></span>
                </div>
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                  <span className="font-bold text-teal-900"><OlChikiText>ᱢᱤᱫ (Mit’)</OlChikiText></span>
                </div>
                <div className="p-2 border border-slate-300 rounded flex justify-between items-center">
                  <span className="w-3 h-3 rounded-full border border-slate-400"></span>
                  <span className="font-bold text-teal-900"><OlChikiText>ᱵᱟᱨ (Bar)</OlChikiText></span>
                </div>
              </div>
            </div>
          </div>

          {/* Question 3: Fill in Blanks */}
          <div className="space-y-3 pb-6 border-b border-slate-200">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <p className="font-hindi">{activeWorksheet.questions[2].questionHi}</p>
                <p className="text-teal-900 text-xs font-semibold mt-0.5">
                  <OlChikiText>{activeWorksheet.questions[2].questionSat}</OlChikiText>
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-50 rounded border border-slate-200 text-center font-bold text-base space-x-3">
              <span>᱑</span>
              <span>,</span>
              <span>᱒</span>
              <span>,</span>
              <span className="inline-block border-b-2 border-slate-900 w-12 text-slate-400 font-normal">___</span>
              <span>,</span>
              <span>᱔</span>
              <span>,</span>
              <span>᱕</span>
            </div>
          </div>

          {/* Question 4: Word Problem Assessment */}
          <div className="space-y-3">
            <div className="text-sm font-bold text-slate-900 flex items-start gap-2">
              <span className="w-5 h-5 rounded-full bg-slate-900 text-white text-xs flex items-center justify-center shrink-0">
                4
              </span>
              <div>
                <p className="font-hindi">{activeWorksheet.questions[3].questionHi}</p>
                <p className="text-teal-900 text-xs font-semibold mt-0.5">
                  <OlChikiText>{activeWorksheet.questions[3].questionSat}</OlChikiText>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 text-xs font-semibold pt-1">
              <label className="flex items-center gap-2 p-2.5 border border-slate-300 rounded cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-900" />
                <span>(A) 4 (ᱯᱩᱱ)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 border border-slate-300 rounded cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-900" />
                <span>(B) 5 (ᱢᱚᱬᱮ)</span>
              </label>
              <label className="flex items-center gap-2 p-2.5 border border-slate-300 rounded cursor-pointer hover:bg-slate-50">
                <input type="checkbox" className="w-4 h-4 rounded text-blue-900" />
                <span>(C) 6 (ᱛᱩᱨᱩᱭ)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Printable Footer with Assessment Score Box */}
        <div className="pt-6 border-t-2 border-slate-900 flex items-center justify-between text-xs text-slate-500">
          <div>
            <span>Teacher Signature: </span>
            <span className="inline-block border-b border-slate-400 w-28 ml-1"></span>
          </div>

          <div className="flex items-center gap-2">
            <span>Score / Marks: </span>
            <div className="w-16 h-8 border border-slate-400 rounded flex items-center justify-center font-bold text-slate-800">
              / 10
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetsPage;
