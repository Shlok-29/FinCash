import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, DollarSign, Activity, Zap, Download } from 'lucide-react';
import jsPDF from 'jspdf';

const AdminAnalytics = () => {
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(244, 63, 94);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('FinCash Platform Telemetry Report', 14, 25);
    
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

    doc.save(`FinCash_Platform_Analytics_${Date.now()}.pdf`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
            <BarChart3 size={16} /> Executive Platform Telemetry
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Platform Analytics</h1>
          <p className="text-gray-400 text-sm">Deep-dive retention cohorts, query throughput, and revenue conversion metrics.</p>
        </div>

        <button 
          onClick={handleExportPDF}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 rounded-xl text-xs font-black text-white hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20"
        >
          <Download size={16} /> Export Telemetry PDF
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'DAU / MAU Ratio', val: '64.2%', change: '+3.1%' },
          { label: 'Average Session Duration', val: '14m 20s', change: '+1m 10s' },
          { label: 'AI Resolution Rate', val: '94.8%', change: '+0.5%' },
          { label: 'Monthly Churn', val: '1.2%', change: '-0.4%' }
        ].map((item, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-xl">
            <span className="text-[10px] text-gray-500 font-black uppercase tracking-wider block mb-2">{item.label}</span>
            <div className="text-3xl font-black text-white font-outfit">{item.val}</div>
            <span className="text-xs text-emerald-400 font-bold mt-2 block">{item.change} vs last month</span>
          </div>
        ))}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <h3 className="text-lg font-bold text-white mb-6">Cohort Retention Velocity</h3>
        <div className="h-64 flex items-end justify-between gap-3 px-2">
          {[40, 55, 70, 65, 82, 95, 88, 92].map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
              <div className="w-full relative flex items-end justify-center h-48">
                <div style={{ height: `${h}%` }} className="w-full bg-gradient-to-t from-rose-600 via-rose-500 to-amber-400 rounded-t-xl group-hover:brightness-125 transition-all cursor-pointer relative" />
              </div>
              <span className="text-[10px] font-black text-gray-500 uppercase">W{i+1}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AdminAnalytics;
