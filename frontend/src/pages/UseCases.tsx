import { Link } from "react-router-dom";
import { ArrowLeft, Lightbulb } from "lucide-react";

export default function UseCases() {
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
                <Lightbulb className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">Use Cases</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">How to leverage GapMap</p>
            </div>
          </div>
          
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">1. Validating a New Venture</h2>
              <p>Before investing capital into a new coffee shop, cloud kitchen, or EV charging station, use GapMap to instantly gauge local demand versus competitor density. Know for sure if a market is truly underserved.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">2. Geographic Expansion</h2>
              <p>Looking to open your second or third branch? Map multiple cities to compare their Opportunity Scores. Launch where search momentum is high but supply hasn't yet caught up.</p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">3. Identifying Niche Markets</h2>
              <p>Find out if hyper-specific queries (e.g., "vegan gluten-free bakery") have high search interest but low Maps presence. Exploit these specific customer pain points.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
