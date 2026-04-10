import { useState, useRef } from 'react';
import { 
  FileText, 
  Plus, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Award,
  Trash2,
  Edit2,
  Upload,
  CheckCircle2,
  Loader2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const initialSkills = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Python', 'Figma', 'AWS', 'GraphQL'
];

const experience = [
  { id: 1, role: 'Frontend Developer Intern', company: 'TechFlow Solutions', period: 'Jan 2024 - Present', desc: 'Working on React-based dashboard components and state management.' },
  { id: 2, role: 'UI Designer (Freelance)', company: 'Self-employed', period: 'Jun 2023 - Dec 2023', desc: 'Designed high-fidelity mockups for 5+ mobile applications.' },
];

export default function ResumeSkills({ isDark }) {
  const [skills, setSkills] = useState(initialSkills);
  const [newSkill, setNewSkill] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResumeFile(file.name);
      handleUpload();
    }
  };

  const handleUpload = () => {
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

  const addSkill = (e) => {
    e.preventDefault();
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Resume & Skills
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Manage your professional profile and skill set.
          </p>
        </div>
        <button className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
          isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
        }`}>
          <Download size={18} />
          Download PDF
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Resume Upload & Skills */}
        <div className="lg:col-span-1 space-y-8">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Upload Your Resume</h3>
            <div 
              onClick={() => !isUploading && !resumeFile && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 text-center flex flex-col items-center justify-center gap-4 transition-all relative overflow-hidden cursor-pointer ${
              isDark ? 'border-slate-800 bg-slate-900/50 hover:border-royal-indigo' : 'border-gray-200 bg-gray-50/50 hover:border-primary-blue'
            }`}>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".pdf,.docx"
              />
              {isUploading ? (
                <div className="space-y-4 w-full">
                  <Loader2 size={32} className="animate-spin text-royal-indigo mx-auto" />
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-2">
                    <div 
                      className="bg-royal-indigo h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-500">Uploading... {uploadProgress}%</p>
                </div>
              ) : resumeFile ? (
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center mx-auto">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{resumeFile}</p>
                    <p className="text-xs text-slate-500 mt-1">Uploaded successfully</p>
                  </div>
                  <button 
                    onClick={() => setResumeFile(null)}
                    className="text-xs font-bold text-red-500 hover:underline"
                  >
                    Remove and re-upload
                  </button>
                </div>
              ) : (
                <>
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDark ? 'bg-slate-800 text-slate-500' : 'bg-white text-gray-400 shadow-sm'
                  }`}>
                    <Upload size={24} />
                  </div>
                  <div>
                    <p className={`text-sm font-bold ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>Select File</p>
                    <p className="text-xs text-slate-500 mt-1">Supported formats: PDF, DOCX (Max 5MB)</p>
                  </div>
                  <button 
                    onClick={handleUpload}
                    className={`mt-2 px-4 py-2 rounded-xl text-xs font-bold ${
                      isDark ? 'bg-royal-indigo text-white' : 'bg-primary-blue text-white'
                    }`}
                  >
                    Upload Now
                  </button>
                </>
              )}
            </div>
          </div>

          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Skills</h3>
            </div>
            <form onSubmit={addSkill} className="mb-6 flex gap-2">
              <input 
                type="text" 
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill..."
                className={`flex-1 px-4 py-2 rounded-xl text-xs outline-none border transition-all ${
                  isDark ? 'bg-slate-900 border-slate-800 text-white focus:border-royal-indigo' : 'bg-gray-50 border-gray-100 text-deep-charcoal focus:border-primary-blue'
                }`}
              />
              <button 
                type="submit"
                className="p-2 rounded-xl bg-royal-indigo text-white hover:bg-opacity-90"
              >
                <Plus size={18} />
              </button>
            </form>
            <div className="flex flex-wrap gap-2">
              <AnimatePresence>
                {skills.map((skill) => (
                  <motion.span 
                    key={skill} 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className={`group flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                      isDark ? 'bg-slate-800 border-slate-700 text-slate-300 hover:border-royal-indigo' : 'bg-gray-50 border-gray-100 text-gray-600 hover:border-primary-blue'
                    }`}
                  >
                    {skill}
                    <button 
                      onClick={() => removeSkill(skill)}
                      className="opacity-0 group-hover:opacity-100 text-red-500 transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </motion.span>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Right Column: Experience, Education, Awards */}
        <div className="lg:col-span-2 space-y-8">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="flex justify-between items-center mb-8">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Work Experience</h3>
              <button className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold ${
                isDark ? 'bg-royal-indigo text-white' : 'bg-primary-blue text-white'
              }`}>
                <Plus size={16} />
                Add Section
              </button>
            </div>
            <div className="space-y-8">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-4 group">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                    isDark ? 'bg-slate-800 text-royal-indigo' : 'bg-gray-50 text-primary-blue'
                  }`}>
                    <Briefcase size={24} />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`text-lg font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{exp.role}</h4>
                        <p className={`text-sm font-bold ${isDark ? 'text-royal-indigo' : 'text-primary-blue'}`}>{exp.company}</p>
                      </div>
                      <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-slate-800 text-slate-500"><Edit2 size={14} /></button>
                        <button className="p-2 rounded-lg hover:bg-red-500/10 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{exp.period}</p>
                    <p className={`text-sm mt-3 leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{exp.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Education</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <GraduationCap size={20} className="text-royal-indigo mt-1" />
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>B.Tech in Computer Science</h4>
                    <p className="text-xs text-slate-500">Delhi Technological University • 2021 - 2025</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Awards</h3>
              <div className="space-y-6">
                <div className="flex gap-3">
                  <Award size={20} className="text-amber-500 mt-1" />
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Hackathon Winner</h4>
                    <p className="text-xs text-slate-500">Smart India Hackathon • 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
