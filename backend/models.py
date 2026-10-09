from pydantic import BaseModel
from typing import List, Optional, Dict, Any

class AnalyzeRequest(BaseModel):
    businessIdea: str
    city: str
    budget: Optional[str] = None
    targetCustomer: Optional[str] = None
    businessModel: Optional[str] = None
    competitors: Optional[str] = None

class Competitor(BaseModel):
    id: str
    name: str
    category: Optional[str] = None
    address: Optional[str] = None
    rating: Optional[float] = None
    reviewCount: Optional[int] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    website: Optional[str] = None
    strengths: List[str] = []
    issues: List[str] = []

class TrendSeries(BaseModel):
    date: str
    value: int

class TrendSignal(BaseModel):
    direction: str
    series: List[TrendSeries]
    relatedQueries: List[str]

class ScoreComponents(BaseModel):
    demandStrength: Optional[float] = None
    searchInterestMomentum: Optional[float] = None
    observedSupplyGap: Optional[float] = None
    unmetCustomerPain: Optional[float] = None
    commercialSignals: Optional[float] = None
    riskResilience: Optional[float] = None

class EvidenceItem(BaseModel):
    sourceEngine: str
    title: str
    extract: str
    url: Optional[str] = None
    timestamp: str
    category: str
    claim: str

class Finding(BaseModel):
    claim: str
    evidence: str
    whyItMatters: str
    counterEvidence: str
    confidence: str
    validationStep: str

class Risk(BaseModel):
    risk: str
    source: str
    unverifiedReason: Optional[str] = None

class AnalysisReport(BaseModel):
    reportId: str
    businessIdea: str
    city: str
    timestamp: str
    overallScore: Optional[float] = None
    confidence: str
    sourcesQueried: int
    businessesObserved: int
    positiveSignals: List[str]
    negativeSignals: List[str]
    validationStep: str
    
    trendSignal: Optional[TrendSignal] = None
    competitors: List[Competitor]
    scoreComponents: ScoreComponents
    findings: List[Finding]
    risks: List[Risk]
    evidence: List[EvidenceItem]
    engineStatuses: Dict[str, str]

class StressTestRequest(BaseModel):
    report: AnalysisReport

class StressTestResponse(BaseModel):
    hypothesis: str
    counterEvidence: List[str]
    weakenedClaims: List[str]
    unresolvedRisks: List[Risk]
    updatedScore: Optional[float] = None
    suggestedAction: str
    newSources: List[EvidenceItem]
