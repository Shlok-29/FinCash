import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, ShieldAlert, Lock, Unlock, Key, AlertTriangle, 
  Globe, Server, CheckCircle2, UserCheck, RefreshCcw 
} from 'lucide-react';

const AdminSecurity = () => {
  const [lockdown, setLockdown] = useState(false);
  const [enforce2FA, setEnforce2FA] = useState(true);

  const activeSessions = [
    { id: 1, user: 'admin@fincash.com', role: 'Administrator', ip: '103.24.12.89', location: 'Mumbai, IN', device: 'Chrome / Windows 11', time: 'Active now' },
    { id: 2, user: 'aarav@fincash.com', role: 'Employee', ip: '49.36.190.22', location: 'Delhi, IN', device: 'Firefox / macOS', time: '14m ago' },
    { id: 3, user: 'shlokdubey2903@gmail.com', role: 'User', ip: '106.210.45.11', location: 'Bengaluru, IN', device: 'Edge / Windows 11', time: '28m ago' },
  ];

  const failedAttempts = [
    { ip: '185.220.101.5', count: 14, country: 'RU', action: 'IP Auto-Blocked (403)', time: '1h ago' },
    { ip: '194.26.29.112', count: 8, country: 'CN', action: 'Captcha Triggered', time: '3h ago' },
  ];

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
            <ShieldCheck size={16} /> Platform Security & Access Control
          </div>
          <h1 className="text-3xl font-black font-outfit text-white">Security Command Center</h1>
          <p className="text-gray-400 text-sm">Monitor active IP sessions, firewalls, authentication guardrails, and threat logs.</p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setLockdown(!lockdown)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-black text-xs transition-all shadow-lg ${
              lockdown ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-600/20' : 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-600/20'
            }`}
          >
            {lockdown ? <Unlock size={16} /> : <Lock size={16} />}
            {lockdown ? 'Lift System Lockdown' : 'Emergency Platform Lockdown'}
          </button>
        </div>
      </div>

      {lockdown && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-400 text-xs font-bold flex items-center gap-3 animate-pulse">
          <AlertTriangle size={20} className="shrink-0" />
          <span>System Lockdown Active: Non-admin write operations and user signups are temporarily restricted.</span>
        </div>
      )}

      {/* Security Telemetry Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">Firewall Status</div>
          <div className="text-xl font-black text-emerald-400 font-outfit mt-1 flex items-center gap-1.5">
            <ShieldCheck size={18} /> Active Guard
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">2FA Policy</div>
          <div className="text-xl font-black text-indigo-400 font-outfit mt-1">
            {enforce2FA ? 'Enforced' : 'Optional'}
          </div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">Blocked Malicious IPs</div>
          <div className="text-xl font-black text-amber-400 font-outfit mt-1">22 Blacklisted</div>
        </div>
        <div className="bg-gray-900 border border-gray-800 p-4 rounded-2xl">
          <div className="text-[10px] text-gray-400 font-black uppercase">JWT Encryption</div>
          <div className="text-xl font-black text-rose-400 font-outfit mt-1">HS256 Verified</div>
        </div>
      </div>

      {/* Active IP Sessions */}
      <div className="bg-gray-900 border border-gray-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="p-6 border-b border-gray-800 flex justify-between items-center bg-gray-950/40">
          <div>
            <h3 className="font-bold text-lg text-white">Active Authenticated IP Sessions</h3>
            <p className="text-xs text-gray-400">Live active tokens and device fingerprints</p>
          </div>
          <span className="text-xs text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full">
            {activeSessions.length} Online
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-950/80 text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-800">
                <th className="px-6 py-4 font-black">User & Role</th>
                <th className="px-6 py-4 font-black">IP Address</th>
                <th className="px-6 py-4 font-black">Location</th>
                <th className="px-6 py-4 font-black">Device Fingerprint</th>
                <th className="px-6 py-4 font-black text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60">
              {activeSessions.map((session) => (
                <tr key={session.id} className="hover:bg-gray-800/40 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-xs font-bold text-white">{session.user}</div>
                    <span className="text-[10px] font-extrabold text-indigo-400">{session.role}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-gray-300 font-bold">
                    {session.ip}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400 font-semibold flex items-center gap-1.5">
                    <Globe size={14} className="text-gray-500" />
                    {session.location}
                  </td>
                  <td className="px-6 py-4 text-xs text-gray-400">
                    {session.device}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-xs font-extrabold px-3 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-all">
                      Revoke Token
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Threat Log & Policy Switch */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl">
          <h3 className="font-bold text-lg text-white mb-4">Failed Auth Attempts & Blacklist</h3>
          <div className="space-y-3">
            {failedAttempts.map((attempt, i) => (
              <div key={i} className="p-4 rounded-2xl bg-gray-950/60 border border-gray-800 flex items-center justify-between">
                <div>
                  <div className="text-xs font-mono font-bold text-rose-400 flex items-center gap-2">
                    <AlertTriangle size={14} /> {attempt.ip} ({attempt.country})
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">{attempt.count} failed login attempts</div>
                </div>
                <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20">
                  {attempt.action}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg text-white mb-4">Security Policy Toggles</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-gray-950 border border-gray-800">
                <div>
                  <div className="text-xs font-bold text-white">Enforce 2FA for Admin/Employees</div>
                  <div className="text-[11px] text-gray-400">Require TOTP authenticator app on login</div>
                </div>
                <button 
                  onClick={() => setEnforce2FA(!enforce2FA)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${enforce2FA ? 'bg-rose-600' : 'bg-gray-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${enforce2FA ? 'translate-x-6' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 text-center text-xs text-gray-500 font-bold">
            FinCash SSL/TLS Certificate Valid until 2027
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSecurity;
