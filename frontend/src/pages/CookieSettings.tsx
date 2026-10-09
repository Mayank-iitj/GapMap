import { Link } from "react-router-dom";
import { ArrowLeft, Cookie } from "lucide-react";

export default function CookieSettings() {
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
                <Cookie className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">Cookie Settings</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Manage Your Preferences</p>
            </div>
          </div>
          
          <div className="space-y-6 text-white/70 font-light leading-relaxed">
            <p>GapMap uses essential cookies to ensure you get the best experience on our website and to remember your session token when analyzing local markets.</p>
            
            <div className="glass-card p-6 rounded-2xl flex items-center justify-between mt-8 border border-base-gold/30 bg-base-gold/5">
                <div>
                   <h3 className="font-bold text-white mb-1">Essential Cookies</h3>
                   <p className="text-xs text-white/50">Required for the platform to function properly.</p>
                </div>
                <div className="w-12 h-6 bg-base-gold rounded-full relative">
                   <div className="absolute right-1 top-1 w-4 h-4 bg-black rounded-full"></div>
                </div>
             </div>

             <div className="glass-card p-6 rounded-2xl flex items-center justify-between">
                <div>
                   <h3 className="font-bold text-white mb-1">Analytics Tracking</h3>
                   <p className="text-xs text-white/50">Helps us understand how you use GapMap.</p>
                </div>
                <div className="w-12 h-6 bg-white/20 rounded-full relative">
                   <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                </div>
             </div>
             
             <div className="flex justify-end mt-8 pt-8">
               <button className="bg-white text-black px-8 py-3 rounded-full text-xs font-semibold tracking-wide uppercase hover:bg-light-gold transition-colors">
                 Save Preferences
               </button>
             </div>
          </div>
        </div>
      </main>
    </div>
  )
}
