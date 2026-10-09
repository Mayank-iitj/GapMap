import { Link } from "react-router-dom";
import { ArrowLeft, Info } from "lucide-react";

export default function About() {
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
                <Info className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">About Us</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">The Story Behind GapMap</p>
            </div>
          </div>
          
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-2">Our Mission</h2>
            <p>At GapMap India, our mission is to empower entrepreneurs with evidence. We believe that launching a business shouldn't rely on gut feelings, but on hard, quantifiable data indicating unfulfilled local demand.</p>
            
            <h2 className="text-xl font-bold text-white mb-2 mt-8">The Problem</h2>
            <p>Countless businesses fail not because the product is bad, but because they launch in saturated markets or ignore where the real customer pain points are. Traditional market research is expensive and often outdated by the time it reaches you.</p>

            <h2 className="text-xl font-bold text-white mb-2 mt-8">Our Solution</h2>
            <p>GapMap was built to provide real-time, deterministic intelligence. By aggregating and analyzing live search intents, geospatial competitor density, and momentum trajectories, we uncover the hidden opportunities where demand vastly outstrips supply.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
