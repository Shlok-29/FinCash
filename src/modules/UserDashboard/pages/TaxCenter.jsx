import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Calculator, AlertTriangle, ShieldCheck, Sparkles, HelpCircle, CheckCircle2, TrendingDown } from 'lucide-react';

const TaxCenter = () => {
  const [income, setIncome] = useState(850000);
  const [regime, setRegime] = useState('new'); // 'new' or 'old'

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState(150000);
  const [sec80D, setSec80D] = useState(25000);
  const [sec80CCD, setSec80CCD] = useState(50000);
  const [otherDeductions, setOtherDeductions] = useState(0);

  // New Regime Standard Deduction = ₹75,000 (FY 2024-25)
  // Old Regime Standard Deduction = ₹50,000
  const standardDeduction = regime === 'new' ? 75000 : 50000;
  
  const totalOldDeductions = Math.min(150000, Number(sec80C)) + Math.min(25000, Number(sec80D)) + Math.min(50000, Number(sec80CCD)) + Number(otherDeductions) + 50000;
  
  const taxableIncomeNew = Math.max(0, income - 75000);
  const taxableIncomeOld = Math.max(0, income - totalOldDeductions);

  const calculateNewRegimeTax = (taxable) => {
    if (taxable <= 0) return 0;
    let tax = 0;
    // Slabs:
    // 0 - 3L: 0%
    // 3L - 6L: 5%
    // 6L - 9L: 10%
    // 9L - 12L: 15%
    // 12L - 15L: 20%
    // Above 15L: 30%
    if (taxable > 300000) tax += Math.min(taxable - 300000, 300000) * 0.05;
    if (taxable > 600000) tax += Math.min(taxable - 600000, 300000) * 0.10;
    if (taxable > 900000) tax += Math.min(taxable - 900000, 300000) * 0.15;
    if (taxable > 1200000) tax += Math.min(taxable - 1200000, 300000) * 0.20;
    if (taxable > 1500000) tax += (taxable - 1500000) * 0.30;

    // Section 87A Rebate: Income up to 7L after SD gets full tax rebate
    if (taxable <= 700000) {
      tax = 0;
    }

    return tax;
  };

  const calculateOldRegimeTax = (taxable) => {
    if (taxable <= 0) return 0;
    let tax = 0;
    // Slabs:
    // 0 - 2.5L: 0%
    // 2.5L - 5L: 5%
    // 5L - 10L: 20%
    // Above 10L: 30%
    if (taxable > 250000) tax += Math.min(taxable - 250000, 250000) * 0.05;
    if (taxable > 500000) tax += Math.min(taxable - 500000, 500000) * 0.20;
    if (taxable > 1000000) tax += (taxable - 1000000) * 0.30;

    // Section 87A Rebate under Old Regime: Taxable income up to 5L gets full rebate (up to 12.5k)
    if (taxable <= 500000) {
      tax = 0;
    }

    return tax;
  };

  const baseTaxNew = calculateNewRegimeTax(taxableIncomeNew);
  const baseTaxOld = calculateOldRegimeTax(taxableIncomeOld);

  const totalTaxNew = Math.round(baseTaxNew * 1.04); // 4% Cess
  const totalTaxOld = Math.round(baseTaxOld * 1.04); // 4% Cess

  const activeTax = regime === 'new' ? totalTaxNew : totalTaxOld;
  const activeTaxable = regime === 'new' ? taxableIncomeNew : taxableIncomeOld;
  const effectiveRate = income > 0 ? (activeTax / income) * 100 : 0;
  const savingsVersusOther = regime === 'new' ? (totalTaxOld - totalTaxNew) : (totalTaxNew - totalTaxOld);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-widest mb-1">
            <FileText size={16} /> Indian Income Tax Calculator (FY 2024-25)
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-white">Tax Center</h1>
          <p className="text-gray-400 text-sm">Compare Old vs. New Tax Regimes, claim Section 80C/80D deductions, and optimize your net pay.</p>
        </div>

        <div className="flex bg-slate-900 p-1.5 rounded-2xl border border-gray-800">
          <button 
            onClick={() => setRegime('new')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              regime === 'new' ? 'bg-amber-500 text-slate-950 shadow-lg font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            New Tax Regime (FY25)
          </button>
          <button 
            onClick={() => setRegime('old')}
            className={`px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              regime === 'old' ? 'bg-amber-500 text-slate-950 shadow-lg font-bold' : 'text-gray-400 hover:text-white'
            }`}
          >
            Old Tax Regime (With 80C)
          </button>
        </div>
      </div>

      {/* Comparison Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-gray-900 to-indigo-950/40 border border-amber-500/20 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shrink-0">
            <Sparkles size={28} />
          </div>
          <div>
            <span className="text-xs text-amber-400 font-extrabold uppercase tracking-widest block">AI Tax Advisor Analysis</span>
            <h3 className="text-xl font-bold text-white mt-0.5">
              {totalTaxNew < totalTaxOld 
                ? `New Regime saves you ₹${(totalTaxOld - totalTaxNew).toLocaleString()} per year!` 
                : totalTaxOld < totalTaxNew 
                ? `Old Regime saves you ₹${(totalTaxNew - totalTaxOld).toLocaleString()} with 80C & 80D deductions!` 
                : "Both regimes yield equal tax liability for your current income."}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-gray-950/70 p-4 rounded-2xl border border-white/5 shrink-0">
          <div className="text-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">New Regime Tax</span>
            <span className="text-lg font-black text-emerald-400">₹{totalTaxNew.toLocaleString()}</span>
          </div>
          <div className="w-px h-8 bg-gray-800" />
          <div className="text-center">
            <span className="text-[10px] text-gray-500 font-bold uppercase block">Old Regime Tax</span>
            <span className="text-lg font-black text-indigo-400">₹{totalTaxOld.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Form */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-800 pb-4">
            <div className="flex items-center gap-2 text-lg font-bold text-white font-outfit">
              <Calculator className="text-amber-400" /> Annual Gross Salary & Deductions
            </div>
            <span className="text-xs text-gray-500 font-bold uppercase">Standard Deduction: ₹{standardDeduction.toLocaleString()}</span>
          </div>

          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Gross Annual Salary / Income (₹)</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-black">₹</span>
              <input 
                type="number" 
                value={income}
                onChange={(e) => setIncome(Number(e.target.value))}
                className="w-full bg-gray-950 border border-gray-700 rounded-2xl py-4 pl-10 pr-4 text-white focus:outline-none focus:border-amber-500 transition-colors text-xl font-bold font-mono"
              />
            </div>
          </div>

          {regime === 'old' && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="space-y-4 pt-4 border-t border-gray-800"
            >
              <h4 className="text-xs font-black uppercase tracking-wider text-amber-400">Claim Deductions (Old Regime)</h4>

              <div>
                <label className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Section 80C (ELSS, PPF, EPF, LIC)</span>
                  <span className="text-amber-400">Max ₹1,50,000</span>
                </label>
                <input 
                  type="number" 
                  value={sec80C}
                  onChange={(e) => setSec80C(Number(e.target.value))}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-white font-mono text-sm focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Section 80D (Health Insurance Premium)</span>
                  <span className="text-amber-400">Max ₹25,000</span>
                </label>
                <input 
                  type="number" 
                  value={sec80D}
                  onChange={(e) => setSec80D(Number(e.target.value))}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-white font-mono text-sm focus:border-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="flex justify-between text-xs font-semibold text-gray-300 mb-1">
                  <span>Section 80CCD(1B) (Additional NPS Benefit)</span>
                  <span className="text-amber-400">Max ₹50,000</span>
                </label>
                <input 
                  type="number" 
                  value={sec80CCD}
                  onChange={(e) => setSec80CCD(Number(e.target.value))}
                  className="w-full bg-gray-950 border border-gray-800 rounded-xl py-3 px-4 text-white font-mono text-sm focus:border-amber-500 outline-none"
                />
              </div>
            </motion.div>
          )}

          {regime === 'new' && (
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-xs text-amber-200 leading-relaxed">
              <span className="font-bold text-amber-400">New Tax Regime Highlights:</span> Lower tax slab rates with a flat ₹75,000 standard deduction. No manual receipt filing required under Section 80C or 80D.
            </div>
          )}
        </div>

        {/* Results Card */}
        <div className="bg-slate-900 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
          <div>
            <div className="flex justify-between items-center mb-6">
              <span className="text-xs text-gray-400 font-black uppercase tracking-widest">
                Selected Mode: <span className="text-amber-400">{regime.toUpperCase()} REGIME</span>
              </span>
              <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-black px-3 py-1 rounded-full uppercase">
                FY 2024-25 Active
              </span>
            </div>

            <div className="text-center py-6 border-b border-gray-800">
              <span className="text-xs text-gray-400 uppercase tracking-widest font-extrabold block mb-2">Estimated Net Tax Liability (Inc. 4% Cess)</span>
              <div className="text-5xl md:text-6xl font-black text-white font-mono tracking-tighter">
                ₹{activeTax.toLocaleString()}
              </div>
              <p className="text-xs text-gray-500 font-bold mt-2">
                Monthly Tax Deducted at Source (TDS): <span className="text-gray-300 font-mono font-bold">₹{Math.round(activeTax / 12).toLocaleString()} / mo</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 text-center">
                <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Taxable Income</span>
                <span className="text-lg font-black text-white font-mono">₹{activeTaxable.toLocaleString()}</span>
              </div>
              <div className="bg-gray-950 p-4 rounded-2xl border border-gray-800 text-center">
                <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">Effective Tax Rate</span>
                <span className="text-lg font-black text-amber-400">{effectiveRate.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center gap-3">
            <ShieldCheck size={20} className="text-indigo-400 shrink-0" />
            <p className="text-xs text-indigo-200 leading-relaxed">
              <span className="font-bold text-indigo-400">Pro Tip:</span> Investing ₹1.5 Lakh in ELSS Mutual Funds under Section 80C locks in wealth creation with a 3-year lock-in.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaxCenter;
