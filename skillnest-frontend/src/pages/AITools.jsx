import { useState, useRef } from 'react';
import {
  Wrench,
  ShieldCheck,
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  Upload,
  Search,
  Download,
  Trash2,
  Loader2,
  Sparkles
} from 'lucide-react';
// import { motion, AnimatePresence } from 'motion/react';
import { motion, AnimatePresence } from 'framer-motion';

const initialReports = [
  { id: 1, file: 'Frontend_Project_Final.pdf', status: 'Verified', aiScore: '3%', date: 'Apr 22, 2024' },
  { id: 2, file: 'Kumar_Essay.doc', status: 'Verified', aiScore: '78%', date: 'Apr 20, 2024' },
  { id: 3, file: 'Resume_Draft.pdf', status: 'Reviewing', aiScore: '19%', date: 'Apr 22, 2024' },
  { id: 4, file: 'ResearchPaperDraft.pdf', status: 'Detected', aiScore: '92%', date: 'Apr 21, 2024' },
  { id: 5, file: 'Sharma_Javascript_Assignment.pdf', status: 'Verified', aiScore: '12%', date: 'Apr 21, 2024' },
];

export default function AITools({ isDark }) {
  const [reports, setReports] = useState(initialReports);
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    const count = JSON.parse(localStorage.getItem("submissionCount")) || 0;

    localStorage.setItem("submissionCount", count + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      handleScan(file.name);
    }
  };

  const handleScan = (fileName) => {
    setIsScanning(true);
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanning(false);

          // 🔥 YE ADD KAR (IMPORTANT)
          handleUpload();
          
          const newReport = {
            id: Date.now(),
            file: fileName || 'New_Submission_Analysis.pdf',
            status: 'Verified',
            aiScore: Math.floor(Math.random() * 30) + '%',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          };
          setReports((prev) => [newReport, ...prev]);
          setSelectedFile(null);
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const deleteReport = (id) => {
    setReports(reports.filter(r => r.id !== id));
  };

  const filteredReports = reports.filter((r) => {
    let fileName = "";

    if (typeof r.file === "string") {
      fileName = r.file;
    } else if (r.file && typeof r.file === "object") {
      fileName = r.file.name || "";
    }

    return fileName.toLowerCase().includes((searchQuery || "").toLowerCase());
  });


  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
          AI Tools
        </h1>
        <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
          Verify the authenticity of student submissions with AI analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-1 p-8 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>AI Detection & Plagiarism Check</h3>
          <div
            onClick={() => !isScanning && fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center flex flex-col items-center justify-center gap-6 transition-all relative overflow-hidden cursor-pointer ${isDark ? 'border-slate-800 bg-slate-900/50 hover:border-royal-indigo' : 'border-gray-200 bg-gray-50/50 hover:border-primary-blue'
              }`}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept=".pdf,.docx,.txt"
            />
            {isScanning ? (
              <div className="space-y-6 w-full relative z-10">
                <div className="relative w-20 h-20 mx-auto">
                  <Loader2 size={80} className="animate-spin text-royal-indigo opacity-20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles size={32} className="text-royal-indigo animate-pulse" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${scanProgress}%` }}
                      className="bg-royal-indigo h-2 rounded-full"
                    />
                  </div>
                  <p className="text-xs font-bold text-royal-indigo">Analyzing Document... {scanProgress}%</p>
                </div>
              </div>
            ) : (
              <>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDark ? 'bg-slate-800 text-slate-500' : 'bg-white text-gray-400 shadow-sm'
                  }`}>
                  <Upload size={32} />
                </div>
                <div>
                  <p className={`text-lg font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Upload Document</p>
                  <p className="text-sm text-slate-500 mt-1">Drag and drop or click to browse</p>
                </div>
                <button
                  onClick={handleScan}
                  className={`px-8 py-3 rounded-2xl font-bold transition-all hover:scale-105 active:scale-95 ${isDark ? 'bg-royal-indigo text-white' : 'bg-primary-blue text-white'
                    }`}
                >
                  Start Scan
                </button>
              </>
            )}
            {isScanning && (
              <motion.div
                initial={{ y: -100 }}
                animate={{ y: 400 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-royal-indigo/20 to-transparent h-20 w-full pointer-events-none"
              />
            )}
          </div>
          <div className="mt-8 space-y-4">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Supports PDF, DOCX, TXT</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Deep semantic analysis</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <CheckCircle2 size={14} className="text-green-500" />
              <span>Source code plagiarism check</span>
            </div>
          </div>
        </div>

        <div className={`lg:col-span-2 p-8 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Recent Reports</h3>
            <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border ${isDark ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-gray-50 border-gray-100 text-gray-500'
              }`}>
              <Search size={16} />
              <input
                type="text"
                placeholder="Search reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-xs w-40"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={`border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                  <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">File Name</th>
                  <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">AI Score</th>
                  <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                  <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Date</th>
                  <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-inherit">
                <AnimatePresence>
                  {filteredReports.map((report) => (
                    <motion.tr
                      key={report.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`group ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50/50'}`}
                    >
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                            <FileSearch size={18} className="text-royal-indigo" />
                          </div>
                          <span className="text-sm font-bold ...">
                            {typeof report.file === "string"
                              ? report.file
                              : report.file?.name || "Unknown File"}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`text-sm font-bold ${parseInt(report.aiScore) > 70 ? 'text-red-500' : (parseInt(report.aiScore) > 30 ? 'text-amber-500' : 'text-green-500')
                          }`}>
                          {report.aiScore}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${report.status === 'Verified' ? 'bg-green-500/10 text-green-500' :
                          (report.status === 'Detected' ? 'bg-red-500/10 text-red-500' : 'bg-blue-500/10 text-blue-500')
                          }`}>
                          {report.status}
                        </span>
                      </td>
                      <td className="py-4 text-center text-xs text-slate-500">{report.date}</td>
                      <td className="py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500"><Download size={14} /></button>
                          <button
                            onClick={() => deleteReport(report.id)}
                            className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Files Analyzed</p>
          <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>350+</h4>
          <p className="text-[10px] text-green-500 mt-1">+12 this week</p>
        </div>
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Plagiarism Hits</p>
          <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>120</h4>
          <p className="text-[10px] text-red-500 mt-1">+5 this week</p>
        </div>
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Plagiarized Files</p>
          <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>78</h4>
          <p className="text-[10px] text-amber-500 mt-1">+2 this week</p>
        </div>
        <div className={`p-6 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'}`}>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">AI Verification Rate</p>
          <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>72%</h4>
          <p className="text-[10px] text-green-500 mt-1">+3% this week</p>
        </div>
      </div>
    </div>
  );
}
