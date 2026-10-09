import { Link } from "react-router-dom";
import { ArrowLeft, Code } from "lucide-react";

export default function ApiDocs() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-base-gold/30">
      <div className="fixed inset-0 z-0 bg-dots pointer-events-none"></div>

      <nav className="relative z-50 px-6 md:px-12 py-6 border-b border-white/10 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-base-gold transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="font-serif italic font-bold text-xl tracking-wide text-white">GapMap</div>
      </nav>

      <main className="relative z-10 flex flex-col items-center pt-24 pb-32 px-6">
        <div className="w-full max-w-4xl glass-card p-12 rounded-[40px]">
          <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-8">
            <div className="w-12 h-12 rounded-full bg-base-gold/10 flex items-center justify-center border border-base-gold/30">
                <Code className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">API Documentation</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Developer Reference v1.0</p>
            </div>
          </div>
          
          <div className="space-y-8 text-white/70 font-light leading-relaxed">
            <p className="text-lg">Welcome to the GapMap API. Integrate our deterministic scoring engine directly into your own tools.</p>
            
            <div className="bg-black/50 p-6 rounded-xl border border-white/10 font-mono text-sm">
              <span className="text-green-400">GET</span> /api/v1/market-score?query=coffee+shop&location=mumbai
            </div>
            
            <p>Our RESTful API endpoints allow you to programmatically run searches and extract the 5-point Opportunity Score without utilizing our frontend dashboard.</p>
            
            <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-semibold tracking-wide uppercase hover:bg-light-gold transition-colors mt-4">
               Generate API Key
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
