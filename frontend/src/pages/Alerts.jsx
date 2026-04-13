import React, { useState } from 'react';
import { Bell, Trash2, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { alertsData } from '../data/sampleData';

const Alerts = () => {
  const [alerts, setAlerts] = useState(alertsData.alerts);

  const markRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
    toast.success("All notifications marked as read.");
  };

  const clearAll = () => {
    setAlerts([]);
    toast.error("Alert history wiped.");
  };

  const dismiss = (id) => {
    setAlerts(alerts.filter(a => a.id !== id));
  };

  const severityColors = {
    'CRITICAL': 'var(--danger)',
    'WARNING': 'var(--warning)',
    'INFO': 'var(--brand-primary)'
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Bell size={24} color="var(--brand-primary)" /> System Notifications
            {alerts.filter(a => !a.read).length > 0 && (
              <span style={{ background: 'var(--danger)', color: '#fff', fontSize: '12px', padding: '2px 8px', borderRadius: '10px', marginLeft: '0.5rem' }}>
                {alerts.filter(a => !a.read).length} Unread
              </span>
            )}
          </h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={markRead}>Mark All Read</button>
          <button className="btn-danger" onClick={clearAll}><Trash2 size={16} /> Clear All</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AnimatePresence>
          {alerts.map(a => (
            <motion.div 
              key={a.id}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 100 }}
              className="card"
              style={{ padding: '1.2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: a.read ? 0.6 : 1, borderLeft: `4px solid ${severityColors[a.severity]}` }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '0.4rem' }}>
                  <span className={`badge`} style={{ background: severityColors[a.severity], color: a.severity === 'WARNING' ? '#000' : '#fff' }}>{a.severity}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{a.time} - {a.type} | IP: {a.ip}</span>
                </div>
                <div style={{ fontWeight: 600, color: '#fff', marginTop: '0.5rem' }}>{a.message}</div>
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem' }} onClick={() => toast(`Viewing Alert Profile: #${a.id}`)}>View Event</button>
                <button className="btn-secondary" style={{ padding: '0.4rem 0.8rem', opacity: 0.5 }} onClick={() => dismiss(a.id)}>Dismiss</button>
              </div>
            </motion.div>
          ))}
          {alerts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.02)', borderRadius: '12px' }}>
              <ShieldAlert size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
              <h3>Notification Center Empty</h3>
              <p>No recent alerts across the cluster.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
export default Alerts;
