import { useState } from 'react';
import { 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Paperclip, 
  Smile, 
  Send,
  Circle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const contacts = [
  { 
    id: 1, 
    name: 'Google Recruitment', 
    lastMessage: 'Your interview is scheduled for tomorrow.', 
    time: '10:32am', 
    unread: 2, 
    online: true,
    avatar: 'https://picsum.photos/seed/google/100/100'
  },
  { 
    id: 2, 
    name: 'Microsoft HR', 
    lastMessage: 'Thanks for applying!', 
    time: 'Yesterday', 
    unread: 0, 
    online: false,
    avatar: 'https://picsum.photos/seed/ms/100/100'
  },
  { 
    id: 3, 
    name: 'Figma Design Team', 
    lastMessage: 'Can you share your portfolio?', 
    time: 'Mar 18', 
    unread: 0, 
    online: true,
    avatar: 'https://picsum.photos/seed/figma/100/100'
  },
  { 
    id: 4, 
    name: 'Meta Careers', 
    lastMessage: 'We have a new opening for you.', 
    time: 'Mar 15', 
    unread: 0, 
    online: false,
    avatar: 'https://picsum.photos/seed/meta/100/100'
  },
];

const initialMessages = {
  1: [
    { id: 1, sender: 'contact', text: 'Hello! We reviewed your application for the Frontend Intern role.', time: '10:00am' },
    { id: 2, sender: 'user', text: 'Thank you! I am excited to hear back from you.', time: '10:05am' },
    { id: 3, sender: 'contact', text: 'We would like to schedule an interview for tomorrow at 2:00 PM IST.', time: '10:30am' },
  ],
  2: [
    { id: 1, sender: 'contact', text: 'Thanks for applying to Microsoft!', time: 'Yesterday' },
  ],
  3: [
    { id: 1, sender: 'contact', text: 'Can you share your portfolio?', time: 'Mar 18' },
  ],
  4: [
    { id: 1, sender: 'contact', text: 'We have a new opening for you.', time: 'Mar 15' },
  ],
};

export default function Messages({ isDark }) {
  const [selectedContact, setSelectedContact] = useState(contacts[0]);
  const [allMessages, setAllMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const messages = allMessages[selectedContact.id] || [];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const msg = {
      id: messages.length + 1,
      sender: 'user',
      text: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase()
    };
    
    setAllMessages({
      ...allMessages,
      [selectedContact.id]: [...messages, msg]
    });
    setNewMessage('');
  };

  return (
    <div className={`flex h-[calc(100vh-160px)] rounded-3xl overflow-hidden border ${
      isDark ? 'bg-deep-obsidian border-slate-800' : 'bg-white border-gray-100 shadow-sm'
    }`}>
      {/* Sidebar */}
      <div className={`w-80 flex flex-col border-r ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
        <div className="p-6">
          <h2 className={`text-2xl font-bold mb-6 ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>Messages</h2>
          <div className={`relative flex items-center ${isDark ? 'text-slate-400' : 'text-gray-400'}`}>
            <Search size={18} className="absolute left-3" />
            <input
              type="text"
              placeholder="Search chats..."
              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border outline-none transition-all text-sm ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 focus:border-royal-indigo text-white' 
                  : 'bg-gray-50 border-gray-200 focus:border-primary-blue text-deep-charcoal'
              }`}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {contacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => setSelectedContact(contact)}
              className={`w-full p-4 flex items-center gap-4 transition-all border-l-4 ${
                selectedContact.id === contact.id
                  ? (isDark ? 'bg-slate-800/50 border-royal-indigo' : 'bg-gray-50 border-primary-blue')
                  : 'border-transparent hover:bg-slate-800/20'
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-700">
                  <img src={contact.avatar} alt={contact.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </div>
                {contact.online && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-deep-obsidian" />
                )}
              </div>
              <div className="flex-1 text-left min-w-0">
                <div className="flex justify-between items-center mb-1">
                  <h4 className={`font-bold text-sm truncate ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{contact.name}</h4>
                  <span className="text-[10px] text-slate-500 font-bold">{contact.time}</span>
                </div>
                <p className="text-xs text-slate-500 truncate">{contact.lastMessage}</p>
              </div>
              {contact.unread > 0 && (
                <div className="w-5 h-5 bg-royal-indigo text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {contact.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-slate-900/20">
        {/* Chat Header */}
        <div className={`p-6 flex items-center justify-between border-b ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-slate-700">
              <img src={selectedContact.avatar} alt={selectedContact.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h4 className={`font-bold ${isDark ? 'text-white' : 'text-deep-charcoal'}`}>{selectedContact.name}</h4>
              <div className="flex items-center gap-1.5">
                <Circle size={8} className={selectedContact.online ? 'fill-green-500 text-green-500' : 'fill-slate-500 text-slate-500'} />
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {selectedContact.online ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <Phone size={20} />
            </button>
            <button className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <Video size={20} />
            </button>
            <button className={`p-2.5 rounded-xl transition-all ${isDark ? 'bg-slate-800 text-slate-300 hover:bg-slate-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
              <MoreVertical size={20} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-3 max-w-[70%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className="w-8 h-8 rounded-xl overflow-hidden flex-shrink-0 mt-auto">
                  <img 
                    src={msg.sender === 'user' ? 'https://picsum.photos/seed/trial/100/100' : selectedContact.avatar} 
                    alt="Avatar" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-1">
                  <div className={`p-4 rounded-3xl text-sm font-medium shadow-lg ${
                    msg.sender === 'user'
                      ? 'bg-royal-indigo text-white rounded-tr-none'
                      : (isDark ? 'bg-slate-800 text-slate-200 rounded-tl-none' : 'bg-white text-deep-charcoal rounded-tl-none')
                  }`}>
                    {msg.text}
                  </div>
                  <p className={`text-[10px] font-bold text-slate-500 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className={`p-6 border-t ${isDark ? 'border-slate-800' : 'border-gray-100'}`}>
          <form onSubmit={handleSendMessage} className="flex items-center gap-4">
            <button type="button" className={`p-2.5 rounded-xl transition-all ${isDark ? 'text-slate-400 hover:bg-slate-800' : 'text-gray-500 hover:bg-gray-100'}`}>
              <Paperclip size={20} />
            </button>
            <div className={`flex-1 flex items-center gap-3 px-6 py-3 rounded-2xl border transition-all ${
              isDark ? 'bg-slate-900 border-slate-800 focus-within:border-royal-indigo' : 'bg-gray-50 border-gray-200 focus-within:border-primary-blue'
            }`}>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-300"
              />
              <button type="button" className={`transition-all ${isDark ? 'text-slate-400 hover:text-royal-indigo' : 'text-gray-500 hover:text-primary-blue'}`}>
                <Smile size={20} />
              </button>
            </div>
            <button 
              type="submit"
              className={`p-3.5 rounded-2xl transition-all shadow-lg ${
                isDark ? 'bg-royal-indigo text-white hover:scale-105 active:scale-95' : 'bg-primary-blue text-white hover:scale-105 active:scale-95'
              }`}
            >
              <Send size={20} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
