import { MapPin, Clock, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import React from 'react';

const InternshipCard = ({ internship, isDark, onClick, onApply  }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`p-6 rounded-2xl border transition-all cursor-pointer group ${
        isDark 
          ? 'bg-dark-slate border-slate-700 hover:border-royal-indigo shadow-lg shadow-black/20' 
          : 'bg-white border-gray-100 hover:border-primary-blue shadow-sm hover:shadow-md'
      }`}
      onClick={() => onClick && onClick()}
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold overflow-hidden ${
            isDark ? 'bg-slate-800' : 'bg-gray-50'
          }`}>
            <img
              src={`https://picsum.photos/seed/${internship._id}/100`}
              alt={internship.company}
              className="w-full h-full object-cover"
            />
            {/* <img src={internship.logo} alt={internship.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" /> */}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
              {internship.title}
            </h3>
            <p className={`text-sm ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {internship.company}
            </p>
          </div>
        </div>
        {internship.status && (
          <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${
            internship.status === 'Applied' 
              ? 'bg-green-500/10 text-green-500' 
              : internship.status === 'Under Review'
              ? 'bg-amber-500/10 text-amber-500'
              : 'bg-red-500/10 text-red-500'
          }`}>
            {internship.status}
          </span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-3 mb-6">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <MapPin size={14} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
          <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>{internship.location|| "Remote" }</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Clock size={14} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
          <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>{internship.duration}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Calendar size={14} className={isDark ? 'text-royal-indigo' : 'text-primary-blue'} />
          <span className={isDark ? 'text-slate-300' : 'text-gray-600'}>{internship.postedDate || "Posted Recently"}</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold">
          <span className={isDark ? 'text-electric-blue' : 'text-primary-blue'}>{internship.stipend}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <button className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
          isDark 
            ? 'bg-slate-800 text-white hover:bg-slate-700' 
            : 'bg-gray-50 text-deep-charcoal hover:bg-gray-100'
        }`}>
          View Details
        </button>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            console.log("APPLY CLICKED");

            if (onApply) {
              onApply(internship);
            } else {
              console.log("onApply not received ❌");
            }
          }}
          className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${isDark
            ? 'bg-electric-blue text-deep-obsidian hover:bg-opacity-90'
            : 'bg-primary-blue text-white hover:bg-opacity-90'
            }`}
        >
          Apply Now
        </button>
        {/* <button className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
          isDark 
            ? 'bg-electric-blue text-deep-obsidian hover:bg-opacity-90' 
            : 'bg-primary-blue text-white hover:bg-opacity-90'
        }`}>
          Apply Now
        </button> */}
      </div>
    </motion.div>
  );
};

export default InternshipCard;

