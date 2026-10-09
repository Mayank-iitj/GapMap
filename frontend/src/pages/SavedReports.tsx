import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import type { AnalysisReport } from "@/types"
import { FileText, MapPin, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function SavedReports() {
  const [reports, setReports] = useState<AnalysisReport[]>([])

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('gapmap_reports') || '[]')
    setReports(saved)
  }, [])

  const deleteReport = (id: string) => {
    const updated = reports.filter(r => r.reportId !== id)
    localStorage.setItem('gapmap_reports', JSON.stringify(updated))
    setReports(updated)
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Saved Reports</h1>
        <p className="text-[#69766F] mt-1">Your previously generated market intelligence reports.</p>
      </div>

      {reports.length === 0 ? (
        <div className="bg-white border border-[#E0E5DF] rounded-lg p-12 text-center">
          <FileText className="mx-auto h-12 w-12 text-[#E0E5DF] mb-4" />
          <h3 className="text-lg font-medium">No saved reports yet</h3>
          <p className="text-[#69766F] mb-6 mt-1">Generate a new report from the workspace.</p>
          <Link to="/app">
            <Button className="bg-[#117C68] hover:bg-[#0C5C4F]">Go to Workspace</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reports.map(report => (
            <div key={report.reportId} className="bg-white border border-[#E0E5DF] rounded-lg p-5 flex flex-col hover:border-[#117C68]/50 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight">{report.businessIdea}</h3>
                  <div className="flex items-center text-sm text-[#69766F] mt-1 gap-1">
                    <MapPin className="h-3 w-3" /> {report.city}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-mono font-bold text-[#117C68]">
                    {report.overallScore ? report.overallScore.toFixed(0) : '--'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center text-xs text-[#69766F] gap-1 mb-6">
                <Calendar className="h-3 w-3" /> {new Date(report.timestamp).toLocaleDateString()}
              </div>
              
              <div className="mt-auto flex gap-2">
                <Link to={`/app/report/${report.reportId}`} className="flex-1">
                  <Button variant="outline" className="w-full bg-white text-[#17211F] border-[#E0E5DF] hover:bg-[#F7F8F5]">View Report</Button>
                </Link>
                <Button variant="outline" size="icon" className="bg-white border-[#E0E5DF] text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => deleteReport(report.reportId)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
