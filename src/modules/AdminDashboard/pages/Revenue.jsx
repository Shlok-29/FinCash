import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DollarSign, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Filter, Download, CreditCard, ShieldCheck } from 'lucide-react';
import jsPDF from 'jspdf';

const AdminRevenue = () => {
  const [filterPeriod, setFilterPeriod] = useState('6M');

  const stats = [
    { label: 'Total Platform Revenue', value: '₹12,45,000', change: '+12.5%', trend: 'up', icon: <DollarSign className="text-emerald-400" /> },
    { label: 'Avg. Consultation Fee', value: '₹4,999', change: '+3.2%', trend: 'up', icon: <TrendingUp className="text-indigo-400" /> },
    { label: 'Paying Subscribers', value: '8,432', change: '+8.4%', trend: 'up', icon: <Users className="text-amber-400" /> },
  ];

  const transactions = [
    { id: 'TXN-9402', user: 'Rahul Sharma', amount: '₹4,999', date: '2024-04-24', status: 'Completed', method: 'Razorpay UPI' },
    { id: 'TXN-9401', user: 'Priya Patel', amount: '₹9,999', date: '2024-04-24', status: 'Completed', method: 'Razorpay Card' },
    { id: 'TXN-9399', user: 'Amit Verma', amount: '₹4,999', date: '2024-04-23', status: 'Pending', method: 'Net Banking' },
    { id: 'TXN-9398', user: 'Sneha Gupta', amount: '₹14,999', date: '2024-04-23', status: 'Completed', method: 'Razorpay UPI' },
    { id: 'TXN-9397', user: 'Vikram Singh', amount: '₹4,999', date: '2024-04-22', status: 'Failed', method: 'Card' },
  ];

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 40, 'F');
    doc.setTextColor(244, 63, 94);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('FinCash Financial & Revenue Report', 14, 25);
    
    doc.setTextColor(148, 163, 184);
    doc.setFontSize(10);
    doc.text(`Generated: ${new Date().toLocaleString()}`, 14, 34);

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Revenue Summary', 14, 55);

    let y = 65;
    stats.forEach(s => {
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.text(s.label, 14, y);
      doc.setFont('helvetica', 'bold');
      doc.text(s.value, 120, y);
      y += 8;
    });

    doc.save(`FinCash_Revenue_Report_${Date.now()}.pdf`);
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
            <DollarSign size={16} /> Financial Analytics & Monitization
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Revenue Insights</h1>
          <p className="text-gray-400 text-sm">Monitor platform subscription earnings, consultation payouts, and Razorpay transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 rounded-xl text-xs font-black text-white hover:bg-rose-500 transition-all shadow-lg shadow-rose-600/20"
          >
            <Download size={16} />
            Export Revenue Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 relative overflow-hidden group shadow-xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-950 flex items-center justify-center border border-gray-800">
                {stat.icon}
              </div>
              <span className="text-gray-400 text-xs font-black uppercase tracking-wider">{stat.label}</span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-3xl font-black text-white font-outfit">{stat.value}</span>
              <span className={`flex items-center text-xs font-extrabold px-2.5 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
              }`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-white">Monthly Platform Gross Earnings</h2>
              <p className="text-xs text-gray-400">Subscription and consultation fee trajectory</p>
            </div>
            <div className="flex gap-2">
              {['3M', '6M', '1Y'].map(p => (
                <button 
                  key={p} 
                  onClick={() => setFilterPeriod(p)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${filterPeriod === p ? 'bg-rose-600 text-white' : 'bg-gray-800 text-gray-400'}`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 px-2">
            {[45, 62, 58, 85, 72, 94].map((height, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3 group">
                <div className="w-full relative flex items-end justify-center h-48">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${height}%` }}
                    transition={{ delay: i * 0.1, duration: 0.8 }}
                    className="w-full bg-gradient-to-t from-rose-600/30 via-rose-500 to-amber-400 rounded-t-xl group-hover:brightness-125 transition-all cursor-pointer relative"
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-950 text-rose-400 text-[10px] font-black px-2 py-1 rounded-lg border border-rose-500/30 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
                      ₹{height * 15}k
                    </div>
                  </motion.div>
                </div>
                <span className="text-[10px] font-black text-gray-500 uppercase">
                  {['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h2 className="text-lg font-bold text-white mb-6">Revenue Stream Breakdown</h2>
            <div className="space-y-6">
              {[
                { label: 'Pro Subscriptions', value: 65, color: 'bg-rose-500' },
                { label: 'Human Mentor 1-on-1 Sessions', value: 25, color: 'bg-indigo-500' },
                { label: 'Ad & Partner Placements', value: 10, color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-white">{item.value}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      className={`h-full ${item.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-gray-950 border border-gray-800 flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
            <p className="text-xs text-gray-400 leading-relaxed">
              <span className="text-emerald-400 font-bold">Razorpay Integration:</span> All webhook transactions verified and synced to ledger.
            </p>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex items-center justify-between bg-gray-950/40">
          <h2 className="text-lg font-bold text-white">Recent Payment Transactions</h2>
          <span className="text-xs text-gray-500 font-bold">Real-time Webhook Feed</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/80 text-[10px] font-black text-gray-400 uppercase tracking-wider border-b border-gray-800">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Method</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Timestamp</th>
                <th className="px-6 py-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {transactions.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4 text-xs font-mono text-gray-400">{txn.id}</td>
                  <td className="px-6 py-4 text-xs font-bold text-white">{txn.user}</td>
                  <td className="px-6 py-4 text-xs text-gray-400 flex items-center gap-1.5">
                    <CreditCard size={14} className="text-gray-500" />
                    {txn.method}
                  </td>
                  <td className="px-6 py-4 text-xs font-extrabold text-white">{txn.amount}</td>
                  <td className="px-6 py-4 text-xs text-gray-400">{txn.date}</td>
                  <td className="px-6 py-4 text-right">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter border ${
                      txn.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                      txn.status === 'Pending' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                      'bg-rose-500/10 text-rose-400 border-rose-500/20'
                    }`}>
                      {txn.status}
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

export default AdminRevenue;
