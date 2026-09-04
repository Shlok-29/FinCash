import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileStack, Download, FileText, Calendar, CheckCircle2, RefreshCw, BarChart2, Filter } from 'lucide-react';
import jsPDF from 'jspdf';

const AdminReports = () => {
  const [downloading, setDownloading] = useState(null);

  const reportTypes = [
    {
      id: 'exec',
      title: 'Executive Platform Audit',
      description: 'Comprehensive platform overview including MRR, active user counts, employee ticket resolution, and AI response metrics.',
      format: 'PDF / CSV',
      lastGenerated: 'Today, 18:30',
      badge: 'Executive',
      color: 'from-rose-500/10 to-rose-600/5 border-rose-500/20 text-rose-400'
    },
    {
      id: 'financial',
      title: 'Monthly Financial & Revenue Ledger',
      description: 'Itemized transaction breakdown, subscription revenue sources, consultation fee payouts, and Razorpay logs.',
      format: 'PDF',
      lastGenerated: 'Yesterday, 23:59',
      badge: 'Finance',
      color: 'from-amber-500/10 to-amber-600/5 border-amber-500/20 text-amber-400'
    },
    {
      id: 'user_growth',
      title: 'User Acquisition & Profile Roster',
      description: 'Demographic breakdown, financial setup ratios, active session frequency, and user governance permissions.',
      format: 'PDF / CSV',
      lastGenerated: '3 days ago',
      badge: 'Governance',
      color: 'from-emerald-500/10 to-emerald-600/5 border-emerald-500/20 text-emerald-400'
    },
    {
      id: 'ai_compliance',
      title: 'AI Mentor Safety & Compliance Log',
      description: 'Detailed analysis of AI prompt traffic, guardrail domain enforcement, response latency, and off-topic refusals.',
      format: 'PDF',
      lastGenerated: 'Weekly Auto-Report',
      badge: 'AI Safety',
      color: 'from-indigo-500/10 to-indigo-600/5 border-indigo-500/20 text-indigo-400'
    }
  ];

  const generateReportPDF = (typeId, title) => {
    setDownloading(typeId);

    setTimeout(() => {
      const doc = new jsPDF();
      doc.setFillColor(15, 23, 42);
      doc.rect(0, 0, 210, 40, 'F');
      doc.setTextColor(244, 63, 94);
      doc.setFontSize(22);
      doc.setFont('helvetica', 'bold');
      doc.text(`FinCash: ${title}`, 14, 25);

      doc.setTextColor(148, 163, 184);
      doc.setFontSize(10);
      doc.text(`Official Audit Document | Generated: ${new Date().toLocaleString()}`, 14, 34);

      doc.setTextColor(15, 23, 42);
      doc.setFontSize(14);
      doc.setFont('helvetica', 'bold');
      doc.text('Key Telemetry & Findings', 14, 55);

      const items = [
        ['Platform Uptime', '99.98% High Availability'],
        ['Total Registered Users', '12,842 Users'],
        ['Monthly Recurring Revenue', 'INR 45,210'],
        ['Verified Advisors & Staff', '198 Active Personnel'],
        ['AI Prompt Guardrail Rating', '100% Policy Compliant']
      ];

      let y = 68;
      items.forEach(([k, v]) => {
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(k, 14, y);
        doc.setFont('helvetica', 'bold');
        doc.text(v, 120, y);
        y += 9;
      });

      doc.save(`FinCash_${typeId}_Report_${Date.now()}.pdf`);
      setDownloading(null);
    }, 600);
  };

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
            <FileStack size={16} /> Reporting & Intelligence Engine
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Platform Reports Center</h1>
          <p className="text-gray-400 text-sm">Generate and download official PDF audit reports, telemetry summaries, and financial ledgers.</p>
        </div>
      </div>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportTypes.map((rep) => (
          <div 
            key={rep.id} 
            className={`bg-gradient-to-b ${rep.color} bg-gray-900/90 border rounded-3xl p-6 shadow-2xl flex flex-col justify-between relative overflow-hidden group`}
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="text-[10px] font-black uppercase px-3 py-1 rounded-full border bg-gray-950/80">
                  {rep.badge}
                </span>
                <span className="text-xs font-mono font-bold text-gray-400">{rep.format}</span>
              </div>
              <h3 className="text-xl font-black font-outfit text-white mb-2">{rep.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed mb-6">{rep.description}</p>
            </div>

            <div className="pt-4 border-t border-gray-800 flex items-center justify-between">
              <span className="text-[10px] text-gray-500 font-bold uppercase">
                Last Run: {rep.lastGenerated}
              </span>

              <button 
                onClick={() => generateReportPDF(rep.id, rep.title)}
                disabled={downloading === rep.id}
                className="flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-rose-600/20 disabled:opacity-50"
              >
                {downloading === rep.id ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download size={14} />
                    Download PDF
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Auto-Schedule Banner */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0">
            <Calendar size={24} />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Automated Weekly Email Dispatch</h4>
            <p className="text-xs text-gray-400">Receive automated executive summaries delivered directly to admin@fincash.com every Monday at 08:00 AM.</p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-gray-950 hover:bg-gray-800 border border-gray-800 rounded-xl text-xs font-bold text-gray-300 transition-all shrink-0">
          Configure Schedule
        </button>
      </div>
    </motion.div>
  );
};

export default AdminReports;
