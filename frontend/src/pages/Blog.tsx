import { Link } from "react-router-dom";
import { ArrowLeft, Edit3 } from "lucide-react";

export default function Blog() {
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
        <div className="w-full max-w-5xl glass-card p-12 rounded-[40px]">
          <div className="flex items-center gap-4 mb-12 border-b border-white/10 pb-8">
            <div className="w-12 h-12 rounded-full bg-base-gold/10 flex items-center justify-center border border-base-gold/30">
                <Edit3 className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">The Intelligence Blog</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Insights and Market Analysis</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="glass-card p-8 rounded-3xl hover:border-base-gold/50 transition-colors cursor-pointer group">
                <div className="text-[10px] text-base-gold uppercase tracking-widest mb-3">Case Study</div>
                <h2 className="font-serif italic text-2xl text-white mb-4 group-hover:text-light-gold transition-colors">How 'Ghost Kitchens' Monopolized Suburbs in 2026</h2>
                <p className="text-sm text-white/60 leading-relaxed">We analyze how the GapMap engine identified a severe supply gap in Tier 2 cities before it became mainstream knowledge.</p>
             </div>
             
             <div className="glass-card p-8 rounded-3xl hover:border-base-gold/50 transition-colors cursor-pointer group">
                <div className="text-[10px] text-base-gold uppercase tracking-widest mb-3">Methodology</div>
                <h2 className="font-serif italic text-2xl text-white mb-4 group-hover:text-light-gold transition-colors">Decoding the Google Trends Trajectory</h2>
                <p className="text-sm text-white/60 leading-relaxed">A deep dive into our 15% momentum heuristic and why absolute search volume is never enough to predict success.</p>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
