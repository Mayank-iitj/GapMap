import type { AnalyzeRequest, AnalysisReport, StressTestRequest, StressTestResponse } from "@/types"

const API_BASE = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/+$/, "")

export async function analyzeMarket(request: AnalyzeRequest): Promise<AnalysisReport> {
  const response = await fetch(`${API_BASE}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to analyze market")
  }
  
  return response.json()
}

export async function stressTestMarket(request: StressTestRequest): Promise<StressTestResponse> {
  const response = await fetch(`${API_BASE}/stress-test`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(request)
  })
  
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to stress test")
  }
  
  return response.json()
}

export async function checkHealth() {
  const response = await fetch(`${API_BASE}/health`)
  return response.json()
}

export async function getReviews(dataId: string): Promise<{reviews: any[]}> {
  const response = await fetch(`${API_BASE}/reviews/${dataId}`)
  if (!response.ok) {
    throw new Error(await response.text() || "Failed to fetch reviews")
  }
  return response.json()
}
