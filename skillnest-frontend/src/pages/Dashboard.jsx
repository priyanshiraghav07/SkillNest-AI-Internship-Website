import { 
  Users, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  Zap,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Award,
  ArrowUpRight,
  ArrowDownRight,
  MoreHorizontal
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';
import { useState, useEffect } from 'react';

const stats = [
  { label: 'My Applications', value: '4', change: '+2 this month', icon: FileText, color: 'bg-blue-500', tab: 'my-applications' },
  { label: 'Profile Views', value: '124', change: '+12% this month', icon: Users, color: 'bg-green-500', tab: 'profile' },
  { label: 'Interviews', value: '3', change: 'Next: Google this month', icon: Clock, color: 'bg-purple-500', tab: 'messages' },
  { label: 'Offers', value: '1', change: 'Zomato this month', icon: Award, color: 'bg-amber-500', tab: 'my-internships' },
];

const appData = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

const categoryData = [
  { name: 'Tech', value: 45, color: '#6366F1' },
  { name: 'Design', value: 25, color: '#38BDF8' },
  { name: 'Business', value: 20, color: '#10B981' },
  { name: 'Other', value: 10, color: '#F59E0B' },
];

const recentActivity = [
  { id: 1, type: 'New Internship', title: 'Software Engineer Intern', company: 'Tech Corp', time: '2h ago' },
  { id: 2, type: 'Application Update', title: 'Frontend Developer', company: 'Web Studio', time: '5h ago' },
  { id: 3, type: 'New Message', title: 'Interview Scheduled', company: 'Datawise', time: '1d ago' },
];

export default function Dashboard({ isDark, setActiveTab }) {
  // Test backend connection
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => console.log(err));
  }, []);
  const user = JSON.parse(localStorage.getItem("user" || "{}"));

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold flex items-center gap-2 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Welcome back, <span className="text-royal-indigo">{user?.name || "User"}</span> 👋
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Here's what's happening with your internship search today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border ${
            isDark ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-gray-100 text-gray-600'
          }`}>
            <Calendar size={18} className="text-royal-indigo" />
            <span className="text-sm font-bold">April 04, 2024</span>
          </div>
          <button 
            onClick={() => setActiveTab('browse')}
            className={`flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-white transition-all shadow-lg hover:scale-105 active:scale-95 ${
              isDark ? 'bg-royal-indigo hover:bg-opacity-90' : 'bg-primary-blue hover:bg-opacity-90'
            }`}
          >
            <Sparkles size={18} />
            AI Recommendations
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            onClick={() => setActiveTab(stat.tab)}
            className={`p-6 rounded-3xl border relative group overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1 ${
              isDark ? 'bg-dark-slate border-slate-800 hover:border-royal-indigo/50' : 'bg-white border-gray-100 shadow-sm hover:border-royal-indigo/20'
            }`}
          >
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-white`}>
                <stat.icon size={24} className={isDark ? 'text-white' : 'text-slate-600'} />
              </div>
              <div className="p-1.5 rounded-lg text-slate-500 group-hover:text-royal-indigo transition-colors">
                <ArrowUpRight size={18} />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{stat.value}</h3>
              <p className={`text-sm font-medium mt-1 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{stat.label}</p>
              <p className={`text-[10px] font-bold mt-2 flex items-center gap-1 ${
                stat.change.includes('+') || stat.change.includes('Next') ? 'text-green-500' : 'text-slate-500'
              }`}>
                {stat.change}
              </p>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-110 ${stat.color}`} />
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Applications Overview</h3>
              <p className="text-xs text-slate-500 mt-1">Monthly application statistics</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-royal-indigo" />
                <span className="text-xs text-slate-500">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-electric-blue" />
                <span className="text-xs text-slate-500">Shortlisted</span>
              </div>
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={appData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#334155' : '#e2e8f0'} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 12 }} 
                />
                <Tooltip 
                  cursor={{ fill: isDark ? '#1e293b' : '#f8fafc' }}
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1e293b' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                    color: isDark ? '#f1f5f9' : '#1e293b'
                  }} 
                />
                <Bar dataKey="value" fill="#6366F1" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border flex flex-col ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Quick Actions</h3>
          <div className="space-y-4 flex-1">
            <button 
              onClick={() => setActiveTab('browse')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-royal-indigo/10 text-royal-indigo"><Search size={18} /></div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Browse Internships</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-500" />
            </button>
            <button 
              onClick={() => setActiveTab('resume')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-green-500/10 text-green-500"><CheckCircle2 size={18} /></div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Skill Assessment</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-500" />
            </button>
            <button 
              onClick={() => setActiveTab('ai-tools')}
              className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isDark ? 'border-slate-800 bg-slate-900/50 hover:bg-slate-800' : 'border-gray-100 bg-gray-50 hover:bg-gray-100'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500"><Zap size={18} /></div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Resume Optimizer</span>
              </div>
              <ArrowUpRight size={18} className="text-slate-500" />
            </button>
          </div>
          <div className={`mt-6 p-4 rounded-2xl bg-gradient-to-br from-royal-indigo to-electric-blue text-white`}>
            <p className="text-xs font-bold opacity-80 uppercase tracking-widest mb-1">Pro Member</p>
            <p className="text-sm font-bold mb-3">You have access to premium internship listings and tools.</p>
            <button className="w-full py-2 rounded-xl bg-white/20 hover:bg-white/30 text-xs font-bold transition-all backdrop-blur-md">
              View Benefits
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-6">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Recent Activity</h3>
            <button className="text-xs font-bold text-royal-indigo hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start gap-4 group">
                <div className={`mt-1 p-2 rounded-xl transition-colors ${isDark ? 'bg-slate-800 group-hover:bg-slate-700' : 'bg-gray-50 group-hover:bg-gray-100'}`}>
                  <Zap size={18} className="text-royal-indigo" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{activity.title}</p>
                  <p className="text-xs text-slate-500">{activity.company} • {activity.type}</p>
                </div>
                <span className="text-[10px] text-slate-500 font-bold">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Internship Categories</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>452</span>
              <span className="text-[10px] text-slate-500 font-bold uppercase">Total</span>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>{item.name}</span>
                <span className={`text-xs font-bold ml-auto ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{item.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Placement Strategies</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Resume Optimization</span>
                <span className="text-royal-indigo">92%</span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                <div className="h-full w-[92%] bg-royal-indigo rounded-full shadow-[0_0_10px_rgba(99,102,241,0.4)]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Interview Prep</span>
                <span className="text-electric-blue">85%</span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                <div className="h-full w-[85%] bg-electric-blue rounded-full shadow-[0_0_10px_rgba(56,189,248,0.4)]" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-bold">
                <span className={isDark ? 'text-slate-400' : 'text-gray-600'}>Skill Assessment</span>
                <span className="text-green-500">78%</span>
              </div>
              <div className={`h-2 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                <div className="h-full w-[78%] bg-green-500 rounded-full shadow-[0_0_10px_rgba(34,197,94,0.4)]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
