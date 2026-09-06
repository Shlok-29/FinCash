import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, PieChart, Activity, Download, Calendar, DollarSign, Award } from 'lucide-react';
import { useSelector } from 'react-redux';

const Analytics = () => {
  const { user } = useSelector((state) => state.auth);
  const [period, setPeriod] = useState('30d');

  const stats = [
    { label: 'Monthly Savings Rate', value: '32.4%', trend: '+4.1%', color: 'text-emerald-400' },
    { label: 'Budget Utilization', value: '68%', trend: '-2.5%', color: 'text-indigo-400' },
    { label: 'XP Learning Velocity', value: '450 XP/wk', trend: '+18%', color: 'text-amber-400' },
    { label: 'Tax Optimization Index', value: '92/100', trend: 'Optimal', color: 'text-purple-400' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">
            <BarChart3 size={16} /> Advanced Behavioral Telemetry
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-white">Financial Analytics</h1>
          <p className="text-gray-400 text-sm">Track your savings trajectory, net cash flow, and financial literacy growth velocity.</p>
        </div>

        <div className="flex bg-gray-900 p-1.5 rounded-2xl border border-gray-800">
          {['7d', '30d', '90d', '1Y'].map(p => (
            <button 
              key={p} 
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${period === p ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <div className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">{s.label}</div>
            <div className={`text-3xl font-black font-outfit ${s.color}`}>{s.value}</div>
            <div className="mt-2 text-xs font-extrabold text-gray-400">{s.trend} vs previous period</div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-white">Net Cash Flow Trajectory</h3>
              <p className="text-xs text-gray-400">Monthly breakdown of income vs savings</p>
            </div>
            <span className="text-xs text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
              Positive Cash Flow
            </span>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[55, 68, 62, 85, 74, 92].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative flex items-end justify-center h-48">
                  <div 
                    style={{ height: `${height}%` }}
                    className="w-full bg-gradient-to-t from-indigo-600 via-indigo-500 to-purple-400 rounded-t-xl group-hover:brightness-125 transition-all cursor-pointer relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-950 text-indigo-400 text-[10px] font-black px-2 py-1 rounded-lg border border-indigo-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                      ₹{height * 800} Saved
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase">
                  {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Category Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white mb-6">Spending Distribution</h3>
            <div className="space-y-6">
              {[
                { name: 'Housing & Utilities', percent: 45, color: 'bg-indigo-500' },
                { name: 'Food & Groceries', percent: 25, color: 'bg-emerald-500' },
                { name: 'Investments & SIPs', percent: 20, color: 'bg-amber-500' },
                { name: 'Entertainment', percent: 10, color: 'bg-purple-500' },
              ].map((c, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-300">{c.name}</span>
                    <span className="text-white">{c.percent}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                    <div className={`h-full ${c.color}`} style={{ width: `${c.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-1">Financial Fitness Score</span>
            <span className="text-2xl font-black text-indigo-400 font-outfit">850 / 900</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Analytics;
