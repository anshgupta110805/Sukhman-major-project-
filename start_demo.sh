#!/bin/bash

# start_demo.sh - Bootstraps the complete VertexGuard Project for teacher Demo
echo "============================================="
echo " Starting VertexGuard Piracy Detection System"
echo "============================================="

# 1. Start backend process in background
echo "[1/4] Starting FastAPI Backend..."
cd backend
# Optional: source venv/bin/activate
python3 -m pip install -r requirements.txt > /dev/null 2>&1
python3 main.py &
BACKEND_PID=$!
sleep 3

# 2. Seed database
echo "[2/4] Seeding Database with sample_data.json..."
python3 seed_db.py
cd ..

# 3. Start frontend
echo "[3/4] Starting React Frontend..."
cd frontend
npm install > /dev/null 2>&1
npm run dev &
FRONTEND_PID=$!
cd ..

sleep 4

# 4. Open Browser Automatically
echo "[4/4] Opening Dashboard in Browser..."
if which xdg-open > /dev/null
then
  xdg-open http://localhost:5173
elif which open > /dev/null
then
  open http://localhost:5173
else
  echo "Please open http://localhost:5173 in your browser."
fi

echo "============================================="
echo " 🎉 DEMO READY FOR TEACHER 🎉                "
echo " Backend running on http://localhost:8000    "
echo " Frontend running on http://localhost:5173   "
echo "============================================="
echo "Press [CTRL+C] to stop all processes."

# Wait for process to exit
trap "kill $BACKEND_PID $FRONTEND_PID; exit" INT
wait
