import { Link } from "react-router-dom";
import { ArrowLeft, Activity } from "lucide-react";

export default function SystemStatus() {
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
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-base-gold/10 flex items-center justify-center border border-base-gold/30">
                  <Activity className="w-6 h-6 text-base-gold" />
              </div>
              <div>
                <h1 className="font-serif italic text-4xl text-white">System Status</h1>
                <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Live Uptime Report</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full glass-card border-green-500/30">
               <span className="animate-pulse w-2 h-2 rounded-full bg-green-400"></span>
               <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">All Systems Operational</span>
            </div>
          </div>
          
          <div className="space-y-4">
             <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <span className="text-white/80 font-medium">GapMap Inference Engine</span>
                <span className="text-green-400 text-sm tracking-wide uppercase">Operational</span>
             </div>
             <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <span className="text-white/80 font-medium">SerpApi Connection: Google Maps</span>
                <span className="text-green-400 text-sm tracking-wide uppercase">Operational</span>
             </div>
             <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <span className="text-white/80 font-medium">SerpApi Connection: Google Trends</span>
                <span className="text-green-400 text-sm tracking-wide uppercase">Operational</span>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
