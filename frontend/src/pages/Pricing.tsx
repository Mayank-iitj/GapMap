import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function Pricing() {
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
        <div className="text-center mb-16 max-w-2xl">
          <h1 className="font-serif italic text-4xl md:text-5xl mb-6">Transparent Pricing</h1>
          <p className="text-white/60">No hidden fees. Just actionable data. Choose the plan that fits your growth ambitions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-6xl mx-auto w-full">
            {/* Basic */}
            <div className="glass-card p-10 rounded-[40px] text-center">
              <h3 className="text-lg text-white/60 mb-4">Explorer</h3>
              <div className="text-4xl font-bold mb-6">$49<span className="text-sm text-white/40 font-normal">/mo</span></div>
              <ul className="text-sm text-gray-400 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> 50 Searches / month</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> Basic Trend Analysis</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-white/20" /> Regional Data Only</li>
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-semibold tracking-wide">Select Plan</button>
            </div>
            
            {/* Pro */}
            <div className="glass-card p-10 rounded-[40px] text-center relative border border-[#a78b71]/40 scale-105 shadow-[0_0_50px_rgba(167,139,113,0.1)] z-10 bg-black/40">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-base-gold text-black px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                Most Popular
              </div>
              <h3 className="text-lg text-base-gold mb-4">Professional</h3>
              <div className="text-4xl font-bold mb-6">$129<span className="text-sm text-white/40 font-normal">/mo</span></div>
              <ul className="text-sm text-gray-300 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> Unlimited Searches</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> Global Heatmaps</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> API Access</li>
              </ul>
              <button className="w-full py-4 rounded-full bg-base-gold text-black hover:bg-light-gold transition-colors text-sm font-semibold tracking-wide">Get Started</button>
            </div>

            {/* Enterprise */}
            <div className="glass-card p-10 rounded-[40px] text-center">
              <h3 className="text-lg text-white/60 mb-4">Enterprise</h3>
              <div className="text-4xl font-bold mb-6">Custom</div>
              <ul className="text-sm text-gray-400 space-y-4 mb-8 text-left">
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> Dedicated Support</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> Custom Integrations</li>
                <li className="flex items-center gap-2"><ArrowRight className="w-4 h-4 text-base-gold" /> SLA Guarantee</li>
              </ul>
              <button className="w-full py-4 rounded-full border border-white/20 hover:bg-white/5 transition-colors text-sm font-semibold tracking-wide">Contact Sales</button>
            </div>
          </div>
      </main>
    </div>
  )
}
