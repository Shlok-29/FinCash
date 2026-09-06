import React from 'react';
import { motion } from 'framer-motion';
import { LifeBuoy, GraduationCap, Calendar, CheckCircle2, Clock, UserCheck } from 'lucide-react';

const EmployeeMentorSupport = () => {
  const sessions = [
    { id: 'SESS-401', mentor: 'Rajesh Kumar', user: 'Shlok Dubey', topic: 'Stock Market & Mutual Funds', status: 'Scheduled', time: 'Tomorrow, 3:00 PM' },
    { id: 'SESS-402', mentor: 'Priya Sharma', user: 'Amit Verma', topic: 'Tax Optimization 80C', status: 'Completed', time: 'Today, 11:00 AM' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
          <LifeBuoy size={16} /> Mentor Operations & Scheduling Support
        </div>
        <h1 className="text-3xl font-black font-outfit text-white">Mentor Session Support</h1>
        <p className="text-gray-400 text-sm">Monitor human mentor consultations, session links, and billing confirmations.</p>
      </div>

      <div className="bg-slate-900 border border-emerald-900/30 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-slate-950/40">
          <h3 className="font-bold text-white text-base">Active Consultation Roster</h3>
          <span className="text-xs text-emerald-400 font-bold">2 Sessions Handled Today</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/80 text-[10px] uppercase text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4 font-black">Session ID</th>
                <th className="px-6 py-4 font-black">Mentor</th>
                <th className="px-6 py-4 font-black">User Client</th>
                <th className="px-6 py-4 font-black">Consultation Focus</th>
                <th className="px-6 py-4 font-black text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-xs">
              {sessions.map(s => (
                <tr key={s.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-emerald-400">{s.id}</td>
                  <td className="px-6 py-4 font-bold text-white">{s.mentor}</td>
                  <td className="px-6 py-4 text-gray-300">{s.user}</td>
                  <td className="px-6 py-4 text-gray-400">{s.topic}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase border ${
                      s.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
                    }`}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeMentorSupport;
