import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  GraduationCap,
  Award,
  Briefcase,
  Edit2,
  Camera,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import Img from "../assets/images/cover_photo.png";

export default function Profile({ isDark }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // const [profileData, setProfileData] = useState({
  //   name: profileData.name || "User",
  //   role: profileData.role || "Student",
  //   location: profileData.location || "New Delhi, India",
  //   company: profileData.company || "SkillNest Tech",
  //   email: profileData.email || "Not Provided",
  //   phone: profileData.phone || "Not Provided",
  //   university: profileData.university || "Not Provided"
  // });

  const stats = [
    { label: 'Applications', value: '23', icon: Briefcase, color: 'text-blue-500' },
    { label: 'Interviews', value: '4', icon: Star, color: 'text-amber-500' },
    { label: 'Skill Match', value: '88%', icon: ShieldCheck, color: 'text-royal-indigo' },
    { label: 'Badges', value: '12', icon: Award, color: 'text-purple-500' },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  const [tempData, setTempData] = useState({
    name: user?.name || "User",
    role: user?.role || "Student",
    location: user?.location || "New Delhi, India",
    company: user?.company || "Not Applicable",
    email: user?.email || "Not Provided",
    phone: user?.phone || "+91 98765 43210",
    university: user?.university || "Delhi Technological University"
  });

  const handleSave = async () => {
    try {
      const res = await fetch("https://skillnest-ai-internship-website.onrender.com/api/user/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(tempData)
      });
  
      const data = await res.json(); // 👈 yahan data aaya
  
      // 🔥 ye use kar (updatedUser nahi)
      localStorage.setItem("user", JSON.stringify(data));
  
      setIsModalOpen(false);
      setIsEditing(false);
      setShowSuccessMessage(true);
  
    } catch (err) {
      console.log("Error:", err);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setIsEditing(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Profile Header */}
      <div className={`relative rounded-3xl border overflow-hidden ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
        }`}>
        <div className="h-50 relative">
          <img
            src={Img}
            alt="cover"
            className="w-full h-full object-cover"
          />
          <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
            <Camera size={20} />
          </button>
        </div>
        <div className="px-8 pb-8">
          <div className="relative -mt-16 mb-6 flex items-end justify-between">
            <div className="relative">
              <div className={`w-32 h-32 rounded-full border-4 p-1 overflow-hidden shadow-lg ${isDark ? 'bg-dark-slate border-royal-indigo/30' : 'bg-white border-primary-blue/30'
                }`}>
                <img
                  src="https://picsum.photos/seed/trial/200/200"
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <button className={`absolute bottom-2 right-2 p-2 rounded-xl text-white shadow-lg ${isDark ? 'bg-royal-indigo' : 'bg-primary-blue'
                }`}>
                <Camera size={16} />
              </button>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setIsEditing(!isEditing);
                  setIsModalOpen(true);
                }}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg hover:scale-105 active:scale-95 ${isDark ? 'bg-royal-indigo text-white' : 'bg-primary-blue text-white'
                  }`}
              >
                <Edit2 size={18} />
                {isEditing ? 'Close Editor' : 'Edit Profile'}
              </button>
              {isEditing && (
                <button className={`px-6 py-2.5 rounded-2xl font-bold text-white transition-all ${isDark ? 'bg-royal-indigo' : 'bg-primary-blue'
                  }`}>
                  Save Changes
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{user?.name}</h1>
                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-bold uppercase">
                  <ShieldCheck size={12} />
                  Verified Intern
                </div>
              </div>
              <p className={`text-lg font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{user?.role || "Computer Science Intern"}</p>
            </div>
            <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-slate-500">
              <div className="flex items-center gap-1.5"><MapPin size={16} /> {user?.location || "New Delhi, India"}</div>
              <div className="flex items-center gap-1.5"><Building2 size={16} /> {user?.company || "SkillNest Tech"}</div>
              <div className="flex items-center gap-1.5"><Mail size={16} /> {user?.email || "No Email"}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`p-6 rounded-3xl border text-center ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
              }`}
          >
            <div className={`mx-auto w-10 h-10 rounded-2xl flex items-center justify-center mb-4 ${stat.color} bg-opacity-10`}>
              <stat.icon size={20} />
            </div>
            <h4 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{stat.value}</h4>
            <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider font-bold">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Personal Info */}
        <div className={`lg:col-span-2 p-8 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
          <h3 className={`text-xl font-bold mb-8 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</p>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{user?.name}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</p>
                <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{user?.email}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone Number</p>
                {isEditing ? (
                  <input type="text" defaultValue="+91 98765 43210" className={`w-full p-2 rounded-lg border bg-transparent outline-none ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'}`} />
                ) : (
                  <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>+91 98765 43210</p>
                )}
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">University</p>{isEditing ? (
                  <input type="text" defaultValue="Delhi Technological University" className={`w-full p-2 rounded-lg border bg-transparent outline-none ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'}`} />
                ) : (
                  <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>Delhi Technological University</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intern Role</p>
                {isEditing ? (
                  <input type="text" defaultValue="Computer Science Intern" className={`w-full p-2 rounded-lg border bg-transparent outline-none ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'}`} />
                ) : (
                  <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>{user?.role || "Computer Science Intern"}</p>
                )}
              </div>
              <div className="space-y-1">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</p>
                {isEditing ? (
                  <input type="text" defaultValue="New Delhi, India" className={`w-full p-2 rounded-lg border bg-transparent outline-none ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'}`} />
                ) : (
                  <p className={`font-bold ${isDark ? 'text-slate-200' : 'text-deep-charcoal'}`}>New Delhi, India</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className={`p-8 rounded-3xl border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100 shadow-sm'
          }`}>
          <h3 className={`text-xl font-bold mb-8 text-red-500`}>Danger Zone</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Deactivate Account</p>
              <p className="text-xs text-slate-500">Temporarily disable your profile and applications.</p>
              <button className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold border border-red-500/20 text-red-500 hover:bg-red-500/10 transition-all">
                Deactivate
              </button>
            </div>
            <div className="space-y-2 pt-4 border-t border-inherit">
              <p className={`text-sm font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Log Out</p>
              <p className="text-xs text-slate-500">Sign out of your current session.</p>
              <button className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold bg-red-500 text-white hover:bg-red-600 transition-all">
                Log Out
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Edit Profile Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={handleCancel}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className={`relative w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden border ${isDark ? 'bg-dark-slate border-slate-800' : 'bg-white border-gray-100'
                }`}
            >
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-royal-indigo/10 flex items-center justify-center text-royal-indigo">
                      <User size={24} />
                    </div>
                    <div>
                      <h2 className={`text-2xl font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Edit Profile</h2>
                      <p className="text-sm text-slate-500">Update your personal information</p>
                    </div>
                  </div>
                  <button
                    onClick={handleCancel}
                    className={`p-2 rounded-xl transition-colors ${isDark ? 'hover:bg-slate-800 text-slate-400' : 'hover:bg-gray-100 text-gray-400'}`}
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={tempData.name}
                      onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Intern Role</label>
                    <input
                      type="text"
                      value={tempData.role}
                      onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Location</label>
                    <input
                      type="text"
                      value={tempData.location}
                      onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company</label>
                    <input
                      type="text"
                      value={tempData.company}
                      onChange={(e) => setTempData({ ...tempData, company: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={tempData.email}
                      onChange={(e) => setTempData({ ...tempData, email: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Phone</label>
                    <input
                      type="text"
                      value={tempData.phone}
                      onChange={(e) => setTempData({ ...tempData, phone: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">University</label>
                    <input
                      type="text"
                      value={tempData.university}
                      onChange={(e) => setTempData({ ...tempData, university: e.target.value })}
                      className={`w-full p-3 rounded-xl border bg-transparent outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all ${isDark ? 'border-slate-800 text-white' : 'border-gray-200 text-deep-charcoal'
                        }`}
                    />
                  </div>
                </div>

                <div className="flex gap-4 mt-10">
                  <button
                    onClick={handleCancel}
                    className={`flex-1 py-4 rounded-2xl font-bold transition-all ${isDark ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-gray-100 text-deep-charcoal hover:bg-gray-200'
                      }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className={`flex-1 py-4 rounded-2xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-royal-indigo/20 ${isDark ? 'bg-royal-indigo hover:bg-opacity-90' : 'bg-primary-blue hover:bg-opacity-90'
                      }`}
                  >
                    <Save size={20} />
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Success Message Popup */}
      <AnimatePresence>
        {showSuccessMessage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed top-4 right-4 z-[200] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg border"
            style={{
              backgroundColor: isDark ? '#1e293b' : '#ffffff',
              borderColor: isDark ? '#334155' : '#e2e8f0',
              color: isDark ? '#ffffff' : '#0f172a'
            }}
          >
            <CheckCircle2 size={24} className="text-green-500" />
            <div>
              <p className="font-bold text-sm">Success!</p>
              <p className="text-xs opacity-80">Profile updated successfully</p>
            </div>
            <button
              onClick={() => setShowSuccessMessage(false)}
              className="ml-2 p-1 rounded-lg hover:bg-black/10 transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
