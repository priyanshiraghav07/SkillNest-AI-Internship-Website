import { 
  Users, 
  Briefcase, 
  FileText, 
  ShieldCheck, 
  TrendingUp, 
  UserPlus,
  MoreVertical,
  ChevronRight,
  Download,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { motion } from 'motion/react';

const stats = [
  { label: 'Total Users', value: '1,284', change: '+12%', icon: Users, color: 'bg-blue-500' },
  { label: 'Active Internships', value: '452', change: '+5%', icon: Briefcase, color: 'bg-green-500' },
  { label: 'Applications', value: '8,432', change: '-18%', icon: FileText, color: 'bg-purple-500' },
  { label: 'AI Verifications', value: '12,432', change: '+24%', icon: ShieldCheck, color: 'bg-amber-500' },
];

const growthData = [
  { name: 'Jan', users: 400 },
  { name: 'Feb', users: 300 },
  { name: 'Mar', users: 600 },
  { name: 'Apr', users: 800 },
  { name: 'May', users: 500 },
  { name: 'Jun', users: 900 },
];

const recentUsers = [
  { id: 1, name: 'Ananya Sharma', role: 'Intern', status: 'Active', time: '2h ago', avatar: 'https://picsum.photos/seed/u1/100/100' },
  { id: 2, name: 'Rahul Verma', role: 'Admin', status: 'Active', time: '5h ago', avatar: 'https://picsum.photos/seed/u2/100/100' },
  { id: 3, name: 'Priya Patel', role: 'Intern', status: 'Inactive', time: '1d ago', avatar: 'https://picsum.photos/seed/u3/100/100' },
  { id: 4, name: 'Amit Kumar', role: 'Admin', status: 'Active', time: '2d ago', avatar: 'https://picsum.photos/seed/u4/100/100' },
];

export default function AdminDashboard({ isDark }) {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex justify-between items-end">
        <div className="flex flex-col gap-2">
          <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
            Admin Dashboard
          </h1>
          <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
            Overview of SkillNest platform activity.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bold border transition-all ${
            isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}>
            <Download size={18} />
            Export Report
          </button>
          <button className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all ${
            isDark ? 'bg-royal-indigo text-white hover:bg-opacity-90' : 'bg-primary-blue text-white hover:bg-opacity-90'
          }`}>
            <Plus size={18} />
            Add Internship
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
            className={`p-6 rounded-3xl border ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${stat.color} bg-opacity-10 text-white`}>
                <stat.icon size={24} className={isDark ? 'text-white' : 'text-slate-600'} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.change.startsWith('+') ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
              }`}>
                {stat.change}
              </span>
            </div>
            <p className={`text-sm font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{stat.label}</p>
            <h3 className={`text-2xl font-bold mt-1 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>User Growth</h3>
            <select className={`text-xs font-bold bg-transparent border-none outline-none ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366F1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366F1" stopOpacity={0}/>
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
                <Area type="monotone" dataKey="users" stroke="#6366F1" fillOpacity={1} fill="url(#colorUsers)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`p-8 rounded-3xl border ${
          isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
          <div className="flex justify-between items-center mb-8">
            <h3 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Recent Users</h3>
            <button className="text-xs font-bold text-royal-indigo hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center gap-4 group">
                <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="flex-1 min-w-0">
                  <h4 className={`text-sm font-bold truncate ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{user.name}</h4>
                  <p className="text-xs text-slate-500">{user.role} • {user.time}</p>
                </div>
                <div className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-green-500' : 'bg-slate-500'}`} />
                <button className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical size={14} />
                </button>
              </div>
            ))}
          </div>
          <button className={`w-full mt-12 py-3 rounded-2xl text-sm font-bold border transition-all ${
            isDark ? 'border-slate-700 text-slate-300 hover:bg-slate-800' : 'border-gray-200 text-gray-600 hover:bg-gray-100'
          }`}>
            Manage All Users
          </button>
        </div>
      </div>
    </div>
  );
}
