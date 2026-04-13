import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { Save, RefreshCw, Ban } from 'lucide-react';
import { settingsData } from '../data/sampleData';

const Toggle = ({ label, checked, onChange }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', border: '1px solid var(--border)' }}>
    <span style={{ fontWeight: 500 }}>{label}</span>
    <div 
      onClick={onChange}
      style={{
        width: '45px', height: '24px', borderRadius: '12px',
        background: checked ? 'var(--brand-primary)' : 'rgba(255,255,255,0.1)', cursor: 'pointer', position: 'relative', transition: '0.3s'
      }}
    >
      <div style={{ width: '20px', height: '20px', background: checked ? '#000' : '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: checked ? '23px' : '2px', transition: '0.3s' }} />
    </div>
  </div>
);

const Settings = () => {
  const [aiEnabled, setAiEnabled] = useState(settingsData.aiToggle);
  const [anomaly, setAnomaly] = useState(settingsData.anomalyToggle);
  const [alerts, setAlerts] = useState(settingsData.realtimeAlerts);
  const [voice, setVoice] = useState(settingsData.voiceAlerts);
  const [threshold, setThreshold] = useState(settingsData.confidenceThreshold * 100);
  const [maxReq, setMaxReq] = useState(settingsData.maxReqPerMin);
  const [autoBlock, setAutoBlock] = useState(settingsData.autoBlockViolations);
  
  const [blocked, setBlocked] = useState(settingsData.blockedIps);

  const unblock = (ip) => {
    setBlocked(blocked.filter(b => b.ip !== ip));
    toast.success(`Removed IP ${ip} from permanent ban list.`);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h2>System Settings & Firewall Directives</h2>
        <p style={{ color: 'var(--text-muted)' }}>Configure strictness and network interception policies.</p>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Core Defense Modules</h3>
        <Toggle label="Enable VertexGuard NLP Engine Classifier" checked={aiEnabled} onChange={() => setAiEnabled(!aiEnabled)} />
        <Toggle label="Enable Anomaly Threat Detection" checked={anomaly} onChange={() => setAnomaly(!anomaly)} />
        <Toggle label="Enable Real-Time Intrustion Alerts" checked={alerts} onChange={() => setAlerts(!alerts)} />
        <Toggle label="Enable Verbal Voice Annotations" checked={voice} onChange={() => setVoice(!voice)} />
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Ruleset Parameters</h3>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Confidence Action Threshold <span style={{ color: '#fff', fontWeight: 'bold' }}>{(threshold/100).toFixed(2)}</span></label>
          <input type="range" min="50" max="95" value={threshold} onChange={(e) => setThreshold(e.target.value)} style={{ width: '100%', accentColor: 'var(--brand-primary)' }} />
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>Intents scored above this confidence will automatically trigger blocking policies.</p>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Max Requests per IP (per minute)</label>
            <input type="number" value={maxReq} onChange={(e)=>setMaxReq(e.target.value)} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Auto-ban after Violations</label>
            <input type="number" value={autoBlock} onChange={(e)=>setAutoBlock(e.target.value)} />
          </div>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Alert Webhook Integrations</h3>
        <input type="text" defaultValue={settingsData.webhookUrl} />
        <button className="btn-secondary" style={{ width: 'fit-content' }} onClick={() => toast.success("Test ping dispatched to webhook URL.")}>Test Dispatch</button>
      </div>

      <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <h3>Active Static Blocklist ({blocked.length})</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {blocked.map(b => (
            <div key={b.ip} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Ban size={16} color="var(--danger)" />
                <span style={{ fontWeight: 'bold' }}>{b.ip}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Ban date: {b.added}</span>
              </div>
              <button className="btn-secondary" style={{ padding: '0.3rem 0.6rem', fontSize: '0.8rem' }} onClick={() => unblock(b.ip)}>Unblock</button>
            </div>
          ))}
          {blocked.length === 0 && <span style={{ color: 'var(--text-muted)' }}>No static IPs blocked.</span>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <button className="btn-primary" onClick={() => toast.success("Security Policies Saved and Broadcasted to Edge Nodes!")}><Save size={18} /> Deploy Policies</button>
        <button className="btn-danger" onClick={() => window.confirm("Reset entire ruleset?") && toast("Reset to structural defaults.")}><RefreshCw size={18} /> Reset Factory Constraints</button>
      </div>
    </div>
  );
};
export default Settings;
