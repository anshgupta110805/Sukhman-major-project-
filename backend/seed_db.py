import json
import time
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from main import SessionLocal, AuditLog

def seed_database():
    try:
        with open("sample_data.json", "r") as f:
            data = json.load(f)
    except FileNotFoundError:
        print("❌ sample_data.json not found in backend folder!")
        return

    db = SessionLocal()
    
    print("Clearing old audit logs to avoid conflicts...")
    db.query(AuditLog).delete()
    db.commit()

    print(f"Seeding {len(data)} records into PostgreSQL AuditLog table...")
    
    inserted = 0
    skipped = 0
    
    for i, item in enumerate(data):
        # We assume the unique constraint is on ID, but our db uses auto-increment ID.
        # To strictly skip duplicates, we can check if a timestamp already exists. 
        # (Assuming timestamp + ip + user_agent is unique enough)
        exists = db.query(AuditLog).filter(
            AuditLog.timestamp == item.get("timestamp"),
            AuditLog.ip_address == item.get("ip_address")
        ).first()
        
        if exists:
            skipped += 1
            continue
            
        log = AuditLog(
            timestamp=item.get("timestamp"),
            user=item.get("user", "System"),
            action=item.get("action", "Access"),
            data_accessed=item.get("data_accessed", "Files"),
            intent=item.get("intent"),
            confidence=item.get("confidence", 0.0),
            anomaly_score=item.get("anomaly_score", 0.0),
            ip_address=item.get("ip_address"),
            is_violation=item.get("is_violation", False),
            escalated=item.get("escalated", False),
            top_features=item.get("top_features", {}),
            # New fields
            user_agent=item.get("user_agent"),
            query=item.get("query"),
            threat_level=item.get("threat_level"),
            violation_type=item.get("violation_type"),
            country=item.get("country"),
            response_time_ms=item.get("response_time_ms")
        )
        db.add(log)
        inserted += 1
        
        if (i + 1) % 50 == 0:
            db.commit() # commit in batches
            print(f"Progress: Processed {i + 1} records... (Inserted: {inserted}, Skipped: {skipped})")
            
    db.commit()
    db.close()
    
    print(f"✅ Database seeded successfully! Total inserted: {inserted}, Total skipped: {skipped}")

if __name__ == "__main__":
    seed_database()
