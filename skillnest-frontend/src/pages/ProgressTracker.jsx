import { 
  TrendingUp, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  Award,
  Zap,
  Target,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

const activityData = [
  { name: 'Mon', apps: 4, interviews: 1 },
  { name: 'Tue', apps: 6, interviews: 0 },
  { name: 'Wed', apps: 3, interviews: 2 },
  { name: 'Thu', apps: 8, interviews: 1 },
  { name: 'Fri', apps: 5, interviews: 0 },
  { name: 'Sat', apps: 2, interviews: 0 },
  { name: 'Sun', apps: 1, interviews: 0 },
];

const milestones = [
  { id: 1, title: '10 Applications Sent', date: 'Apr 04, 2024', icon: Target, color: 'text-blue-500' },
  { id: 2, title: 'Portfolio Published', date: 'Mar 28, 2024', icon: Zap, color: 'text-purple-500' },
  { id: 3, title: 'First Interview Secured', date: 'Mar 20, 2024', icon: Award, color: 'text-amber-500' },
];

const goals = [
  { id: 1, title: 'Weekly Applications', current: 8, target: 10, color: 'bg-royal-indigo' },
  { id: 2, title: 'Portfolio Projects', current: 4, target: 5, color: 'bg-electric-blue' },
  { id: 3, title: 'Skill Assessments', current: 2, target: 5, color: 'bg-green-500' },
  { id: 4, title: 'Networking Connections', current: 12, target: 25, color: 'bg-amber-500' },
];

export default function ProgressTracker({ isDark }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
          Progress Tracker
        </h1>
        <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
          Monitor your activity, milestones, and career goals.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Activity Overview</h3>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-royal-indigo" />
                <span className="text-xs text-slate-500">Applications</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-electric-blue" />
                <span className="text-xs text-slate-500">Interviews</span>
              </div>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorApps" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorInterviews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38BDF8" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#38BDF8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                  contentStyle={{ 
                    backgroundColor: isDark ? '#1e293b' : '#ffffff', 
                    borderColor: isDark ? '#334155' : '#e2e8f0',
                    borderRadius: '12px',
                    color: isDark ? '#f1f5f9' : '#1e293b'
                  }} 
                />
                <Area type="monotone" dataKey="apps" stroke="#6366F1" fillOpacity={1} fill="url(#colorApps)" strokeWidth={3} />
                <Area type="monotone" dataKey="interviews" stroke="#38BDF8" fillOpacity={1} fill="url(#colorInterviews)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Recent Milestones</h3>
          <div className="space-y-8 relative">
            <div className={`absolute left-4 top-2 bottom-2 w-0.5 ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`} />
            {milestones.map((milestone) => (
              <div key={milestone.id} className="flex items-start gap-6 relative">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center z-10 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-sm'
                }`}>
                  <milestone.icon size={16} className={milestone.color} />
                </div>
                <div>
                  <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{milestone.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{milestone.date}</p>
                </div>
              </div>
            ))}
          </div>
          <button className={`w-full mt-12 py-3 rounded-2xl text-sm font-bold border transition-all ${
            isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}>
            View Full Timeline
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <h3 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Active Goals</h3>
          <div className="space-y-8">
            {goals.map((goal) => (
              <div key={goal.id} className="space-y-3">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{goal.title}</h4>
                    <p className="text-xs text-slate-500">{goal.current} of {goal.target} completed</p>
                  </div>
                  <span className={`text-sm font-bold ${isDark ? 'text-royal-indigo' : 'text-primary-blue'}`}>
                    {Math.round((goal.current / goal.target) * 100)}%
                  </span>
                </div>
                <div className={`h-3 rounded-full ${isDark ? 'bg-slate-800' : 'bg-gray-100'}`}>
                  <div 
                    className={`h-full rounded-full ${goal.color}`} 
                    style={{ width: `${(goal.current / goal.target) * 100}%` }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>AI Search Strategy</h3>
            <div className={`px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase`}>Optimized</div>
          </div>
          <div className={`p-6 rounded-2xl mb-6 ${isDark ? 'bg-slate-900' : 'bg-gray-50'}`}>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-600'}`}>
              Based on your activity, we recommend focusing on <span className="text-royal-indigo font-bold">Fintech roles</span> this week. Your profile matches 88% of requirements in this sector.
            </p>
          </div>
          <div className="space-y-4">
            <button className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isDark ? 'border-slate-800 hover:bg-slate-800' : 'border-gray-100 hover:bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-blue-500/10 text-blue-500"><TrendingUp size={18} /></div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>View Detailed Report</span>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </button>
            <button className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
              isDark ? 'border-slate-800 hover:bg-slate-800' : 'border-gray-100 hover:bg-gray-50'
            }`}>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-500"><Zap size={18} /></div>
                <span className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Improve Search Ranking</span>
              </div>
              <ChevronRight size={18} className="text-slate-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
