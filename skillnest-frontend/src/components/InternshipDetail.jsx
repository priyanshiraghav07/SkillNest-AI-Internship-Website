import { ArrowLeft, MapPin, Clock, Calendar, Bookmark, Share2, Info } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const InternshipDetail = ({ internship, isDark, onBack }) => {
  if (!internship) {
    return <div className="text-white p-6">No Internship Data</div>;
  }

  const handleApply = (internship) => {
    const existing = JSON.parse(localStorage.getItem("applications")) || [];
  
    const newApplication = {
      id: Date.now(),
      title: internship.title,
      company: internship.company,
      status: "Pending",
      date: new Date().toLocaleDateString(),
      logo: internship.logo
    };
  
    localStorage.setItem(
      "applications",
      JSON.stringify([newApplication, ...existing])
    );
  };


  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto"
    >
      <button 
        onClick={onBack}
        className={`flex items-center gap-2 mb-8 font-bold transition-colors ${
          isDark ? 'text-slate-400 hover:text-white' : 'text-gray-500 hover:text-deep-charcoal'
        }`}
      >
        <ArrowLeft size={20} />
        Back to Internships
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className={`p-8 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className="flex items-start justify-between mb-8">
              <div className="flex gap-6">
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-bold overflow-hidden ${
                  isDark ? 'bg-slate-800' : 'bg-gray-50'
                }`}>
                  <img src={internship.logo} alt={internship.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
                    {internship.title}
                  </h1>
                  <p className={`text-lg ${isDark ? 'text-royal-indigo' : 'text-primary-blue'} font-medium`}>
                    {internship.company}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className={`p-3 rounded-xl border transition-all ${
                  isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-400' : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                }`}>
                  <Bookmark size={20} />
                </button>
                <button className={`p-3 rounded-xl border transition-all ${
                  isDark ? 'border-slate-700 hover:bg-slate-800 text-slate-400' : 'border-gray-200 hover:bg-gray-50 text-gray-500'
                }`}>
                  <Share2 size={20} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              <div className="space-y-1">
                <p className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Location</p>
                <div className="flex items-center gap-2">
                  <MapPin size={16} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{internship.location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Duration</p>
                <div className="flex items-center gap-2">
                  <Clock size={16} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{internship.duration}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Posted</p>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
                  <span className={`font-medium ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{internship.postedDate}</span>
                </div>
              </div>
              <div className="space-y-1">
                <p className={`text-xs uppercase tracking-wider font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>Stipend</p>
                <div className="flex items-center gap-2">
                  <span className={`font-bold text-lg ${isDark ? 'text-electric-blue' : 'text-primary-blue'}`}>{internship.stipend}</span>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <section>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>About the Role</h2>
                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
                  {internship.description}
                </p>
              </section>

              <section>
                <h2 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Requirements</h2>
                <ul className="space-y-3">
                {(internship?.requirements || []).map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${isDark ? 'bg-royal-indigo' : 'bg-primary-blue'}`} />
                      <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>{req}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <div className={`flex items-center gap-3 p-4 rounded-2xl mb-6 ${
              isDark ? 'bg-royal-indigo/10 text-royal-indigo' : 'bg-primary-blue/5 text-primary-blue'
            }`}>
              <div className="flex-shrink-0">
                <Info size={20} />
              </div>
              <p className="text-xs font-bold leading-tight">
                AI Career Tip: Highlight your Figma proficiency for this role.
              </p>
            </div>

            <div className="space-y-3">
              <button onClick={() => handleApply(internship)} className={`w-full py-4 rounded-2xl font-bold transition-all ${
                isDark 
                  ? 'bg-electric-blue text-deep-obsidian hover:bg-opacity-90' 
                  : 'bg-primary-blue text-white hover:bg-opacity-90'
              }`}>
                Apply Now
              </button>
              <button className={`w-full py-4 rounded-2xl font-bold border transition-all ${
                isDark 
                  ? 'border-slate-700 text-white hover:bg-slate-800' 
                  : 'border-gray-200 text-deep-charcoal hover:bg-gray-50'
              }`}>
                Save for Later
              </button>
            </div>
          </div>

          <div className={`p-6 rounded-3xl border ${
            isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
            <h3 className={`font-bold mb-4 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Company Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-slate-800' : 'bg-gray-50'}`}>
                  <img src={internship.logo} alt={internship.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{internship.company}</p>
                  <p className="text-xs text-slate-500">Tech Industry • 50-200 employees</p>
                </div>
              </div>
              <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                A leading technology firm focused on creating innovative solutions for global clients.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InternshipDetail;

