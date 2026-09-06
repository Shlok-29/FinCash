import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Send, CheckCircle2, AlertCircle } from 'lucide-react';

const EmployeeNotifications = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!title || !message) return;
    setSent(true);
    setTitle('');
    setMessage('');
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
          <Bell size={16} /> Broadcast Notification Center
        </div>
        <h1 className="text-3xl font-black font-outfit text-white">Staff Broadcasts</h1>
        <p className="text-gray-400 text-sm">Send system notifications and announcement updates to platform users.</p>
      </div>

      {sent && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} /> Broadcast notification sent to active users!
        </div>
      )}

      <div className="bg-slate-900 border border-emerald-900/30 rounded-3xl p-8 space-y-6 shadow-2xl max-w-2xl">
        <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-4">Compose Broadcast Notification</h3>

        <form onSubmit={handleBroadcast} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Notification Title</label>
            <input 
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Tax Deadline Reminder: Claim Section 80C by March 31st"
              className="w-full bg-slate-950 border border-gray-800 rounded-xl p-4 text-white text-sm focus:border-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Notification Body Message</label>
            <textarea 
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Details regarding the announcement..."
              className="w-full bg-slate-950 border border-gray-800 rounded-xl p-4 text-white text-sm focus:border-emerald-500 outline-none resize-none"
            />
          </div>

          <button 
            type="submit"
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <Send size={16} /> Broadcast Notification
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default EmployeeNotifications;
