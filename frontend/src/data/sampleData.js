export const dashboardData = {
  totalScans: 1247,
  violationsBlocked: 89,
  activeThreatAgents: 3,
  systemUptime: 99.7,
  threatLevel: "HIGH",
  trafficVelocity: [
    { time: "10 min ago", count: 12 },
    { time: "9 min ago", count: 8 },
    { time: "8 min ago", count: 15 },
    { time: "7 min ago", count: 22 },
    { time: "6 min ago", count: 18 },
    { time: "5 min ago", count: 35 },
    { time: "4 min ago", count: 42 },
    { time: "3 min ago", count: 45 },
    { time: "2 min ago", count: 38 },
    { time: "1 min ago", count: 28 },
    { time: "Now", count: 14 }
  ],
  intentDistribution: [
    { name: "Marketing", value: 423, color: '#00f5ff' },
    { name: "Billing", value: 287, color: '#f1c40f' },
    { name: "Medical", value: 156, color: '#00ff88' },
    { name: "Piracy", value: 381, color: '#ff3366' }
  ],
  liveAuditTrail: [
    { id: "log_1", timestamp: new Date(Date.now() - 1000).toISOString(), user: "User_482", ip: "192.168.1.55", intent: "Marketing", confidence: 0.95, anomaly: 0.05, violation: false },
    { id: "log_2", timestamp: new Date(Date.now() - 3000).toISOString(), user: "Bot_Attacker", ip: "45.33.12.87", intent: "Piracy", confidence: 0.99, anomaly: 0.96, violation: true, type: "Media Piracy" },
    { id: "log_3", timestamp: new Date(Date.now() - 5000).toISOString(), user: "User_911", ip: "10.0.0.14", intent: "Medical", confidence: 0.92, anomaly: 0.12, violation: false },
    { id: "log_4", timestamp: new Date(Date.now() - 8000).toISOString(), user: "Anon_Scraper", ip: "103.44.21.9", intent: "Marketing", confidence: 0.78, anomaly: 0.88, violation: true, type: "Data Scraping" },
    { id: "log_5", timestamp: new Date(Date.now() - 12000).toISOString(), user: "User_333", ip: "192.168.1.101", intent: "Billing", confidence: 0.96, anomaly: 0.02, violation: false },
    { id: "log_6", timestamp: new Date(Date.now() - 15000).toISOString(), user: "Hacker_X", ip: "91.108.4.12", intent: "Piracy", confidence: 0.91, anomaly: 0.94, violation: true, type: "Software Piracy" },
    { id: "log_7", timestamp: new Date(Date.now() - 18000).toISOString(), user: "User_771", ip: "192.168.1.102", intent: "Billing", confidence: 0.98, anomaly: 0.04, violation: false },
    { id: "log_8", timestamp: new Date(Date.now() - 22000).toISOString(), user: "Unknown", ip: "185.220.101.5", intent: "Medical", confidence: 0.65, anomaly: 0.99, violation: true, type: "Unauthorized Access" },
    { id: "log_9", timestamp: new Date(Date.now() - 25000).toISOString(), user: "User_112", ip: "192.168.1.55", intent: "Marketing", confidence: 0.93, anomaly: 0.08, violation: false },
    { id: "log_10", timestamp: new Date(Date.now() - 28000).toISOString(), user: "User_482", ip: "192.168.1.55", intent: "Marketing", confidence: 0.96, anomaly: 0.05, violation: false },
    { id: "log_11", timestamp: new Date(Date.now() - 32000).toISOString(), user: "User_900", ip: "10.0.0.40", intent: "Medical", confidence: 0.88, anomaly: 0.15, violation: false },
    { id: "log_12", timestamp: new Date(Date.now() - 35000).toISOString(), user: "Bot_Attacker", ip: "45.33.12.87", intent: "Piracy", confidence: 0.98, anomaly: 0.97, violation: true, type: "Media Piracy" },
    { id: "log_13", timestamp: new Date(Date.now() - 38000).toISOString(), user: "User_333", ip: "192.168.1.101", intent: "Billing", confidence: 0.97, anomaly: 0.03, violation: false },
    { id: "log_14", timestamp: new Date(Date.now() - 41000).toISOString(), user: "Anon_Scraper", ip: "103.44.21.9", intent: "Marketing", confidence: 0.76, anomaly: 0.89, violation: true, type: "Data Scraping" },
    { id: "log_15", timestamp: new Date(Date.now() - 45000).toISOString(), user: "User_482", ip: "192.168.1.55", intent: "Marketing", confidence: 0.94, anomaly: 0.06, violation: false }
  ]
};

export const threatCenterData = {
  activeThreats: [
    { id: "t1", ip: "45.33.12.87", type: "Media Piracy", payload: "Download latest movies 4k torrent", confidence: 0.99, anomaly: 0.96, time: "2 mins ago", country: "RU" },
    { id: "t2", ip: "103.44.21.9", type: "Media Piracy", payload: "Streaming buffer chunk 299304", confidence: 0.95, anomaly: 0.92, time: "5 mins ago", country: "CN" },
    { id: "t3", ip: "91.108.4.12", type: "Media Piracy", payload: "Index of /movies/2026", confidence: 0.98, anomaly: 0.91, time: "12 mins ago", country: "BR" },
    { id: "t4", ip: "185.220.101.5", type: "Software Piracy", payload: "Cracked software keys generator", confidence: 0.91, anomaly: 0.94, time: "15 mins ago", country: "IN" },
    { id: "t5", ip: "194.165.16.8", type: "Software Piracy", payload: "Photoshop activator bypass", confidence: 0.94, anomaly: 0.89, time: "22 mins ago", country: "US" },
    { id: "t6", ip: "203.45.12.9", type: "Data Scraping", payload: "Scraping all user profiles in parallel", confidence: 0.78, anomaly: 0.98, time: "25 mins ago", country: "DE" },
    { id: "t7", ip: "88.99.100.22", type: "Data Scraping", payload: "Bulk product export JSON format", confidence: 0.75, anomaly: 0.95, time: "30 mins ago", country: "UK" },
    { id: "t8", ip: "45.12.33.99", type: "Unauthorized Access", payload: "Access admin panel missing token", confidence: 0.65, anomaly: 0.99, time: "42 mins ago", country: "FR" }
  ],
  blockedIps: [
    { ip: "5.188.210.22", reason: "Repeated Media Piracy", time: "1 hour ago" },
    { ip: "94.156.71.144", reason: "SQL Injection Attempts", time: "3 hours ago" },
    { ip: "185.191.171.3", reason: "Velocity Data Scraping", time: "5 hours ago" },
    { ip: "45.130.229.11", reason: "Software Piracy Payload", time: "Yesterday" },
    { ip: "104.244.75.22", reason: "Auth Bypass Attempt", time: "Yesterday" }
  ],
  threatTimeline: [
    { hour: "00:00", violations: 2 }, { hour: "02:00", violations: 5 },
    { hour: "04:00", violations: 12 }, { hour: "06:00", violations: 8 },
    { hour: "08:00", violations: 15 }, { hour: "10:00", violations: 25 },
    { hour: "12:00", violations: 45 }, { hour: "14:00", violations: 60 },
    { hour: "16:00", violations: 30 }, { hour: "18:00", violations: 18 },
    { hour: "20:00", violations: 8 }, { hour: "22:00", violations: 4 }
  ]
};

export const aiEngineData = {
  modelName: "VertexGuard Classifier v2.1",
  accuracy: 94.7,
  totalPredictions: 1247,
  avgConfidence: 0.847,
  lastTrained: "2 days ago",
  anomalyScore: 0.73,
  confidenceDist: [
    { range: "< 0.5", count: 12 },
    { range: "0.5-0.6", count: 45 },
    { range: "0.6-0.7", count: 89 },
    { range: "0.7-0.75", count: 150 },
    { range: "0.75-0.8", count: 210 },
    { range: "0.8-0.85", count: 280 },
    { range: "0.85-0.9", count: 240 },
    { range: "0.9-0.95", count: 180 },
    { range: "0.95+", count: 41 }
  ],
  intentBreakdown: [
    { intent: "Marketing", percentage: 33.9, color: "#00f5ff" },
    { intent: "Billing", percentage: 23.0, color: "#f1c40f" },
    { intent: "Medical", percentage: 12.5, color: "#00ff88" },
    { intent: "Piracy", percentage: 30.6, color: "#ff3366" }
  ],
  livePredictions: Array.from({length: 20}).map((_, i) => ({
    id: `pred_${i}`,
    payload: i % 4 === 0 ? "Download latest movies torrent 4k HD" : (i % 3 === 0 ? "Select * from users bypass auth" : "Fetch standard dashboard records"),
    intent: i % 4 === 0 ? "Piracy" : (i%3===0 ? "Medical" : "Marketing"),
    confidence: i % 4 === 0 ? 0.98 : (i%3===0 ? 0.65 : 0.95),
    time: `${i*2}s ago`
  }))
};

export const auditLogsData = {
  logs: Array.from({length: 50}).map((_, i) => {
    const isViolation = i % 7 === 0 || i % 11 === 0 || i % 13 === 0;
    const types = ["Media_Piracy", "Software_Piracy", "Data_Scraping", "Unauthorized_Access"];
    
    return {
      id: `log_full_${i}`,
      timestamp: new Date(Date.now() - i * 14000).toISOString(),
      ip: `192.168.1.${(i * 13) % 255}`,
      country: i % 4 === 0 ? "US" : (i % 3 === 0 ? "UK" : (i % 5 === 0 ? "RU" : "IN")),
      payload: isViolation ? (i%2===0 ? "Extracting multiple records in loop" : "Download movies cracked") : "Normal standard access query",
      intent: isViolation ? "Piracy" : (i % 3 === 0 ? "Billing" : (i % 2 === 0 ? "Marketing" : "Medical")),
      confidence: isViolation ? 0.92 + (i%5)/100 : 0.85 + (i%10)/100,
      is_violation: isViolation,
      threat_level: isViolation ? (i % 13 === 0 ? "CRITICAL" : "HIGH") : "LOW",
      violation_type: isViolation ? types[i % 4] : "Clean"
    };
  })
};

export const networkGraphData = {
  nodes: [
    { id: 'ip_1', group: 1, label: '45.33.12.87', type: 'attacker' },
    { id: 'ip_2', group: 1, label: '103.44.21.9', type: 'attacker' },
    { id: 'ip_3', group: 1, label: '91.108.4.12', type: 'attacker' },
    { id: 'ip_4', group: 1, label: '185.220.101.5', type: 'attacker' },
    
    { id: 'ip_5', group: 2, label: '203.45.12.9', type: 'suspicious' },
    { id: 'ip_6', group: 2, label: '88.99.100.22', type: 'suspicious' },
    { id: 'ip_7', group: 2, label: '45.12.33.99', type: 'suspicious' },
    
    { id: 'ip_8', group: 3, label: '5.188.210.22', type: 'attacker' },
    { id: 'ip_9', group: 3, label: '94.156.71.144', type: 'attacker' },
    
    { id: 'ip_10', group: 4, label: '192.168.1.101', type: 'clean' },
    { id: 'ip_11', group: 4, label: '192.168.1.102', type: 'clean' },
    { id: 'ip_12', group: 4, label: '10.0.0.14', type: 'clean' },
    { id: 'ip_13', group: 4, label: '192.168.1.55', type: 'clean' },
    { id: 'ip_14', group: 4, label: '192.168.1.28', type: 'clean' },
    { id: 'ip_15', group: 4, label: '10.0.0.99', type: 'clean' }
  ],
  links: [
    { source: 'ip_1', target: 'ip_2', label: 'Shared payload' },
    { source: 'ip_2', target: 'ip_3', label: 'Shared payload' },
    { source: 'ip_3', target: 'ip_4', label: 'Same subnet' },
    { source: 'ip_4', target: 'ip_1', label: 'Timing cluster' },
    
    { source: 'ip_5', target: 'ip_6', label: 'Scraping target' },
    { source: 'ip_6', target: 'ip_7', label: 'Parallel requests' },
    
    { source: 'ip_8', target: 'ip_9', label: 'Auth bypassing' }
  ]
};

export const analyticsData = {
  weeklyViolations: [
    { day: "Mon", violations: 12 },
    { day: "Tue", violations: 18 },
    { day: "Wed", violations: 9 },
    { day: "Thu", violations: 24 },
    { day: "Fri", violations: 31 },
    { day: "Sat", violations: 15 },
    { day: "Sun", violations: 8 }
  ],
  topAttackers: [
    { ip: "45.33.12.87", attempts: 23 },
    { ip: "103.44.21.9", attempts: 18 },
    { ip: "91.108.4.12", attempts: 15 },
    { ip: "185.220.101.5", attempts: 12 },
    { ip: "194.165.16.8", attempts: 9 }
  ],
  accuracyOverTime: [
    { day: "Day 1", accuracy: 91 },
    { day: "Day 2", accuracy: 93 },
    { day: "Day 3", accuracy: 92 },
    { day: "Day 4", accuracy: 95 },
    { day: "Day 5", accuracy: 94 },
    { day: "Day 6", accuracy: 97 },
    { day: "Day 7", accuracy: 96 }
  ],
  violationTypes: [
    { name: "Media Piracy", value: 40, color: "#ff3366" },
    { name: "Software Piracy", value: 30, color: "#f1c40f" },
    { name: "Data Scraping", value: 20, color: "#00f5ff" },
    { name: "Unauthorized Access", value: 10, color: "#ff8c00" }
  ],
  detectionRate: [
    { day: "Day 1", rate: 89 },
    { day: "Day 2", rate: 90 },
    { day: "Day 3", rate: 92 },
    { day: "Day 4", rate: 93 },
    { day: "Day 5", rate: 95 },
    { day: "Day 6", rate: 96 },
    { day: "Day 7", rate: 97 }
  ]
};

export const alertsData = {
  alerts: [
    { id: 1, severity: 'CRITICAL', time: '10 mins ago', message: 'Coordinated attack detected from 3 IPs targeting data endpoints', ip: 'Multiple', type: 'DDoS/Scraping', read: false },
    { id: 2, severity: 'CRITICAL', time: '45 mins ago', message: 'SQL injection attempt blocked from IP 45.33.12.87', ip: '45.33.12.87', type: 'Unauthorized Access', read: false },
    { id: 3, severity: 'CRITICAL', time: '2 hrs ago', message: 'Media Piracy burst detected from new subset', ip: '103.44.21.9', type: 'Media Piracy', read: false },
    { id: 4, severity: 'CRITICAL', time: '3 hrs ago', message: 'Unauthorized admin panel access attempt bypassed standard headers', ip: '5.188.210.22', type: 'Unauthorized Access', read: false },
    
    { id: 5, severity: 'WARNING', time: '15 mins ago', message: 'Unusual scraping pattern detected, confidence 0.68', ip: '88.99.100.22', type: 'Data Scraping', read: true },
    { id: 6, severity: 'WARNING', time: '1 hr ago', message: 'Multiple failed access attempts on restricted zone', ip: '203.45.12.9', type: 'Suspect Scans', read: false },
    { id: 7, severity: 'WARNING', time: '4 hrs ago', message: 'Traffic velocity spiked above normal bounds (+450%)', ip: 'N/A', type: 'Anomaly', read: true },
    { id: 8, severity: 'WARNING', time: '5 hrs ago', message: 'New user agent mismatch detected for known IP', ip: '91.108.4.12', type: 'Spoofing', read: true },
    
    { id: 9, severity: 'INFO', time: '20 mins ago', message: 'New IP 203.45.12.9 flagged for monitoring', ip: '203.45.12.9', type: 'Tracking', read: true },
    { id: 10, severity: 'INFO', time: '2 hrs ago', message: 'Daily violation threshold reached', ip: 'System', type: 'Status', read: true },
    { id: 11, severity: 'INFO', time: '6 hrs ago', message: 'System model updated with new definition signatures', ip: 'System', type: 'Update', read: true },
    { id: 12, severity: 'INFO', time: '8 hrs ago', message: 'Routine database backup completed', ip: 'System', type: 'Backup', read: true }
  ]
};

export const settingsData = {
  aiToggle: true,
  anomalyToggle: true,
  realtimeAlerts: true,
  voiceAlerts: false,
  confidenceThreshold: 0.72,
  webhookUrl: "https://hooks.slack.com/demo/webhook",
  blockedIps: [
    { ip: "5.188.210.22", added: "2026-03-20" },
    { ip: "94.156.71.144", added: "2026-03-21" },
    { ip: "185.191.171.3", added: "2026-03-22" },
    { ip: "45.130.229.11", added: "2026-03-23" },
    { ip: "104.244.75.22", added: "2026-03-24" }
  ],
  maxReqPerMin: 30,
  autoBlockViolations: 5
};

export const userProfileData = {
  name: "Sukhman Singh",
  role: "Security Administrator",
  email: "sukhi@vertexguard.ai",
  department: "Cybersecurity Division",
  lastLogin: "Today 10:45 AM",
  accountCreated: "3 months ago",
  totalActions: 847,
  threatsResolved: 234,
  loginHistory: [
    { time: "Today 10:45 AM", browser: "Chrome", os: "Windows" },
    { time: "Yesterday 09:12 AM", browser: "Chrome", os: "Windows" },
    { time: "2 days ago 11:30 AM", browser: "Safari", os: "MacOS" },
    { time: "3 days ago 08:55 AM", browser: "Chrome", os: "Windows" },
    { time: "5 days ago 14:20 PM", browser: "Firefox", os: "Windows" }
  ],
  initials: "SS"
};
