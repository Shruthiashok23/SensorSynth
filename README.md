# BioSensorForge

Automated sensor architecture and chassis selection engine for synthetic biology.

**Give it a sensing requirement. Get back ranked, evidence-based circuit designs.**

---

## Quick start

```bash
# Backend
cd backend && pip install -r requirements.txt
uvicorn main:app --reload --port 8000

# Frontend
cd frontend && npm install && npm run dev
```

API docs: http://localhost:8000/docs · App: http://localhost:5173

## Deploy

**Vercel (frontend) + Railway (backend):** Zero-config. Set `VITE_API_URL` to your backend URL.

**Docker:** `docker compose up --build`

## See PROJECT_REPORT.md for complete documentation.
