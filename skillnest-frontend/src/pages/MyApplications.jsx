import { 
  FileText, 
  Calendar, 
  CheckCircle2, 
  XCircle, 
  Clock,
  ExternalLink,
  Search
} from 'lucide-react';
import { motion } from 'motion/react';

const applications = [
  {
    id: 1,
    title: 'Frontend Developer Intern',
    company: 'Google',
    appliedOn: 'Mar 15, 2024',
    status: 'Accepted',
    logo: 'https://picsum.photos/seed/google/100/100',
  },
  {
    id: 2,
    title: 'UI/UX Design Intern',
    company: 'Figma',
    appliedOn: 'Mar 10, 2024',
    status: 'Accepted',
    logo: 'https://picsum.photos/seed/figma/100/100',
  },
  {
    id: 3,
    title: 'Full Stack Developer',
    company: 'Meta',
    appliedOn: 'Mar 05, 2024',
    status: 'Rejected',
    logo: 'https://picsum.photos/seed/meta/100/100',
  },
  {
    id: 4,
    title: 'Product Management Intern',
    company: 'Microsoft',
    appliedOn: 'Feb 28, 2024',
    status: 'In Review',
    logo: 'https://picsum.photos/seed/microsoft/100/100',
  },
  {
    id: 5,
    title: 'Software Development Intern',
    company: 'SkillNest Tech',
    appliedOn: 'Mar 25, 2024',
    status: 'Accepted',
    logo: 'https://picsum.photos/seed/sn/100/100',
  }
];

const getStatusStyles = (status) => {
  switch (status) {
    case 'Accepted':
      return 'bg-green-500/10 text-green-500';
    case 'Rejected':
      return 'bg-red-500/10 text-red-500';
    case 'In Review':
      return 'bg-blue-500/10 text-blue-500';
    default:
      return 'bg-slate-500/10 text-slate-500';
  }
};

const getStatusIcon = (status) => {
  switch (status) {
    case 'Accepted':
      return <CheckCircle2 size={14} />;
    case 'Rejected':
      return <XCircle size={14} />;
    case 'In Review':
      return <Clock size={14} />;
    default:
      return null;
  }
};

export default function MyApplications({ isDark }) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            My Applications
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Track and manage your internship applications.
          </p>
        </div>
        <div className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl border w-full md:w-80 ${
          isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <Search size={18} className="text-slate-500" />
          <input 
            type="text" 
            placeholder="Search applications..." 
            className="bg-transparent border-none outline-none text-sm w-full text-slate-400"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {applications.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`p-6 rounded-3xl border flex flex-col md:flex-row items-center gap-6 transition-all hover:scale-[1.01] ${
              isDark ? 'bg-dark-slate border-slate-800 hover:bg-slate-800/50' : 'bg-white border-gray-100 shadow-sm hover:shadow-md'
            }`}
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center overflow-hidden flex-shrink-0 ${
              isDark ? 'bg-slate-800' : 'bg-gray-50'
            }`}>
              <img src={app.logo} alt={app.company} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
                {app.title}
              </h3>
              <p className={`font-medium ${isDark ? 'text-royal-indigo' : 'text-primary-blue'}`}>
                {app.company}
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Calendar size={14} />
                <span>Applied on {app.appliedOn}</span>
              </div>
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold uppercase ${getStatusStyles(app.status)}`}>
                {getStatusIcon(app.status)}
                {app.status}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className={`p-3 rounded-2xl border transition-all ${
                isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
              }`}>
                <FileText size={20} />
              </button>
              <button className={`p-3 rounded-2xl border transition-all ${
                isDark ? 'border-slate-700 text-slate-400 hover:bg-slate-800' : 'border-gray-100 text-gray-400 hover:bg-gray-50'
              }`}>
                <ExternalLink size={20} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
