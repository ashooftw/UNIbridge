# UNIBRIDGE — Master Project Documentation & Specification

> **Smart India Hackathon (SIH 2026) Prototype**
> **Problem Statement**: PS 26044 — Next-Generation University–Industry Collaboration & Continuous Curriculum Modernization Platform
> **Mission**: *"From Academic Knowledge to Industry Solutions — Bridging Higher Education and Industrial R&D"*
> Operationalizing NEP 2020 & UGC Industry-Linkage Guidelines.

---

## 📋 Table of Contents

1. [Executive Summary & Vision](#1-executive-summary--vision)
2. [Key Architecture & Core Pillars](#2-key-architecture--core-pillars)
3. [Dual-Theme Design System](#3-dual-theme-design-system)
4. [AI Semantic Matching Engine](#4-ai-semantic-matching-engine)
5. [Database Schema & Data Models](#5-database-schema--data-models)
6. [Frontend & Service Directory Structure](#6-frontend--service-directory-structure)
7. [Project Status & Health Report](#7-project-status--health-report)
8. [Quick Start & Setup Guide](#8-quick-start--setup-guide)
9. [Stitch Design System & Component Architecture](#9-stitch-design-system--component-architecture)

---

## 1. Executive Summary & Vision

UNIBRIDGE is an end-to-end digital ecosystem designed to bridge the gap between Indian university curricula and real-world industrial research & development. Built specifically for the **Smart India Hackathon (SIH 2026)**, the platform replaces outdated 3–5 year manual syllabus revision cycles with a real-time, empirical data feedback loop driven by AI.

### Key Objectives

- **Operationalize NEP 2020** — Directly facilitate credit-mapped internships, capstone R&D projects, and industry-sponsored hackathon challenges.
- **Empirical Skill Telemetry** — Automatically flag emerging industry skill deficits and deliver actionable telemetry directly to University Boards of Studies.
- **AI Vector Matching** — Utilize transformer-based semantic vector embeddings to match student capabilities and course learning outcomes with real enterprise engineering bottlenecks.

---

## 2. Key Architecture & Core Pillars

UniBridge integrates four core functional pillars into a closed-loop platform. Each pillar serves a distinct role and maps to a dedicated route in the application.

### Pillar A — Industry Problem Repository

**Route**: `/repository`, `/problems/new`

This pillar allows enterprises and MSMEs to submit their real engineering bottlenecks and R&D challenges into a structured, searchable repository. Each problem statement is categorized by difficulty level (Beginner, Intermediate, Advanced), target deliverables, dataset availability, sprint timelines, and the specific skill matrices required to solve them. Faculty and students can browse this repository to find projects aligned with their academic interests and capabilities.

### Pillar B — AI Academic Matching Engine

**Route**: `/matching`

The heart of the platform — a Python FastAPI microservice that calculates vector cosine similarity between industry challenges and UGC course learning outcomes. It provides instant percentage match scoring (0–100%), NEP credit classification recommendations, and detailed student skill-gap breakdowns. This enables data-driven decisions about which industry problems are best suited for which academic programs.

### Pillar C — Student Project & Placement Pipeline

**Route**: `/pipeline`

A collaborative workspace for managing capstone projects, fellowships, and internships from start to finish. It tracks sprint progress, dual mentorship assignments (corporate engineers paired with university faculty advisors), and student performance. The pipeline also handles placement outcomes, including Pre-Placement Offer (PPO) tracking and NEP credit accreditation status with verified hash tracking for audit integrity.

### Pillar D — Skill-Gap Telemetry & Feedback Hub

**Route**: `/telemetry`

The feedback-loop engine. This pillar aggregates missing skills identified across all industry challenges and compares them against existing course learning outcomes. It then generates empirical feedback reports — complete with deficit scores and actionable curriculum recommendations — that are sent directly to University Boards of Studies. This enables dynamic, evidence-based syllabus upgrades rather than slow, opinion-driven revision cycles.

---

## 3. Dual-Theme Design System

UniBridge features an instant, zero-lag theme switching system powered by `next-themes` and custom CSS variable tokens, switchable via the application header.

### ☀️ Soft Pastel Light Mode

| Element | Value | Description |
| :--- | :--- | :--- |
| Background | `#F8FAFC` | Slate-50 canvas — clean, professional base |
| Cards & Surfaces | `#EDF2F7` | Soft slate-blue containers for elevated content |
| Primary Accents | `#0D9488` | Muted teal / emerald gradient for interactive elements |
| Typography | `#1E293B` | Deep slate charcoal for sharp readability |

### 🌙 Warm Charcoal & Amber Dark Mode

| Element | Value | Description |
| :--- | :--- | :--- |
| Background | `#121417` | Warm deep charcoal canvas — easy on the eyes |
| Cards & Surfaces | `#1E232B` | Slate-gray container elevators for depth |
| Primary Accents | `#F59E0B` | Warm amber & gold accents for focus and contrast |
| Typography | `#F1F5F9` | Crisp off-white for comfortable reading |

---

## 4. AI Semantic Matching Engine

The AI engine lives in the `unibridge-ai/` directory and operates as an independent microservice, completely decoupled from the Next.js frontend.

### Technology Stack

- **Framework**: Python 3.14 with FastAPI and Uvicorn
- **NLP Model**: `sentence-transformers/all-MiniLM-L6-v2` — produces 384-dimensional dense vector embeddings
- **Fallback Mechanism**: If PyTorch or Transformers are unavailable (e.g., lightweight deployment), the engine automatically falls back to TF-IDF and Jaccard token-overlap matching

### How Matching Works

1. The industry problem description and its required skills are concatenated into a single text block.
2. All course learning outcomes are combined into a second text block.
3. Both blocks are encoded into 384-dimensional vector embeddings using the sentence-transformer model.
4. A cosine similarity score is computed between the two vectors, then normalized to a 0–100% scale.
5. Each individual course outcome is also compared against the problem to identify specifically which outcomes align.
6. Student skills are compared against the problem's required skills to generate a skill-gap analysis (possessed vs. missing).
7. An automated academician feedback note is generated for the University Board of Studies, recommending specific syllabus updates.

### NEP Credit Classification Matrix

Based on the match score, the engine classifies the result into one of three NEP credit tiers:

| Score Range | NEP Credit Classification | Recommended Action |
| :--- | :--- | :--- |
| **75.0% – 100.0%** | Direct NEP Credit Alignment | Mandatory Industry Internship / Capstone (4 Credits) |
| **50.0% – 74.9%** | Mandatory Industry Internship | Minor Capstone / Mandatory Internship (2–3 Credits) |
| **0.0% – 49.9%** | Elective Capstone R&D | Non-credit R&D Fellowship / Hackathon Project |

### API Endpoints

The microservice exposes two endpoints:

- **`GET /health`** — Returns operational status, service name, and the currently loaded NLP model. Useful for health-check monitoring.
- **`POST /api/match`** — The primary endpoint. Accepts a problem description, required skills, course learning outcomes, and (optionally) student skills. Returns a match score, NEP classification, skill-gap analysis (possessed vs. missing skills), matched outcomes, reasoning text, and an automated feedback note for the Board of Studies.

Interactive API documentation is auto-generated at `/docs` (Swagger UI) when the service is running.

---

## 5. Database Schema & Data Models

The application uses **Prisma ORM** configured with **SQLite** for zero-config offline demonstration, and supports production **PostgreSQL** out-of-the-box by changing the datasource provider.

### Data Models

| Model | Purpose | Key Fields |
| :--- | :--- | :--- |
| **User** | Account profiles for all platform roles | Name, email, role (Student / Faculty / Industry Partner / Admin), department, institution, skills |
| **ProblemStatement** | Industry challenge listings | Title, company name, description, required skills, target deliverables, difficulty, timeline, mentorship availability |
| **CourseOutcome** | Departmental course learning outcomes | Department, course name, semester, learning outcomes, prerequisite skills |
| **SkillGapTelemetry** | Deficit logging for curriculum updates | Department, academic year, skill deficiency, missing tools, deficit score, recommendation, review status |
| **PlacementPipeline** | Student project performance tracking | Student info, challenge title, company, capstone score, internship status, PPO status, accredited credits, verified hash |

### Seeded Industry Benchmarks

The database comes pre-seeded with four realistic industry problem statements to demonstrate the platform's capabilities immediately after setup:

1. **Tata MSME Logistics** — MSME Supply Chain Route Optimization & Inventory Telemetry
2. **Bharat Forge Quality Automation Labs** — Computer Vision Metal Surface Defect Detection
3. **Razorpay Payment Labs** — FinTech Real-Time Microservice Fraud Scoring Engine
4. **Mahindra Agri Solutions R&D** — Precision AgriTech Solar Irrigation & Soil Telemetry Monitor

---

## 6. Frontend & Service Directory Structure

The project is organized into two main directories:

### `unibridge-ai/` — Python FastAPI AI Matching Engine

Contains the FastAPI application (`main.py`) and its Python dependencies (`requirements.txt`). This service runs independently on port 8000.

### `unibridge-web/` — Next.js 14 Frontend & Database

The main web application, built with Next.js 14 (App Router), Tailwind CSS, and Prisma ORM.

**Key application routes:**

| Route | Purpose |
| :--- | :--- |
| `/` (Landing Page) | Main entry point with NEP 2020 banners and platform overview |
| `/repository` | Industry challenge browsing grid with filtering |
| `/matching` | Interactive AI vector matching engine dashboard |
| `/telemetry` | Board of Studies skill-gap telemetry hub |
| `/pipeline` | Placement & PPO tracking workspace |
| `/login` | Demo-preset authentication login |
| `/signup` | Demo-preset registration form |
| `/problems/new` | New industry challenge posting form |

**Key components:**

| Component | Responsibility |
| :--- | :--- |
| Header | Typographical header logo, search bar, and dark/light theme toggle |
| ThemeProvider | Dark/Light theme context provider wrapping the app |
| RepositoryClient | Interactive problem filtering, search, and display |
| TelemetryClient | Curriculum deficit telemetry visualization and feedback UI |
| PipelineClient | Student accreditation and PPO tracking table |

**Data layer:**

- Prisma schema defines all data models (see Section 5)
- Seed script populates the database with initial industry benchmarks
- SQLite database file (`dev.db`) is generated locally for zero-config demos

---

## 7. Project Status & Health Report

| Component | Status | Notes |
| :--- | :--- | :--- |
| Web Frontend (Next.js) | ✅ 100% Operational | Compiles cleanly — 0 TypeScript errors, 0 ESLint errors |
| AI Matching Service (FastAPI) | ✅ 100% Operational | Fast response time for vector embedding calculation |
| Database (Prisma + SQLite) | ✅ Synchronized | Schema generated and pre-seeded with benchmark data |

---

## 8. Quick Start & Setup Guide

### Step 1 — Start the AI Matching Engine

1. Navigate to the `unibridge-ai` directory.
2. Create and activate a Python virtual environment.
3. Install the dependencies from `requirements.txt`.
4. Run `main.py` to start the FastAPI server.

The API will be available at `http://127.0.0.1:8000`, with interactive Swagger documentation at `http://127.0.0.1:8000/docs`.

### Step 2 — Start the Web Application

1. Navigate to the `unibridge-web` directory.
2. Install Node.js dependencies with `npm install`.
3. Push the Prisma schema to generate the database with `npx prisma db push`.
4. Seed the database with benchmark data using `npx tsx prisma/seed.ts`.
5. Start the development server with `npm run dev`.

The web application will be available at `http://localhost:3000`.

> **Note**: The web frontend connects to the AI service at `http://127.0.0.1:8000` for matching requests. Make sure the AI engine is running before using the matching dashboard.

---

## 9. Stitch Design System & Component Architecture

UniBridge utilizes a modern **Stitch UI** design framework, combining high-contrast glassmorphism, dynamic vector score gauges, interactive curriculum mapping, and empirical telemetry charts.

### Core Design Tokens

**Color System:**

| Token | Value | Usage |
| :--- | :--- | :--- |
| Base Canvas (Dark) | `#0B0F17` | Midnight charcoal background |
| Glass Surface | `#161B26` | Glassmorphic panels with backdrop blur and subtle borders |
| Primary Gradient | `#0D9488` → `#4F46E5` | Deep emerald-teal to indigo for key interactive elements |
| Accent: Amber Gold | `#F59E0B` | Warm highlights and call-to-action elements |
| Accent: Cyan | `#06B6D4` | Data visualization and secondary highlights |
| Accent: Rose Deficit | `#F43F5E` | Deficit indicators and warning states |

**Typography:** Plus Jakarta Sans / Inter font families with gradient text clips for headings.

### Component Catalog

#### AIMatchGauge

Custom animated SVG radial gauge that visually displays 384-dimensional vector similarity match scores on a 0–100% scale. Features stroke dashoffset animation, ambient background glow effects, and an NEP 2020 credit approval badge that updates dynamically based on the score tier.

#### GlassCard

Glassmorphic container component with backdrop blur, hover-lift translation for interactivity feedback, and customizable glow colors (teal, indigo, amber, purple). Used across the platform as the primary card surface for all content modules.

#### SkillTelemetryChart

Graphical deficit telemetry visualization that compares industry technology demand percentages against university syllabus coverage. Includes an automated feedback note generator that produces actionable recommendations for Board of Studies curriculum updates.

#### SyllabusMapper

Side-by-side mapping grid that visually connects industry project deliverables directly with specific university course learning outcomes (e.g., CS401, CS302), making curriculum alignment transparent and auditable.

---

*Generated for UNIBRIDGE — Smart India Hackathon (SIH 2026)*
