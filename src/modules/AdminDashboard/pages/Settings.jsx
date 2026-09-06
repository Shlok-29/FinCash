import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings as SettingsIcon, ShieldCheck, Key, Server, Lock, Save, CheckCircle2 } from 'lucide-react';

const AdminSettings = () => {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [debugLogs, setDebugLogs] = useState(true);
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
      <div>
        <div className="flex items-center gap-2 text-rose-400 text-xs font-black uppercase tracking-widest mb-1">
          <SettingsIcon size={16} /> Global System Configuration
        </div>
        <h1 className="text-3xl font-black font-outfit text-white">Admin Settings</h1>
        <p className="text-gray-400 text-sm">Configure system maintenance parameters, API quotas, and backend integrations.</p>
      </div>

      {saved && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-400 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 size={18} /> Admin system settings saved.
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl">
          <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-4 flex items-center gap-2">
            <Server className="text-rose-400" /> Platform Maintenance Controls
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800">
              <div>
                <h4 className="text-xs font-bold text-white">Maintenance Mode</h4>
                <p className="text-[11px] text-gray-400">Restrict non-admin access for scheduled upgrades</p>
              </div>
              <button 
                onClick={() => setMaintenanceMode(!maintenanceMode)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${maintenanceMode ? 'bg-rose-600' : 'bg-gray-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${maintenanceMode ? 'translate-x-6' : ''}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-950 rounded-2xl border border-gray-800">
              <div>
                <h4 className="text-xs font-bold text-white">Verbose Telemetry Logging</h4>
                <p className="text-[11px] text-gray-400">Log all incoming Express and FastAPI requests</p>
              </div>
              <button 
                onClick={() => setDebugLogs(!debugLogs)}
                className={`w-12 h-6 rounded-full p-1 transition-colors ${debugLogs ? 'bg-rose-600' : 'bg-gray-800'}`}
              >
                <div className={`w-4 h-4 rounded-full bg-white transition-transform ${debugLogs ? 'translate-x-6' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 space-y-6 shadow-2xl flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-bold text-white border-b border-gray-800 pb-4 flex items-center gap-2">
              <Key className="text-amber-400" /> API Gateway Secret Rotation
            </h3>

            <div className="space-y-4 mt-4">
              <div className="p-4 bg-gray-950 rounded-2xl border border-gray-800">
                <span className="text-[10px] text-gray-500 font-black uppercase block mb-1">JWT Secret Token</span>
                <span className="text-xs font-mono font-bold text-rose-400">fincash_secret_key_prod_v2</span>
              </div>
              <button className="w-full py-3 bg-gray-800 hover:bg-gray-700 text-white font-bold text-xs rounded-xl border border-gray-700">
                Rotate JWT Key
              </button>
            </div>
          </div>

          <button 
            onClick={handleSave}
            className="w-full py-4 bg-rose-600 hover:bg-rose-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-rose-600/20 flex items-center justify-center gap-2 mt-6"
          >
            <Save size={16} /> Save Admin Settings
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminSettings;
