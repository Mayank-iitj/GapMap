// @ts-nocheck
import React, { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import type { AnalysisReport, StressTestResponse } from "@/types"
import { MapPin, Target, ShieldAlert, ArrowLeft, Download, AlertCircle, LineChart as LineChartIcon, CheckCircle2, Shield, Activity, Printer, MessageSquare, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import CountUp from "@/components/ui/CountUp"
import { getReviews, stressTestMarket } from "@/lib/api"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { toast } from 'sonner'

// Fix leaflet default icon issue
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Report() {
  const { id } = useParams()
  const [report, setReport] = useState<AnalysisReport | null>(null)
  const [expandedReviewId, setExpandedReviewId] = useState<string | null>(null)
  const [reviews, setReviews] = useState<any[]>([])
  const [isLoadingReviews, setIsLoadingReviews] = useState(false)
  const [isStressTesting, setIsStressTesting] = useState(false)
  const [stressTestResult, setStressTestResult] = useState<StressTestResponse | null>(null)

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gapmap_reports') || '[]')
    const found = saved.find((r: AnalysisReport) => r.reportId === id)
    if (found) setReport(found)
  }, [id])

  if (!report) {
    return <div className="p-12 text-center text-[#69766F]">Report not found or loading...</div>
  }

  const mapCenter = report.competitors.length > 0 && report.competitors[0].latitude 
    ? [report.competitors[0].latitude, report.competitors[0].longitude] 
    : [22.7196, 75.8577]; // Default to Indore if none found

  const handleExportCSV = () => {
    if (!report || report.competitors.length === 0) return
    const headers = ['Name', 'Category', 'Address', 'Rating', 'Reviews', 'Latitude', 'Longitude']
    const csvContent = [
      headers.join(','),
      ...report.competitors.map(c => 
        `"${c.name}","${c.category || ''}","${c.address || ''}",${c.rating || ''},${c.reviewCount || ''},${c.latitude || ''},${c.longitude || ''}`
      )
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', `gapmap-competitors-${report.city.replace(/\\s+/g, '-')}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const loadReviews = async (dataId: string) => {
    if (expandedReviewId === dataId) {
      setExpandedReviewId(null)
      return
    }
    setExpandedReviewId(dataId)
    setReviews([])
    setIsLoadingReviews(true)
    try {
      const data = await getReviews(dataId)
      setReviews(data.reviews || [])
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoadingReviews(false)
    }
  }

  const handleStressTest = async () => {
    setIsStressTesting(true)
    try {
      const res = await stressTestMarket({ report })
      setStressTestResult(res)
    } catch (e) {
      console.error(e)
      toast.error("Failed to run stress test.")
    } finally {
      setIsStressTesting(false)
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      <div className="flex items-center gap-4 text-sm text-[#69766F] mb-6 no-print">
        <Link to="/app" className="flex items-center gap-1 hover:text-[#17211F]">
          <ArrowLeft className="h-4 w-4" /> Back to Workspace
        </Link>
      </div>

      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{report.businessIdea}</h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-[#69766F]">
            <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> {report.city}</span>
            <span>&middot;</span>
            <span>Generated: {new Date(report.timestamp).toLocaleString()}</span>
            {Object.values(report.engineStatuses).includes('failed') && (
              <Badge variant="outline" className="text-amber-600 border-amber-600/30 bg-amber-50">
                Partial Results
              </Badge>
            )}
          </div>
        </div>
        
        <div className="flex flex-wrap items-center gap-3 no-print">
          <Button variant="outline" className="gap-2 bg-white text-[#17211F] border-[#E0E5DF] hover:bg-[#F7F8F5] hover:text-[#117C68]" onClick={() => window.print()}>
            <Printer className="h-4 w-4" /> Print PDF
          </Button>
          <Button variant="outline" className="gap-2 bg-white text-[#17211F] border-[#E0E5DF] hover:bg-[#F7F8F5] hover:text-[#117C68]" onClick={handleExportCSV}>
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-[#117C68] hover:bg-[#0C5C4F] gap-2" onClick={handleStressTest} disabled={isStressTesting}>
            {isStressTesting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Target className="h-4 w-4" />}
            {isStressTesting ? "Testing..." : "Stress Test"}
          </Button>
        </div>
      </div>

      {/* Executive Overview */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#E0E5DF] rounded-xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
          <div className="text-sm font-mono uppercase tracking-widest text-[#69766F] mb-2">Opportunity Score</div>
          <div className="text-6xl font-bold font-mono text-[#117C68]">
            {report.overallScore ? <CountUp from={0} to={Math.round(report.overallScore)} duration={1.5} /> : '--'}
          </div>
          <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F8F5] border border-[#E0E5DF] text-xs font-medium">
            <Shield className="h-3 w-3 text-[#117C68]" /> Confidence: {report.confidence}
          </div>
        </div>

        <div className="md:col-span-2 grid sm:grid-cols-2 gap-6 bg-white border border-[#E0E5DF] rounded-xl p-6 shadow-sm">
          <div className="space-y-4">
            <h3 className="font-semibold flex items-center gap-2"><Activity className="h-4 w-4 text-[#117C68]" /> Signals</h3>
            <ul className="space-y-2">
              {report.positiveSignals.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#17211F]">
                  <CheckCircle2 className="h-4 w-4 text-[#117C68] shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
              {report.negativeSignals.map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-[#17211F]">
                  <AlertCircle className="h-4 w-4 text-[#B96918] shrink-0 mt-0.5" />
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-4 border-l pl-6 border-[#E0E5DF]/50">
            <h3 className="font-semibold flex items-center gap-2"><Target className="h-4 w-4 text-[#117C68]" /> Next Step</h3>
            <p className="text-sm text-[#69766F] leading-relaxed">
              {report.validationStep}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-2xl font-mono">{report.sourcesQueried}</div>
                <div className="text-xs text-[#69766F]">Sources</div>
              </div>
              <div>
                <div className="text-2xl font-mono">{report.businessesObserved}</div>
                <div className="text-xs text-[#69766F]">Competitors</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {stressTestResult && (
        <div className="bg-[#14212B] text-white rounded-xl p-6 shadow-sm mt-6">
          <div className="flex items-center gap-2 mb-4 text-[#F7F8F5]">
            <Target className="h-5 w-5" />
            <h2 className="text-xl font-bold">Stress Test Results</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-[#A0AAB2] uppercase tracking-wider mb-1">Core Hypothesis</div>
                <div className="font-semibold">{stressTestResult.hypothesis}</div>
              </div>
              <div>
                <div className="text-sm text-[#A0AAB2] uppercase tracking-wider mb-1">Updated Score</div>
                <div className="text-3xl font-mono text-emerald-400">{stressTestResult.updatedScore || '--'}</div>
              </div>
              <div>
                <div className="text-sm text-[#A0AAB2] uppercase tracking-wider mb-1">Suggested Action</div>
                <div className="text-sm">{stressTestResult.suggestedAction}</div>
              </div>
            </div>
            <div className="space-y-4 bg-white/5 rounded-lg p-4 border border-white/10">
              <h4 className="font-semibold text-[#F7F8F5] text-sm">Counter Evidence & Weaknesses</h4>
              <ul className="space-y-2">
                {stressTestResult.counterEvidence.map((ce, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-[#E0E5DF]">
                    <AlertCircle className="h-4 w-4 shrink-0 text-amber-400 mt-0.5" />
                    {ce}
                  </li>
                ))}
                {stressTestResult.weakenedClaims.map((wc, i) => (
                  <li key={`wc-${i}`} className="flex items-start gap-2 text-sm text-[#E0E5DF]">
                    <ShieldAlert className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                    Weakened Claim: {wc}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <Tabs defaultValue="demand" className="w-full">
        <TabsList className="bg-white border border-[#E0E5DF] w-full justify-start h-12 rounded-lg p-1">
          <TabsTrigger value="demand" className="data-[state=active]:bg-[#F7F8F5] data-[state=active]:shadow-sm">Demand Intelligence</TabsTrigger>
          <TabsTrigger value="competitors" className="data-[state=active]:bg-[#F7F8F5] data-[state=active]:shadow-sm">Competitor Landscape</TabsTrigger>
          <TabsTrigger value="gaps" className="data-[state=active]:bg-[#F7F8F5] data-[state=active]:shadow-sm">Market Gaps & Risks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="demand" className="mt-6 space-y-6">
          <div className="bg-white border border-[#E0E5DF] rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <LineChartIcon className="h-5 w-5 text-[#117C68]" /> Interest Over Time
              </h3>
              {report.trendSignal && (
                <Badge variant="outline" className="bg-[#F7F8F5]">
                  Trend: {report.trendSignal.direction}
                </Badge>
              )}
            </div>
            
            {report.trendSignal && report.trendSignal.series.length > 0 ? (
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={report.trendSignal.series} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E0E5DF" />
                    <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#69766F' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#69766F' }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: '1px solid #E0E5DF', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#117C68" strokeWidth={3} dot={{ r: 4, fill: '#117C68', strokeWidth: 0 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-[300px] w-full flex items-center justify-center bg-[#F7F8F5] rounded-lg border border-dashed border-[#E0E5DF]">
                <p className="text-[#69766F]">Insufficient trend data available</p>
              </div>
            )}
            
            {report.trendSignal && report.trendSignal.relatedQueries.length > 0 && (
              <div className="mt-6 pt-6 border-t border-[#E0E5DF]">
                <h4 className="text-sm font-semibold mb-3">Related Queries</h4>
                <div className="flex flex-wrap gap-2">
                  {report.trendSignal.relatedQueries.map((q, i) => (
                    <span key={i} className="px-3 py-1 bg-[#F7F8F5] border border-[#E0E5DF] rounded-md text-xs text-[#69766F]">
                      {q}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="competitors" className="mt-6 space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-white border border-[#E0E5DF] rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-[#E0E5DF] bg-[#F7F8F5]">
                <h3 className="font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#117C68]" /> Geographic Distribution
                </h3>
              </div>
              <div className="flex-1 w-full bg-gray-100 z-0 relative">
                <MapContainer center={mapCenter as L.LatLngExpression} zoom={13} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  {report.competitors.filter(c => c.latitude && c.longitude).map(c => (
                    <Marker key={c.id} position={[c.latitude!, c.longitude!]}>
                      <Popup>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-gray-500">{c.category}</div>
                        {c.rating && <div className="text-xs mt-1">★ {c.rating} ({c.reviewCount})</div>}
                      </Popup>
                    </Marker>
                  ))}
                </MapContainer>
              </div>
            </div>

            <div className="bg-white border border-[#E0E5DF] rounded-xl shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="p-4 border-b border-[#E0E5DF]">
                <h3 className="font-semibold">Observed Competitors ({report.competitors.length})</h3>
              </div>
              <div className="overflow-auto p-0 flex-1">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-[#69766F] uppercase bg-[#F7F8F5] sticky top-0">
                    <tr>
                      <th className="px-4 py-3 font-medium">Business</th>
                      <th className="px-4 py-3 font-medium">Rating</th>
                      <th className="px-4 py-3 font-medium text-right">Reviews</th>
                      <th className="px-4 py-3 font-medium text-right">Insights</th>
                    </tr>
                  </thead>
                  <tbody>
                    {report.competitors.map((c) => (
                      <React.Fragment key={c.id}>
                      <tr className="border-b border-[#E0E5DF] hover:bg-[#F7F8F5]/50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-[#17211F]">{c.name}</div>
                          <div className="text-xs text-[#69766F] truncate max-w-[200px]">{c.address || c.category}</div>
                        </td>
                        <td className="px-4 py-3">
                          {c.rating ? (
                            <div className="flex flex-col items-start gap-1">
                              <span className="inline-flex items-center gap-1 text-[#B96918] font-medium">
                                ★ {c.rating}
                              </span>
                            </div>
                          ) : '--'}
                        </td>
                        <td className="px-4 py-3 text-right font-mono">
                          {c.reviewCount || '--'}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <Button variant="ghost" size="sm" onClick={() => loadReviews(c.id)}>
                            {expandedReviewId === c.id ? <ChevronUp className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />}
                          </Button>
                        </td>
                      </tr>
                      {expandedReviewId === c.id && (
                        <tr className="bg-[#F7F8F5]/30">
                          <td colSpan={4} className="px-4 py-3">
                            {isLoadingReviews ? (
                              <div className="flex items-center justify-center py-4 text-[#69766F] text-sm">
                                <Loader2 className="h-4 w-4 animate-spin mr-2" /> Loading reviews...
                              </div>
                            ) : reviews.length > 0 ? (
                              <div className="space-y-3">
                                <h4 className="text-xs font-semibold text-[#17211F] uppercase tracking-wider">Recent Reviews</h4>
                                {reviews.slice(0, 3).map((r, i) => (
                                  <div key={i} className="bg-white border border-[#E0E5DF] p-3 rounded text-sm">
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="font-medium">{r.user?.name || r.author || "User"}</span>
                                      <span className="text-[#B96918] text-xs font-medium">★ {r.rating}</span>
                                    </div>
                                    <p className="text-[#69766F] text-xs line-clamp-2">{r.snippet || r.text || "No review text provided."}</p>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="py-4 text-center text-sm text-[#69766F]">No text reviews found.</div>
                            )}
                          </td>
                        </tr>
                      )}
                      </React.Fragment>
                    ))}
                    {report.competitors.length === 0 && (
                      <tr>
                        <td colSpan={3} className="px-4 py-8 text-center text-[#69766F]">
                          No competitors found in the area.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="gaps" className="mt-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[#E0E5DF] pb-2">Identified Gaps</h3>
              {report.findings.map((f, i) => (
                <div key={i} className="bg-white border border-[#117C68]/30 rounded-lg p-5 shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#117C68]" />
                  <h4 className="font-bold text-[#14212B]">{f.claim}</h4>
                  <p className="text-sm text-[#69766F] mt-2">{f.evidence}</p>
                  <div className="mt-4 pt-4 border-t border-[#E0E5DF]/50">
                    <p className="text-xs font-medium text-[#17211F]">Why it matters:</p>
                    <p className="text-xs text-[#69766F] mt-1">{f.whyItMatters}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b border-[#E0E5DF] pb-2 flex items-center gap-2">
                <ShieldAlert className="h-5 w-5 text-[#C34242]" /> Potential Risks
              </h3>
              {report.risks.map((r, i) => (
                <div key={i} className="bg-[#F7F8F5] border border-[#E0E5DF] rounded-lg p-4">
                  <h4 className="font-medium text-[#17211F]">{r.risk}</h4>
                  <p className="text-xs text-[#69766F] mt-1">Source: {r.source}</p>
                  {r.unverifiedReason && (
                    <p className="text-xs text-[#B96918] mt-2 bg-white px-2 py-1 rounded inline-block border border-[#E0E5DF]">
                      Note: {r.unverifiedReason}
                    </p>
                  )}
                </div>
              ))}
              {report.risks.length === 0 && (
                <div className="text-sm text-[#69766F] p-4 bg-white border border-[#E0E5DF] rounded-lg">
                  No explicit risks identified from current search evidence. This does not mean the opportunity is risk-free.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
