import React, { useState, useRef, useEffect } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Search, Pencil, Video, Phone, Send, Paperclip, Smile, AlertCircle } from 'lucide-react';

const Chat = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessage, setNewMessage] = useState('');
  
  const [activeContact, setActiveContact] = useState(null);


  const contacts = [
    { id: 1, name: 'noman khan', message: 'short message here...', time: '2:30', avatar: 'https://i.pravatar.cc/150?img=11' },
    { id: 2, name: 'ahmadi khan', message: 'Hi hope you feel better', time: '2:30', avatar: 'https://i.pravatar.cc/150?img=12' },
    { id: 3, name: 'sara ahmad', message: 'See you tomorrow', time: '1:15', avatar: 'https://i.pravatar.cc/150?img=13' },
    { id: 4, name: 'ali reza', message: 'Thank you doctor', time: 'Yesterday', avatar: 'https://i.pravatar.cc/150?img=14' },
  ];

 
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ahmadi khan', text: 'Hi hope you feel better', time: '2:30', avatar: 'https://i.pravatar.cc/150?img=12', isMe: false },
    { id: 2, sender: 'ahmadi khan', text: 'Hi hope you feel better', time: '2:30', avatar: 'https://i.pravatar.cc/150?img=12', isMe: false },
    { id: 3, sender: 'ahmadi khan', text: 'Hi hope you feel better', time: '2:30', avatar: 'https://i.pravatar.cc/150?img=12', isMe: false },
  ]);

  const messagesEndRef = useRef(null);

 
  useEffect(() => {
    if (contacts.length > 0 && !activeContact) {
      setActiveContact(contacts[1]); // ahmadi khan
    }
  }, []);

 
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  
  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().trim().includes(searchTerm.toLowerCase().trim())
  );

  
  const handleSend = (e) => {
    e.preventDefault();
    
  
    if (!newMessage.trim()) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const messageToAdd = {
      id: Date.now(),
      sender: 'You',
      text: newMessage.trim(),
      time: currentTime,
      avatar: 'https://i.pravatar.cc/150?img=68', // عکس خودت
      isMe: true,
    };

    setMessages([...messages, messageToAdd]);
    setNewMessage(''); 
  };

  return (
    <DashboardLayout title="Chat">
      <div className="grid grid-cols-1 md:grid-cols-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm overflow-hidden min-h-[calc(100vh-180px)] border border-slate-100 dark:border-slate-700">

       
        <aside className="md:col-span-1 border-r border-slate-100 dark:border-slate-700 flex flex-col">
          
          <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3">
            <img src="https://i.pravatar.cc/150?img=52" alt="Pro Murtaza" className="w-12 h-12 rounded-full object-cover" />
            <div className="flex-1">
              <h3 className="font-bold text-slate-800 dark:text-white">Pro Murtaza</h3>
              <p className="text-xs text-green-500">online</p>
            </div>
            <button className="text-slate-500 hover:text-purple-500 transition">
              <Pencil className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 border-b border-slate-100 dark:border-slate-700">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Contacts"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-transparent outline-none focus:border-purple-500 placeholder:text-slate-400 dark:text-white"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            
            {filteredContacts.length === 0 ? (
              <div className="p-6 text-center text-sm text-slate-500 flex flex-col items-center mt-10">
                <AlertCircle className="w-8 h-8 text-slate-300 mb-2" />
                No contacts found
              </div>
            ) : (
              filteredContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setActiveContact(contact)} 
                  className={`w-full flex items-center gap-3 px-5 py-4 transition border-b border-slate-50 dark:border-slate-700 text-left ${
                    activeContact?.id === contact.id ? 'bg-purple-50 dark:bg-slate-700' : 'hover:bg-slate-50 dark:hover:bg-slate-700/50'
                  }`}
                >
                  <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-800 dark:text-white text-sm truncate">{contact.name}</h4>
                    <p className="text-xs text-slate-400 truncate">{contact.message}</p>
                  </div>
                  <span className="text-xs text-slate-400 flex-shrink-0">{contact.time}</span>
                </button>
              ))
            )}
          </div>
        </aside>

        
        <section className="md:col-span-2 flex flex-col">
          
        
          {activeContact && (
            <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex items-center gap-3 bg-white dark:bg-slate-800">
              <img src={activeContact.avatar} alt={activeContact.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-slate-800 dark:text-white">{activeContact.name}</h3>
                <p className="text-xs text-green-500">online</p>
              </div>
              <button className="text-pink-500 hover:text-pink-600 transition p-2"><Video className="w-5 h-5" /></button>
              <button className="text-pink-500 hover:text-pink-600 transition p-2"><Phone className="w-5 h-5" /></button>
            </div>
          )}

        
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50 dark:bg-slate-800/50">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex items-start gap-3 ${msg.isMe ? 'flex-row-reverse' : ''}`}>
                <img src={msg.avatar} alt={msg.sender} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                <div className={`flex-1 ${msg.isMe ? 'text-right' : ''}`}>
                  <h5 className="text-sm font-semibold text-slate-800 dark:text-white mb-1">{msg.sender}</h5>
                  <div className={`inline-block p-3 rounded-xl text-sm ${
                    msg.isMe 
                      ? 'bg-purple-500 text-white rounded-tr-none' 
                      : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-200 rounded-tl-none shadow-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
                <span className="text-xs text-slate-400 flex-shrink-0 mt-1">{msg.time}</span>
              </div>
            ))}
            
            <div ref={messagesEndRef} />
          </div>

         
          <form onSubmit={handleSend} className="p-4 border-t border-slate-100 dark:border-slate-700 flex items-center gap-3 bg-white dark:bg-slate-800">
            <button type="button" className="text-slate-400 hover:text-purple-500 transition p-2"><Smile className="w-5 h-5" /></button>
            <button type="button" className="text-slate-400 hover:text-purple-500 transition p-2"><Paperclip className="w-5 h-5" /></button>
            
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2.5 border border-slate-200 dark:border-slate-600 rounded-lg text-sm bg-transparent outline-none focus:border-purple-500 placeholder:text-slate-400 dark:text-white"
            />

           
            <button
              type="submit"
              disabled={!newMessage.trim()}
              className={`p-3 rounded-lg transition ${
                newMessage.trim() 
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:opacity-90' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </section>
      </div>
    </DashboardLayout>
  );
};

export default Chat;