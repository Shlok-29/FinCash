import React from 'react';
import { motion } from 'framer-motion';
import { 
  Info, Target, ShieldCheck, TrendingUp, Sparkles, 
  BrainCircuit, Users, Award, Zap, CheckCircle2, 
  HeartHandshake, Compass, Code2, Cpu, Layers, 
  Globe, Wallet, FileText, MessageSquare, ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const features = [
    {
      title: "Personalized Financial Roadmap",
      desc: "Inputs like salary, savings, and expenses generate a custom step-by-step path tailored to your income and family size.",
      icon: Compass,
      color: "from-indigo-500 to-blue-600"
    },
    {
      title: "AI Financial Mentor",
      desc: "Instant 24/7 AI-powered consultation (backed by OpenAI & Gemini) answering queries on budgeting, crypto, stock markets, and platform tools.",
      icon: BrainCircuit,
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Smart Tax Center & 80C",
      desc: "Optimize income tax saving strategies, maximize Section 80C deductions (up to ₹1.5L), and explore ELSS funds with lock-in advice.",
      icon: FileText,
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "Interactive Budget Lab",
      desc: "Track real-time expenses, implement the 50/30/20 rule, monitor savings rate, and manage custom daily budgets.",
      icon: Wallet,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Market Insights & Simulations",
      desc: "Simulated stock market data, Nifty/Sensex trends, stock scoring, and insurance policy comparisons.",
      icon: TrendingUp,
      color: "from-cyan-500 to-blue-600"
    },
    {
      title: "1-on-1 Human Expert Mentors",
      desc: "Book dedicated video sessions with certified CAs, wealth managers, and tax advisors with integrated secure payment processing.",
      icon: Users,
      color: "from-rose-500 to-red-600"
    }
  ];

  const benefits = [
    "Demystifies complex financial jargon into simple, actionable steps.",
    "Gamified learning paths with XP, Leveling, and Streaks keep you motivated daily.",
    "Helps avoid debt traps by projecting emergency fund needs before taking financial risks.",
    "Enables instant PDF audit report downloads of your complete activity and spending history.",
    "Completely secure authentication with cloud database infrastructure."
  ];

  const stats = [
    { label: "Financial Literacy Modules", value: "12+" },
    { label: "AI Mentor Accuracy", value: "99.4%" },
    { label: "Tax Saving Potential", value: "Up to ₹1.5 Lakhs" },
    { label: "Community Members", value: "5,000+" }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="max-w-5xl mx-auto space-y-8 pb-12"
    >
      {/* Hero Banner */}
      <motion.div 
        variants={itemVariants}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-gray-900 via-indigo-950 to-gray-900 border border-gray-800 p-8 md:p-12 shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-40 bg-indigo-500/10 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 p-40 bg-purple-500/10 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-xs font-bold uppercase tracking-widest">
            <Sparkles size={14} /> About FinCash Platform
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white leading-tight">
            Empowering Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">Financial Future</span>
          </h1>

          <p className="text-gray-300 text-base md:text-lg leading-relaxed font-normal">
            FinCash is a comprehensive financial literacy and wellness platform designed to bridge the gap between financial awareness and confident action. We combine AI advisor guidance, gamified interactive learning, smart budgeting, and tax optimization to help every user build sustainable wealth.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <Link 
              to="/user" 
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-600/30 flex items-center gap-2"
            >
              Explore Dashboard <ArrowRight size={16} />
            </Link>
            <Link 
              to="/user/ai-mentor" 
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-gray-200 rounded-2xl font-bold text-sm border border-gray-700 transition-all flex items-center gap-2"
            >
              Ask AI Mentor <MessageSquare size={16} />
            </Link>
          </div>
        </div>
      </motion.div>

      {/* Platform Stats Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-3xl p-6 text-center shadow-xl hover:border-gray-700 transition-colors">
            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-1">
              {stat.value}
            </h3>
            <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
          </div>
        ))}
      </motion.div>

      {/* What You Can Do On FinCash */}
      <motion.div variants={itemVariants} className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-3xl font-extrabold text-white">What You Can Do On FinCash</h2>
          <p className="text-sm text-gray-400">Everything you need to master money management, investments, and taxes in one place.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={idx} 
                className="bg-gray-900 border border-gray-800 rounded-3xl p-6 hover:border-gray-700 transition-all group flex flex-col justify-between shadow-xl"
              >
                <div className="space-y-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    <IconComp size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-gray-900 border border-gray-800 rounded-3xl p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold">
            <Award size={14} /> Key Benefits
          </div>
          <h2 className="text-3xl font-extrabold text-white">How FinCash Transforms Your Financial Habits</h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            Financial planning shouldn't feel intimidating. FinCash transforms abstract financial terms into structured habit-building tools.
          </p>

          <div className="space-y-3">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 size={14} />
                </div>
                <p className="text-xs text-gray-300 font-medium leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-950/60 to-purple-950/60 border border-indigo-500/20 rounded-3xl p-8 space-y-6 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-2xl shadow-indigo-500/50">
            <HeartHandshake size={32} />
          </div>
          <h3 className="text-2xl font-black text-white">Our Mission</h3>
          <p className="text-xs text-gray-300 leading-relaxed">
            "To democratize financial literacy and give everyone—from students to working professionals—the tools, intelligence, and clarity to achieve financial independence."
          </p>
          <div className="pt-2 text-[11px] text-indigo-400 font-bold uppercase tracking-widest">
            FinCash • Financial Empowerment for All
          </div>
        </div>
      </motion.div>

      {/* Creator & Tech Architecture Section */}
      <motion.div variants={itemVariants} className="bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-800 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 text-xs font-bold mb-2">
              <Code2 size={14} /> Development & Innovation
            </div>
            <h2 className="text-2xl font-bold text-white">Who Built FinCash?</h2>
          </div>
          <span className="text-xs text-gray-400 font-mono bg-gray-800 px-4 py-2 rounded-xl border border-gray-700">
            Version 1.0.0
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
              <Users size={16} /> Created By
            </h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              FinCash was architected and developed by <strong className="text-white">Shlok Dubey</strong> to create a state-of-the-art financial wellness ecosystem.
            </p>
            <p className="text-xs text-gray-400 leading-relaxed">
              Designed with user-first aesthetics, dark-mode glassmorphism, gamification algorithms, and AI models to make personal finance intuitive and engaging.
            </p>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-bold text-purple-300 flex items-center gap-2">
              <Cpu size={16} /> Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {[
                "React (Vite)", "Redux Toolkit", "Tailwind CSS", "Framer Motion", 
                "Node.js Express", "MongoDB Atlas", "FastAPI Python", "OpenAI & Gemini API", "jsPDF Reports"
              ].map((tech, idx) => (
                <span key={idx} className="text-xs bg-gray-800 text-gray-300 px-3 py-1 rounded-xl border border-gray-700 font-medium">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default About;
