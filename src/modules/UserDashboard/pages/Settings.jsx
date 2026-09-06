import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, Bell, Lock, Shield, Eye, Save, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { updateProfile } from '../../../store/slices/authSlice';

const Settings = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8 pb-12"
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-black uppercase tracking-widest mb-1">
            <SettingsIcon size={16} /> Account Preferences
          </div>
          <h1 className="text-3xl md:text-4xl font-black font-outfit text-white">Settings</h1>
          <p className="text-gray-400 text-sm">Manage notification triggers, authentication security, and privacy preferences.</p>
        </div>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} /> Settings updated successfully!
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Notifications & Preferences */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-4">
            <Bell className="text-indigo-400" /> Notifications & Communications
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800">
              <div>
                <h4 className="text-xs font-bold text-white">Email Security Alerts</h4>
                <p className="text-[11px] text-gray-400">Receive instant alerts for logins and password changes</p>
              </div>
              <button 
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${emailAlerts ? 'bg-indigo-600' : 'bg-gray-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${emailAlerts ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800">
              <div>
                <h4 className="text-xs font-bold text-white">Weekly Financial Digest</h4>
                <p className="text-[11px] text-gray-400">Receive summary reports of your monthly spending & tax savings</p>
              </div>
              <button 
                onClick={() => setWeeklyDigest(!weeklyDigest)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${weeklyDigest ? 'bg-indigo-600' : 'bg-gray-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${weeklyDigest ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Security & Auth */}
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-gray-800 pb-4">
              <Shield className="text-rose-400" /> Security Guardrails
            </h3>

            <div className="space-y-4 mt-4">
              <div className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800">
                <div>
                  <h4 className="text-xs font-bold text-white">Two-Factor Authentication (2FA)</h4>
                  <p className="text-[11px] text-gray-400">Require TOTP code upon every portal login</p>
                </div>
                <button 
                  onClick={() => setTwoFactor(!twoFactor)}
                  className={`w-12 h-6 rounded-full p-1 transition-colors ${twoFactor ? 'bg-rose-600' : 'bg-gray-800'}`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${twoFactor ? 'translate-x-6' : ''}`} />
                </button>
              </div>

              <div className="p-4 bg-gray-950 rounded-2xl border border-gray-800 flex justify-between items-center">
                <div>
                  <h4 className="text-xs font-bold text-white">Password Management</h4>
                  <p className="text-[11px] text-gray-400">Last updated 30 days ago</p>
                </div>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-xl text-xs font-bold border border-gray-700">
                  Change Password
                </button>
              </div>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 mt-6"
          >
            <Save size={16} /> Save Preferences
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
