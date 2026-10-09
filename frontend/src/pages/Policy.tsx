import { Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";

export default function Policy() {
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
                <Shield className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">Privacy Policy</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Last Updated: October 2026</p>
            </div>
          </div>
          
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <h2 className="text-xl font-bold text-white mb-2">1. Data Collection</h2>
            <p>We do not store your search queries permanently. All market intelligence requests are processed in memory and passed directly to our upstream search providers (SerpApi). We only retain metadata necessary for rate-limiting and billing purposes.</p>
            
            <h2 className="text-xl font-bold text-white mb-2 mt-8">2. Third-Party Services</h2>
            <p>By using GapMap, you acknowledge that your search parameters (such as business idea and location) are transmitted to Google Search, Google Maps, and Google Trends via SerpApi to gather live evidence. We are not responsible for the data collection practices of these upstream entities.</p>

            <h2 className="text-xl font-bold text-white mb-2 mt-8">3. Your Rights</h2>
            <p>If you have created an account to save reports, you maintain the right to delete all your saved market reports and account data at any time through the workspace settings panel.</p>
          </div>
        </div>
      </main>
    </div>
  )
}
