import React, { useState } from 'react';
import { Download, Search, Trash2, Eye } from 'lucide-react';
import toast from 'react-hot-toast';
import { auditLogsData } from '../data/sampleData';

const AuditLogs = () => {
  const [logs] = useState(auditLogsData.logs);
  const [search, setSearch] = useState('');
  const [filterIntent, setFilterIntent] = useState('All');
  const [page, setPage] = useState(1);
  const itemsPerPage = 20;

  const filtered = logs.filter(l => {
    const s = search.toLowerCase();
    const matchSearch = (l.ip || '').toLowerCase().includes(s) || (l.payload || '').toLowerCase().includes(s);
    const matchIntent = filterIntent === 'All' || l.intent === filterIntent;
    return matchSearch && matchIntent;
  });

  const paginated = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const handleExportCSV = () => {
    toast.success("Audit log exported as CSV.");
  };

  const handleClearLogs = () => {
    toast.error("Logs cannot be physically cleared in demo mode.");
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Audit Logs</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn-secondary" onClick={handleExportCSV}><Download size={16} /> Export CSV</button>
          <button className="btn-danger" onClick={handleClearLogs}><Trash2 size={16} /> Clear Logs</button>
        </div>
      </div>

      <div className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <Search size={18} style={{ position: 'absolute', top: '12px', left: '12px', color: 'var(--text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search IPs, Payloads..." 
            value={search} 
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            style={{ paddingLeft: '2.5rem', width: '100%' }}
          />
        </div>
        <select value={filterIntent} onChange={e => { setFilterIntent(e.target.value); setPage(1); }} style={{ width: '200px' }}>
          <option value="All">All Intents</option>
          <option value="Marketing">Marketing</option>
          <option value="Medical">Medical</option>
          <option value="Billing">Billing</option>
          <option value="Piracy">Piracy</option>
        </select>
      </div>

      <div className="card">
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>IP & Country</th>
                <th>Payload Preview</th>
                <th>Intent</th>
                <th>Confidence</th>
                <th>Status & Type</th>
                <th>Threat</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(l => (
                <tr key={l.id} style={{ background: l.is_violation ? 'rgba(255,51,102,0.05)' : 'transparent' }}>
                  <td style={{ color: 'var(--text-muted)' }}>{new Date(l.timestamp).toLocaleString()}</td>
                  <td>
                    <div>{l.ip}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{l.country}</div>
                  </td>
                  <td style={{ maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.payload}</td>
                  <td><span className={`badge badge-${l.intent || 'UNCERTAIN'}`}>{l.intent}</span></td>
                  <td>{(l.confidence * 100).toFixed(0)}%</td>
                  <td>
                    {l.is_violation ? <span style={{ color: 'var(--danger)', fontWeight: 'bold' }}>BLOCKED</span> : <span style={{ color: 'var(--success)' }}>ALLOWED</span>}
                    {l.is_violation && <div style={{ fontSize: '0.75rem', color: 'var(--danger)' }}>{l.violation_type}</div>}
                  </td>
                  <td>
                     {l.threat_level === "CRITICAL" && <span className="badge badge-Piracy">CRITICAL</span>}
                     {l.threat_level === "HIGH" && <span className="badge badge-Billing">HIGH</span>}
                     {l.threat_level === "LOW" && <span className="badge badge-Medical">LOW</span>}
                  </td>
                  <td><button className="btn-secondary" onClick={() => toast("Details slide-out demo popup")}><Eye size={16} /></button></td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No records found</td></tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '1px solid var(--border)', paddingTop: '1rem' }}>
          <span style={{ color: 'var(--text-muted)' }}>Showing {paginated.length} of {filtered.length} entries (Total: 50)</span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" disabled={page === 1} onClick={() => setPage(page-1)}>Prev</button>
            <span style={{ padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}>Page {page} of {totalPages || 1}</span>
            <button className="btn-secondary" disabled={page >= totalPages} onClick={() => setPage(page+1)}>Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuditLogs;
