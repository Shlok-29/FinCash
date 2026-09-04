import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../store/slices/authSlice';
import api from '../../../api/axios';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  User, Mail, IndianRupee, TrendingDown, 
  Target, Activity, TrendingUp, CreditCard, 
  ShoppingBag, Coffee, Home, Zap, Plus, X,
  Upload, Download, Camera, CheckCircle2, Trash2,
  Sparkles, DollarSign, Award, Flame, AlertCircle
} from 'lucide-react';

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  // Initial State from Redux / LocalStorage / Fallbacks
  const [profileData, setProfileData] = useState({
    name: user?.name || 'Shlok',
    email: user?.email || 'shlokdubey2903@gmail.com',
    avatar: user?.avatar || '',
    goal: user?.goal || 'Financial Independence',
    salary: user?.salary || 45000,
    savings: user?.savings || 23050,
  });

  const defaultExpenses = [
    { id: '1', name: 'Grocery Run', amount: 4500, category: 'Food', date: 'Today' },
    { id: '2', name: 'Electricity Bill', amount: 2100, category: 'Utilities', date: 'Yesterday' },
    { id: '3', name: 'Cafe Coffee Day', amount: 350, category: 'Leisure', date: '2 days ago' },
    { id: '4', name: 'Rent Payment', amount: 15000, category: 'Housing', date: '5 days ago' },
  ];

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem(`fincash_expenses_${user?.email || 'guest'}`);
    return saved ? JSON.parse(saved) : defaultExpenses;
  });

  // Modal States
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...profileData });
  const [avatarPreview, setAvatarPreview] = useState(profileData.avatar);
  const [newExpense, setNewExpense] = useState({ name: '', amount: '', category: 'Food', date: 'Today' });
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  // Sync state with Redux User changes
  useEffect(() => {
    if (user) {
      setProfileData({
        name: user.name || 'Shlok',
        email: user.email || 'shlokdubey2903@gmail.com',
        avatar: user.avatar || '',
        goal: user.goal || 'Financial Independence',
        salary: user.salary || 45000,
        savings: user.savings || 23050,
      });
      if (user.expenses && user.expenses.length > 0) {
        setExpenses(user.expenses);
      }
    }
  }, [user]);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem(`fincash_expenses_${user?.email || 'guest'}`, JSON.stringify(expenses));
  }, [expenses, user]);

  // Derived Calculations
  const totalExpenses = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const netSavings = profileData.salary - totalExpenses;
  const budgetUsagePercent = Math.min(100, Math.round((totalExpenses / (profileData.salary || 1)) * 100));

  // Category Icon & Color Mapping
  const getCategoryMeta = (category) => {
    switch (category?.toLowerCase()) {
      case 'food':
        return { icon: ShoppingBag, color: 'text-green-400', bg: 'bg-green-400/10' };
      case 'utilities':
        return { icon: Zap, color: 'text-yellow-400', bg: 'bg-yellow-400/10' };
      case 'leisure':
        return { icon: Coffee, color: 'text-orange-400', bg: 'bg-orange-400/10' };
      case 'housing':
        return { icon: Home, color: 'text-indigo-400', bg: 'bg-indigo-400/10' };
      default:
        return { icon: CreditCard, color: 'text-purple-400', bg: 'bg-purple-400/10' };
    }
  };

  // Avatar Presets
  const avatarPresets = [
    `https://api.dicebear.com/7.x/bottts/svg?seed=FinCash1`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=Shlok`,
    `https://api.dicebear.com/7.x/avataaars/svg?seed=FinancialAdvisor`,
    `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
    `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150`,
  ];

  // Image File Upload Handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Image size should be less than 2MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result);
        setEditForm(prev => ({ ...prev, avatar: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Add Expense Handler in Edit Modal
  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.name || !newExpense.amount) return;

    const item = {
      id: Date.now().toString(),
      name: newExpense.name,
      amount: Number(newExpense.amount),
      category: newExpense.category,
      date: newExpense.date || 'Today'
    };

    setExpenses(prev => [item, ...prev]);
    setNewExpense({ name: '', amount: '', category: 'Food', date: 'Today' });
  };

  // Remove Expense
  const handleRemoveExpense = (id) => {
    setExpenses(prev => prev.filter(item => item.id !== id));
  };

  // Save Profile Handler
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    try {
      const updated = {
        name: editForm.name,
        email: editForm.email,
        avatar: editForm.avatar || avatarPreview,
        goal: editForm.goal,
        salary: Number(editForm.salary),
        savings: Number(editForm.savings),
        expenses: expenses
      };

      // Dispatch to Redux
      dispatch(updateProfile(updated));
      setProfileData(updated);

      // Try updating backend API if logged in
      try {
        await api.put('/profile', updated);
      } catch (err) {
        console.log("Updated locally (offline mode or mock backend)");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 2500);
      setIsEditing(false);
    } catch (err) {
      console.error("Save profile error:", err);
    }
  };

  // PDF Activity Report Generator
  const handleGenerateReport = () => {
    setIsGeneratingPdf(true);
    try {
      const doc = new jsPDF({ unit: 'pt', format: 'a4' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // Brand Header Background
      doc.setFillColor(15, 23, 42); // slate-900
      doc.rect(0, 0, pageWidth, 100, 'F');

      // Decorative Accent Line
      doc.setFillColor(99, 102, 241); // indigo-500
      doc.rect(0, 96, pageWidth, 4, 'F');

      // Title & Header Text
      doc.setTextColor(255, 255, 255);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(22);
      doc.text('FinCash', 40, 45);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(165, 180, 252);
      doc.text('FINANCIAL LITERACY & ACTIVITY AUDIT REPORT', 40, 62);

      doc.setTextColor(226, 232, 240);
      doc.setFontSize(9);
      const todayStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      doc.text(`Generated: ${todayStr}`, pageWidth - 40, 45, { align: 'right' });
      doc.text(`Report ID: FC-${Math.floor(100000 + Math.random() * 900000)}`, pageWidth - 40, 62, { align: 'right' });

      // User Profile Summary Card
      doc.setFillColor(248, 250, 252);
      doc.setDrawColor(226, 232, 240);
      doc.roundedRect(40, 120, pageWidth - 80, 85, 8, 8, 'FD');

      doc.setTextColor(30, 41, 59);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(14);
      doc.text(`User Profile: ${profileData.name}`, 55, 145);

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(71, 85, 105);
      doc.text(`Email: ${profileData.email}`, 55, 165);
      doc.text(`Financial Goal: ${profileData.goal}`, 55, 185);

      doc.text(`Level: 1  |  XP: ${user?.xp || 1000}  |  Streak: ${user?.streak || 5} Days`, pageWidth - 55, 165, { align: 'right' });
      doc.text(`Account Status: Verified Active Member`, pageWidth - 55, 185, { align: 'right' });

      // Financial Metrics Summary Cards
      const cardY = 220;
      const cardWidth = (pageWidth - 80 - 30) / 3;

      // Monthly Income Card
      doc.setFillColor(240, 253, 244);
      doc.setDrawColor(187, 247, 208);
      doc.roundedRect(40, cardY, cardWidth, 55, 6, 6, 'FD');
      doc.setTextColor(22, 101, 52);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('MONTHLY INCOME', 50, cardY + 20);
      doc.setFontSize(14);
      doc.text(`Rs. ${profileData.salary.toLocaleString()}`, 50, cardY + 42);

      // Total Expenses Card
      doc.setFillColor(254, 242, 242);
      doc.setDrawColor(254, 202, 202);
      doc.roundedRect(40 + cardWidth + 15, cardY, cardWidth, 55, 6, 6, 'FD');
      doc.setTextColor(153, 27, 27);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('TOTAL EXPENSES', 50 + cardWidth + 15, cardY + 20);
      doc.setFontSize(14);
      doc.text(`Rs. ${totalExpenses.toLocaleString()}`, 50 + cardWidth + 15, cardY + 42);

      // Net Savings Card
      doc.setFillColor(238, 242, 255);
      doc.setDrawColor(199, 210, 254);
      doc.roundedRect(40 + (cardWidth * 2) + 30, cardY, cardWidth, 55, 6, 6, 'FD');
      doc.setTextColor(55, 48, 163);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'bold');
      doc.text('NET SAVINGS', 50 + (cardWidth * 2) + 30, cardY + 20);
      doc.setFontSize(14);
      doc.text(`Rs. ${netSavings.toLocaleString()}`, 50 + (cardWidth * 2) + 30, cardY + 42);

      // Section Header: Expense Audit Table
      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('ITEMIZED EXPENSE AUDIT LOG', 40, cardY + 80);

      // Table Rows Preparation
      const tableRows = expenses.map((item, index) => [
        (index + 1).toString(),
        item.name,
        item.category || 'General',
        item.date || 'Recent',
        `Rs. ${Number(item.amount).toLocaleString()}`
      ]);

      // Render AutoTable for Expenses
      autoTable(doc, {
        startY: cardY + 90,
        margin: { left: 40, right: 40 },
        head: [['#', 'Expense Name', 'Category', 'Date', 'Amount']],
        body: tableRows,
        theme: 'striped',
        headStyles: {
          fillColor: [79, 70, 229],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [51, 65, 85]
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        }
      });

      // Section Header: Platform Module Progress & Activities
      let finalY = (doc).lastAutoTable.finalY + 30;

      if (finalY + 140 > pageHeight) {
        doc.addPage();
        finalY = 40;
      }

      doc.setTextColor(15, 23, 42);
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text('FINCASH PLATFORM ACTIVITY & MODULE SUMMARY', 40, finalY);

      const activityRows = [
        ['Personalized Financial Roadmap', 'Completed & Active', 'AI Investment Advice Generated'],
        ['Budget Lab', `${budgetUsagePercent}% Monthly Usage`, `Rs. ${totalExpenses.toLocaleString()} / Rs. ${profileData.salary.toLocaleString()}`],
        ['Tax Center', 'Section 80C Optimized', 'ELSS & NPS Tax Saving Recommendations'],
        ['Simulations & Gamification', 'Level 1 Scholar', 'Badges: Early Bird, Tax Pro, Saver Master'],
        ['AI Mentor Consultations', 'Active', 'Real-time financial guidance engaged']
      ];

      autoTable(doc, {
        startY: finalY + 10,
        margin: { left: 40, right: 40 },
        head: [['Platform Module', 'Status / Progress', 'Activity Details']],
        body: activityRows,
        theme: 'grid',
        headStyles: {
          fillColor: [30, 41, 59],
          textColor: [255, 255, 255],
          fontStyle: 'bold',
          fontSize: 9
        },
        bodyStyles: {
          fontSize: 9,
          textColor: [51, 65, 85]
        }
      });

      // Footer Stamp & Verification Notice
      const footerY = pageHeight - 40;
      doc.setDrawColor(226, 232, 240);
      doc.line(40, footerY - 15, pageWidth - 40, footerY - 15);

      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(148, 163, 184);
      doc.text('Confidential Document • Generated automatically by FinCash AI Financial Platform.', 40, footerY);
      doc.text('Page 1 of 1', pageWidth - 40, footerY, { align: 'right' });

      // Save PDF File
      const fileName = `FinCash_Report_${profileData.name.replace(/\s+/g, '_')}.pdf`;
      doc.save(fileName);
    } catch (err) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF report. Please try again.");
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const currentAvatarSrc = profileData.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(profileData.name)}&background=random&size=128`;

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-6 lg:space-y-8"
    >
      {/* Toast Notification */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-6 right-6 z-50 bg-emerald-500 text-white px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 font-bold border border-emerald-400"
          >
            <CheckCircle2 size={20} /> Profile & Expenses updated successfully!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Profile Card */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gray-900 border border-gray-800 p-8 shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-32 bg-purple-500/10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          {/* Avatar Display */}
          <div className="relative group cursor-pointer" onClick={() => { setEditForm({ ...profileData }); setAvatarPreview(profileData.avatar); setIsEditing(true); }}>
            <div className="w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 drop-shadow-[0_0_15px_rgba(99,102,241,0.5)] flex-shrink-0">
              <div className="w-full h-full bg-gray-900 rounded-full flex items-center justify-center overflow-hidden border-[4px] border-gray-900 relative">
                <img src={currentAvatarSrc} alt="Profile" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white">
                  <Camera size={24} />
                </div>
              </div>
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 bg-emerald-500 border-2 border-gray-900 rounded-full" title="Online"></div>
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                {profileData.name}
              </h1>
              <span className="bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full font-bold border border-indigo-500/30">
                Level 1 Scholar
              </span>
            </div>
            
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
              <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                <Mail size={16} className="text-indigo-400" />
                <span className="text-sm font-medium">{profileData.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 bg-gray-800/50 px-4 py-2 rounded-full border border-gray-700/50">
                <Target size={16} className="text-purple-400" />
                <span className="text-sm font-medium">Goal: {profileData.goal}</span>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 w-full md:w-auto">
            <button 
              onClick={() => {
                setEditForm({ ...profileData });
                setAvatarPreview(profileData.avatar);
                setIsEditing(true);
              }}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-2xl border border-gray-700 transition-all transform hover:scale-105 text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <User size={18} className="text-indigo-400" /> Edit Profile
            </button>

            <button 
              onClick={handleGenerateReport}
              disabled={isGeneratingPdf}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-2xl shadow-[0_0_20px_rgba(99,102,241,0.4)] transition-all transform hover:scale-105 text-sm font-bold flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Download size={18} /> {isGeneratingPdf ? 'Generating PDF...' : 'View Full Report'}
            </button>
          </div>
        </div>
      </motion.div>

      {/* Financial Stats Cards */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="relative overflow-hidden group bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Monthly Income</p>
              <h3 className="text-3xl font-black text-white">₹{profileData.salary.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
              <TrendingUp size={24} />
            </div>
          </div>
          <p className="text-xs text-emerald-400 mt-3 font-medium flex items-center gap-1">
            <Sparkles size={14} /> Salary Base Tracked
          </p>
        </div>

        <div className="relative overflow-hidden group bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Total Expenses</p>
              <h3 className="text-3xl font-black text-rose-400">₹{totalExpenses.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <TrendingDown size={24} />
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 font-medium">
            {expenses.length} tracked items in budget
          </p>
        </div>

        <div className="relative overflow-hidden group bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all shadow-xl">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-semibold text-gray-400 mb-1">Net Savings</p>
              <h3 className="text-3xl font-black text-indigo-400">₹{netSavings.toLocaleString()}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <IndianRupee size={24} />
            </div>
          </div>
          <p className="text-xs text-indigo-300 mt-3 font-medium">
            {100 - budgetUsagePercent}% monthly income retained
          </p>
        </div>
      </motion.div>

      {/* Main Grid: Expenses & Financial Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Expenses List */}
        <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col h-full shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2 text-white">
              <CreditCard className="text-indigo-400" /> Recent Expenses
            </h2>
            <button 
              onClick={() => setIsEditing(true)}
              className="text-xs text-indigo-400 hover:text-indigo-300 font-bold bg-indigo-500/10 px-3 py-1.5 rounded-xl border border-indigo-500/20 transition-all flex items-center gap-1"
            >
              <Plus size={14} /> Add Expense
            </button>
          </div>

          <div className="space-y-3 flex-1 overflow-y-auto max-h-[360px] pr-1 scrollbar-thin scrollbar-thumb-gray-800">
            {expenses.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <AlertCircle className="mx-auto mb-2 opacity-50" size={32} />
                <p className="text-sm">No expenses added yet.</p>
                <button onClick={() => setIsEditing(true)} className="mt-2 text-indigo-400 text-xs font-bold underline">Add your first expense</button>
              </div>
            ) : (
              expenses.map((expense) => {
                const meta = getCategoryMeta(expense.category);
                const IconComp = meta.icon;
                return (
                  <div key={expense.id} className="flex items-center justify-between p-4 rounded-2xl bg-gray-800/40 border border-gray-800/80 hover:bg-gray-800/80 transition-all group">
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${meta.bg} ${meta.color} group-hover:scale-110 transition-transform shrink-0`}>
                        <IconComp size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{expense.name}</h4>
                        <p className="text-xs text-gray-400">{expense.category} • {expense.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-rose-400 text-sm">-₹{Number(expense.amount).toLocaleString()}</span>
                      <button 
                        onClick={() => handleRemoveExpense(expense.id)}
                        className="text-gray-500 hover:text-rose-400 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        title="Delete Expense"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </motion.div>

        {/* Progress & Goals */}
        <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 flex flex-col h-full shadow-2xl">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6 text-white">
            <Target className="text-purple-400" /> Financial Progress
          </h2>
          <div className="space-y-8 flex-1">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-300">Monthly Budget Usage</span>
                <span className="text-sm font-bold text-indigo-400">{budgetUsagePercent}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${budgetUsagePercent}%` }}
                  transition={{ duration: 1 }}
                  className={`h-full rounded-full ${budgetUsagePercent > 90 ? 'bg-rose-500' : 'bg-gradient-to-r from-indigo-500 to-purple-500'}`}
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">₹{totalExpenses.toLocaleString()} spent out of ₹{profileData.salary.toLocaleString()} budget</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-bold text-gray-300">Emergency Fund Goal</span>
                <span className="text-sm font-bold text-emerald-400">75%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden border border-gray-700">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: '75%' }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 w-full hover:animate-pulse" />
                </motion.div>
              </div>
              <p className="text-xs text-gray-400 mt-2">₹1,50,000 saved out of ₹2,00,000 goal</p>
            </div>
            
            <div className="p-4 mt-auto rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                <Sparkles size={20} className="text-indigo-400" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-indigo-100 mb-1">Financial Advisory Insight</h4>
                <p className="text-xs text-indigo-200/70 leading-relaxed">
                  Your monthly savings rate is healthy. Keep tracking your daily expenses to stay within your ₹{profileData.salary.toLocaleString()} income budget!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* EDIT PROFILE & EXPENSES MODAL */}
      <AnimatePresence>
        {isEditing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-900/50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                    <User size={20} />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-white">Edit Profile & Expenses</h3>
                    <p className="text-xs text-gray-400">Update image, financial parameters, and manage expenses</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsEditing(false)}
                  className="p-2 text-gray-400 hover:text-white bg-gray-800 rounded-xl transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto space-y-6 flex-1 scrollbar-thin scrollbar-thumb-gray-800">
                
                {/* 1. Profile Picture & Avatar Upload */}
                <div className="space-y-3 bg-gray-800/40 p-4 rounded-2xl border border-gray-800">
                  <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block">
                    Profile Image
                  </label>

                  <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-indigo-500 bg-gray-950 shrink-0">
                      <img src={avatarPreview || editForm.avatar || currentAvatarSrc} alt="Preview" className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 space-y-2 w-full">
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-4 py-2 rounded-xl transition-all flex items-center gap-2 shadow-lg">
                          <Upload size={14} /> Upload Custom Photo
                          <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                        </label>
                      </div>

                      <input 
                        type="text"
                        placeholder="Or paste Image URL..."
                        value={editForm.avatar}
                        onChange={(e) => {
                          setEditForm(prev => ({ ...prev, avatar: e.target.value }));
                          setAvatarPreview(e.target.value);
                        }}
                        className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Preset Avatars */}
                  <div>
                    <span className="text-[11px] text-gray-400 font-medium block mb-2">Or select an avatar preset:</span>
                    <div className="flex items-center gap-3">
                      {avatarPresets.map((preset, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setEditForm(prev => ({ ...prev, avatar: preset }));
                            setAvatarPreview(preset);
                          }}
                          className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all transform hover:scale-110 ${
                            avatarPreview === preset ? 'border-indigo-500 scale-110 shadow-lg' : 'border-gray-700'
                          }`}
                        >
                          <img src={preset} alt="preset" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 2. Personal & Goal Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                      Financial Goal
                    </label>
                    <input 
                      type="text"
                      value={editForm.goal}
                      onChange={(e) => setEditForm(prev => ({ ...prev, goal: e.target.value }))}
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                      placeholder="e.g. Financial Independence, Buy a Home, Retirement"
                    />
                  </div>
                </div>

                {/* 3. Monthly Income & Savings */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-gray-800/40 p-4 rounded-2xl border border-gray-800">
                  <div>
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                      Monthly Income (₹)
                    </label>
                    <input 
                      type="number"
                      value={editForm.salary}
                      onChange={(e) => setEditForm(prev => ({ ...prev, salary: e.target.value }))}
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-gray-300 uppercase tracking-wider block mb-1">
                      Current Savings (₹)
                    </label>
                    <input 
                      type="number"
                      value={editForm.savings}
                      onChange={(e) => setEditForm(prev => ({ ...prev, savings: e.target.value }))}
                      className="w-full bg-gray-950 border border-gray-700 rounded-xl py-2.5 px-3 text-sm text-white focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                {/* 4. Add Expenses Form */}
                <div className="space-y-3 bg-gray-800/40 p-4 rounded-2xl border border-gray-800">
                  <label className="text-xs font-bold text-indigo-400 uppercase tracking-wider block">
                    Add New Expense
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                    <input 
                      type="text"
                      placeholder="Title (e.g. Rent)"
                      value={newExpense.name}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-950 border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <input 
                      type="number"
                      placeholder="Amount (₹)"
                      value={newExpense.amount}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                      className="bg-gray-950 border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    />
                    <select
                      value={newExpense.category}
                      onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-gray-950 border border-gray-700 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-indigo-500"
                    >
                      <option value="Food">Food</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Housing">Housing</option>
                      <option value="Leisure">Leisure</option>
                      <option value="Investments">Investments</option>
                      <option value="General">General</option>
                    </select>
                    <button
                      type="button"
                      onClick={handleAddExpense}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 px-3 rounded-xl transition-all flex items-center justify-center gap-1 shadow-md"
                    >
                      <Plus size={14} /> Add
                    </button>
                  </div>

                  {/* Added Expenses List preview inside modal */}
                  <div className="mt-3 max-h-36 overflow-y-auto space-y-2">
                    {expenses.map((exp) => (
                      <div key={exp.id} className="flex justify-between items-center bg-gray-950/80 px-3 py-2 rounded-xl text-xs text-gray-300 border border-gray-800">
                        <span>{exp.name} ({exp.category})</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-rose-400">-₹{Number(exp.amount).toLocaleString()}</span>
                          <button onClick={() => handleRemoveExpense(exp.id)} className="text-gray-500 hover:text-rose-400">
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-800 bg-gray-900/50 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-bold rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveProfile}
                  className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-indigo-500/20"
                >
                  Save Profile Changes
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Profile;
