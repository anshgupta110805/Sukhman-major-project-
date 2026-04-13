import React, { useState } from 'react';
import { Share2, Code, ShieldAlert, Cpu, Activity, LayoutGrid } from 'lucide-react';
import toast from 'react-hot-toast';
import { networkGraphData } from '../data/sampleData';

const NetworkGraph = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedNode, setSelectedNode] = useState(null);
  
  const { nodes, links } = networkGraphData;

  // Fixed appealing layout for demo purposes since we don't have force graph library
  const nodePositions = {
    'ip_1': { x: 200, y: 150 }, 'ip_2': { x: 280, y: 100 }, 'ip_3': { x: 350, y: 170 }, 'ip_4': { x: 250, y: 250 }, // Cluster 1
    'ip_5': { x: 600, y: 120 }, 'ip_6': { x: 700, y: 100 }, 'ip_7': { x: 670, y: 200 }, // Cluster 2
    'ip_8': { x: 220, y: 400 }, 'ip_9': { x: 320, y: 450 }, // Cluster 3
    // Clean IPs
    'ip_10': { x: 500, y: 350 }, 'ip_11': { x: 550, y: 450 }, 'ip_12': { x: 700, y: 350 },
    'ip_13': { x: 750, y: 450 }, 'ip_14': { x: 800, y: 250 }, 'ip_15': { x: 450, y: 250 }
  };

  const getNodeColor = (type) => {
    switch (type) {
      case 'attacker': return 'var(--danger)';
      case 'suspicious': return 'var(--warning)';
      default: return 'var(--success)';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2>Threat Topology Graph</h2>
          <p style={{ color: 'var(--text-muted)' }}>NetworkX behavioral correlation bridging IP clusters.</p>
        </div>
        <button className="btn-secondary" onClick={() => setAnalyzing(true) || setTimeout(() => setAnalyzing(false), 2000)}>
          <Code size={16} /> Reconstruct Nodes
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 1fr) 300px', gap: '1.5rem', flex: 1 }}>
        <div className="card" style={{ minHeight: '600px', position: 'relative', overflow: 'hidden', padding: 0 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 80%)' }} />
          
          {analyzing ? (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <span className="loaderSpinner" style={{ width: '40px', height: '40px', borderWidth: '4px', borderTopColor: 'var(--accent-purple)' }}></span>
              <span style={{ color: 'var(--text-muted)' }}>Executing Graph Construction Algorithm...</span>
            </div>
          ) : (
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
              {/* Draw Edges */}
              {links.map((link, i) => {
                const source = nodePositions[link.source];
                const target = nodePositions[link.target];
                return (
                  <g key={`link_${i}`}>
                    <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} stroke="var(--border)" strokeWidth="2" strokeDasharray="4 4" />
                    <text x={(source.x + target.x) / 2} y={(source.y + target.y) / 2 - 5} fill="var(--text-muted)" fontSize="10" textAnchor="middle">
                      {link.label}
                    </text>
                  </g>
                );
              })}
              
              {/* Draw Nodes */}
              {nodes.map(node => {
                const pos = nodePositions[node.id];
                const isActive = selectedNode?.id === node.id;
                const color = getNodeColor(node.type);
                return (
                  <g 
                    key={node.id} 
                    transform={`translate(${pos.x}, ${pos.y})`} 
                    style={{ cursor: 'pointer' }}
                    onClick={() => setSelectedNode(node)}
                  >
                    {isActive && <circle r="25" fill={color} opacity="0.2" className="pulse-fast" />}
                    <circle r="15" fill={color} stroke="#000" strokeWidth="3" />
                    <text y="25" fill="#fff" fontSize="12" fontWeight="600" textAnchor="middle" filter="drop-shadow(0px 2px 2px rgba(0,0,0,0.8))">
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          )}

          {/* Legend */}
          <div style={{ position: 'absolute', bottom: '20px', left: '20px', background: 'var(--nav-bg)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--danger)' }}></div> Attacker Nodes</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--warning)' }}></div> Suspicious</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}><div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'var(--success)' }}></div> Clean Nodes</div>
          </div>
        </div>

        {/* Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><LayoutGrid size={18} /> Cluster Analysis</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
              <div style={{ padding: '0.8rem', background: 'rgba(255,51,102,0.1)', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                <strong style={{ display: 'block', color: 'var(--danger)' }}>Cluster 1 (Media Piracy)</strong>
                4 coordinating IPs attempting parallel media downloads.
              </div>
              <div style={{ padding: '0.8rem', background: 'rgba(241,196,15,0.1)', borderRadius: '8px', borderLeft: '3px solid var(--warning)' }}>
                <strong style={{ display: 'block', color: 'var(--warning)' }}>Cluster 2 (Scraping Ring)</strong>
                3 suspect IPs iterating through user profile endpoints.
              </div>
              <div style={{ padding: '0.8rem', background: 'rgba(255,51,102,0.1)', borderRadius: '8px', borderLeft: '3px solid var(--danger)' }}>
                <strong style={{ display: 'block', color: 'var(--danger)' }}>Cluster 3 (Auth Attack)</strong>
                2 IPs sharing SQL injection payloads.
              </div>
              <div style={{ padding: '0.8rem', background: 'rgba(0,255,136,0.1)', borderRadius: '8px', borderLeft: '3px solid var(--success)' }}>
                <strong style={{ display: 'block', color: 'var(--success)' }}>6 Independent Queries</strong>
                Normal isolated organic traffic flow.
              </div>
            </div>
          </div>

          {selectedNode && (
            <div className="card" style={{ borderColor: getNodeColor(selectedNode.type) }}>
              <h3 style={{ marginBottom: '1rem', color: getNodeColor(selectedNode.type) }}>Node Inspector</h3>
              <p><strong>IP Address:</strong> {selectedNode.label}</p>
              <p><strong>Vector Class:</strong> {selectedNode.type.toUpperCase()}</p>
              <p><strong>Total Requests:</strong> {selectedNode.type === 'attacker' ? 142 : selectedNode.type === 'suspicious' ? 64 : 12}</p>
              <p><strong>Violations Logged:</strong> {selectedNode.type === 'attacker' ? 24 : selectedNode.type === 'suspicious' ? 5 : 0}</p>
              <p><strong>Origin Country:</strong> {['US', 'RU', 'IN', 'BR'][Math.floor(Math.random() * 4)]}</p>
              <p><strong>First Seen:</strong> 4 hours ago</p>
              <p><strong>Last Seen:</strong> 2 mins ago</p>
              <button className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }} onClick={() => setSelectedNode(null)}>Dismiss Viewer</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default NetworkGraph;
