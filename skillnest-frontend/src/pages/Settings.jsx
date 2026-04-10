import { 
  Settings as SettingsIcon, 
  Bell, 
  Moon, 
  Sun, 
  Lock, 
  Globe, 
  User, 
  Shield,
  ChevronRight,
  HelpCircle,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

export default function Settings({ isDark, setIsDark }) {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(false);

  const sections = [
    {
      title: 'Appearance',
      items: [
        { 
          id: 'dark-mode', 
          label: 'Dark Mode', 
          desc: 'Switch between light and dark themes.', 
          icon: isDark ? Moon : Sun,
          action: (
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${isDark ? 'bg-royal-indigo' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${isDark ? 'right-1' : 'left-1'}`} />
            </button>
          )
        },
      ]
    },
    {
      title: 'Notifications',
      items: [
        { 
          id: 'push', 
          label: 'Push Notifications', 
          desc: 'Receive alerts directly on your device.', 
          icon: Bell, 
          action: (
            <button 
              onClick={() => setPushEnabled(!pushEnabled)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${pushEnabled ? 'bg-royal-indigo' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${pushEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          )
        },
        { 
          id: 'email', 
          label: 'Marketing Emails', 
          desc: 'Receive news and special offers.', 
          icon: MessageCircle, 
          action: (
            <button 
              onClick={() => setMarketingEnabled(!marketingEnabled)}
              className={`w-12 h-6 rounded-full relative transition-all duration-300 ${marketingEnabled ? 'bg-royal-indigo' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${marketingEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          )
        },
      ]
    },
    {
      title: 'Account Settings',
      items: [
        { id: 'profile', label: 'Manage Profile', desc: 'Update your personal info and account details.', icon: User, action: <ChevronRight size={20} className="text-slate-500" /> },
        { id: 'security', label: 'Privacy & Security', desc: 'Manage your security settings and data.', icon: Lock, action: <ChevronRight size={20} className="text-slate-500" /> },
        { id: 'language', label: 'Language & Region', desc: 'Set your preferred language and location.', icon: Globe, action: <ChevronRight size={20} className="text-slate-500" /> },
      ]
    },
    {
      title: 'Support',
      items: [
        { id: 'help', label: 'Help Center', desc: 'Get help with your SkillNest account.', icon: HelpCircle, action: <ChevronRight size={20} className="text-slate-500" /> },
        { id: 'contact', label: 'Contact Support', desc: 'Talk to our team for assistance.', icon: MessageCircle, action: <ChevronRight size={20} className="text-slate-500" /> },
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <div className="flex flex-col gap-2">
        <h1 className={`text-4xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>
          Settings
        </h1>
        <p className={isDark ? 'text-slate-400' : 'text-gray-500'}>
          Configure your SkillNest experience.
        </p>
      </div>

      <div className="space-y-8">
        {sections.map((section) => (
          <div key={section.title} className="space-y-4">
            <h3 className={`text-xs font-bold uppercase tracking-widest px-4 ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              {section.title}
            </h3>
            <div className={`rounded-3xl border overflow-hidden ${
              isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
            }`}>
              {section.items.map((item, i) => (
                <div 
                  key={item.id} 
                  className={`p-6 flex items-center justify-between transition-all ${
                    i !== section.items.length - 1 ? `border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}` : ''
                  } ${isDark ? 'hover:bg-slate-800/30' : 'hover:bg-gray-50/50'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl ${isDark ? 'bg-slate-800 text-slate-400' : 'bg-gray-50 text-gray-500'}`}>
                      <item.icon size={20} />
                    </div>
                    <div>
                      <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{item.label}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                  {item.action}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className={`pt-8 border-t flex justify-between items-center ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
        <p className="text-xs text-slate-500">SkillNest v1.2.0 • Build 2024.04.06</p>
        <button className="text-xs font-bold text-red-500 hover:underline">Deactivate Account</button>
      </div>
    </div>
  );
}
