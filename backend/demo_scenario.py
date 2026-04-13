import time
from datetime import datetime
import mock_app

def print_phase(phase, desc):
    print(f"\n{'='*50}")
    print(f"[{datetime.now().strftime('%H:%M:%S')}] PHASE {phase}: {desc}")
    print(f"{'='*50}\n")

def run_demo():
    print("Authenticating for 5-minute Scripted Demo...")
    try:
        login_res = mock_app.requests.post("http://localhost:8000/login", json={"username": "admin12", "password": "admin34"})
        mock_app.global_token = login_res.json().get("access_token", "")
    except Exception:
        print("Backend offline! Start 'python main.py' first.")
        return

    # Phase 1: Normal traffic (0-60s)
    print_phase(1, "Normal Traffic -> LOW Threat Level")
    end_time = time.time() + 60
    while time.time() < end_time:
        mock_app.send_request(mock_app.NORMAL_USERS[0], "Marketing")
        time.sleep(2)

    # Phase 2: First violations (60-120s)
    print_phase(2, "First Violations -> MEDIUM Threat Level")
    end_time = time.time() + 60
    while time.time() < end_time:
        mock_app.send_request(mock_app.NORMAL_USERS[1], "Billing")
        if int(time.time()) % 10 == 0:
            mock_app.send_request(mock_app.NORMAL_USERS[2], "Medical", is_attack=True, threat_level="MEDIUM")
        time.sleep(2)

    # Phase 3: Bot attack (120-180s)
    print_phase(3, "Bot Attack -> HIGH Threat Level")
    end_time = time.time() + 60
    while time.time() < end_time:
        mock_app.send_request(mock_app.NORMAL_USERS[0], "Marketing")
        if int(time.time()) % 3 == 0:
            bot = {"name": "BotNet_Alpha", "role": "Crawler", "ip": mock_app.ATTACK_IPS[0]}
            mock_app.send_request(bot, "Piracy", is_attack=True, threat_level="HIGH")
        time.sleep(1)

    # Phase 4: Coordinated attack (180-240s)
    print_phase(4, "Coordinated Attack -> CRITICAL Threat Level")
    end_time = time.time() + 60
    while time.time() < end_time:
        if int(time.time()) % 5 == 0:
            for i in range(5):
                bot = {"name": f"DDoS_Agent_{i}", "role": "BotNet", "ip": mock_app.random.choice(mock_app.ATTACK_IPS)}
                mock_app.send_request(bot, "Piracy", is_attack=True, threat_level="CRITICAL")
        time.sleep(1)

    # Phase 5: System blocks all (240-300s)
    print_phase(5, "System Blocks All -> Back to MEDIUM Threat Level")
    end_time = time.time() + 60
    while time.time() < end_time:
        mock_app.send_request(mock_app.NORMAL_USERS[0], "Marketing")
        time.sleep(2)

    print("\n✅ DEMO COMPLETE!")

if __name__ == "__main__":
    run_demo()
