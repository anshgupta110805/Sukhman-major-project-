import React from 'react';
import { Download, Share2, TrendingUp, Target } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, PieChart, Pie, Cell, LineChart, Line, BarChart, Bar } from 'recharts';
import toast from 'react-hot-toast';
import { analyticsData } from '../data/sampleData';

const COLORS = ['#ff3366', '#f1c40f', '#00f5ff', '#ff8c00'];

const Analytics = () => {
  const { weeklyViolations, topAttackers, accuracyOverTime, violationTypes, detectionRate } = analyticsData;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Analytics & Threat Intelligence</h2>
          <p style={{ color: 'var(--text-muted)' }}>Advanced correlation of vector pathways and AI modeling.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={() => { toast.success("Secure sharing link copied!"); }}><Share2 size={16} /> Share Link</button>
          <button className="btn-primary" onClick={() => toast.success("PDF Report compilation started...")}><Download size={16} /> Generate Executive PDF</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Weekly Violations</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            117 <TrendingUp size={18} color="var(--danger)" />
          </div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Latest Detection Rate Accuracy</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            97% <Target size={18} color="var(--success)" />
          </div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Most Targeted Exploit</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--danger)' }}>
            Media Piracy
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Weekly Area Chart */}
        <div className="card" style={{ height: '350px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Weekly Violations Trend</h3>
          <ResponsiveContainer width="100%" height="80%">
            <AreaChart data={weeklyViolations}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" />
              <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
              <Area type="monotone" dataKey="violations" stroke="var(--danger)" fill="rgba(255,51,102,0.3)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Attacker IP Bar Chart */}
        <div className="card" style={{ height: '350px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Top 5 Attacker IPs</h3>
          <ResponsiveContainer width="100%" height="80%">
            <BarChart data={topAttackers} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis type="number" stroke="var(--text-muted)" />
              <YAxis type="category" dataKey="ip" stroke="var(--text-muted)" width={110} fontSize={12} />
              <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
              <Bar dataKey="attempts" fill="var(--warning)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Accuracy Over time Line */}
        <div className="card" style={{ height: '350px' }}>
          <h3 style={{ marginBottom: '1rem' }}>Intent Accuracy Over Time</h3>
          <ResponsiveContainer width="100%" height="80%">
            <LineChart data={accuracyOverTime}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" stroke="var(--text-muted)" />
              <YAxis stroke="var(--text-muted)" domain={[85, 100]} />
              <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
              <Line type="monotone" dataKey="accuracy" stroke="var(--success)" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Breakdown & Detection Trend */}
        <div className="card" style={{ height: '350px', display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <h3 style={{ marginBottom: '1rem' }}>Violation Types Breakdown</h3>
            <ResponsiveContainer width="100%" height="70%">
              <PieChart>
                <Pie data={violationTypes} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={5} dataKey="value">
                  {violationTypes.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ display: 'grid', gridTemplateColumns: 'min-content auto', gap: '0.5rem', fontSize: '0.75rem', marginTop: '1rem' }}>
              {violationTypes.map(v => (
                <React.Fragment key={v.name}>
                  <div style={{ width: '10px', height: '10px', background: v.color, borderRadius: '50%', marginTop: '3px' }}></div>
                  <div style={{ whiteSpace: 'nowrap'}}>{v.name} ({v.value}%)</div>
                </React.Fragment>
              ))}
            </div>
          </div>
          <div style={{ flex: 1, borderLeft: '1px solid var(--border)', paddingLeft: '1rem' }}>
            <h3 style={{ marginBottom: '1rem' }}>Detection Rate Trend</h3>
            <ResponsiveContainer width="100%" height="70%">
              <LineChart data={detectionRate}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" hide />
                <YAxis stroke="var(--text-muted)" domain={[80, 100]} hide />
                <Tooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
                <Line type="stepAfter" dataKey="rate" stroke="var(--brand-primary)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '1rem'}}>
              Improving from 89% to 97% over the last 7 days.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Analytics;
