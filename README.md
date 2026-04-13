# Piracy Detection System (PDS)

A high-performance, real-time security monitoring dashboard designed to identify and neutralize digital piracy threats. This system leverages advanced behavioral analysis and machine learning to distinguish between legitimate user interactions and malicious piracy activities like unauthorized distribution, scraping, and credential abuse.

## Key Features

- **Real-time Threat Monitoring**: Live dashboard showing incoming traffic and potential violation alerts.
- **AI-Driven Intent Classification**: Uses a specialized model (VertexGuard) to categorize user intent into categories like Marketing, Billing, Medical, and Piracy.
- **Advanced Analytics**: Detailed breakdown of threat distributions, top attacker IPs, and detection accuracy over time.
- **Automated Policy Enforcement**: Dynamic IP blocking and rate limiting based on detected violation patterns.
- **Network Relationship Mapping**: Visualizes connections between different threat actors to identify coordinated attacks.

## Tech Stack

- **Frontend**: React.js with a modern, glassmorphic UI.
- **Backend**: Python-based AI engine for threat classification and policy management.
- **Database**: SQLite for persistent storage of logs and audit trails.
- **Styling**: Vanilla CSS with customized design tokens for a premium security suite aesthetic.

## Installation

### Prerequisites
- Node.js (v18+)
- Python (v3.9+)

### Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the backend server:
   ```bash
   python main.py
   ```

### Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

## Author
**Sukhman Singh**
Security Research Lead

## License
Proprietary / Educational Use
