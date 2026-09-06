import React from 'react';
import { motion } from 'framer-motion';
import { FileStack, CheckCircle2, Clock, BarChart2, Shield } from 'lucide-react';

const EmployeeReports = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      <div>
        <div className="flex items-center gap-2 text-emerald-400 text-xs font-black uppercase tracking-widest mb-1">
          <FileStack size={16} /> Staff Operational Performance & Telemetry
        </div>
        <h1 className="text-3xl font-black font-outfit text-white">Staff Shift Reports</h1>
        <p className="text-gray-400 text-sm">Summary of resolved user tickets, moderation approvals, and shift metrics.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-emerald-900/30 p-6 rounded-3xl">
          <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Shift Tickets Closed</span>
          <span className="text-3xl font-black text-white font-outfit">18</span>
        </div>
        <div className="bg-slate-900 border border-emerald-900/30 p-6 rounded-3xl">
          <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Avg Resolution Time</span>
          <span className="text-3xl font-black text-emerald-400 font-outfit">8.4 mins</span>
        </div>
        <div className="bg-slate-900 border border-emerald-900/30 p-6 rounded-3xl">
          <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Customer CSAT</span>
          <span className="text-3xl font-black text-amber-400 font-outfit">4.9 / 5.0</span>
        </div>
      </div>
    </motion.div>
  );
};

export default EmployeeReports;
