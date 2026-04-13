import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Ban, Search, CheckCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import toast from 'react-hot-toast';
import { threatCenterData } from '../data/sampleData';

const ThreatCenter = () => {
  const [threats, setThreats] = useState(threatCenterData.activeThreats);
  const [blockedIps, setBlockedIps] = useState(threatCenterData.blockedIps);
  const [investigating, setInvestigating] = useState(null);

  const blockIp = (ip) => {
    if (!blockedIps.find(b => b.ip === ip)) {
      setBlockedIps(prev => [...prev, { ip, reason: "Manual Block", time: "Just now" }]);
      toast.success(`IP ${ip} has been added to the blocklist.`);
    }
  };

  const unblockIp = (ip) => {
    setBlockedIps(prev => prev.filter(i => i.ip !== ip));
    toast.success(`IP ${ip} has been unblocked.`);
  };

  const markSafe = (id) => {
    setThreats(prev => prev.filter(t => t.id !== id));
    toast.success('Marked as safe.');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h2>Threat Center</h2>
        <p style={{ color: 'var(--text-muted)' }}>Isolate and eliminate active network intruders.</p>
      </div>

      <AnimatePresence>
        {threats.length > 5 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
            className="threat-banner"
          >
            <ShieldAlert size={36} color="var(--danger)" />
            <div>
              <h3 style={{ margin: 0, color: 'var(--danger)' }}>CRITICAL THREAT CLUSTER DETECTED</h3>
              <p style={{ margin: 0, fontSize: '0.9rem' }}>High concentration of severe policy violations originating from multiple vectors.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Threats Table */}
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ShieldAlert size={18} color="var(--warning)" /> Active Threat Vectors ({threats.length})
            </h3>
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Time</th>
                    <th>IP Address & Country</th>
                    <th>Type & Payload</th>
                    <th>Confidence</th>
                    <th>Anomaly</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {threats.map(t => (
                    <tr key={t.id}>
                      <td style={{ color: 'var(--text-muted)' }}>{t.time}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{t.ip}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t.country}</div>
                      </td>
                      <td>
                        <div style={{ color: 'var(--danger)', fontWeight: 'bold', fontSize: '0.85rem' }}>{t.type}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{t.payload}</div>
                      </td>
                      <td>{(t.confidence * 100).toFixed(0)}%</td>
                      <td>
                        <div className="progress-container" style={{ width: '60px' }}>
                          <div className="progress-bar" style={{ width: `${Math.abs(t.anomaly) * 100}%`, background: 'var(--danger)' }}></div>
                        </div>
                      </td>
                      <td style={{ display: 'flex', gap: '0.5rem' }}>
                        <button className="btn-success" style={{ padding: '0.4rem 0.6rem' }} onClick={() => markSafe(t.id)} title="Mark Safe"><CheckCircle size={16} /></button>
                        <button className="btn-secondary" style={{ padding: '0.4rem 0.6rem' }} onClick={() => setInvestigating(t)} title="Investigate"><Search size={16} /></button>
                        <button className="btn-danger" style={{ padding: '0.4rem 0.6rem' }} onClick={() => blockIp(t.ip)} title="Block IP Address"><Ban size={16} /></button>
                      </td>
                    </tr>
                  ))}
                  {threats.length === 0 && (
                    <tr><td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>No active threats. System is secure.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Chart */}
          <div className="card" style={{ height: '300px' }}>
            <h3 style={{ marginBottom: '1rem' }}>Threat Timeline (Hourly Violations - Last 24 Hrs)</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={threatCenterData.threatTimeline}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="hour" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
                <Bar dataKey="violations" fill="var(--danger)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--danger)' }}>Blocked Network Gateways ({blockedIps.length})</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <AnimatePresence>
                {blockedIps.map(b => (
                  <motion.li 
                    key={b.ip} 
                    initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                    style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.8rem', background: 'rgba(255, 51, 102, 0.05)', borderRadius: '8px', border: '1px solid var(--danger)' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600 }}><Ban size={14} color="var(--danger)" /> {b.ip}</div>
                      <button onClick={() => unblockIp(b.ip)} style={{ background: 'transparent', color: 'var(--text-muted)', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontSize: '0.8rem' }}>Unblock</button>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{b.reason}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>{b.time}</div>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </div>

      {investigating && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)', zIndex: 999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="card" style={{ width: '500px', maxWidth: '90%' }}>
            <h2>Threat Analysis Report</h2>
            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '1rem', borderRadius: '8px', marginTop: '1rem' }}>
              <p><strong>Database ID:</strong> {investigating.id}</p>
              <p><strong>IP Focus:</strong> {investigating.ip}</p>
              <p><strong>Location:</strong> {investigating.country}</p>
              <p><strong>Vector Type:</strong> {investigating.type}</p>
              <p><strong>Payload:</strong> {investigating.payload}</p>
              <p><strong>AI Confidence:</strong> {(investigating.confidence * 100).toFixed(1)}%</p>
            </div>
            <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setInvestigating(null)}>Close</button>
              <button className="btn-danger" onClick={() => { blockIp(investigating.ip); setInvestigating(null); }}>Block IP Now</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default ThreatCenter;
