import loginImg from '../assets/images/login.png';
import signupImg from '../assets/images/signup.png';

import { useState } from 'react';
import {
  User,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Github,
  Chrome,
  Linkedin,
  Twitter,
  ChevronLeft,
  Shield,
  Sun,
  Moon,
  GraduationCap,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Auth({ onLogin, initialMode = 'login', onBackToHome, isDark, setIsDark }) {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(initialMode === 'login');
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState('student'); // 'student' or 'admin'
  const [accepted, setAccepted] = useState(false);
  // State variables for form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  <img
    src={isLogin ? loginImg : signupImg}
    alt="Illustration"
  />

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 font-sans relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-deep-obsidian' : 'bg-[#D1D5DB]'
      }`}>
      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        className={`absolute top-8 left-8 flex items-center gap-2 px-4 py-2 backdrop-blur-md rounded-xl border shadow-sm font-bold text-sm transition-all z-20 ${isDark ? 'bg-slate-800/80 border-slate-700 text-white hover:bg-slate-700' : 'bg-white/80 border-white/20 text-deep-charcoal hover:bg-white'
          }`}
      >
        <ChevronLeft size={18} />
        Back to Home
      </button>

      {/* Theme Toggle Button */}
      <button
        onClick={() => setIsDark(!isDark)}
        className={`absolute top-8 right-8 p-3 rounded-2xl transition-all hover:scale-110 active:scale-95 z-20 ${isDark ? 'bg-slate-800/50 text-amber-400 hover:bg-slate-800' : 'bg-white/80 text-slate-600 hover:bg-white shadow-sm'
          }`}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`w-full max-w-6xl h-[750px] backdrop-blur-2xl rounded-[40px] overflow-hidden flex shadow-[0_20px_60px_rgba(0,0,0,0.1)] relative z-10 border ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-white/40'
          }`}
      >
        {/* Left Side - Illustration & Branding */}
        <div className={`hidden lg:flex w-[45%] relative overflow-hidden p-12 flex-col justify-between border-r ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-[#F3F4F6] border-gray-100'
          }`}>
          <div className="space-y-12">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span className={`text-2xl font-bold tracking-tight ${isDark ? 'text-white' : 'text-[#1F2937]'}`}>SkillNest</span>
            </div>

            <div className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={isLogin ? 'login-title' : 'signup-title'}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-4"
                >
                  <h2 className={`text-5xl font-bold leading-tight tracking-tight ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                    {isLogin ? 'Welcome Back!' : 'Create Account'}
                  </h2>
                  <p className={`text-lg max-w-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                    {isLogin
                      ? 'Access your personalized internship dashboard and track your applications in real-time.'
                      : 'Join SkillNest and launch your career today'}
                  </p>
                </motion.div>
              </AnimatePresence>

              <button
                onClick={() => setIsLogin(!isLogin)}
                className={`px-8 py-3 rounded-2xl font-bold transition-all shadow-sm border ${isDark ? 'bg-slate-800 border-slate-700 text-white hover:bg-slate-700' : 'bg-white border-gray-200 text-[#1F2937] hover:bg-gray-50'
                  }`}
              >
                {isLogin ? 'Create an account' : 'Already have an account?'}
              </button>
            </div>
          </div>

          <div className="relative mt-auto">
            <motion.div
              key={isLogin ? 'login-img' : 'signup-img'}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative rounded-[32px] overflow-hidden shadow-2xl aspect-[4/3]"
            >
              <img
                src={isLogin ? loginImg : signupImg}
                alt="Illustration"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-white shadow-lg">
                <Shield size={20} />
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={`w-full lg:w-[55%] p-8 lg:p-20 flex flex-col justify-center relative ${isDark ? 'bg-slate-900' : 'bg-white'
          }`}>
          <div className="max-w-md mx-auto w-full space-y-10">
            <div className="text-center lg:text-left">
              <h1 className={`text-4xl font-bold mb-3 tracking-tight ${isDark ? 'text-white' : 'text-[#111827]'}`}>
                {isLogin ? 'Welcome Back!' : 'Create Account'}
              </h1>
              <p className={`font-medium ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
                {isLogin ? 'Log in to your account' : 'Fill in the details to get started'}
              </p>
            </div>

            <form className="space-y-5" onSubmit={async (e) => {
              e.preventDefault();

              try {
                const url = isLogin
                  ? "http://localhost:5000/api/auth/login"
                  : "http://localhost:5000/api/auth/register";

                // const res = await fetch(url, {
                //   method: "POST",
                //   headers: {
                //     "Content-Type": "application/json",
                //   },
                //   body: JSON.stringify(
                //     isLogin
                //       ? { email, password }
                //       : { name, email, password }
                //   ),
                // });
                const res = await fetch(url, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(
                    isLogin
                      ? { email, password }
                      : { name, email, password, role }
                  )
                });

                const data = await res.json();

                // const data = await res.json();

                if (isLogin) {
                  if (data.token && data.user) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    alert("Login Success 🚀");
                    onLogin(data.user.role);
                  } else {
                    alert(data.msg || "Login failed ❌");
                  }
                } else {
                  alert("Signup Success ✅");
                  setIsLogin(true);
                }

              } catch (err) {
                console.log(err);
              }
            }}>
              {!isLogin && (
                <>
                  {/* Role Selection */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setRole('student')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${role === 'student'
                        ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                        : isDark ? 'border-slate-800 bg-slate-800/50 text-slate-400' : 'border-gray-100 bg-gray-50 text-gray-400'
                        }`}
                    >
                      <GraduationCap size={24} />
                      <span className="text-xs font-bold uppercase tracking-wider">Student</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setRole('admin')}
                      className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all gap-2 ${role === 'admin'
                        ? 'border-[#0066FF] bg-[#0066FF]/5 text-[#0066FF]'
                        : isDark ? 'border-slate-800 bg-slate-800/50 text-slate-400' : 'border-gray-100 bg-gray-50 text-gray-400'
                        }`}
                    >
                      <Briefcase size={24} />
                      <span className="text-xs font-bold uppercase tracking-wider">HR / Recruiter</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="relative group">
                      <User className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-[#0066FF]' : 'text-gray-400 group-focus-within:text-[#0066FF]'
                        }`} size={18} />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name"
                        className={`w-full border border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-400 font-medium ${isDark ? 'bg-slate-800 text-white focus:bg-slate-700 focus:border-[#0066FF]/30' : 'bg-[#F3F4F6] text-[#1F2937] focus:bg-white focus:border-[#0066FF]/30'
                          }`}
                      />
                    </div>
                  </div>
                </>
              )}

              <div className="space-y-2">
                <div className="relative group">
                  <Mail className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-[#0066FF]' : 'text-gray-400 group-focus-within:text-[#0066FF]'
                    }`} size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={isLogin ? "Username or E-mail" : "Email Address"}
                    className={`w-full border border-transparent rounded-2xl py-4 pl-12 pr-4 outline-none transition-all placeholder:text-gray-400 font-medium ${isDark ? 'bg-slate-800 text-white focus:bg-slate-700 focus:border-[#0066FF]/30' : 'bg-[#F3F4F6] text-[#1F2937] focus:bg-white focus:border-[#0066FF]/30'
                      }`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative group">
                  <Lock className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 group-focus-within:text-[#0066FF]' : 'text-gray-400 group-focus-within:text-[#0066FF]'
                    }`} size={18} />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className={`w-full border border-transparent rounded-2xl py-4 pl-12 pr-12 outline-none transition-all placeholder:text-gray-400 font-medium ${isDark ? 'bg-slate-800 text-white focus:bg-slate-700 focus:border-[#0066FF]/30' : 'bg-[#F3F4F6] text-[#1F2937] focus:bg-white focus:border-[#0066FF]/30'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-gray-400 hover:text-[#1F2937]'
                      }`}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" className="hidden" />
                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all group-hover:border-[#0066FF] ${isDark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'
                    }`}>
                    <div className="w-2.5 h-2.5 bg-[#0066FF] rounded-sm opacity-0 group-hover:opacity-20 transition-all" />
                  </div>
                  <span className={`text-xs transition-colors font-medium ${isDark ? 'text-slate-500 group-hover:text-slate-300' : 'text-gray-500 group-hover:text-gray-700'
                    }`}>
                    {isLogin ? 'Forgot password?' : 'I accept the terms of the agreement'}
                  </span>
                </label>
                <button type="button" className={`text-xs font-bold transition-colors ${isDark ? 'text-slate-500 hover:text-white' : 'text-gray-400 hover:text-[#1F2937]'
                  }`}>
                  Need help?
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0066FF] text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-500/20 hover:bg-[#0052CC] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-base"
              >
                {isLogin ? 'Log In' : 'Sign Up'}
              </button>
            </form>

            <div className="space-y-8">
              <div className="text-center">
                <p className={`text-xs font-bold ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="ml-1 text-[#0066FF] hover:underline"
                  >
                    {isLogin ? 'Sign Up' : 'Log In'}
                  </button>
                </p>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className={`w-full border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`}></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className={`px-4 font-bold tracking-[0.2em] ${isDark ? 'bg-slate-900 text-slate-500' : 'bg-white text-gray-400'
                    }`}>Or continue with</span>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <button className={`flex items-center justify-center p-3 rounded-xl transition-all border group ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}>
                  <Chrome size={18} className="text-gray-400 group-hover:text-[#EA4335] transition-colors" />
                  <span className={`ml-2 text-[10px] font-bold hidden sm:inline ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>Google</span>
                </button>
                <button className={`flex items-center justify-center p-3 rounded-xl transition-all border group ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}>
                  <Linkedin size={18} className="text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
                  <span className={`ml-2 text-[10px] font-bold hidden sm:inline ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>LinkedIn</span>
                </button>
                <button className={`flex items-center justify-center p-3 rounded-xl transition-all border group ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}>
                  <Github size={18} className="text-gray-400 group-hover:text-[#181717] transition-colors" />
                  <span className={`ml-2 text-[10px] font-bold hidden sm:inline ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>GitHub</span>
                </button>
                <button className={`flex items-center justify-center p-3 rounded-xl transition-all border group ${isDark ? 'bg-slate-800 border-slate-700 hover:bg-slate-700' : 'bg-white border-gray-100 hover:bg-gray-50'
                  }`}>
                  <Twitter size={18} className="text-gray-400 group-hover:text-[#1DA1F2] transition-colors" />
                  <span className={`ml-2 text-[10px] font-bold hidden sm:inline ${isDark ? 'text-slate-400 group-hover:text-white' : 'text-gray-500 group-hover:text-gray-700'}`}>Twitter</span>
                </button>
              </div>
            </div>

            <div className={`pt-6 flex justify-center gap-6 text-[10px] font-bold uppercase tracking-widest ${isDark ? 'text-slate-600' : 'text-gray-300'
              }`}>
              <button className="hover:text-gray-500 transition-colors">Privacy Policy</button>
              <button className="hover:text-gray-500 transition-colors">Terms & Conditions</button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
