import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Unlock, Lock, Download, UserPlus, Filter, ShieldCheck, 
  Mail, Calendar, DollarSign, X, Check, Activity, Shield
} from 'lucide-react';
import axios from 'axios';
import jsPDF from 'jspdf';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  
  // New user form state
  const [newUser, setNewUser] = useState({ name: '', email: '', password: '', role: 'user' });
  const [modalError, setModalError] = useState('');
  const [modalSuccess, setModalSuccess] = useState('');

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const toggleEdit = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/admin/toggle-edit/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
    } catch (error) {
      console.error("Error toggling edit:", error);
    }
  };

  const handleAddUserSubmit = async (e) => {
    e.preventDefault();
    setModalError('');
    setModalSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/signup', newUser);
      setModalSuccess('User account created successfully!');
      setNewUser({ name: '', email: '', password: '', role: 'user' });
      fetchUsers();
      setTimeout(() => setShowAddModal(false), 1200);
    } catch (err) {
      setModalError(err.response?.data?.message || 'Failed to create user.');
    }
  };

  const handleExportUsersPDF = () => {
    const doc = new jsPDF();
    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, 210, 35, 'F');
    doc.setTextColor(244, 63, 94);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('FinCash Registered User Roster', 14, 22);

    let y = 50;
    doc.setTextColor(15, 23, 42);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text('Name', 14, y);
    doc.text('Email', 70, y);
    doc.text('Salary Config', 140, y);
    doc.text('Permissions', 180, y);

    doc.line(14, y + 2, 196, y + 2);
    y += 10;

    users.forEach((u) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'normal');
      doc.text(u.name || 'N/A', 14, y);
      doc.text(u.email || 'N/A', 70, y);
      doc.text(u.salary ? `INR ${u.salary}` : 'Unset', 140, y);
      doc.text(u.canEditFinancials ? 'Unlocked' : 'Locked', 180, y);
      y += 8;
    });

    doc.save(`FinCash_User_Roster_${Date.now()}.pdf`);
  };

  const filteredUsers = users.filter((u) => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPlan = filterPlan === 'All' || 
                        (filterPlan === 'Configured' && u.salary) || 
                        (filterPlan === 'Unconfigured' && !u.salary);
    return matchesSearch && matchesPlan;
  });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }} 
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-12"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
            <Shield size={16} /> User Account Governance
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">User Management</h1>
          <p className="text-gray-400 text-sm">Monitor, inspect, and manage platform participant financial permissions.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={handleExportUsersPDF}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-900 border border-gray-800 rounded-xl text-xs font-bold text-gray-300 hover:text-white transition-all shadow-md"
          >
            <Download size={16} />
            Export Roster
          </button>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-rose-600 hover:bg-rose-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-rose-600/20"
          >
            <UserPlus size={16} />
            Create User Account
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        {/* Table Filters Topbar */}
        <div className="p-4 md:p-6 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 bg-gray-950/40">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search user name or email..." 
              className="w-full bg-gray-950 border border-gray-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-medium focus:border-rose-500 outline-none text-white transition-colors"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <div className="flex items-center gap-2 bg-gray-950 border border-gray-800 rounded-xl px-3 py-2 text-xs text-gray-400">
              <Filter size={14} className="text-gray-500" />
              <select 
                value={filterPlan}
                onChange={(e) => setFilterPlan(e.target.value)}
                className="bg-transparent border-none outline-none text-xs text-gray-300 font-bold"
              >
                <option value="All" className="bg-gray-900">All Financial Profiles</option>
                <option value="Configured" className="bg-gray-900">Profile Configured</option>
                <option value="Unconfigured" className="bg-gray-900">Incomplete Profile</option>
              </select>
            </div>
            <div className="text-xs font-bold text-gray-400 bg-gray-950 px-3 py-2 rounded-xl border border-gray-800">
              Total Users: <span className="text-rose-400 font-black">{filteredUsers.length}</span>
            </div>
          </div>
        </div>

        {/* User Table */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-12 text-center text-gray-400 flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-2 border-rose-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-xs font-bold">Fetching platform users...</p>
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-bold text-xs">
              No matching user accounts found.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950/80 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-800">
                  <th className="px-6 py-4 font-black">User Participant</th>
                  <th className="px-6 py-4 font-black">Financial Status</th>
                  <th className="px-6 py-4 font-black">Registration Date</th>
                  <th className="px-6 py-4 font-black">Edit Authorization</th>
                  <th className="px-6 py-4 font-black text-right">Administrative Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/60">
                {filteredUsers.map((u) => (
                  <tr key={u._id} className="hover:bg-gray-800/40 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-amber-500/20 border border-rose-500/30 flex items-center justify-center text-xs font-black text-rose-400">
                          {u.name ? u.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'US'}
                        </div>
                        <div>
                          <div className="text-sm font-bold text-white group-hover:text-rose-400 transition-colors">{u.name}</div>
                          <div className="text-xs text-gray-500 font-medium">{u.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border ${
                        u.salary 
                          ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                          : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      }`}>
                        {u.salary ? `Income: ₹${u.salary.toLocaleString()}` : 'Profile Setup Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-gray-400 font-semibold">
                      {new Date(u.createdAt || Date.now()).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {u.canEditFinancials ? (
                          <span className="flex items-center gap-1.5 text-xs font-extrabold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                            <Unlock size={14} /> Granted
                          </span>
                        ) : (
                          <span className="flex items-center gap-1.5 text-xs font-extrabold text-rose-400 bg-rose-500/10 border border-rose-500/20 px-2.5 py-1 rounded-lg">
                            <Lock size={14} /> Locked
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => toggleEdit(u._id)}
                        className={`text-xs font-extrabold px-4 py-2 rounded-xl border transition-all ${
                          u.canEditFinancials 
                            ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 hover:bg-rose-500/20 shadow-md' 
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20 shadow-md'
                        }`}
                      >
                        {u.canEditFinancials ? 'Revoke Edit Rights' : 'Grant Edit Rights'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Footer info */}
        <div className="p-4 border-t border-gray-800 flex justify-between items-center text-xs text-gray-500 font-bold bg-gray-950/40">
          <div>Displaying {filteredUsers.length} of {users.length} active user records</div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-emerald-400 font-black">Live Governance Active</span>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <AnimatePresence>
        {showAddModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setShowAddModal(false)}
                className="absolute top-6 right-6 text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-black font-outfit text-white mb-1">Create Platform Account</h2>
              <p className="text-xs text-gray-400 mb-6">Manually provision a user account in the FinCash database.</p>

              {modalError && (
                <div className="p-3 mb-4 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold text-center">
                  {modalError}
                </div>
              )}
              {modalSuccess && (
                <div className="p-3 mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold text-center flex items-center justify-center gap-2">
                  <Check size={16} /> {modalSuccess}
                </div>
              )}

              <form onSubmit={handleAddUserSubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    placeholder="e.g. Rahul Verma"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    placeholder="e.g. rahul@example.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-gray-400 mb-1.5">Default Password</label>
                  <input 
                    type="password" 
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    placeholder="••••••••"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-rose-500 transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button 
                    type="submit"
                    className="w-full py-3 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs rounded-xl shadow-lg shadow-rose-600/20 transition-all"
                  >
                    Provision Account
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

export default AdminUsers;
