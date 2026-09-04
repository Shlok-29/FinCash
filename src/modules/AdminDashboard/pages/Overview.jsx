import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, UserSquare2, GraduationCap, DollarSign, ArrowUpRight, ArrowDownRight, 
  Activity, ShieldCheck, Download, RefreshCw, Zap, Server, AlertTriangle, FileText
} from 'lucide-react';
import jsPDF from 'jspdf';

const AdminOverview = () => {
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 800);
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(244, 63, 94);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('FinCash Platform Audit Overview', 14, 25);
    
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, 14, 34);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Core Executive Metrics', 14, 55);

    const metrics = [
      ['Total Active Users', '12,842 (+12%)'],
      ['Platform Employees', '42 Active Staff'],
      ['Verified Mentors', '156 Mentors'],
      ['Monthly Recurring Revenue', 'INR 45,210 (+18%)'],
      ['System Health Index', '99.98% Uptime']
    ];

    let y = 65;
    metrics.forEach(([label, val]) => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(label, 14, y);
      doc.setFont('helvetica', 'bold');
      doc.text(val, 120, y);
      y += 8;
    });

    doc.save(`FinCash_Admin_Overview_${Date.now()}.pdf`);
  };

  const stats = [
    { name: 'Total Users', value: '12,842', change: '+12.4%', trend: 'up', icon: <Users className="text-rose-400" size={24} />, bg: 'from-rose-500/10 to-rose-600/5', border: 'border-rose-500/20' },
    { name: 'Employees', value: '42', change: '+2 new', trend: 'up', icon: <UserSquare2 className="text-emerald-400" size={24} />, bg: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20' },
    { name: 'Active Mentors', value: '156', change: '+8 verified', trend: 'up', icon: <GraduationCap className="text-indigo-400" size={24} />, bg: 'from-indigo-500/10 to-indigo-600/5', border: 'border-indigo-500/20' },
    { name: 'MRR', value: '₹45,210', change: '+18.2%', trend: 'up', icon: <DollarSign className="text-amber-400" size={24} />, bg: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/20' },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-rose-950/40 via-gray-900 to-indigo-950/40 p-8 border border-white/10 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-2">
              <ShieldCheck size={16} /> Executive Command Center
            </div>
            <h1 className="text-3xl md:text-4xl font-black font-outfit text-white">Admin Overview</h1>
            <p className="text-gray-400 text-sm mt-1 max-w-xl">
              Real-time platform telemetry, user growth velocity, ecosystem revenue, and system security operations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleRefresh}
              className={`p-3 bg-gray-900 border border-gray-800 rounded-xl text-gray-400 hover:text-white transition-all ${refreshing ? 'animate-spin' : ''}`}
            >
              <RefreshCw size={18} />
            </button>
            <button 
              onClick={handleExportPDF}
              className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-rose-600/20"
            >
              <Download size={18} />
              Export Overview PDF
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <motion.div 
            key={idx} 
            whileHover={{ y: -4 }}
            className={`bg-gradient-to-b ${stat.bg} bg-gray-900/90 border ${stat.border} p-6 rounded-2xl shadow-xl backdrop-blur-sm relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-gray-950/80 rounded-xl border border-white/5 group-hover:scale-110 transition-transform">
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-xs font-extrabold px-2.5 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <div className="text-3xl font-black text-white font-outfit mb-1">{stat.value}</div>
            <div className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{stat.name}</div>
          </motion.div>
        ))}
      </div>

      {/* Analytics Chart & Telemetry Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main User Growth Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-bold text-lg text-white">Platform User Growth Trajectory</h3>
              <p className="text-xs text-gray-400">Daily active user acquisition over time</p>
            </div>
            <div className="flex gap-2">
              {['7d', '30d', '90d'].map((range) => (
                <button 
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${timeRange === range ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'bg-gray-800 text-gray-400 hover:text-white'}`}
                >
                  {range.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 flex items-end gap-3 px-2 min-h-[260px] pt-6">
            {[45, 65, 52, 80, 70, 95, 60, 88, 100, 82, 90, 110].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                <div className="w-full relative flex items-end justify-center h-52">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${(h / 110) * 100}%` }}
                    transition={{ delay: i * 0.05, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-rose-600/20 via-rose-500 to-amber-400 rounded-t-xl group-hover:brightness-125 transition-all cursor-pointer relative"
                  >
                    <div className="absolute -top-9 left-1/2 -translate-x-1/2 bg-gray-950 text-rose-400 border border-rose-500/30 text-[10px] font-black px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl z-20">
                      {h * 120} Users
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-extrabold text-gray-500 uppercase">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* System Health Telemetry */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-white">System Telemetry</h3>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-2.5 py-1 rounded-full uppercase">Optimal</span>
          </div>

          <div className="space-y-5 flex-1">
            {[
              { name: 'Express API Gateway', status: '99.99%', icon: <Server size={16} className="text-emerald-400" />, load: '18%' },
              { name: 'FastAPI AI Engine', status: '99.94%', icon: <Zap size={16} className="text-indigo-400" />, load: '24%' },
              { name: 'MongoDB Cluster', status: '100.0%', icon: <Activity size={16} className="text-rose-400" />, load: '32%' },
              { name: 'Razorpay Gateway', status: 'Operational', icon: <ShieldCheck size={16} className="text-amber-400" />, load: '0% Err' },
            ].map((sys, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-950/70 border border-gray-800/80 hover:border-gray-700 transition-all">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-2.5">
                    {sys.icon}
                    <span className="text-xs font-bold text-gray-200">{sys.name}</span>
                  </div>
                  <span className="text-xs font-extrabold text-emerald-400">{sys.status}</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-rose-500 to-emerald-400 h-full rounded-full" style={{ width: sys.load.includes('%') ? sys.load : '85%' }} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-rose-500/5 border border-rose-500/10 flex items-center gap-3">
            <AlertTriangle size={18} className="text-amber-400 shrink-0" />
            <p className="text-xs text-gray-400 leading-tight">
              <span className="font-bold text-amber-400">Notice:</span> Scheduled database index optimization runs at 02:00 UTC tonight.
            </p>
          </div>
        </div>
      </div>

      {/* Platform Events & Quick Actions */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Audit Log Stream */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-lg text-white">Live Platform Events Stream</h3>
            <span className="text-xs text-gray-400 font-bold">Real-Time Sync</span>
          </div>

          <div className="space-y-4">
            {[
              { type: 'Security', title: 'Admin login detected', details: 'User admin@fincash.com logged in via Web Portal', time: 'Just now', color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10' },
              { type: 'User', title: 'New registration', details: 'User shlokdubey2903@gmail.com completed onboarding', time: '12m ago', color: 'border-rose-500 text-rose-400 bg-rose-500/10' },
              { type: 'AI Mentor', title: 'High prompt volume', details: 'AI Mentor processed 140 tax optimization queries', time: '45m ago', color: 'border-indigo-500 text-indigo-400 bg-indigo-500/10' },
              { type: 'Billing', title: 'Subscription payout', details: 'Mentor consultation payout processed (₹4,999)', time: '2h ago', color: 'border-amber-500 text-amber-400 bg-amber-500/10' },
            ].map((event, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800/80 flex items-start gap-4 hover:border-gray-700 transition-all">
                <span className={`text-[10px] font-black uppercase px-2.5 py-1 rounded-lg border ${event.color} shrink-0`}>
                  {event.type}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className="text-xs font-bold text-white truncate">{event.title}</h4>
                    <span className="text-[10px] text-gray-500 font-medium whitespace-nowrap">{event.time}</span>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{event.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Management Shortcuts */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Quick Shortcuts</h3>
            <div className="space-y-3">
              <a href="/admin/users" className="flex items-center justify-between p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-rose-500/40 text-xs font-bold text-gray-200 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <Users size={16} className="text-rose-400" />
                  <span>User Account Permissions</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-500 group-hover:text-rose-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a href="/admin/employees" className="flex items-center justify-between p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-emerald-500/40 text-xs font-bold text-gray-200 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <UserSquare2 size={16} className="text-emerald-400" />
                  <span>Support Team Roster</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all" />
              </a>

              <a href="/admin/ai-logs" className="flex items-center justify-between p-4 rounded-2xl bg-gray-950/70 border border-gray-800 hover:border-indigo-500/40 text-xs font-bold text-gray-200 hover:text-white transition-all group">
                <div className="flex items-center gap-3">
                  <FileText size={16} className="text-indigo-400" />
                  <span>Inspect AI Response Audit</span>
                </div>
                <ArrowUpRight size={14} className="text-gray-500 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-2xl bg-gray-950 border border-gray-800 text-center">
            <span className="text-[10px] text-gray-500 font-extrabold uppercase tracking-widest block mb-1">FinCash Build Version</span>
            <span className="text-xs font-mono font-bold text-rose-400">v2.4.0-Production</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminOverview;
