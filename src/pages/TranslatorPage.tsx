import React, { useState, useRef, useEffect } from 'react';
import {
  Mic,
  Square,
  Volume2,
  Copy,
  Bookmark,
  Check,
  RefreshCw,
  AlertCircle,
  FileAudio,
  Upload,
  Radio,
  Clock,
  Sparkles,
  ArrowRight,
  Play,
  RotateCcw
} from 'lucide-react';
import OlChikiText from '../components/OlChikiText';
import { classroomPipeline, PipelineStage } from '../services/ai/pipeline/TranslationPipeline';
import { PipelineExecutionMetrics } from '../services/ai/types';
import { localDB } from '../services/storage/localDatabase';
import { defaultTTSEngine, getLatinPronunciation } from '../services/ai/tts/TTSEngine';

export const TranslatorPage: React.FC = () => {
  const [inputMode, setInputMode] = useState<'voice' | 'type' | 'upload'>('type');
  const [typedText, setTypedText] = useState('बच्चों, आज हम गणित में भिन्न और गिनती सीखेंगे।');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [micError, setMicError] = useState<string | null>(null);

  const [pipelineStage, setPipelineStage] = useState<PipelineStage>('idle');
  const [recognizedTranscript, setRecognizedTranscript] = useState('');
  const [translatedResult, setTranslatedResult] = useState('');
  const [latinPronunciation, setLatinPronunciation] = useState('');
  const [metrics, setMetrics] = useState<PipelineExecutionMetrics | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerIntervalRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);

  // Classroom quick prompt samples
  const samplePrompts = [
    'बच्चों, आज हम गणित में भिन्न और गिनती सीखेंगे।',
    'नमस्ते बच्चों, अपनी किताबें खोलो और पाठ तीन निकालो।',
    'क्या तुम्हें यह समझ आया?',
    'पेड़ हमें मीठे फल, लकड़ी और छाया देते हैं।',
    'जल ही जीवन है, पानी की एक-एक बूंद बचाओ।',
    'बहुत अच्छा काम किया! शाबाश बच्चों।',
    'कल सब बच्चे अपनी स्लेट पर पांच तक Ol Chiki अंक लिखकर लाएंगे।',
    'दो और दो चार होते हैं।'
  ];

  // Initialize SpeechRecognition if available in browser
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognizer = new SpeechRecognition();
        recognizer.continuous = true;
        recognizer.interimResults = true;
        recognizer.lang = 'hi-IN';

        recognizer.onresult = (event: any) => {
          let currentTranscript = '';
          for (let i = 0; i < event.results.length; i++) {
            currentTranscript += event.results[i][0].transcript;
          }
          if (currentTranscript.trim()) {
            setRecognizedTranscript(currentTranscript);
          }
        };

        recognizer.onerror = (e: any) => {
          console.warn('Live SpeechRecognition notice:', e);
        };

        recognitionRef.current = recognizer;
      } catch (err) {
        console.warn('SpeechRecognition initialization skipped:', err);
      }
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch {
          // ignore
        }
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);

  // Update dynamic Latin pronunciation whenever translation changes
  useEffect(() => {
    if (translatedResult) {
      setLatinPronunciation(getLatinPronunciation(translatedResult));
    } else {
      setLatinPronunciation('');
    }
  }, [translatedResult]);

  // Voice recording handlers
  const startRecording = async () => {
    setMicError(null);
    audioChunksRef.current = [];
    setRecognizedTranscript('');

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.start(100);
      setIsRecording(true);
      setRecordingSeconds(0);

      // Start live web speech recognition if available
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (e) {
          // Already running or permission
        }
      }

      timerIntervalRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.warn('Microphone access issue:', err);
      setMicError(
        'माइक्रोफोन की अनुमति नहीं मिली। आप सीधे टाइप करके या ऑडियो फाइल अपलोड करके अनुवाद कर सकते हैं।'
      );
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }

    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
      setIsRecording(false);

      setTimeout(async () => {
        // If web speech recognition captured the teacher's exact spoken words, use that text!
        if (recognizedTranscript.trim()) {
          await executeTextPipeline(recognizedTranscript);
        } else {
          // Fall back to recorded audio blob pipeline
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          await executeAudioPipeline(audioBlob);
        }
      }, 350);
    }
  };

  const cancelRecording = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch {
        // ignore
      }
    }
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((t) => t.stop());
    }
    setIsRecording(false);
    setRecordingSeconds(0);
    audioChunksRef.current = [];
  };

  // Run pipeline from recorded audio
  const executeAudioPipeline = async (blob: Blob) => {
    setSaved(false);
    try {
      const res = await classroomPipeline.processAudio(
        blob,
        'hi',
        'sat',
        (stage, partial) => {
          setPipelineStage(stage);
          if (partial?.recognizedText) setRecognizedTranscript(partial.recognizedText);
          if (partial?.translatedText) setTranslatedResult(partial.translatedText);
        }
      );

      setRecognizedTranscript(res.recognizedText);
      setTranslatedResult(res.translatedText);
      setMetrics(res.metrics);

      // Save to local device database
      localDB.saveTranslation({
        sourceText: res.recognizedText,
        targetText: res.translatedText,
        sourceLang: 'hi',
        targetLang: 'sat',
        latencyMs: res.metrics.totalTimeMs,
        mode: 'teacher'
      });

      // Auto-play synthesized Santali speech audio immediately
      if (res.playAudio) {
        setIsPlaying(true);
        res.playAudio().finally(() => setIsPlaying(false));
      }
    } catch (e) {
      console.error(e);
      setPipelineStage('error');
    }
  };

  // Run pipeline from typed or recognized text
  const executeTextPipeline = async (textToProcess: string) => {
    if (!textToProcess.trim()) return;
    setSaved(false);

    try {
      const res = await classroomPipeline.processText(
        textToProcess,
        'hi',
        'sat',
        (stage, partial) => {
          setPipelineStage(stage);
          if (partial?.recognizedText) setRecognizedTranscript(partial.recognizedText);
          if (partial?.translatedText) setTranslatedResult(partial.translatedText);
        }
      );

      setRecognizedTranscript(res.recognizedText);
      setTranslatedResult(res.translatedText);
      setMetrics(res.metrics);

      localDB.saveTranslation({
        sourceText: res.recognizedText,
        targetText: res.translatedText,
        sourceLang: 'hi',
        targetLang: 'sat',
        latencyMs: res.metrics.totalTimeMs,
        mode: 'teacher'
      });

      // Auto-play synthesized Santali speech audio immediately
      if (res.playAudio) {
        setIsPlaying(true);
        res.playAudio().finally(() => setIsPlaying(false));
      }
    } catch (e) {
      console.error(e);
      setPipelineStage('error');
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      executeAudioPipeline(file);
    }
  };

  const handlePlaySantali = async () => {
    if (!translatedResult) return;
    setIsPlaying(true);
    try {
      const res = await defaultTTSEngine.synthesize(translatedResult, {
        language: 'sat',
        rate: 0.90
      });
      await res.playbackHandler();
    } catch (err) {
      console.warn('Playback error:', err);
    } finally {
      setIsPlaying(false);
    }
  };

  const handleCopy = () => {
    if (translatedResult) {
      navigator.clipboard.writeText(translatedResult);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleSave = () => {
    if (translatedResult && recognizedTranscript) {
      localDB.saveTranslation({
        sourceText: recognizedTranscript,
        targetText: translatedResult,
        sourceLang: 'hi',
        targetLang: 'sat',
        latencyMs: metrics?.totalTimeMs || 350,
        mode: 'teacher'
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-in fade-in pb-10">
      {/* Top Header Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Offline Classroom Translator
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            LIVE TRANSLATOR (शिक्षक ↔ संताली)
          </h1>
          <p className="text-base text-slate-600 mt-1">
            Real-time spoken and written Hindi translation to Santali in authentic Ol Chiki script.
          </p>
        </div>

        {/* Engine Badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1.5 bg-slate-100 border border-slate-300 text-slate-700 rounded-lg flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            <span>Prototype Engine Active</span>
          </span>
          <span className="text-xs font-medium px-3 py-1.5 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg">
            Santali (Ol Chiki)
          </span>
        </div>
      </div>

      {/* Main Two-Panel Surface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* ================= LEFT PANEL: TEACHER INPUT (HINDI) ================= */}
        <div className="bg-white rounded-2xl border-2 border-blue-900/15 shadow-sm p-6 flex flex-col justify-between space-y-6 relative overflow-hidden">
          {/* Top Panel Bar */}
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-900"></span>
                TEACHER INPUT (HINDI / हिन्दी)
              </span>

              {/* Mode Selector Tabs */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl">
                <button
                  onClick={() => setInputMode('type')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    inputMode === 'type'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Type Text
                </button>
                <button
                  onClick={() => setInputMode('voice')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    inputMode === 'voice'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Speak (Mic)
                </button>
                <button
                  onClick={() => setInputMode('upload')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                    inputMode === 'upload'
                      ? 'bg-white text-blue-950 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Audio File
                </button>
              </div>
            </div>

            {/* MODE 1: TYPE TEXT (MULTI-LINE, FULL SENTENCES) */}
            {inputMode === 'type' && (
              <div className="space-y-4">
                <label className="text-sm font-semibold text-slate-700 block">
                  कक्षा का वाक्य या निर्देश लिखें (Write any Hindi classroom sentence):
                </label>
                <div className="relative">
                  <textarea
                    value={typedText}
                    onChange={(e) => setTypedText(e.target.value)}
                    rows={5}
                    className="w-full p-4 bg-slate-50/70 border-2 border-slate-300 focus:border-blue-900 rounded-xl text-base font-hindi text-slate-900 leading-relaxed focus:outline-none transition-all placeholder:text-slate-400 resize-y"
                    placeholder="कोई भी शब्द या वाक्य लिखें, जैसे: बच्चों, आज हम गणित में भिन्न सीखेंगे..."
                  />
                  <div className="text-right text-xs text-slate-400 mt-1">
                    {typedText.length} वर्ण
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500">
                    Ctrl + Enter या बटन दबाकर अनुवाद करें
                  </span>
                  <button
                    onClick={() => executeTextPipeline(typedText)}
                    disabled={pipelineStage === 'translating' || !typedText.trim()}
                    className="px-6 py-3 bg-blue-900 hover:bg-blue-800 disabled:opacity-50 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-sm transition-all active:scale-98 min-h-[46px]"
                  >
                    <span>संताली अनुवाद करें (Translate)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* MODE 2: SPEAK / MIC (LIVE WAVEFORM & RECORDING) */}
            {inputMode === 'voice' && (
              <div className="p-6 bg-slate-50/90 border-2 border-dashed border-blue-200 rounded-2xl text-center space-y-5">
                {isRecording ? (
                  <div className="space-y-4">
                    <div className="w-20 h-20 mx-auto rounded-full bg-red-600 text-white flex items-center justify-center animate-pulse shadow-lg">
                      <Mic className="w-9 h-9" />
                    </div>

                    <div>
                      <span className="text-base font-bold text-red-700 block">
                        बोलिए... सुन रहे हैं ({recordingSeconds}s)
                      </span>
                      <span className="text-xs text-slate-600 mt-0.5 block">
                        आप जो भी बोलेंगे, वह सीधे नीचे देवनागरी में दिखाई देगा।
                      </span>
                    </div>

                    {/* Animated audio waveform visualization */}
                    <div className="flex items-center justify-center gap-1.5 h-10 py-1">
                      {[40, 75, 95, 60, 85, 100, 70, 90, 45, 80, 65, 90, 50].map((h, i) => (
                        <span
                          key={i}
                          className="w-1.5 bg-blue-800 rounded-full animate-bounce"
                          style={{
                            height: `${h}%`,
                            animationDelay: `${(i * 0.08).toFixed(2)}s`,
                            animationDuration: '0.7s'
                          }}
                        />
                      ))}
                    </div>

                    <div className="flex items-center justify-center gap-3 pt-2">
                      <button
                        onClick={stopRecording}
                        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl flex items-center gap-2 shadow-md transition-all min-h-[46px]"
                      >
                        <Square className="w-4 h-4 fill-white" />
                        <span>रोकें और अनुवाद करें (Stop &amp; Translate)</span>
                      </button>
                      <button
                        onClick={cancelRecording}
                        className="px-4 py-3 bg-white border border-slate-300 text-slate-700 text-sm font-medium rounded-xl hover:bg-slate-100 min-h-[46px]"
                      >
                        रद्द करें (Cancel)
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 py-3">
                    <button
                      onClick={startRecording}
                      className="w-20 h-20 mx-auto rounded-full bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center shadow-lg transition-transform active:scale-95 group"
                      aria-label="Start Speaking in Hindi"
                    >
                      <Mic className="w-9 h-9 group-hover:scale-110 transition-transform" />
                    </button>

                    <div>
                      <span className="text-base font-bold text-slate-900 block">
                        बोलने के लिए माइक दबाएं (Tap to Speak)
                      </span>
                      <span className="text-xs text-slate-500 mt-1 block">
                        कक्षा का कोई भी निर्देश हिंदी में बोलें
                      </span>
                    </div>

                    {micError && (
                      <div className="p-3.5 bg-amber-50 border border-amber-200 text-xs text-amber-900 rounded-xl flex items-start gap-2 text-left">
                        <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{micError}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* MODE 3: UPLOAD AUDIO */}
            {inputMode === 'upload' && (
              <div className="p-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-2xl text-center space-y-4">
                <FileAudio className="w-10 h-10 text-slate-400 mx-auto" />
                <div>
                  <span className="text-sm font-bold text-slate-800 block">
                    कक्षा की ऑडियो रिकॉर्डिंग अपलोड करें (.wav, .mp3, .m4a, .webm)
                  </span>
                  <span className="text-xs text-slate-500 mt-0.5 block">
                    डिवाइस पर स्थानीय रूप से प्रोसेस होगी
                  </span>
                </div>
                <label className="inline-flex items-center gap-2 px-5 py-3 bg-white border border-slate-300 text-slate-800 text-xs font-bold rounded-xl cursor-pointer hover:bg-slate-100 shadow-xs transition-colors min-h-[46px]">
                  <Upload className="w-4 h-4" />
                  <span>ऑडियो फाइल चुनें</span>
                  <input
                    type="file"
                    accept="audio/*,.wav,.mp3,.m4a,.webm"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
                {uploadedFile && (
                  <p className="text-xs text-teal-800 font-semibold pt-1">
                    चयनित फाइल: {uploadedFile.name} ({(uploadedFile.size / 1024).toFixed(1)} KB)
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Classroom Phrases (Click to Test) */}
          <div className="pt-2 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
              कक्षा के सामान्य वाक्य (Quick Practice Phrases):
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.slice(0, 4).map((p, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setTypedText(p);
                    executeTextPipeline(p);
                  }}
                  className="px-3 py-2 bg-slate-100 hover:bg-blue-50 hover:text-blue-900 hover:border-blue-200 border border-slate-200 text-slate-700 rounded-xl text-xs font-hindi text-left transition-all"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Recognized Hindi Speech Display */}
          {recognizedTranscript && (
            <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1">
              <span className="text-[11px] font-bold text-blue-900 uppercase tracking-wide flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-blue-700"></span>
                पहचाना गया हिंदी वाक्य (Recognized Hindi Speech)
              </span>
              <p className="text-base font-semibold text-slate-900 font-hindi leading-relaxed">
                {recognizedTranscript}
              </p>
            </div>
          )}
        </div>

        {/* ================= RIGHT PANEL: SANTALI / OL CHIKI OUTPUT ================= */}
        <div className="bg-white rounded-2xl border-2 border-teal-700/20 shadow-sm p-6 flex flex-col justify-between space-y-6 relative overflow-hidden bg-gradient-to-b from-teal-50/30 to-white">
          <div>
            {/* Top Panel Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-teal-100 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-950 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
                SANTALI TRANSLATION (<OlChikiText>ᱚᱞ ᱪᱤᱠᱤ</OlChikiText>)
              </span>

              <span className="text-xs font-medium px-2.5 py-1 bg-teal-100/70 text-teal-900 rounded-md">
                JCERT Primary Pack
              </span>
            </div>

            {/* Stepped Pipeline Execution State */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2 mb-4">
              <div className="flex items-center justify-between text-slate-700 font-medium">
                <span className="flex items-center gap-1.5">
                  <Radio className="w-3.5 h-3.5 text-teal-800" />
                  <span>Pipeline Status:</span>
                </span>
                <span className="font-bold text-slate-900">
                  {pipelineStage === 'idle' && 'Waiting for input'}
                  {pipelineStage === 'recognizing' && 'Speech recognition in progress...'}
                  {pipelineStage === 'translating' && 'Translating to Ol Chiki...'}
                  {pipelineStage === 'synthesizing' && 'Generating natural speech audio...'}
                  {pipelineStage === 'complete' && 'Translation Completed'}
                  {pipelineStage === 'error' && 'Execution notice'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[11px] font-bold text-center">
                <div
                  className={`p-1.5 rounded-lg border ${
                    pipelineStage === 'recognizing'
                      ? 'bg-blue-100 text-blue-900 border-blue-400'
                      : pipelineStage === 'translating' || pipelineStage === 'synthesizing' || pipelineStage === 'complete'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  1. ASR
                </div>
                <div
                  className={`p-1.5 rounded-lg border ${
                    pipelineStage === 'translating'
                      ? 'bg-blue-100 text-blue-900 border-blue-400'
                      : pipelineStage === 'synthesizing' || pipelineStage === 'complete'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  2. Ol Chiki NMT
                </div>
                <div
                  className={`p-1.5 rounded-lg border ${
                    pipelineStage === 'synthesizing'
                      ? 'bg-blue-100 text-blue-900 border-blue-400'
                      : pipelineStage === 'complete'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                      : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  3. Speech TTS
                </div>
              </div>
            </div>

            {/* MAIN OL CHIKI RESULT CARD (HIGH VISIBILITY, LARGEST ELEMENT) */}
            <div className="p-6 bg-teal-50/70 border-2 border-teal-300/70 rounded-2xl space-y-4 min-h-[220px] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-teal-900 uppercase tracking-wide">
                  Santali in Ol Chiki Script:
                </span>
                <span className="text-[11px] text-slate-500 font-mono">
                  Prototype Local Engine
                </span>
              </div>

              {translatedResult ? (
                <div className="space-y-4 py-2">
                  {/* Huge Ol Chiki Text: The single largest text element */}
                  <p className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 leading-tight tracking-normal font-ol-chiki break-words select-text">
                    <OlChikiText>{translatedResult}</OlChikiText>
                  </p>

                  {/* Dynamic Pronunciation Guidance */}
                  {latinPronunciation && (
                    <div className="p-3 bg-white/80 rounded-xl border border-teal-200/80">
                      <span className="text-[11px] font-bold text-teal-800 uppercase tracking-wide block mb-0.5">
                        उच्चारण संकेत (Pronunciation Guidance):
                      </span>
                      <p className="text-sm font-medium text-slate-700 italic">
                        {latinPronunciation}
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="py-12 text-center text-slate-400 text-base flex flex-col items-center justify-center space-y-2">
                  <Volume2 className="w-10 h-10 text-slate-300" />
                  <span>बाएं पैनल में वाक्य लिखें या बोलें, Ol Chiki अनुवाद यहाँ दिखेगा।</span>
                </div>
              )}

              {/* Action Buttons */}
              {translatedResult && (
                <div className="pt-4 border-t border-teal-200 flex flex-wrap items-center gap-2">
                  <button
                    onClick={handlePlaySantali}
                    disabled={isPlaying}
                    className="px-5 py-3 bg-teal-800 hover:bg-teal-900 text-white rounded-xl text-sm font-bold flex items-center gap-2 shadow-sm transition-all active:scale-98 min-h-[46px]"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{isPlaying ? 'आवाज चल रही है...' : '▶ आवाज सुनें (Play Audio)'}</span>
                  </button>

                  <button
                    onClick={handlePlaySantali}
                    className="px-3.5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[46px]"
                    title="दोबारा सुनें"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Replay</span>
                  </button>

                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[46px]"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>

                  <button
                    onClick={handleSave}
                    className="px-3.5 py-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors min-h-[46px]"
                  >
                    <Bookmark className={`w-3.5 h-3.5 ${saved ? 'text-blue-900 fill-blue-900' : ''}`} />
                    <span>{saved ? 'Saved' : 'Save'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Real Metrics Row */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
            <span className="font-bold text-slate-700 block mb-2">
              Performance Measurements (performance.now() deltas):
            </span>
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">ASR Latency</span>
                <span className="font-bold text-slate-900">
                  {metrics ? `${metrics.asrTimeMs}ms` : '—'}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">Translation</span>
                <span className="font-bold text-slate-900">
                  {metrics ? `${metrics.translationTimeMs}ms` : '—'}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">TTS Latency</span>
                <span className="font-bold text-slate-900">
                  {metrics ? `${metrics.ttsTimeMs}ms` : '—'}
                </span>
              </div>
              <div className="p-2 bg-white rounded-lg border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase block">Total Time</span>
                <span className="font-bold text-teal-900">
                  {metrics ? `${metrics.totalTimeMs}ms` : '—'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TranslatorPage;
