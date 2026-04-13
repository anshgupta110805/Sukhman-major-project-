import React from 'react';
import { User, Shield, Key, Mail, Building, Clock, Activity, Target, Monitor } from 'lucide-react';
import toast from 'react-hot-toast';
import { userProfileData } from '../data/sampleData';

const UserProfile = () => {
  const { name, role, email, department, lastLogin, accountCreated, totalActions, threatsResolved, loginHistory, initials } = userProfileData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Security Personnel Details</h2>

      <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '2rem', padding: '2rem' }}>
        <div style={{ width: '100px', height: '100px', background: 'linear-gradient(135deg, var(--brand-primary), var(--accent-purple))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold', color: '#fff', boxShadow: '0 4px 20px rgba(0, 245, 255, 0.3)' }}>
          {initials}
        </div>
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '2rem' }}>{name}</h1>
          <p style={{ color: 'var(--brand-primary)', fontSize: '1.1rem', margin: '0.5rem 0 1rem 0', fontWeight: 'bold' }}>{role}</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Mail size={16} /> {email}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Building size={16} /> {department}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Clock size={16} /> Last active: {lastLogin}</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)' }}><Shield size={16} /> Member since: {accountCreated}</div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>Total Lifecycle Actions</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--brand-primary)' }}>{totalActions}</div>
          <Activity size={24} color="var(--brand-primary)" style={{ margin: '0 auto', opacity: 0.5 }} />
        </div>
        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>Threats Neutralized</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--success)' }}>{threatsResolved}</div>
          <Target size={24} color="var(--success)" style={{ margin: '0 auto', opacity: 0.5 }} />
        </div>
        <div className="card" style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={{ color: 'var(--text-muted)' }}>Clearance Level</div>
          <div style={{ fontSize: '2.5rem', fontWeight: 'bold', color: 'var(--warning)' }}>Tier 5</div>
          <Shield size={24} color="var(--warning)" style={{ margin: '0 auto', opacity: 0.5 }} />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Key size={18} /> Access Governance</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Maintain strict password hygiene per SOC2 regulations.</p>
          
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Current Password Verification</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>New Password Payload</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>Confirm Payload</label>
            <input type="password" placeholder="••••••••" style={{ width: '100%' }} />
          </div>

          <button className="btn-primary" style={{ width: '100%' }} onClick={() => toast.success("Identity validation success. Passkey rotated.")}>
            Rotate Credentials
          </button>
        </div>

        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Monitor size={18} /> Authentication Audit Log</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure footprint tracking for account access.</p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {loginHistory.map((l, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.8rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', borderLeft: i === 0 ? '3px solid var(--success)' : '3px solid var(--border)' }}>
                <div>
                  <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>{l.os} Platform</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Browser: {l.browser}</div>
                </div>
                <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', textAlign: 'right' }}>
                  {i===0 && <span style={{ color: 'var(--success)', display: 'block', fontWeight: 'bold', marginBottom: '4px' }}>CURRENT SESSION</span>}
                  {l.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;
