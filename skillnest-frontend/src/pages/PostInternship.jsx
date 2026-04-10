import { 
  PlusSquare, 
  MapPin, 
  Clock, 
  DollarSign, 
  Briefcase, 
  Plus, 
  Trash2, 
  Send,
  Info,
  Globe,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function PostInternship({ isDark }) {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    duration: '',
    stipend: '',
    category: 'Software Development',
    description: '',
    workType: 'Remote',
    isPublic: true,
    isFeatured: false
  });

  const [requirements, setRequirements] = useState(['Proficiency in React', 'Building responsive UI components']);
  const [responsibilities, setResponsibilities] = useState(['UI build', 'React']);
  const [newReq, setNewReq] = useState('');
  const [newRes, setNewRes] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addRequirement = () => {
    if (newReq.trim()) {
      setRequirements([...requirements, newReq.trim()]);
      setNewReq('');
    }
  };

  const removeRequirement = (index) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const addResponsibility = () => {
    if (newRes.trim()) {
      setResponsibilities([...responsibilities, newRes.trim()]);
      setNewRes('');
    }
  };

  const removeResponsibility = (index) => {
    setResponsibilities(responsibilities.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Post New Internship
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Fill in the details to list a new internship opportunity.
          </p>
        </div>
        <button className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg ${
          isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
        }`}>
          <Send size={18} />
          Publish Internship
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-8">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <h3 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Internship Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Internship Title</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <Briefcase size={18} className="text-slate-500" />
                  <input 
                    type="text" 
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. Frontend Developer Intern" 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Company Name</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <Building2 size={18} className="text-slate-500" />
                  <input 
                    type="text" 
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Google" 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Location</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <MapPin size={18} className="text-slate-500" />
                  <input 
                    type="text" 
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="e.g. Remote / Bangalore" 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Duration</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <Clock size={18} className="text-slate-500" />
                  <input 
                    type="text" 
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    placeholder="e.g. 3 Months" 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Stipend</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <DollarSign size={18} className="text-slate-500" />
                  <input 
                    type="text" 
                    name="stipend"
                    value={formData.stipend}
                    onChange={handleInputChange}
                    placeholder="e.g. ₹20,000 / Month" 
                    className="bg-transparent border-none outline-none text-sm w-full" 
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Category</label>
                <div className={`flex items-center gap-3 px-4 py-3 rounded-2xl border ${
                  isDark ? 'bg-slate-900 border-slate-800 text-slate-200' : 'bg-gray-50 border-gray-100 text-deep-charcoal'
                }`}>
                  <Globe size={18} className="text-slate-500" />
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="bg-transparent border-none outline-none text-sm w-full"
                  >
                    <option value="Software Development">Software Development</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Product Management">Product Management</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="mt-8 space-y-2">
              <label className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Internship Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4} 
                placeholder="Describe the internship role, team, and expectations..." 
                className={`w-full p-4 rounded-2xl border bg-transparent outline-none text-sm ${
                  isDark ? 'border-slate-800 text-slate-200 focus:border-royal-indigo' : 'border-gray-100 text-deep-charcoal focus:border-primary-blue'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Requirements</h3>
              <div className="space-y-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all focus-within:ring-2 ${
                  isDark ? 'bg-slate-900 border-slate-800 focus-within:ring-royal-indigo/30' : 'bg-gray-50 border-gray-100 focus-within:ring-primary-blue/30'
                }`}>
                  <input 
                    type="text" 
                    value={newReq}
                    onChange={(e) => setNewReq(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                    placeholder="Add a requirement..."
                    className="bg-transparent border-none outline-none text-sm w-full py-1"
                  />
                  <button 
                    onClick={addRequirement}
                    className="p-1.5 rounded-xl bg-royal-indigo text-white hover:scale-110 transition-transform shadow-sm"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {requirements.map((req, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i} 
                      className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}
                    >
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{req}</span>
                      <button 
                        onClick={() => removeRequirement(i)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div className={`p-8 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Responsibilities</h3>
              <div className="space-y-4">
                <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all focus-within:ring-2 ${
                  isDark ? 'bg-slate-900 border-slate-800 focus-within:ring-royal-indigo/30' : 'bg-gray-50 border-gray-100 focus-within:ring-primary-blue/30'
                }`}>
                  <input 
                    type="text" 
                    value={newRes}
                    onChange={(e) => setNewRes(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addResponsibility()}
                    placeholder="Add a responsibility..."
                    className="bg-transparent border-none outline-none text-sm w-full py-1"
                  />
                  <button 
                    onClick={addResponsibility}
                    className="p-1.5 rounded-xl bg-royal-indigo text-white hover:scale-110 transition-transform shadow-sm"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                
                <div className="space-y-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                  {responsibilities.map((res, i) => (
                    <motion.div 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      key={i} 
                      className={`flex items-center justify-between p-3 rounded-xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}
                    >
                      <span className={`text-xs ${isDark ? 'text-slate-300' : 'text-gray-700'}`}>{res}</span>
                      <button 
                        onClick={() => removeResponsibility(i)}
                        className="text-slate-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Settings */}
        <div className="lg:col-span-1 space-y-8">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Publish Settings</h3>
            <div className="space-y-6">
              <div className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Work Type</p>
                <div className="flex gap-2">
                  {['Remote', 'On-site', 'Hybrid', 'Part-time'].map((type) => (
                    <button 
                      key={type}
                      onClick={() => setFormData(prev => ({ ...prev, workType: type }))}
                      className={`flex-1 py-2 rounded-xl text-[10px] font-bold border transition-all ${
                        formData.workType === type 
                          ? (isDark ? 'bg-royal-indigo border-royal-indigo text-white' : 'bg-primary-blue border-primary-blue text-white')
                          : (isDark ? 'border-slate-800 text-slate-500 hover:bg-slate-800' : 'border-gray-100 text-gray-500 hover:bg-gray-50')
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Visibility</p>
                <div className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-100 bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-green-500/10 text-green-500"><Globe size={18} /></div>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Public Listing</span>
                  </div>
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, isPublic: !prev.isPublic }))}
                    className={`w-10 h-6 rounded-full relative transition-all ${formData.isPublic ? (isDark ? 'bg-royal-indigo' : 'bg-primary-blue') : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isPublic ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
              <div className="space-y-3">
                <p className={`text-xs font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Premium Listing</p>
                <div className={`flex items-center justify-between p-4 rounded-2xl border ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-gray-100 bg-gray-50/50'}`}>
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500"><PlusSquare size={18} /></div>
                    <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Feature Post</span>
                  </div>
                  <button 
                    onClick={() => setFormData(prev => ({ ...prev, isFeatured: !prev.isFeatured }))}
                    className={`w-10 h-6 rounded-full relative transition-all ${formData.isFeatured ? 'bg-amber-500' : 'bg-slate-700'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${formData.isFeatured ? 'right-1' : 'left-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Preview</h3>
            <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-gray-50 border-gray-100'}`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-royal-indigo flex items-center justify-center text-white font-bold">S</div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{formData.title || 'Internship Title'}</h4>
                  <p className="text-xs text-slate-500">{formData.company || 'Company Name'}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[10px] text-slate-500 mb-4">
                <div className="flex items-center gap-1"><MapPin size={10} /> {formData.location || 'Location'}</div>
                <div className="flex items-center gap-1"><Clock size={10} /> {formData.duration || 'Duration'}</div>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-inherit">
                <span className="text-xs font-bold text-royal-indigo">{formData.stipend || '₹0 / Month'}</span>
                <button className={`px-4 py-1.5 rounded-lg text-[10px] font-bold ${isDark ? 'bg-royal-indigo text-white' : 'bg-primary-blue text-white'}`}>Apply Now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
