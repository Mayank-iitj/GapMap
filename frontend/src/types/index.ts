export interface AnalyzeRequest {
  businessIdea: string;
  city: string;
  budget?: string;
  targetCustomer?: string;
  businessModel?: string;
  competitors?: string;
}

export interface Competitor {
  id: string;
  name: string;
  category?: string;
  address?: string;
  rating?: number;
  reviewCount?: number;
  latitude?: number;
  longitude?: number;
  website?: string;
  strengths: string[];
  issues: string[];
}

export interface TrendSeries {
  date: string;
  value: number;
}

export interface TrendSignal {
  direction: 'growing' | 'declining' | 'stable';
  series: TrendSeries[];
  relatedQueries: string[];
}

export interface ScoreComponents {
  demandStrength?: number;
  searchInterestMomentum?: number;
  observedSupplyGap?: number;
  unmetCustomerPain?: number;
  commercialSignals?: number;
  riskResilience?: number;
}

export interface EvidenceItem {
  sourceEngine: string;
  title: string;
  extract: string;
  url?: string;
  timestamp: string;
  category: string;
  claim: string;
}

export interface Finding {
  claim: string;
  evidence: string;
  whyItMatters: string;
  counterEvidence: string;
  confidence: string;
  validationStep: string;
}

export interface Risk {
  risk: string;
  source: string;
  unverifiedReason?: string;
}

export interface AnalysisReport {
  reportId: string;
  businessIdea: string;
  city: string;
  timestamp: string;
  overallScore?: number;
  confidence: 'High' | 'Medium' | 'Low' | 'Insufficient Evidence';
  sourcesQueried: number;
  businessesObserved: number;
  positiveSignals: string[];
  negativeSignals: string[];
  validationStep: string;
  
  trendSignal?: TrendSignal;
  competitors: Competitor[];
  scoreComponents: ScoreComponents;
  findings: Finding[];
  risks: Risk[];
  evidence: EvidenceItem[];
  engineStatuses: Record<string, 'success' | 'failed' | 'pending'>;
}

export interface StressTestRequest {
  report: AnalysisReport;
}

export interface StressTestResponse {
  hypothesis: string;
  counterEvidence: string[];
  weakenedClaims: string[];
  unresolvedRisks: Risk[];
  updatedScore?: number;
  suggestedAction: string;
  newSources: EvidenceItem[];
}
