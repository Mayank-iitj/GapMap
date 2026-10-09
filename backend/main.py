from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import AnalyzeRequest, AnalysisReport, StressTestRequest, StressTestResponse
from services.analysis import perform_analysis, perform_stress_test
from services.serpapi import get_maps_reviews

app = FastAPI(title="GapMap India API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
async def health_check():
    return {
        "status": "ok",
        "version": "1.0.0"
    }

@app.get("/api/v1/market-score", response_model=AnalysisReport)
async def get_market_score(query: str, location: str):
    request = AnalyzeRequest(businessIdea=query, city=location)
    try:
        report = await perform_analysis(request)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/analyze", response_model=AnalysisReport)
async def analyze_market(request: AnalyzeRequest):
    try:
        report = await perform_analysis(request)
        return report
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/stress-test", response_model=StressTestResponse)
async def stress_test(request: StressTestRequest):
    return perform_stress_test(request.report)

@app.get("/api/reviews/{data_id}")
async def fetch_reviews(data_id: str):
    try:
        result = await get_maps_reviews(data_id)
        return {"reviews": result.get("reviews", [])}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
