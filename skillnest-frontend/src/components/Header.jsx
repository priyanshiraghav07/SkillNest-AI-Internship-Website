import { useState, useRef, useEffect } from 'react';
import { Search, Bell, Moon, Sun, User, Settings, HelpCircle, LogOut, CheckCircle2, AlertCircle, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Header({ isDark, setIsDark, onLogout, setActiveTab }) {
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const notifications = [
    { id: 1, title: 'New Internship Match', desc: 'Frontend Developer at TechCorp matches your skills.', time: '2m ago', type: 'success', icon: <CheckCircle2 size={16} className="text-emerald-500" /> },
    { id: 2, title: 'Application Update', desc: 'Your application for UI Designer was viewed.', time: '1h ago', type: 'info', icon: <Info size={16} className="text-blue-500" /> },
    { id: 3, title: 'Deadline Approaching', desc: 'Data Science internship at AI Lab expires in 24h.', time: '5h ago', type: 'warning', icon: <AlertCircle size={16} className="text-amber-500" /> },
  ];

  return (
    <header className={`h-20 flex items-center justify-between px-8 sticky top-0 z-20 backdrop-blur-xl ${
      isDark ? 'bg-deep-obsidian/80 border-b border-slate-800/50' : 'bg-white/80 border-b border-gray-100/50'
    }`}>
      <div className="flex-1 max-w-2xl">
        <div className={`relative flex items-center group ${
          isDark ? 'text-slate-400' : 'text-gray-400'
        }`}>
          <Search size={20} className="absolute left-4 transition-colors group-focus-within:text-royal-indigo" />
          <input
            type="text"
            placeholder="Search internships, companies, or skills..."
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border outline-none transition-all text-sm ${
              isDark 
                ? 'bg-slate-900/50 border-slate-800 focus:border-royal-indigo text-white' 
                : 'bg-gray-50 border-gray-100 focus:border-primary-blue text-deep-charcoal'
            }`}
          />
        </div>
      </div>

      <div className="flex items-center gap-6 ml-8">
        <button
          onClick={() => setIsDark(!isDark)}
          className={`p-2.5 rounded-2xl transition-all hover:scale-110 active:scale-95 ${
            isDark ? 'bg-slate-800/50 text-amber-400 hover:bg-slate-800' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
          }`}
        >
          {isDark ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2.5 rounded-2xl transition-all hover:scale-110 active:scale-95 ${
              isDark ? 'bg-slate-800/50 text-slate-300 hover:bg-slate-800' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Bell size={20} />
          </button>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-deep-obsidian"></span>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute right-0 mt-4 w-80 rounded-3xl shadow-2xl border p-4 z-50 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
                }`}
              >
                <div className="flex items-center justify-between mb-4 px-2">
                  <h3 className={`font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Notifications</h3>
                  <button className="text-xs text-royal-indigo font-bold hover:underline">Mark all as read</button>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div key={n.id} className={`p-3 rounded-2xl transition-colors cursor-pointer ${
                      isDark ? 'hover:bg-slate-800/50' : 'hover:bg-gray-50'
                    }`}>
                      <div className="flex gap-3">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                          isDark ? 'bg-slate-800' : 'bg-gray-100'
                        }`}>
                          {n.icon}
                        </div>
                        <div className="flex-1">
                          <p className={`text-xs font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{n.title}</p>
                          <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{n.desc}</p>
                          <p className="text-[9px] text-slate-400 mt-1 font-medium">{n.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={`w-full mt-4 py-3 rounded-xl text-xs font-bold transition-colors ${
                  isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                  View All Notifications
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="relative" ref={profileRef}>
          <div className="flex items-center gap-3 pl-6 border-l transition-all hover:opacity-80 cursor-pointer"
            onClick={() => setActiveTab('profile')}
          >
            <div className="text-right hidden md:block">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{user?.name || "User"}</p>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Intern Account</p>
            </div>
            <div className={`w-10 h-10 rounded-2xl overflow-hidden border-2 p-0.5 ${
              isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'
            }`}>
              <img 
                src="https://picsum.photos/seed/trial/100/100" 
                alt="Avatar" 
                className="w-full h-full object-cover rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          
          <button 
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            className={`absolute -bottom-1 -right-1 p-1 rounded-full border shadow-sm transition-all hover:scale-110 ${
              isDark ? 'bg-slate-800 border-slate-700 text-slate-400' : 'bg-white border-gray-200 text-gray-400'
            }`}
          >
            <Settings size={12} />
          </button>

          <AnimatePresence>
            {showProfileDropdown && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className={`absolute right-0 mt-4 w-64 rounded-3xl shadow-2xl border p-2 z-50 ${
                  isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100'
                }`}
              >
                <div className={`p-4 mb-2 border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
                  <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{user?.name || "User"}</p>
                  <p className="text-xs text-slate-500">{user?.email || "Not Provided"}</p>
                </div>
                
                <div className="space-y-1">
                  <button 
                    onClick={() => { setActiveTab('profile'); setShowProfileDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    <User size={18} />
                    <span className="text-sm font-medium">My Profile</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('settings'); setShowProfileDropdown(false); }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    <Settings size={18} />
                    <span className="text-sm font-medium">Settings</span>
                  </button>
                  <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-colors ${
                    isDark ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-50'
                  }`}>
                    <HelpCircle size={18} />
                    <span className="text-sm font-medium">Help Center</span>
                  </button>
                  <div className={`my-2 border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`} />
                  <button 
                    onClick={onLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="text-sm font-bold">Log Out</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
