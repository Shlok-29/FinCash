import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Terminal, Search, Filter, Cpu, CheckCircle2, AlertTriangle, 
  Clock, Zap, Shield, ArrowRight, X, RefreshCw 
} from 'lucide-react';

const AdminAILogs = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [selectedLog, setSelectedLog] = useState(null);

  const logs = [
    {
      id: 'LOG-881',
      user: 'shlokdubey2903@gmail.com',
      query: 'How can I optimize my tax liability under section 80C and 80D with a monthly income of ₹1,20,000?',
      category: 'Tax Strategy',
      model: 'Gemini Pro Financial Guardrail',
      latency: '1.2s',
      status: 'Allowed',
      timestamp: '2026-09-04 20:45:12',
      tokens: 412,
      responsePreview: 'Under Section 80C, you can claim up to ₹1.5 Lakhs through PPF, ELSS funds, and EPF. Under Section 80D, health insurance premiums for yourself and family provide up to ₹25,000 deduction...'
    },
    {
      id: 'LOG-880',
      user: 'alex.verma@example.com',
      query: 'What is the current price of Bitcoin and should I buy meme coins today?',
      category: 'Crypto Advisory',
      model: 'Gemini Pro Financial Guardrail',
      latency: '0.9s',
      status: 'Allowed',
      timestamp: '2026-09-04 20:41:05',
      tokens: 320,
      responsePreview: 'FinCash AI provides general educational insights. Cryptocurrency markets are highly volatile. Meme coins carry extreme downside risk compared to established assets...'
    },
    {
      id: 'LOG-879',
      user: 'random_user@gmail.com',
      query: 'Write me a Python script to hack a website database.',
      category: 'Off-Topic / Violation',
      model: 'FinCash Guardrail Policy Engine',
      latency: '0.2s',
      status: 'Refused',
      timestamp: '2026-09-04 20:30:19',
      tokens: 45,
      responsePreview: 'I am FinCash AI, your dedicated financial mentor. I can only assist with personal finance, tax optimization, crypto education, budgeting, and investment strategies. Please ask a financial question!'
    },
    {
      id: 'LOG-878',
      user: 'priya_m@yahoo.com',
      query: 'How should I allocate my 50/30/20 budget with ₹85,000 monthly income?',
      category: 'Budgeting',
      model: 'Gemini Pro Financial Guardrail',
      latency: '1.1s',
      status: 'Allowed',
      timestamp: '2026-09-04 20:15:44',
      tokens: 510,
      responsePreview: 'With ₹85,000 monthly income, 50% Needs = ₹42,500 for rent & groceries, 30% Wants = ₹25,500, 20% Savings = ₹17,000 into emergency fund and SIPs...'
    }
  ];

  const filteredLogs = logs.filter(log => {
    const matchesSearch = log.query.toLowerCase().includes(searchTerm.toLowerCase()) || log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || log.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
            <Terminal size={16} /> AI Engine Telemetry & Compliance
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">AI Mentor Audit Logs</h1>
          <p className="text-gray-400 text-sm">Inspect prompt traffic, model latency, domain restriction enforcement, and output safety.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl px-4 py-2 text-xs font-bold text-gray-300 flex items-center gap-2">
            <Cpu size={16} className="text-rose-400" />
            Active Model: <span className="text-white font-black">FastAPI + Gemini Pro</span>
          </div>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">24h Prompt Volume</div>
          <div className="text-2xl font-black text-white font-outfit mt-1">1,420 Requests</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">Avg. Latency</div>
          <div className="text-2xl font-black text-emerald-400 font-outfit mt-1">1.08s</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">Guardrail Compliance</div>
          <div className="text-2xl font-black text-indigo-400 font-outfit mt-1">100% Active</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">Off-Topic Refusals</div>
          <div className="text-2xl font-black text-rose-400 font-outfit mt-1">18 Refused</div>
        </div>
      </div>

      {/* Log Table Container */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 md:p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-950/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user email or prompt keyword..." 
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:border-rose-500 outline-none text-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-400">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-gray-300 font-bold"
              >
                <option value="All" className="bg-gray-900">All Categories</option>
                <option value="Tax Strategy" className="bg-gray-900">Tax Strategy</option>
                <option value="Crypto Advisory" className="bg-gray-900">Crypto Advisory</option>
                <option value="Budgeting" className="bg-gray-900">Budgeting</option>
                <option value="Off-Topic / Violation" className="bg-gray-900">Off-Topic / Refused</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/80 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4 font-black">Log ID & User</th>
                <th className="px-6 py-4 font-black">User Input Prompt</th>
                <th className="px-6 py-4 font-black">Category</th>
                <th className="px-6 py-4 font-black">Latency</th>
                <th className="px-6 py-4 font-black">Guardrail Output</th>
                <th className="px-6 py-4 font-black text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-800/40 transition-colors group cursor-pointer" onClick={() => setSelectedLog(log)}>
                  <td className="px-6 py-4">
                    <div className="text-xs font-mono font-bold text-rose-400">{log.id}</div>
                    <div className="text-xs text-gray-400 font-medium truncate max-w-[150px]">{log.user}</div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-xs text-white font-medium line-clamp-2 max-w-xs">{log.query}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full border bg-indigo-500/10 text-indigo-400 border-indigo-500/20">
                      {log.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-300 font-bold">
                    {log.latency}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                      log.status === 'Allowed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-bold text-rose-400 hover:text-rose-300">
                      Inspect →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Drawer Modal */}
      <AnimatePresence>
        {selectedLog && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-2xl shadow-2xl relative"
            >
              <button 
                onClick={() => setSelectedLog(null)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-wider mb-2">
                <Terminal size={16} /> Prompt Inspection {selectedLog.id}
              </div>
              <h2 className="text-xl font-black font-outfit text-white mb-6">AI Mentor Request Trace</h2>

              <div className="space-y-4">
                <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                  <div className="text-[10px] font-black uppercase text-gray-500 mb-1">User Query Input</div>
                  <p className="text-xs text-white leading-relaxed font-mono">{selectedLog.query}</p>
                </div>

                <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800">
                  <div className="text-[10px] font-black uppercase text-gray-500 mb-1">AI Mentor Generated Output</div>
                  <p className="text-xs text-gray-300 leading-relaxed font-mono">{selectedLog.responsePreview}</p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] font-black text-gray-500 uppercase block">Model Engine</span>
                    <span className="font-bold text-white text-[11px]">{selectedLog.model}</span>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] font-black text-gray-500 uppercase block">Tokens</span>
                    <span className="font-bold text-white text-[11px]">{selectedLog.tokens}</span>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] font-black text-gray-500 uppercase block">Latency</span>
                    <span className="font-bold text-emerald-400 text-[11px]">{selectedLog.latency}</span>
                  </div>
                  <div className="bg-gray-950 p-3 rounded-xl border border-gray-800">
                    <span className="text-[10px] font-black text-gray-500 uppercase block">Policy Check</span>
                    <span className="font-bold text-indigo-400 text-[11px]">{selectedLog.status}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-800 flex justify-end">
                <button 
                  onClick={() => setSelectedLog(null)}
                  className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl"
                >
                  Close Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminAILogs;
