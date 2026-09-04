import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Star, CheckCircle2, Search, Plus, MoreVertical, Mail, Shield, X, User, Briefcase, Info } from 'lucide-react';

const AdminMentors = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [specialtyFilter, setSpecialtyFilter] = useState('All');
  const [newMentor, setNewMentor] = useState({ name: '', specialty: 'Tax Strategy & Planning', email: '', bio: '', status: 'Active' });

  const stats = [
    { label: 'Total Mentors', value: '24', icon: <GraduationCap size={22} />, color: 'text-indigo-400', bg: 'bg-indigo-500/10 border-indigo-500/20' },
    { label: 'Avg Rating', value: '4.9 ★', icon: <Star size={22} />, color: 'text-amber-400', bg: 'bg-amber-500/10 border-amber-500/20' },
    { label: 'Sessions This Month', value: '142', icon: <CheckCircle2 size={22} />, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
  ];

  const [mentors, setMentors] = useState([
    { id: 1, name: 'Dr. Arvinder Singh', specialty: 'Tax Strategy & Planning', status: 'Active', rating: 4.9, sessions: 156, email: 'arvinder@fincash.com' },
    { id: 2, name: 'Meera Deshmukh', specialty: 'Stock Market & Equity', status: 'Active', rating: 4.8, sessions: 92, email: 'meera@fincash.com' },
    { id: 3, name: 'Kevin O\'Leary', specialty: 'Venture Capital & IPOs', status: 'Away', rating: 5.0, sessions: 310, email: 'kevin@fincash.com' },
    { id: 4, name: 'Sanjay Malhotra', specialty: 'Real Estate Investment', status: 'Active', rating: 4.7, sessions: 45, email: 'sanjay@fincash.com' },
    { id: 5, name: 'Sarah Jenkins', specialty: 'Retirement & Estate Planning', status: 'Inactive', rating: 4.6, sessions: 12, email: 'sarah@fincash.com' },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const mentorToAdd = {
      ...newMentor,
      id: Date.now(),
      rating: 5.0,
      sessions: 0,
    };
    setMentors([mentorToAdd, ...mentors]);
    setIsModalOpen(false);
    setNewMentor({ name: '', specialty: 'Tax Strategy & Planning', email: '', bio: '', status: 'Active' });
  };

  const filteredMentors = mentors.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.specialty.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecialty = specialtyFilter === 'All' || m.specialty.includes(specialtyFilter);
    return matchesSearch && matchesSpecialty;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 relative pb-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
            <GraduationCap size={16} /> Human Advisory Network
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Mentor Directory</h1>
          <p className="text-gray-400 text-sm">Manage verified financial advisors, track consultation performance, and commission status.</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 rounded-xl text-xs font-black text-white transition-all shadow-lg shadow-rose-600/20"
        >
          <Plus size={18} />
          Register New Expert
        </button>
      </div>

      {/* Stats Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex items-center justify-between shadow-xl">
            <div className="space-y-1">
              <p className="text-xs font-black text-gray-500 uppercase tracking-widest">{stat.label}</p>
              <p className="text-3xl font-black text-white font-outfit">{stat.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Search mentors by name, specialty, or email..." 
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-12 pr-4 text-white text-xs font-medium focus:outline-none focus:border-rose-500 transition-colors"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select 
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="bg-gray-900 border border-gray-800 text-xs font-bold text-gray-300 rounded-xl px-4 py-3 outline-none"
          >
            <option value="All">All Specialties</option>
            <option value="Tax Strategy">Tax Strategy</option>
            <option value="Stock Market">Stock Market</option>
            <option value="Venture Capital">Venture Capital</option>
            <option value="Real Estate">Real Estate</option>
          </select>
        </div>
      </div>

      {/* Mentors Table */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/80 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <th className="px-8 py-5 font-black">Mentor Specialist</th>
                <th className="px-6 py-5 font-black">Domain Specialty</th>
                <th className="px-6 py-5 font-black">Performance Rating</th>
                <th className="px-6 py-5 font-black">Availability</th>
                <th className="px-8 py-5 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredMentors.map((mentor, i) => (
                <tr key={i} className="group hover:bg-gray-800/40 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-xs font-black text-white shadow-md">
                        {mentor.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">{mentor.name}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail size={12} />
                          {mentor.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                      {mentor.specialty}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-amber-400">
                        <Star size={14} fill="currentColor" />
                        <span className="text-xs font-black">{mentor.rating}</span>
                      </div>
                      <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{mentor.sessions} Consultations</div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${
                      mentor.status === 'Active' ? 'text-emerald-400 bg-emerald-500/10 border border-emerald-500/20' :
                      mentor.status === 'Away' ? 'text-amber-400 bg-amber-500/10 border border-amber-500/20' :
                      'text-gray-400 bg-gray-800 border border-gray-700'
                    }`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${
                        mentor.status === 'Active' ? 'bg-emerald-400' :
                        mentor.status === 'Away' ? 'bg-amber-400' :
                        'bg-gray-500'
                      }`} />
                      {mentor.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                        <Shield size={16} />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Mentor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-xl bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl relative"
            >
              <div className="p-6 md:p-8 border-b border-gray-800 flex items-center justify-between bg-gray-950/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-rose-600 flex items-center justify-center text-white shadow-lg shadow-rose-600/20">
                    <Plus size={20} />
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-white font-outfit">Register Advisor Expert</h2>
                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Expand FinCash consultation network</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. Dr. Arvinder Singh"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-rose-500 transition-colors"
                      value={newMentor.name}
                      onChange={(e) => setNewMentor({...newMentor, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      required
                      placeholder="arvinder@fincash.com"
                      className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-rose-500 transition-colors"
                      value={newMentor.email}
                      onChange={(e) => setNewMentor({...newMentor, email: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Specialty / Expertise
                  </label>
                  <select 
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-rose-500 transition-colors"
                    value={newMentor.specialty}
                    onChange={(e) => setNewMentor({...newMentor, specialty: e.target.value})}
                  >
                    <option value="Tax Strategy & Planning">Tax Strategy & Planning</option>
                    <option value="Stock Market & Equity">Stock Market & Equity</option>
                    <option value="Venture Capital & IPOs">Venture Capital & IPOs</option>
                    <option value="Real Estate Investment">Real Estate Investment</option>
                    <option value="Crypto & Digital Assets">Crypto & Digital Assets</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest block mb-1">
                    Short Bio & Qualifications
                  </label>
                  <textarea 
                    rows={3}
                    placeholder="Describe the expert's background..."
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-rose-500 transition-colors resize-none"
                    value={newMentor.bio}
                    onChange={(e) => setNewMentor({...newMentor, bio: e.target.value})}
                  />
                </div>

                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 bg-gray-950 border border-gray-800 rounded-xl text-xs font-bold text-gray-400 hover:text-white transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-[2] py-3 bg-rose-600 rounded-xl text-xs font-black text-white hover:bg-rose-500 transition-all shadow-xl shadow-rose-600/20"
                  >
                    Register Expert Advisor
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminMentors;
