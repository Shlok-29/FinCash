import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserSquare2, Plus, Search, Filter, ShieldCheck, Mail, Phone, 
  CheckCircle, Clock, AlertCircle, X, Check, MoreVertical, Award
} from 'lucide-react';

const AdminEmployees = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Aarav Sharma', email: 'aarav@fincash.com', role: 'Support Lead', ticketsResolved: 142, status: 'Active', shift: 'Morning (09:00 - 17:00)', rating: '4.9 ★' },
    { id: 2, name: 'Ananya Roy', email: 'ananya@fincash.com', role: 'Tax Compliance Auditor', ticketsResolved: 98, status: 'Active', shift: 'Regular (10:00 - 18:00)', rating: '4.8 ★' },
    { id: 3, name: 'Rohan Mehta', email: 'rohan@fincash.com', role: 'Risk & Fraud Analyst', ticketsResolved: 215, status: 'Active', shift: 'Night (18:00 - 02:00)', rating: '5.0 ★' },
    { id: 4, name: 'Priya Nair', email: 'priya@fincash.com', role: 'Investment Consultant', ticketsResolved: 76, status: 'On Leave', shift: 'Regular (10:00 - 18:00)', rating: '4.7 ★' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [newEmp, setNewEmp] = useState({ name: '', email: '', role: 'Support Analyst', shift: 'Regular (10:00 - 18:00)' });
  const [toastMsg, setToastMsg] = useState('');

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      name: newEmp.name,
      email: newEmp.email,
      role: newEmp.role,
      ticketsResolved: 0,
      status: 'Active',
      shift: newEmp.shift,
      rating: '5.0 ★'
    };
    setEmployees([...employees, created]);
    setNewEmp({ name: '', email: '', role: 'Support Analyst', shift: 'Regular (10:00 - 18:00)' });
    setShowModal(false);
    setToastMsg(`Employee ${created.name} onboarded successfully!`);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const toggleStatus = (id) => {
    setEmployees(employees.map(emp => {
      if (emp.id === id) {
        return { ...emp, status: emp.status === 'Active' ? 'On Leave' : 'Active' };
      }
      return emp;
    }));
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || emp.role === roleFilter;
    return matchesSearch && matchesRole;
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
            <UserSquare2 size={16} /> Human Capital & Operations
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Employee Roster</h1>
          <p className="text-gray-400 text-sm">Manage FinCash support staff, compliance specialists, and ticket metrics.</p>
        </div>

        <button 
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-black text-xs rounded-xl transition-all shadow-lg shadow-rose-600/20"
        >
          <Plus size={16} />
          Onboard Employee
        </button>
      </div>

      {toastMsg && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle size={16} /> {toastMsg}
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Total Staff</div>
            <div className="text-2xl font-black text-white font-outfit mt-1">{employees.length} Members</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center">
            <UserSquare2 size={20} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Active Duty</div>
            <div className="text-2xl font-black text-emerald-400 font-outfit mt-1">
              {employees.filter(e => e.status === 'Active').length} Online
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle size={20} />
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex items-center justify-between">
          <div>
            <div className="text-xs text-gray-400 font-bold uppercase">Tickets Closed</div>
            <div className="text-2xl font-black text-amber-400 font-outfit mt-1">
              {employees.reduce((acc, curr) => acc + curr.ticketsResolved, 0)} Resolved
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center">
            <Award size={20} />
          </div>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-4 md:p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-950/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search employee name or email..." 
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:border-rose-500 outline-none text-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-400">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-gray-300 font-bold"
              >
                <option value="All" className="bg-gray-900">All Roles</option>
                <option value="Support Lead" className="bg-gray-900">Support Lead</option>
                <option value="Tax Compliance Auditor" className="bg-gray-900">Tax Auditor</option>
                <option value="Risk & Fraud Analyst" className="bg-gray-900">Risk Analyst</option>
                <option value="Investment Consultant" className="bg-gray-900">Investment Consultant</option>
              </select>
            </div>
          </div>
        </div>

        {/* Employee Grid / Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/80 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4 font-black">Employee Specialist</th>
                <th className="px-6 py-4 font-black">Assigned Role</th>
                <th className="px-6 py-4 font-black">Shift Hours</th>
                <th className="px-6 py-4 font-black">Tickets Closed</th>
                <th className="px-6 py-4 font-black">Duty Status</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="hover:bg-gray-800/40 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500/20 to-rose-500/20 border border-indigo-500/30 flex items-center justify-center text-xs font-black text-indigo-400">
                        {emp.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors flex items-center gap-2">
                          {emp.name}
                          <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-black">{emp.rating}</span>
                        </div>
                        <div className="text-xs text-gray-500 font-medium">{emp.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-extrabold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
                      {emp.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-gray-400">
                    {emp.shift}
                  </td>
                  <td className="px-6 py-4 text-xs font-extrabold text-white font-mono">
                    {emp.ticketsResolved} Cases
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${
                      emp.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-800 text-gray-400 border-gray-700'
                    }`}>
                      {emp.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => toggleStatus(emp.id)}
                      className="text-xs font-bold px-3 py-1.5 rounded-xl border bg-gray-950 border-gray-800 hover:border-gray-700 text-gray-300 transition-all"
                    >
                      {emp.status === 'Active' ? 'Set Off Duty' : 'Set Active'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Onboard Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setShowModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-black font-outfit text-white mb-1">Onboard Employee</h2>
              <p className="text-xs text-gray-400 mb-6">Add a staff member to the internal operational team.</p>

              <form onSubmit={handleAddEmployee} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={newEmp.name}
                    onChange={(e) => setNewEmp({ ...newEmp, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Das"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Official Email</label>
                  <input 
                    type="email" 
                    required
                    value={newEmp.email}
                    onChange={(e) => setNewEmp({ ...newEmp, email: e.target.value })}
                    placeholder="e.g. vikram@fincash.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Role Designation</label>
                  <select 
                    value={newEmp.role}
                    onChange={(e) => setNewEmp({ ...newEmp, role: e.target.value })}
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  >
                    <option value="Support Analyst">Support Analyst</option>
                    <option value="Tax Compliance Auditor">Tax Compliance Auditor</option>
                    <option value="Risk & Fraud Analyst">Risk & Fraud Analyst</option>
                    <option value="Investment Consultant">Investment Consultant</option>
                  </select>
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all"
                  >
                    Complete Onboarding
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

export default AdminEmployees;
