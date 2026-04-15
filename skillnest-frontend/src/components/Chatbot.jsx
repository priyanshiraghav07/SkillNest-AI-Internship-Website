import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  X,
  Send,
  Bot,
  User,
  Loader2,
  Minimize2,
  Maximize2,
  Zap,
  Search,
  Image as ImageIcon,
  Brain,
  ChevronDown
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function Chatbot({ isDark }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [isThinkingMode, setIsThinkingMode] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hi! I am your SkillNest AI assistant. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [imageSize, setImageSize] = useState('1k');
  const [imageAspect, setImageAspect] = useState('1:1');
  const [uploadedImage, setUploadedImage] = useState(null);
  const messagesEndRef = useRef(null);
  const imageInputRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (e) => {
    if (e) e.preventDefault(); // 🔥 MOST IMPORTANT

    if (!input.trim()) return;

    const userMessage = input;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage }
    ]);

    setInput("");

    setIsLoading(true); // 🔥 ADD THIS

    try {
      await new Promise(res => setTimeout(res, 1500)); // 🔥 delay
      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      // setMessages((prev) => [
      //   ...prev,
      //   { role: "bot", content: data.reply }
      // ]);
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: data.reply || "Please try asking in a simpler way" }
      ]);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false); // 🔥 ADD THIS
    }
  };

  const tabs = [
    { id: 'chat', label: 'Chat', icon: MessageSquare },
    { id: 'fast', label: 'Fast', icon: Zap },
    { id: 'search', label: 'Search', icon: Search },
    { id: 'image', label: 'Image', icon: ImageIcon },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="flex flex-col w-[380px] h-[600px] rounded-[32px] shadow-2xl overflow-hidden border border-slate-800 bg-[#0f1115]"
          >
            {/* Header */}
            <div className="p-5 flex items-center justify-between bg-gradient-to-r from-[#6366f1] to-[#4f46e5] text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center backdrop-blur-md">
                  <Bot size={22} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-base tracking-tight">SkillNest AI</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-xl hover:bg-white/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 p-2 bg-[#1a1d23] border-b border-slate-800">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === tab.id
                    ? 'bg-white text-black'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <tab.icon size={14} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Image Controls */}
            {activeTab === 'image' && (
              <div className="px-5 py-3 bg-[#1a1d23]/80 border-b border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Size</span>
                  <div className="flex gap-1">
                    {['1k', '2k', '4k'].map(size => (
                      <button
                        key={size}
                        onClick={() => setImageSize(size)}
                        className={`px-2 py-1 rounded-md text-[10px] font-bold transition-all ${imageSize === size ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'
                          }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Aspect</span>
                  <div className="relative group">
                    <button className="flex items-center gap-1 px-2 py-1 rounded-md bg-slate-800 text-[10px] font-bold text-slate-300">
                      {imageAspect} <ChevronDown size={10} />
                    </button>
                    <div className="absolute right-0 top-full mt-1 w-20 bg-slate-800 rounded-lg shadow-xl border border-slate-700 hidden group-hover:block z-20">
                      {['1:1', '4:3', '16:9', '9:16'].map(aspect => (
                        <button
                          key={aspect}
                          onClick={() => setImageAspect(aspect)}
                          className="w-full text-left px-3 py-1.5 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-700 first:rounded-t-lg last:rounded-b-lg"
                        >
                          {aspect}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Upload</span>
                  <button
                    onClick={() => imageInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-royal-indigo/20 text-royal-indigo text-[10px] font-bold hover:bg-royal-indigo/30 transition-all"
                  >
                    <ImageIcon size={12} />
                    {uploadedImage ? 'Change Image' : 'Select Image'}
                  </button>
                  <input
                    type="file"
                    ref={imageInputRef}
                    onChange={handleImageUpload}
                    className="hidden"
                    accept="image/*"
                  />
                </div>
                {uploadedImage && (
                  <div className="relative w-full h-20 rounded-xl overflow-hidden border border-slate-700">
                    <img src={uploadedImage} alt="Uploaded" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setUploadedImage(null)}
                      className="absolute top-1 right-1 p-1 rounded-md bg-black/50 text-white hover:bg-black/70"
                    >
                      <X size={12} />
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Thinking Mode Toggle */}
            <div className="flex items-center justify-between px-5 py-3 bg-[#1a1d23]/50 border-b border-slate-800">
              <div className="flex items-center gap-2 text-slate-400">
                <Brain size={14} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Thinking Mode</span>
              </div>
              <button
                onClick={() => setIsThinkingMode(!isThinkingMode)}
                className={`w-8 h-4 rounded-full transition-all relative ${isThinkingMode ? 'bg-royal-indigo' : 'bg-slate-700'
                  }`}
              >
                <motion.div
                  animate={{ x: isThinkingMode ? 16 : 2 }}
                  className="absolute top-0.5 left-0 w-3 h-3 rounded-full bg-white shadow-sm"
                />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar bg-[#0f1115]">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    {msg.role === 'bot' && (
                      <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                        <Bot size={16} className="text-royal-indigo" />
                      </div>
                    )}
                    <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                      ? 'bg-royal-indigo text-white rounded-tr-none'
                      : 'bg-[#1a1d23] text-slate-200 border border-slate-800 rounded-tl-none'
                      }`}>
                      {msg.content}
                    </div>
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-3 items-center">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center border border-slate-700">
                      <Bot size={16} className="text-royal-indigo" />
                    </div>
                    <div className="p-4 rounded-2xl bg-[#1a1d23] border border-slate-800 rounded-tl-none">
                      <Loader2 size={16} className="animate-spin text-royal-indigo" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-5 bg-[#0f1115] border-t border-slate-800">
              <form onSubmit={(e) => handleSend(e)} className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={activeTab === 'image' ? "Describe the image..." : "Type a message..."}
                  className="w-full pl-5 pr-14 py-4 rounded-2xl bg-[#1a1d23] border border-slate-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-royal-indigo/50 transition-all placeholder:text-slate-600"
                />
                <button type="button" onClick={handleSend}
                  disabled={!input.trim() || isLoading}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${!input.trim() || isLoading
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-royal-indigo text-white hover:scale-105 active:scale-95 shadow-lg shadow-royal-indigo/20'
                    }`}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${isOpen
          ? 'bg-red-500 text-white rotate-0'
          : 'bg-royal-indigo text-white'
          }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
