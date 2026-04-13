import requests
import time
import random
import threading
from datetime import datetime
from payloads import PAYLOADS

API_URL = "http://localhost:8000/monitor"

# ANSI Colors for Terminal Output
GREEN = '\033[92m'
YELLOW = '\033[93m'
RED = '\033[91m'
BOLD_RED = '\033[1;91m'
MAGENTA = '\033[95m'
RESET = '\033[0m'

NORMAL_USERS = [
    {"name": "Mike Ross", "role": "Marketing", "ip": "192.168.1.101"},
    {"name": "Sarah Jones", "role": "Billing", "ip": "192.168.1.102"},
    {"name": "Dr. Smith", "role": "Medical", "ip": "10.0.0.14"}
]

ATTACK_IPS = ["45.33.22.11", "88.99.100.22", "167.88.92.1", "104.28.1.1", "185.15.2.2"]

stats = {"total": 0, "violations": 0}
global_token = ""

def send_request(user_info, intent, is_attack=False, threat_level="LOW"):
    # Fallback if payload missing
    payload = random.choice(PAYLOADS.get(intent, ["Generic action payload"][:1]))
    
    req_data = {
        "user": f"{user_info['name']} ({user_info['role']})",
        "action": "Automated Action",
        "data_accessed": "System Records",
        "context_text": payload if is_attack else "Normal operating query."
    }
    
    try:
        headers = { 'Authorization': f'Bearer {global_token}' }
        headers['X-Forwarded-For'] = user_info.get("ip", "127.0.0.1")
        
        res = requests.post(API_URL, json=req_data, headers=headers)
        stats["total"] += 1
        
        if res.status_code == 200:
            data = res.json()
            if data.get('is_violation'):
                stats["violations"] += 1
                
                if threat_level == "CRITICAL":
                    color = BOLD_RED
                    label = "COORDINATED ATTACK DETECTED"
                elif threat_level == "BURST":
                    color = MAGENTA
                    label = "SCRAPING BURST BLOCKED"
                else:
                    color = RED
                    label = "PIRACY VIOLATION"
                print(f"{color}[{datetime.now().strftime('%H:%M:%S')}] {label}: {req_data['user']} -> {intent} (Anomaly Score: {data.get('anomaly_score', 0):.2f}){RESET}")
            
            elif data.get('escalated'):
                print(f"{YELLOW}[{datetime.now().strftime('%H:%M:%S')}] SUSPICIOUS REQUEST: {req_data['user']} -> {intent} (Escalated){RESET}")
            else:
                print(f"{GREEN}[{datetime.now().strftime('%H:%M:%S')}] NORMAL REQUEST: {req_data['user']} -> {intent}{RESET}")
    except Exception as e:
        # Silently pass errors if backend offline temporarily
        pass

def live_stats():
    while True:
        time.sleep(60)
        rate = (stats["violations"] / stats["total"] * 100) if stats["total"] > 0 else 0
        print(f"\n{BOLD_RED}=== LIVE STATS PORTAL ==={RESET}")
        print(f"Total Sent: {stats['total']} | Violations Blocked: {stats['violations']} | Threat Detection Rate: {rate:.1f}%")
        print(f"===========================\n")

def spawn_normal():
    while True:
        time.sleep(2)
        user = random.choice(NORMAL_USERS)
        send_request(user, user["role"])

def spawn_suspicious():
    while True:
        time.sleep(6)
        user = NORMAL_USERS[2] # Doctor
        send_request(user, "Billing", is_attack=False, threat_level="MEDIUM")

def spawn_piracy():
    while True:
        time.sleep(10)
        user = {"name": "BotNet_Alpha", "role": "Crawler", "ip": ATTACK_IPS[0]}
        send_request(user, "Piracy", is_attack=True, threat_level="HIGH")

def spawn_scraping_burst():
    while True:
        time.sleep(20)
        for i in range(4):
            user = {"name": f"Scraper_{i}", "role": "Bot", "ip": random.choice(ATTACK_IPS)}
            threading.Thread(target=send_request, args=(user, "Piracy", True, "BURST")).start()

def spawn_coordinated_attack():
    while True:
        time.sleep(45)
        for i in range(10):
            user = {"name": f"DDoS_Agent_{i}", "role": "BotNet", "ip": random.choice(ATTACK_IPS)}
            threading.Thread(target=send_request, args=(user, "Piracy", True, "CRITICAL")).start()

if __name__ == "__main__":
    print("Authenticating to API for Mock App Simulation...")
    try:
        login_res = requests.post("http://localhost:8000/login", json={"username": "admin12", "password": "admin34"})
        global_token = login_res.json().get("access_token", "")
    except Exception:
        print("Backend must be running!")
        exit()
        
    print("Starting Multi-Tier Threat Simulation...")
    
    threads = [
        threading.Thread(target=spawn_normal, daemon=True),
        threading.Thread(target=spawn_suspicious, daemon=True),
        threading.Thread(target=spawn_piracy, daemon=True),
        threading.Thread(target=spawn_scraping_burst, daemon=True),
        threading.Thread(target=spawn_coordinated_attack, daemon=True),
        threading.Thread(target=live_stats, daemon=True)
    ]
    
    for t in threads:
        t.start()
        
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nStopping Mock App.")
