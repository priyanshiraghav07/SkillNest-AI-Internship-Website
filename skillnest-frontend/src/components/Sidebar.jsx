import { 
  LayoutDashboard, 
  Search, 
  Briefcase, 
  FileText, 
  MessageSquare, 
  Award, 
  TrendingUp, 
  Wrench,
  Settings,
  User,
  ShieldCheck,
  Users,
  PlusSquare,
  LogOut
} from 'lucide-react';
import { motion } from 'motion/react';
import lightLogo from "../assets/images/light_theme_logo.png";
import darkLogo from "../assets/images/dark_theme_logo.png";

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'browse', label: 'Browse Internships', icon: Search },
  { id: 'my-internships', label: 'My Internships', icon: Briefcase },
  { id: 'my-applications', label: 'My Applications', icon: FileText },
  { id: 'messages', label: 'Messages', icon: MessageSquare, badge: 3 },
  { id: 'resume', label: 'Resume & Skills', icon: FileText },
  { id: 'certificates', label: 'My Certificates', icon: Award },
  { id: 'tracker', label: 'Progress Tracker', icon: TrendingUp },
  { id: 'tools', label: 'AI Tools', icon: Wrench },
];

const adminItems = [
  { id: 'admin-dashboard', label: 'Admin Dashboard', icon: ShieldCheck },
  { id: 'manage-users', label: 'Manage Users', icon: Users },
  { id: 'post-internship', label: 'Post Internships', icon: PlusSquare },
];

export default function Sidebar({ activeTab, setActiveTab, isDark, onLogout, userRole }) {
  return (
    <div className={`w-64 h-screen fixed left-0 top-0 border-r flex flex-col ${
      isDark ? 'bg-deep-obsidian border-slate-800' : 'bg-white border-gray-200'
    }`}>
      <div className="p-6 flex items-center gap-2">
      <div className="flex items-center gap-3">
          <img
            src={isDark ? darkLogo : lightLogo}
            alt="logo"
            className="w-50 h-35 object-contain rounded-4xl"
          />
        {/* <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
          SkillNest
        </span> */}
      </div>
    </div>  

      <div className="flex-1 px-4 py-4 space-y-6 overflow-y-auto">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider px-3 mb-2 ${
            isDark ? 'text-slate-500' : 'text-gray-400'
          }`}>
            Main Menu
          </p>
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group ${
                  activeTab === item.id
                    ? (isDark ? 'bg-royal-indigo/20 text-royal-indigo' : 'bg-primary-blue/10 text-primary-blue')
                    : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900')
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-primary-blue text-white text-[10px] px-1.5 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
                {activeTab === item.id && (
                  <motion.div
                    layoutId="active-pill"
                    className={`absolute left-0 w-1 h-6 rounded-r-full ${
                      isDark ? 'bg-royal-indigo' : 'bg-primary-blue'
                    }`}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {userRole === 'admin' && (
          <div>
            <p className={`text-xs font-semibold uppercase tracking-wider px-3 mb-2 ${
              isDark ? 'text-slate-500' : 'text-gray-400'
            }`}>
              Admin Panel
            </p>
            <div className="space-y-1">
              {adminItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all relative group ${
                    activeTab === item.id
                      ? (isDark ? 'bg-royal-indigo/20 text-royal-indigo' : 'bg-primary-blue/10 text-primary-blue')
                      : (isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900')
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="active-pill-admin"
                      className={`absolute left-0 w-1 h-6 rounded-r-full ${
                        isDark ? 'bg-royal-indigo' : 'bg-primary-blue'
                      }`}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className={`p-4 border-t space-y-2 ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
        <button
          onClick={() => setActiveTab('settings')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
            activeTab === 'settings'
              ? (isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-deep-charcoal')
              : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100')
          }`}
        >
          <Settings size={20} />
          <span className="font-medium text-sm">Settings</span>
        </button>
        
        <button
          onClick={() => setActiveTab('profile')}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all ${
            activeTab === 'profile'
              ? (isDark ? 'bg-slate-800 text-white' : 'bg-gray-100 text-deep-charcoal')
              : (isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100')
          }`}
        >
          <User size={20} />
          <span className="font-medium text-sm">Profile</span>
        </button>
      </div>
    </div>
  );
}
