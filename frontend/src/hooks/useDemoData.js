import { useState, useEffect } from 'react';

export function useDemoData() {
  const [auditLogs, setAuditLogs] = useState([]);
  const [stats, setStats] = useState({ total: 0, violations: 0 });
  const [threatLevel, setThreatLevel] = useState('LOW');
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // 1. Loads sample_data.json on mount
    fetch('/sample_data.json')
      .then(res => res.json())
      .then(data => {
        // Assume first 50 items just to populate the state initially
        setAuditLogs(data.slice(0, 50));
        setStats({
          total: data.length,
          violations: data.filter(d => d.is_violation).length
        });
      })
      .catch(err => console.error("Could not load sample_data.json", err));
  }, []);

  useEffect(() => {
    // 2. Adds new entry every 3 seconds (Normal)
    const normalInterval = setInterval(() => {
      const newNormal = {
        id: `demo_norm_${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: `DemoUser_${Math.floor(Math.random() * 1000)}`,
        action: 'View',
        data_accessed: 'Dashboard',
        intent: 'Marketing',
        confidence: 0.95,
        anomaly_score: 0.05,
        ip_address: '192.168.1.100',
        is_violation: false,
        escalated: false,
        threat_level: 'LOW',
        violation_type: 'None',
        country: 'US',
        response_time_ms: 120
      };

      setAuditLogs(prev => [newNormal, ...prev].slice(0, 500));
      setStats(prev => ({ ...prev, total: prev.total + 1 }));
    }, 3000);

    // 3. Adds violation every 10 seconds
    const violationInterval = setInterval(() => {
      const newViolation = {
        id: `demo_viol_${Date.now()}`,
        timestamp: new Date().toISOString(),
        user: `DemoHacker_${Math.floor(Math.random() * 1000)}`,
        action: 'Download',
        data_accessed: 'MediaFiles',
        intent: 'Piracy',
        confidence: 0.99,
        anomaly_score: 0.95,
        ip_address: '45.33.22.11',
        is_violation: true,
        escalated: true,
        threat_level: 'HIGH',
        violation_type: 'Media Piracy',
        country: 'RU',
        response_time_ms: 350
      };

      setAuditLogs(prev => [newViolation, ...prev].slice(0, 500));
      setStats(prev => ({ 
        total: prev.total + 1, 
        violations: prev.violations + 1 
      }));
      setThreatLevel('HIGH');
      setAlerts(prev => [{
        id: Date.now(),
        message: 'High priority piracy attempt detected',
        time: new Date().toLocaleTimeString()
      }, ...prev].slice(0, 10));

      // Reset threat level back to original after some time if we want to add that
      setTimeout(() => setThreatLevel('LOW'), 5000);
      
    }, 10000);

    return () => {
      clearInterval(normalInterval);
      clearInterval(violationInterval);
    };
  }, []);

  return { auditLogs, stats, threatLevel, alerts };
}
