# UNIBRIDGE — University-Industry Collaboration & Continuous Curriculum Modernization Platform

> **Smart India Hackathon (SIH 2026) Prototype**  
> *“From Academic Knowledge to Industry Solutions — Bridging Higher Education and Industrial R&D”*  
> Operationalizing NEP 2020 & UGC Industry-Linkage Guidelines.

---

## 🌟 Key Architecture & Pillars

UNIBRIDGE integrates four core pillars into a closed-loop engine:

1. **Pillar A: Industry Problem Repository** (`/problems`)
   - Enterprise & MSME engineering bottleneck submission schema.
   - Target deliverables, dataset access flags, sprint timelines, and skill matrices.

2. **Pillar B: AI Academic Matching Engine** (`/matching`)
   - Python FastAPI service utilizing `sentence-transformers/all-MiniLM-L6-v2`.
   - Vector embedding calculation for cosine similarity matching between industry problem requirements and UGC course learning outcomes.

3. **Pillar C: Student Project & Mentorship Workspace**
   - Collaborative capstone, hackathon, and internship project sprint tracking.
   - Dual mentorship by corporate engineers and university faculty advisors.

4. **Pillar D: Skill-Gap Telemetry & Feedback Hub** (`/telemetry`)
   - Empirical skill deficiency telemetry sent to University Boards of Studies.
   - Replaces 3–5 year manual syllabus revision cycles with continuous data-driven updates.

---

## 🎨 Dual Theme Palette Specifications (Proposal Section 8.1)

UniBridge features an instant, zero-lag theme system switchable via the header utility bar:

- ☀️ **Soft Pastel Light Mode**:
  - Background: `#F8FAFC`
  - Soft Slate-Blue Cards: `#EDF2F7`
  - Muted Teal Accents: `#0D9488`
  - Deep Charcoal Text: `#1E293B`
- 🌙 **Warm Charcoal & Amber Dark Mode**:
  - Warm Charcoal Canvas: `#121417`
  - Slate-Gray Card Containers: `#1E232B`
  - Warm Amber Primary Accents: `#F59E0B`
  - Crisp Off-White Text: `#F1F5F9`

---

## 🚀 Quick Start Guide

### 1. Frontend Web App (Next.js 14)
```bash
cd frontend
npm install
npx prisma generate
npx prisma db push
npx tsx prisma/seed.ts
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 2. AI Semantic Matching Service (Python FastAPI)
```bash
cd ai-service
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```
API Documentation available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

---

## 📊 Database Schema & Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, Tailwind CSS, Lucide Icons, Framer Motion, Next-Themes.
- **Database**: PostgreSQL (Prisma ORM) / Local SQLite fallback for instant hackathon dev (`dev.db`).
- **AI Service**: Python 3.14, FastAPI, Sentence-Transformers (`all-MiniLM-L6-v2`), NumPy, PyTorch.
