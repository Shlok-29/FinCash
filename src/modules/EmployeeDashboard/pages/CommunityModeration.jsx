import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, ShieldAlert, CheckCircle2, XCircle, AlertTriangle, Eye, MessageSquare, UserX } from 'lucide-react';

const EmployeeCommunityModeration = () => {
  const [flaggedPosts, setFlaggedPosts] = useState([
    {
      id: 'MOD-101',
      author: 'crypto_trader99',
      reason: 'Promoting unverified high-yield crypto scheme',
      content: 'Guaranteed 500% returns in 3 days! Join my private Telegram channel for signals.',
      status: 'Pending',
      flaggedAt: '10m ago'
    },
    {
      id: 'MOD-102',
      author: 'unknown_user_44',
      reason: 'Spam / Repetitive posting',
      content: 'Click here for free loan approval without documentation.',
      status: 'Pending',
      flaggedAt: '25m ago'
    }
  ]);

  const handleAction = (id, action) => {
    setFlaggedPosts(flaggedPosts.map(p => p.id === id ? { ...p, status: action } : p));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
            <ShieldCheck size={16} /> Community Safety & Quality Control
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Community Moderation Queue</h1>
          <p className="text-gray-400 text-sm">Review flagged community discussions, enforce financial advice guidelines, and manage bans.</p>
        </div>
        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-3 py-1 rounded-full uppercase">
          {flaggedPosts.filter(p => p.status === 'Pending').length} Pending Review
        </span>
      </div>

      <div className="space-y-4">
        {flaggedPosts.map((post) => (
          <div key={post.id} className="bg-slate-900 border border-emerald-900/30 rounded-3xl p-6 space-y-4 shadow-xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{post.id}</span>
                <h3 className="text-sm font-bold text-white mt-1">Author: @{post.author}</h3>
                <span className="text-[10px] text-amber-400 font-black uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mt-1 inline-block">
                  Flag Reason: {post.reason}
                </span>
              </div>
              <span className="text-[10px] text-gray-500 font-bold">{post.flaggedAt}</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-white/5 text-xs text-gray-300 font-mono leading-relaxed">
              "{post.content}"
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className={`text-xs font-black uppercase ${
                post.status === 'Approved' ? 'text-emerald-400' :
                post.status === 'Removed' ? 'text-rose-400' : 'text-amber-400'
              }`}>
                Status: {post.status}
              </span>

              {post.status === 'Pending' && (
                <div className="flex items-center gap-3">
                  <button 
                    onClick={() => handleAction(post.id, 'Approved')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600/20 text-emerald-400 border border-emerald-500/30 rounded-xl text-xs font-bold hover:bg-emerald-600/30 transition-all"
                  >
                    <CheckCircle2 size={16} /> Allow Post
                  </button>
                  <button 
                    onClick={() => handleAction(post.id, 'Removed')}
                    className="flex items-center gap-1.5 px-4 py-2 bg-rose-600/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-bold hover:bg-rose-600/30 transition-all"
                  >
                    <XCircle size={16} /> Remove Post
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default EmployeeCommunityModeration;
