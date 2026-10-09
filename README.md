# GapMap India

Find the gap. Prove the demand. Make the move.

GapMap India is an evidence-first market intelligence platform that helps entrepreneurs identify underserved local markets using live search data. Built for the SerpApi India Hackathon 2026.

## Architecture

*   **Frontend**: React (Vite), TailwindCSS, Shadcn/UI, Recharts, React-Leaflet
*   **Backend**: FastAPI, Pydantic, HTTPX
*   **Integrations**: SerpApi (Google Search, Maps Local, Trends, News)

## Why SerpApi?

GapMap relies entirely on SerpApi to gather real-time, unstructured market evidence.
*   **Google Trends** is used for search-interest momentum.
*   **Google Maps Local** provides the geographic competitor landscape.
*   **Google Search and News** supply relevant market context.

## Setup Instructions

### Backend

1.  Navigate to `backend/`
2.  Create virtual environment: `python -m venv venv`
3.  Activate it: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Mac/Linux)
4.  Install dependencies: `pip install -r requirements.txt` (or just `pip install fastapi "uvicorn[standard]" pydantic httpx python-dotenv`)
5.  Create a `.env` file based on `.env.example`:
    ```
    SERPAPI_API_KEY=your_key_here
    ```
6.  Run the server: `uvicorn main:app --reload` (Runs on http://localhost:8000)

### Frontend

1.  Navigate to `frontend/`
2.  Install dependencies: `npm install`
3.  Run the dev server: `npm run dev` (Runs on http://localhost:5173)

## Demo Mode
If the `SERPAPI_API_KEY` is empty, the application will automatically run in "Demo Mode" returning a static, hardcoded example report. 

## Opportunity Scoring Methodology
The Opportunity Score is calculated using deterministic heuristics based on live search evidence:
*   **Demand Strength (25%)**: Based on recent Google Trends indices.
*   **Search Interest Momentum (15%)**: Based on the trajectory of Google Trends data (growing vs declining).
*   **Observed Supply Gap (20%)**: Based on the inverse density of competitors returned by Google Maps.
*   **Unmet Customer Pain (15%)**: Heuristic mapping of competitor ratings to customer satisfaction gaps.
*   **Risk Resilience (10%)**: Extracted from business volume and industry context.
Missing data automatically lowers the confidence rating instead of substituting fake scores.

## Disclaimer
GapMap is a decision-support tool. Search results are proxies and should not be considered absolute market-size measurements.
# GapMap
