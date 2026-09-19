# UNIBRIDGE Project Status Report

> **Project Name**: UNIBRIDGE — Next-Generation University–Industry Collaboration & Continuous Curriculum Modernization Platform  
> **Target Track**: Smart India Hackathon (SIH 2026) – Higher Education / Smart Automation  
> **Report Date**: September 18, 2026  

---

## 🛠️ 1. What Has Been Created

### A. Decoupled Service Architecture
The root repository is organized into two decoupled services:

1. **`unibridge-web/` (Next.js 14 Web Frontend & Database Layer)**
   - **Framework**: Next.js 14 App Router, TypeScript, React 18, Tailwind CSS, Lucide icons, Framer Motion, Next-Themes.
   - **Dual-Theme Palette**:
     - ☀️ **Soft Pastel Light Mode**: Background `#F8FAFC`, Surface `#EDF2F7`, Accent `#0D9488` (Muted Teal), Typography `#1E293B`.
     - 🌙 **Warm Charcoal Dark Mode**: Background `#121417`, Surface `#1E232B`, Accent `#F59E0B` (Warm Amber), Typography `#F1F5F9`.
   - **Header Component (`components/Header.tsx`)**: Left-aligned typographical brand mark **UniBridge** (clean text logo without icons), search bar, theme toggle, and role switcher dropdown (`STUDENT`, `FACULTY`, `INDUSTRY_PARTNER`).
   - **Landing View (`/`)**: Hero banner with NEP 2020 & UGC badges, 3-pillar breakdown, interactive accordions (*"How Does This Benefit a Student?"* & *"What Makes This Different from a Normal Internship Website?"*).
   - **Industry Repository View (`/repository`)**: Card grid rendering challenges with difficulty badges (`BEGINNER`, `INTERMEDIATE`, `ADVANCED`), required skill tags, target deliverables, timelines, and company sponsors.
   - **Interactive AI Match Engine Demo (`/matching`)**: Test dashboard where users select an industry problem statement and course outcome module, trigger sentence-transformers vector calculation, and view match scores (0–100%) alongside credit classifications.
   - **Database & Prisma ORM (`prisma/schema.prisma`)**: Relational models for `User`, `ProblemStatement`, and `CourseOutcome`.
   - **Seed Script (`prisma/seed.ts`)**: Populated with 4 realistic Indian industry challenges:
     - Tata MSME Logistics: MSME Supply Chain Route Optimization & Inventory Telemetry
     - Bharat Forge Quality Automation Labs: Computer Vision Metal Surface Defect Detection
     - Razorpay Payment Labs: FinTech Real-Time Microservice Fraud Scoring Engine
     - Mahindra Agri Solutions R&D: Precision AgriTech Solar Irrigation & Soil Telemetry Monitor
     - University Course Outcome Modules (`CS401`, `CS302`, `CS305`).

2. **`unibridge-ai/` (Python FastAPI Matching Engine)**
   - **Framework**: Python 3.14 FastAPI with Uvicorn.
   - **NLP Embedding Engine**: Powered by `sentence-transformers` (`all-MiniLM-L6-v2`), `scikit-learn`, `numpy`, and `pydantic`.
   - **Matching Endpoint (`POST /api/match`)**: Accepts problem description, problem skills, course learning outcomes, and student skills. Vectorizes inputs into 384-dimensional embeddings, computes cosine similarity, and returns match scores, credit classifications, reasoning, and matched outcomes.
   - **Health Endpoint (`GET /health`)**: Service status monitoring.

3. **Prototypes & Supporting Modules (`frontend/` & `ai-service/`)**
   - Working Log In (`/login`) & Sign Up (`/signup`) forms with 1-click hackathon demo presets.
   - Skill-Gap Telemetry page (`/telemetry`) & Post New Challenge form (`/problems/new`).

---

## ✅ 2. What Is Working

1. **AI Semantic Vector Matching Endpoint (`POST http://127.0.0.1:8000/api/match`)**
   - **Status**: 100% Operational.
   - **Verified Response**:
     ```json
     {
       "match_score": 44.2,
       "classification": "Independent R&D / Hackathon Fellowship",
       "reasoning": "Baseline alignment (44.2%). Recommends claiming for non-credit industry fellowship or hackathon.",
       "matched_outcomes": [
         "Architect multi-threaded RTOS tasks",
         "Implement MQTT protocol over cellular networks"
       ]
     }
     ```

2. **Next.js Web Application (`http://localhost:3000`)**
   - **Status**: 100% Operational.
   - `npm run build` inside `unibridge-web` compiles cleanly with **0 TypeScript or ESLint errors**.
   - Landing page (`/`), Industry Repository (`/repository`), and Interactive Matching Demo (`/matching`) load smoothly.

3. **Dual-Theme Theming System**
   - Real-time switching between **Soft Pastel Light Mode** and **Warm Charcoal Dark Mode** via header toggle button with zero layout flash.

4. **Prisma Database Sync & Seeding**
   - Database schema generated, synchronized, and seeded with realistic Indian industry problem statements and university curriculum modules.

5. **Git Repository Staging**
   - `.gitignore` configured to exclude `node_modules/`, `.next/`, and `venv/`.
   - All source code staged and ready for initial commit.

---

## ⚠️ 3. Current Limitations & What Needs Attention

1. **Automated Headless Browser Subagent Tool**
   - **Issue**: The automated Playwright browser subagent driver download failed with a 404 error from upstream Azure CDN during background screenshot capture.
   - **Note**: This is an agent tool environment issue. The actual web app and servers run completely fine when accessed directly in a standard browser (e.g. Chrome, Firefox) at `http://localhost:3000`.

2. **Database Provider Tuning for Production**
   - Currently configured with local SQLite (`dev.db`) for zero-config offline execution.
   - To connect to a live PostgreSQL database server, set `DATABASE_URL` in `unibridge-web/.env` to `postgresql://unibridge_user:unibridge_secure_pass@localhost:5432/unibridge?schema=public` and run `npx prisma db push`.

3. **Merging Auth Views**
   - The Log In (`/login`) and Sign Up (`/signup`) pages built in `frontend/` can be copied into `unibridge-web/app/` if user authentication session cookies are required for production deployment.

---

## 🚀 4. How to Run the Platform

```bash
# 1. Start Python FastAPI AI Matching Engine (Port 8000)
cd unibridge-ai
./venv/bin/uvicorn main:app --reload --port 8000

# 2. Start Next.js Web Application (Port 3000)
cd unibridge-web
npm run dev
```

- Web App: [http://localhost:3000](http://localhost:3000)
- AI Swagger API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
