import { useState, useRef } from 'react';
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

const activeInternships = [
  {
    id: 1,
    title: 'Software Development Intern',
    company: 'SkillNest Tech',
    duration: '1 Month',
    tasksCompleted: 2,
    totalTasks: 3,
    status: 'Shortlisted',
    logo: 'https://picsum.photos/seed/sn/100/100',
    recentTasks: [
      { id: 1, title: 'Setup development environment', status: 'Completed' },
      { id: 2, title: 'Implement landing page UI', status: 'Completed' },
      { id: 3, title: 'API Integration (Pending)', status: 'In Progress' },
    ]
  }
];

export default function MyInternships({ isDark }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedFile, setUploadedFile] = useState(null);
  const fileInputRef = useRef(null);

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
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all relative overflow-hidden ${
            isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
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
        {activeInternships.map((internship) => (
          <motion.div
            key={internship.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`p-8 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1 space-y-6">
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden ${
                      isDark ? 'bg-slate-800' : 'bg-gray-50'
                    }`}>
                      <img src={internship.logo} alt={internship.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                    <div>
                      <h3 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
                        {internship.title}
                      </h3>
                      <p className={`text-lg font-medium ${isDark ? 'text-royal-indigo' : 'text-primary-blue'}`}>
                        {internship.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-green-500/10 text-green-500">
                      {internship.status}
                    </span>
                    <button className={`p-2 rounded-xl ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-50 text-gray-400'}`}>
                      <MoreVertical size={20} />
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Duration</p>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-slate-400" />
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{internship.duration}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Task Progress</p>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 size={16} className="text-green-500" />
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{internship.tasksCompleted}/{internship.totalTasks} Tasks</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Status</p>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>In Progress</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm font-bold">
                    <span className={isDark ? 'text-slate-400' : 'text-gray-500'}>Overall Progress</span>
                    <span className="text-royal-indigo">40%</span>
                  </div>
                  <div className={`h-3 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                    <div className="h-full w-[40%] bg-royal-indigo rounded-full shadow-[0_0_12px_rgba(99,102,241,0.4)]" />
                  </div>
                </div>
              </div>

              <div className={`w-full md:w-80 p-6 rounded-2xl border ${
                isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-100'
              }`}>
                <h4 className={`font-bold mb-4 flex items-center justify-between ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
                  Recent Tasks
                  <ExternalLink size={14} className="text-slate-500" />
                </h4>
                <div className="space-y-4">
                  {internship.recentTasks.map((task) => (
                    <div key={task.id} className="flex items-start gap-3">
                      <div className={`mt-1 w-4 h-4 rounded border flex items-center justify-center ${
                        task.status === 'Completed' 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-slate-500'
                      }`}>
                        {task.status === 'Completed' && <CheckCircle2 size={12} />}
                      </div>
                      <span className={`text-xs font-medium ${
                        task.status === 'Completed' 
                          ? 'text-slate-500 line-through' 
                          : (isDark ? 'text-slate-300' : 'text-gray-700')
                      }`}>
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-6 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                  isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'
                }`}>
                  View All Tasks
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={`p-8 rounded-3xl border border-dashed ${
        isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-200 bg-gray-50/50'
      }`}>
        <div className="flex flex-col items-center justify-center text-center py-12">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            isDark ? 'bg-slate-800 text-slate-600' : 'bg-white text-gray-300 shadow-sm'
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
