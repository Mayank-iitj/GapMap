import asyncio
from datetime import datetime
import uuid

from models import (
    AnalyzeRequest, AnalysisReport, Competitor, ScoreComponents, 
    EvidenceItem, Finding, Risk, TrendSignal, TrendSeries, StressTestResponse
)
from services.serpapi import (
    get_search_results, get_local_results, get_trends, get_news
)

async def perform_analysis(request: AnalyzeRequest) -> AnalysisReport:
    # 1. Fire queries concurrently
    search_task = asyncio.create_task(get_search_results(request.businessIdea, request.city))
    local_task = asyncio.create_task(get_local_results(request.businessIdea, request.city))
    trends_task = asyncio.create_task(get_trends(request.businessIdea))
    news_task = asyncio.create_task(get_news(request.businessIdea, request.city))
    
    search_res, local_res, trends_res, news_res = await asyncio.gather(
        search_task, local_task, trends_task, news_task
    )
    
    engine_statuses = {}
    engine_statuses["google_search"] = "success" if "error" not in search_res else "failed"
    engine_statuses["google_maps"] = "success" if "error" not in local_res else "failed"
    engine_statuses["google_trends"] = "success" if "error" not in trends_res else "failed"
    engine_statuses["google_news"] = "success" if "error" not in news_res else "failed"
    
    sources_queried = sum(1 for status in engine_statuses.values() if status == "success")
    
    competitors = []
    if engine_statuses["google_maps"] == "success" and "local_results" in local_res:
        for p in local_res["local_results"]:
            competitors.append(Competitor(
                id=p.get("place_id", p.get("data_id", str(uuid.uuid4()))),
                name=p.get("title", "Unknown"),
                category=p.get("type"),
                address=p.get("address"),
                rating=p.get("rating"),
                reviewCount=p.get("reviews"),
                latitude=p.get("gps_coordinates", {}).get("latitude"),
                longitude=p.get("gps_coordinates", {}).get("longitude"),
                website=p.get("website")
            ))
            
    trend_signal = None
    if engine_statuses["google_trends"] == "success" and "interest_over_time" in trends_res:
        timeline_data = trends_res["interest_over_time"].get("timeline_data", [])
        if timeline_data:
            series = [TrendSeries(date=item["date"], value=item["values"][0].get("extracted_value", 0)) for item in timeline_data]
            direction = "stable"
            if len(series) >= 2:
                if series[-1].value > series[0].value * 1.2:
                    direction = "growing"
                elif series[-1].value < series[0].value * 0.8:
                    direction = "declining"
            
            trend_signal = TrendSignal(
                direction=direction,
                series=series,
                relatedQueries=[q.get("query") for q in trends_res.get("related_queries", {}).get("top", [])]
            )
            
    # Compute score components
    # Just deterministic heuristics
    demand_strength = min(100, max(0, 50 + (trend_signal.series[-1].value if trend_signal else 0))) if engine_statuses["google_trends"] == "success" else None
    search_interest_momentum = 70 if trend_signal and trend_signal.direction == "growing" else (30 if trend_signal and trend_signal.direction == "declining" else 50) if engine_statuses["google_trends"] == "success" else None
    
    num_comps = len(competitors)
    observed_supply_gap = max(0, 100 - num_comps * 5) if engine_statuses["google_maps"] == "success" else None
    
    avg_rating = sum((c.rating for c in competitors if c.rating), 0) / (len([c for c in competitors if c.rating]) or 1)
    unmet_customer_pain = 100 - (avg_rating * 20) if engine_statuses["google_maps"] == "success" and avg_rating > 0 else 50
    
    commercial_signals = None
    risk_resilience = max(0, 100 - num_comps * 2) if engine_statuses["google_maps"] == "success" else None
    
    components = ScoreComponents(
        demandStrength=demand_strength,
        searchInterestMomentum=search_interest_momentum,
        observedSupplyGap=observed_supply_gap,
        unmetCustomerPain=unmet_customer_pain,
        commercialSignals=commercial_signals,
        riskResilience=risk_resilience
    )
    
    weights = {
        "demandStrength": 0.25,
        "searchInterestMomentum": 0.15,
        "observedSupplyGap": 0.20,
        "unmetCustomerPain": 0.15,
        "commercialSignals": 0.15,
        "riskResilience": 0.10
    }
    
    total_w = 0
    total_score = 0
    
    comp_dict = components.dict()
    for k, v in comp_dict.items():
        if v is not None:
            total_score += v * weights[k]
            total_w += weights[k]
            
    overall_score = (total_score / total_w) if total_w > 0 else None
    
    confidence = "High" if total_w >= 0.7 else "Medium" if total_w >= 0.4 else "Low"
    if total_w < 0.2:
        confidence = "Insufficient Evidence"
        overall_score = None
        
    return AnalysisReport(
        reportId=str(uuid.uuid4()),
        businessIdea=request.businessIdea,
        city=request.city,
        timestamp=datetime.now().isoformat(),
        overallScore=overall_score,
        confidence=confidence,
        sourcesQueried=sources_queried,
        businessesObserved=num_comps,
        positiveSignals=["High search intent" if demand_strength and demand_strength > 60 else "Moderate search intent"],
        negativeSignals=["High competition" if num_comps > 15 else "Low competition observed"],
        validationStep="Verify physical locations and speak to target customers.",
        trendSignal=trend_signal,
        competitors=competitors,
        scoreComponents=components,
        findings=[
            Finding(
                claim="Potential Gap in Service Availability",
                evidence=f"Observed {num_comps} competitors in the queried region.",
                whyItMatters="Fewer competitors implies lower barrier to entry.",
                counterEvidence="Low competitor count may also indicate low localized demand.",
                confidence="Medium",
                validationStep="Visit candidate locations to check for unlisted competitors."
            )
        ],
        risks=[
            Risk(risk="Incumbent Dominance", source="Google Maps", unverifiedReason="Need to verify market share.")
        ],
        evidence=[],
        engineStatuses=engine_statuses
    )

def perform_stress_test(report: AnalysisReport) -> StressTestResponse:
    # Heuristic stress test generation based on report data
    competitor_count = len(report.competitors)
    demand_strength = report.scoreComponents.demandStrength or 50
    
    weakened_claims = []
    counter_evidence = []
    unresolved_risks = []
    
    if competitor_count == 0:
        hypothesis = "The market appears completely untapped."
        counter_evidence.append("Lack of competitors might mean lack of actual local demand.")
        weakened_claims.append("Low competition observed")
        unresolved_risks.append(Risk(risk="Hidden Regulatory Barriers", source="Heuristics", unverifiedReason="Need to verify local laws"))
    elif competitor_count > 10:
        hypothesis = "High saturation market with strong incumbents."
        counter_evidence.append("Despite many players, customer satisfaction (ratings) might be low, leaving a gap.")
        weakened_claims.append("High competition")
    else:
        hypothesis = "Moderate competition with some established players."
        counter_evidence.append("A new entrant might still struggle without a unique value proposition.")
        
    if demand_strength < 40:
        weakened_claims.append("Search intent")
        counter_evidence.append("Low search volume might not capture offline or direct demand.")
        
    for risk in report.risks:
        unresolved_risks.append(risk)
        
    updated_score = max(0, (report.overallScore or 50) - (len(weakened_claims) * 5))
    
    suggested_action = "Validate demand offline by interviewing target customers before finalizing the business model."
    
    return StressTestResponse(
        hypothesis=hypothesis,
        counterEvidence=counter_evidence,
        weakenedClaims=weakened_claims,
        unresolvedRisks=unresolved_risks,
        updatedScore=updated_score,
        suggestedAction=suggested_action,
        newSources=[]
    )
