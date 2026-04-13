import React, { useState } from 'react';
import { Download, RefreshCw } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import toast from 'react-hot-toast';
import { aiEngineData } from '../data/sampleData';

const AIEngineMonitor = () => {
  const [isRetraining, setIsRetraining] = useState(false);
  const { modelName, accuracy, totalPredictions, avgConfidence, lastTrained, anomalyScore, confidenceDist, intentBreakdown, livePredictions } = aiEngineData;

  const handleRetrain = () => {
    setIsRetraining(true);
    setTimeout(() => {
      setIsRetraining(false);
      toast.success("Model retrained successfully on new behavioral data traces.");
    }, 3000);
  };

  const handleExport = () => {
    const report = { modelName, accuracyEstimate: accuracy, timestamp: new Date() };
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'model_report.json'; a.click();
    toast.success("Model configuration exported.");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>AI Engine Monitor</h2>
          <p style={{ color: 'var(--text-muted)' }}>DistilBERT & Isolation Forest Subsystems</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={handleExport}><Download size={16} /> Export Model State</button>
          <button className="btn-primary" onClick={handleRetrain} disabled={isRetraining}>
            {isRetraining ? <span className="loaderSpinner"></span> : <RefreshCw size={16} />} 
            {isRetraining ? 'Retraining Weights...' : 'Retrain Pipeline'}
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1.5rem' }}>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Active Model</div>
          <div style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--brand-primary)', marginTop: '0.5rem' }}>{modelName}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Internal Accuracy Estimate</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.5rem' }}>{accuracy}%</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Total Predictions Today</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem' }}>{totalPredictions}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Average Confidence</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '0.5rem', color: 'var(--success)' }}>{avgConfidence}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Last Retrained</div>
          <div style={{ fontSize: '1.2rem', fontWeight: 600, marginTop: '0.5rem' }}>{lastTrained}</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Chart */}
          <div className="card" style={{ height: '350px' }}>
            <h3>Confidence Threshold Distribution</h3>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart data={confidenceDist}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="range" stroke="var(--text-muted)" />
                <YAxis stroke="var(--text-muted)" allowDecimals={false} />
                <RechartsTooltip contentStyle={{ background: 'var(--nav-bg)', border: '1px solid var(--border)' }} />
                <Bar dataKey="count" fill="var(--accent-purple)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          <div className="card">
            <h3>Intent Breakdown</h3>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              {intentBreakdown.map(i => (
                <div key={i.intent}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <span>{i.intent}</span>
                    <span style={{ fontWeight: 'bold' }}>{i.percentage}%</span>
                  </div>
                  <div className="progress-container" style={{ width: '100%', height: '8px' }}>
                    <div className="progress-bar" style={{ width: `${i.percentage}%`, background: i.color }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', textAlign: 'center' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.5rem' }}>Current Global Anomaly Score Gauge</div>
              <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--danger)' }}>{anomalyScore}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ height: '100%', overflowY: 'auto', maxHeight: '750px' }}>
          <h3>Live NLP Inference Feed</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
            {livePredictions.map(log => (
              <div key={log.id} style={{ padding: '1rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', borderLeft: log.confidence > 0.7 ? '3px solid var(--success)' : '3px solid var(--warning)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 600 }}>{log.payload}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{Math.round(log.confidence * 100)}% Confidence | {log.time}</span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Determined Intent: <strong className={`badge badge-${log.intent}`} style={{ marginLeft: '10px' }}>{log.intent}</strong></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AIEngineMonitor;
