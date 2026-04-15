import { useState, useRef } from 'react';
import { useEffect } from "react";
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Upload,
  MoreVertical,
  ExternalLink,
  Loader2,
  FileCheck
} from 'lucide-react';
import { motion } from 'motion/react';

export default function MyInternships({ isDark }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

  const [activeInternship, setActiveInternship] = useState(null);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("activeInternship"));
    if (data) setActiveInternship(data);
  }, []);


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file.name);
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    setIsUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            My Active Internships
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Manage your ongoing internships and track your progress.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            onClick={() => !isUploading && fileInputRef.current?.click()}
            disabled={isUploading}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all relative overflow-hidden ${isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
              } ${isUploading ? 'cursor-not-allowed opacity-80' : ''}`}>
            {isUploading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Uploading...
              </>
            ) : uploadedFile ? (
              <>
                <FileCheck size={18} />
                Work Uploaded
              </>
            ) : (
              <>
                <Upload size={18} />
                Upload Work
              </>
            )}
            {isUploading && (
              <div
                className="absolute bottom-0 left-0 h-1 bg-white/30 transition-all duration-200"
                style={{ width: `${uploadProgress}%` }}
              />
            )}
          </button>
          {uploadedFile && !isUploading && (
            <p className="text-[10px] font-bold text-green-500 flex items-center gap-1">
              <CheckCircle2 size={10} /> {uploadedFile}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeInternship ? (
          <motion.div key={activeInternship.id}>
            {/* same UI but use activeInternship instead of internship */}
          </motion.div>
        ) : (
          <p className="text-center text-slate-400">
            No active internship yet 🚀
          </p>
        )}
      </div>

      <div className={`p-8 rounded-3xl border border-dashed ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'
        }`}>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-gray-300 shadow-sm'
            }`}>
            <Briefcase size={32} />
          </div>
          <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            How to earn certificates?
          </h3>
          <p className={`max-w-md mx-auto text-sm ${isDark ? 'text-slate-500' : 'text-gray-500'}`}>
            Once your application is selected and you become "Active", complete the required duration and tasks, then click the "Complete Internship" button to generate your blockchain-verified certificate.
          </p>
          <button className="mt-6 text-sm font-bold text-royal-indigo hover:underline">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}
