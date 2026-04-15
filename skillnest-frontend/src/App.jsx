import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import Chatbot from './components/Chatbot.jsx';
import Dashboard from './pages/Dashboard.jsx';
import BrowseInternships from './pages/BrowseInternships.jsx';
import MyInternships from './pages/MyInternships.jsx';
import MyApplications from './pages/MyApplications.jsx';
import Messages from './pages/Messages.jsx';
import ResumeSkills from './pages/ResumeSkills.jsx';
import Certificates from './pages/Certificates.jsx';
import ProgressTracker from './pages/ProgressTracker.jsx';
import AITools from './pages/AITools.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ManageUsers from './pages/ManageUsers.jsx';
import PostInternship from './pages/PostInternship.jsx';
import Settings from './pages/Settings.jsx';
import Profile from './pages/Profile.jsx';
import Auth from './pages/Auth.jsx';
import LandingPage from './pages/LandingPage.jsx';
import { motion, AnimatePresence } from 'motion/react';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isDark, setIsDark] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('student'); // 'student' or 'admin'
  const [showLanding, setShowLanding] = useState(true);
  const [authMode, setAuthMode] = useState('login');

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const handleLogin = (role = 'student') => {
    setUserRole(role);
    setIsAuthenticated(true);
    setShowLanding(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setShowLanding(true);
  };

  if (showLanding && !isAuthenticated) {
    return (
      <LandingPage 
        isDark={isDark}
        setIsDark={setIsDark}
        onLogin={() => { setAuthMode('login'); setShowLanding(false); }}
        onGetStarted={() => { setAuthMode('signup'); setShowLanding(false); }}
        
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <Auth
        initialMode={authMode}
        onLogin={handleLogin}
        onBackToHome={() => setShowLanding(true)}
        isDark={isDark}
        setIsDark={setIsDark}
      />
    );
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard isDark={isDark} setActiveTab={setActiveTab} />;
      case 'browse':
        return <BrowseInternships isDark={isDark} />;
      case 'my-internships':
        return <MyInternships isDark={isDark} />;
      case 'my-applications':
        return <MyApplications isDark={isDark} />;
      case 'messages':
        return <Messages isDark={isDark} />;
      case 'resume':
        return <ResumeSkills isDark={isDark} />;
      case 'certificates':
        return <Certificates isDark={isDark} />;
      case 'tracker':
        return <ProgressTracker isDark={isDark} />;
      case 'tools':
        return <AITools isDark={isDark} />;
      case 'admin-dashboard':
        return <AdminDashboard isDark={isDark} />;
      case 'manage-users':
        return <ManageUsers isDark={isDark} />;
      case 'post-internship':
        return <PostInternship isDark={isDark} />;
      case 'settings':
        return <Settings isDark={isDark} setIsDark={setIsDark} />;
      case 'profile':
        return <Profile isDark={isDark} />;
      default:
        return <Dashboard isDark={isDark} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDark ? 'bg-deep-obsidian text-slate-200' : 'bg-soft-cloud-gray text-deep-charcoal'
      }`}>
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        onLogout={handleLogout}
        userRole={userRole}
      />

      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        <Header
          isDark={isDark}
          setIsDark={setIsDark}
          onLogout={handleLogout}
          setActiveTab={setActiveTab}
        />

        <div className="flex-1 p-8 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
        <Chatbot isDark={isDark} />
      </main>
    </div>
  );
}

export default App;
