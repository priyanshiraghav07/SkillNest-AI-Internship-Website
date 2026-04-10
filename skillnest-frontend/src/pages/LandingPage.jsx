import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2, Globe, ShieldCheck, Zap, Users, Building2, Briefcase, Star, Sun, Moon } from 'lucide-react';
import lightLogo from "../assets/images/light_theme_logo.png";
import darkLogo from "../assets/images/dark_theme_logo.png";
import landingImg from "../assets/images/landing_photo.png";


export default function LandingPage({ onGetStarted, onLogin, isDark, setIsDark }) {
  const stats = [
    { label: 'Active Users', value: '10K+', icon: <Users size={20} /> },
    { label: 'Partner Companies', value: '500+', icon: <Building2 size={20} /> },
    { label: 'Internships Posted', value: '25K+', icon: <Briefcase size={20} /> },
    { label: 'Placement Rate', value: '94%', icon: <Zap size={20} /> },
  ];

  const features = [
    {
      title: 'AI-Powered Matching',
      desc: 'Our smart algorithms match your skills with the perfect internship opportunities based on your profile.',
      icon: <Zap className="text-royal-indigo" size={24} />,
    },
    {
      title: 'Verified Certificates',
      desc: 'Earn blockchain-verified certificates that companies trust and value. Showcase your achievements globally.',
      icon: <ShieldCheck className="text-royal-indigo" size={24} />,
    },
    {
      title: 'Global Opportunities',
      desc: 'Access internships from top companies around the world, remote or on-site. No boundaries to your growth.',
      icon: <Globe className="text-royal-indigo" size={24} />,
    },
  ];

  const steps = [
    'Create your professional profile in minutes',
    'Get matched with top-tier internships',
    'Manage tasks and projects in real-time',
    'Earn verified certificates upon completion',
  ];

  const testimonials = [
    {
      name: 'Priya Patel',
      role: 'Frontend Intern',
      content: 'SkillNest helped me find my first internship at a top tech firm. Highly recommended!',
      avatar: 'https://picsum.photos/seed/priya/100/100',
    },
    {
      name: 'Sahil Verma',
      role: 'UI/UX Designer',
      content: 'The AI matching is incredible. I found exactly what I was looking for within a week.',
      avatar: 'https://picsum.photos/seed/sahil/100/100',
    },
    {
      name: 'Ananya Sharma',
      role: 'Data Science Intern',
      content: 'Verified certificates gave me a huge edge during my job search. It is a game changer.',
      avatar: 'https://picsum.photos/seed/ananya/100/100',
    },
  ];

  return (
    <div className={`min-h-screen font-sans ${isDark ? 'bg-deep-obsidian text-white' : 'bg-white text-deep-charcoal'}`}>
      {/* Navbar */}
      <nav className={`fixed top-0 w-full z-50 backdrop-blur-md border-b ${isDark ? 'bg-deep-obsidian/80 border-slate-800' : 'bg-white/80 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">

          <img
              src={isDark ? darkLogo : lightLogo}
              alt="logo"
              className="w-35 h-35 object-contain"
            />
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-bold">
            <a href="#features" className="hover:text-royal-indigo transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-royal-indigo transition-colors">How It Works</a>
            <a href="#testimonials" className="hover:text-royal-indigo transition-colors">Testimonials</a>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsDark(!isDark)}
              className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button onClick={onLogin} className="px-6 py-2.5 text-sm font-bold hover:text-royal-indigo transition-colors">Login</button>
            <button onClick={onGetStarted} className="px-6 py-2.5 bg-royal-indigo text-white rounded-xl text-sm font-bold shadow-lg shadow-royal-indigo/20 hover:scale-105 transition-transform">Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-royal-indigo/10 text-royal-indigo text-xs font-bold uppercase tracking-widest mb-6"
          >
            The Future of Internship Management
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1]"
          >
            Bridge the Gap<br />
            <span className="text-royal-indigo">Learning to Career</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}
          >
            SkillNest is the all-in-one platform for students to find, manage, and excel in internships while earning blockchain-verified certificates.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button onClick={onGetStarted} className="w-full sm:w-auto px-8 py-4 bg-royal-indigo text-white rounded-2xl font-bold shadow-xl shadow-royal-indigo/30 hover:scale-105 transition-transform flex items-center justify-center gap-2 group">
              Start Your Journey <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button className={`w-full sm:w-auto px-8 py-4 rounded-2xl font-bold border transition-all ${isDark ? 'border-slate-800 hover:bg-slate-900' : 'border-gray-200 hover:bg-gray-50'}`}>
              Explore Internships
            </button>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className={`py-16 border-y ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-gray-50 border-gray-100'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl md:text-4xl font-black mb-2 text-royal-indigo">{stat.value}</div>
                <div className={`text-sm font-bold uppercase tracking-wider ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight mb-4">Why Choose SkillNest?</h2>
            <p className={`text-lg ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>Everything you need to kickstart your professional career.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border transition-all hover:shadow-2xl ${isDark ? 'bg-slate-900/50 border-slate-800 hover:border-royal-indigo/50' : 'bg-white border-gray-100 hover:border-royal-indigo/20'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${isDark ? 'bg-slate-800' : 'bg-royal-indigo/5'}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className={`leading-relaxed ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className={`py-24 px-6 ${isDark ? 'bg-slate-900/30' : 'bg-gray-50/50'}`}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="flex-1">
            <h2 className="text-4xl font-black tracking-tight mb-8">Your Career Journey,<br /><span className="text-royal-indigo">Simplified.</span></h2>
            <p className={`text-lg mb-10 ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>We've built a seamless process to help you transition from a student to a professional in just a few steps.</p>
            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-royal-indigo/20 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={16} className="text-royal-indigo" />
                  </div>
                  <span className="font-bold">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 relative">
            <div className="absolute inset-0 bg-royal-indigo/20 blur-[100px] rounded-full"></div>
            <img
              src={landingImg}
              alt="Journey"
              className="relative rounded-[2rem] shadow-2xl border border-white/10"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black tracking-tight mb-4">Loved by Students Worldwide</h2>
            <div className="flex items-center justify-center gap-1 text-amber-400">
              {[...Array(5)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-gray-100'}`}>
                <p className={`text-lg italic mb-8 leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>"{t.content}"</p>
                <div className="flex items-center gap-4">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-xl object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="text-xs text-royal-indigo font-bold uppercase tracking-wider">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-royal-indigo p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-royal-indigo/30">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 to-transparent"></div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6 relative z-10">Ready to Build Your<br />Professional Future?</h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto relative z-10">Join thousands of students who have already started their journey with SkillNest. Your dream internship is just a click away.</p>
          <button onClick={onGetStarted} className="px-10 py-5 bg-white text-royal-indigo rounded-2xl font-black text-lg shadow-xl hover:scale-105 transition-transform relative z-10">
            Create Free Account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-20 px-6 border-t ${isDark ? 'bg-deep-obsidian border-slate-800' : 'bg-white border-gray-100'}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
            <img
              src={isDark ? darkLogo : lightLogo}
              alt="logo"
              className="w-30 h-15 object-contain"
            />
          </div>
            <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              Empowering the next generation of professionals through meaningful internship experiences.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-6">Platform</h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Internships</a></li>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Certificates</a></li>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">AI Matching</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Company</h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Legal</h4>
            <ul className={`space-y-4 text-sm ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-royal-indigo transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">© 2026 SkillNest. All rights reserved.</p>
          <div className="flex items-center gap-6 text-slate-500">
            <a href="#" className="hover:text-royal-indigo transition-colors"><Globe size={18} /></a>
            <a href="#" className="hover:text-royal-indigo transition-colors"><Zap size={18} /></a>
            <a href="#" className="hover:text-royal-indigo transition-colors"><Users size={18} /></a>
          </div>
        </div>
      </footer>
    </div>
  );
}
