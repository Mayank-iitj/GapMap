<div align="center">

# 🧭 GapMap India
**Find the gap. Prove the demand. Make the move.**

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)](#)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](#)
[![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](#)
[![SerpApi](https://img.shields.io/badge/SerpApi-121212?style=for-the-badge&logo=google&logoColor=white)](#)

GapMap India is an evidence-first market intelligence platform that empowers entrepreneurs to identify underserved local markets using live search data. Built exclusively for the **SerpApi India Hackathon 2026**.

[Features](#-key-features) • [How it Works](#-how-it-works) • [Tech Stack](#-tech-stack) • [Quick Start](#-quick-start) • [Deployment](#-deployment)

</div>

---

## ✨ Key Features

- **Live Market Validation**: Instantly verifies if a business idea has local demand in a given city by pulling real-time data instead of relying on outdated datasets.
- **Competitor Landscape Mapping**: Automatically fetches, maps, and analyzes local competitors using geographical data and customer reviews.
- **Dynamic Stress Testing**: Evaluates your market hypothesis against live counter-evidence (e.g., high competitor density vs. low ratings) to poke holes in weak business ideas.
- **Actionable Opportunity Scoring**: Generates a deterministic Opportunity Score based on demand momentum, supply gaps, and unmet customer pain.
- **Export & Print Ready**: Save your reports locally, export insights to CSV, or print a beautiful executive summary PDF.

## 🚀 How it Works (Powered by SerpApi)

GapMap heavily relies on **SerpApi** to gather real-time, unstructured market evidence:
- 📈 **Google Trends API**: Used to calculate search-interest momentum and validate localized demand strength.
- 🗺️ **Google Maps Local API**: Provides the geographic competitor landscape, business ratings, and review counts.
- 💬 **Google Maps Reviews API**: Extracts raw customer sentiment to calculate "Unmet Customer Pain."
- 📰 **Google Search & News API**: Supplies relevant commercial signals and risk resilience data.

## 🛠 Tech Stack

### Frontend (User Interface)
- **Framework**: React 18 + Vite
- **Styling**: TailwindCSS + Shadcn/UI (Ultra-premium aesthetics, dark/light modes)
- **Data Viz**: Recharts (Trends), React-Leaflet (Geospatial Mapping)
- **Routing & State**: React Router, TanStack Query

### Backend (API & Analysis)
- **Framework**: FastAPI (Python)
- **Validation**: Pydantic models for strict type safety
- **HTTP Client**: HTTPX for asynchronous, high-speed SerpApi fetching

---

## 💻 Quick Start

To run GapMap India locally, you'll need Node.js and Python 3.10+ installed.

### 1. Backend Setup

```bash
cd backend

# Create and activate virtual environment
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Mac/Linux:
source venv/bin/activate

# Install requirements
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
```
Add your SerpApi key to the `.env` file:
`SERPAPI_API_KEY=your_real_key_here`

Run the server:
```bash
uvicorn main:app --reload
# API runs on http://localhost:8000
```

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run the Vite dev server
npm run dev
# App runs on http://localhost:5173
```

---

## 🌍 Deployment

GapMap is fully pre-configured for seamless deployment to production.

### Deploying the Backend (Render)
1. Fork or push this repository to GitHub.
2. Sign in to [Render](https://render.com) and click **New+** -> **Blueprint**.
3. Connect your repository. Render will automatically read the `render.yaml` file in the root directory and configure the Python web service.
4. Add your `SERPAPI_API_KEY` to the Render Environment Variables.

### Deploying the Frontend (Vercel)
1. Sign in to [Vercel](https://vercel.com) and click **Add New** -> **Project**.
2. Import your GitHub repository.
3. **Important**: Change the **Root Directory** to `frontend`.
4. Add the following Environment Variable:
   - `VITE_API_URL` = `https://<your-render-backend-url>/api`
5. Click **Deploy**. The included `vercel.json` will automatically handle SPA client-side routing.

---

## 📊 Opportunity Scoring Methodology

The GapMap Opportunity Score is calculated using deterministic heuristics based strictly on live search evidence:
- **Demand Strength (25%)**: Based on recent Google Trends indices.
- **Search Interest Momentum (15%)**: Based on the trajectory of Google Trends data (growing vs declining).
- **Observed Supply Gap (20%)**: Based on the inverse density of competitors returned by Google Maps.
- **Unmet Customer Pain (15%)**: Heuristic mapping of competitor ratings to customer satisfaction gaps.
- **Risk Resilience (10%)**: Extracted from business volume and industry context.

*(Note: Missing data automatically lowers the confidence rating instead of substituting fake scores. We do not use placeholder data).*

---
<div align="center">
  <sub>Built with ❤️ for the SerpApi India Hackathon 2026.</sub>
</div>
