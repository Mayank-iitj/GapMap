import { Link } from "react-router-dom"
import { Play, Sparkles, Globe, LineChart, Search, ArrowRight } from "lucide-react"
import MagicBento from "../components/MagicBento"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden font-sans selection:bg-base-gold/30">
      {/* Radial Dot Grid Background */}
      <div className="fixed inset-0 z-0 bg-dots pointer-events-none"></div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full px-6 md:px-12 py-6 flex items-center justify-between z-50 mix-blend-difference">
        <div className="font-serif italic font-bold text-2xl tracking-wide text-white">
          GapMap
        </div>
        <div className="hidden md:flex gap-8 items-center text-[11px] uppercase tracking-[0.2em] font-medium text-white/80">
          <a href="#features" className="hover:text-base-gold transition-colors">Features</a>
          <a href="#pricing" className="hover:text-base-gold transition-colors">Pricing</a>
          <a href="#methodology" className="hover:text-base-gold transition-colors">Methodology</a>
        </div>
        <div>
          <Link
            to="/app"
            className="bg-white text-black px-6 py-3 rounded-full text-xs font-semibold tracking-wide uppercase hover:bg-light-gold transition-colors"
          >
            Start Free Trial
          </Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center">
        {/* Hero Section */}
        <section className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-20 px-6">
          <div className="text-center max-w-5xl z-20 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-8">
              <span className="animate-pulse w-2 h-2 rounded-full bg-green-400"></span>
              <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Live</span>
              <span className="text-xs text-white/80 ml-2">Market Intelligence Active</span>
            </div>
            
            <h1 className="font-serif italic text-[clamp(2.5rem,8vw,6rem)] leading-[1.1] mb-8">
              Discover the <span className="text-base-gold font-normal">Underserved</span> <br />
              Markets of Tomorrow
            </h1>
            
            <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light mb-10 leading-relaxed">
              An evidence-first market intelligence platform that helps entrepreneurs identify underserved local markets using live search data.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/app"
                className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-light-gold transition-all duration-300"
              >
                Analyze Market Now
              </Link>
              <button className="px-8 py-4 rounded-full text-sm font-semibold tracking-wide border border-white/20 hover:border-base-gold hover:text-base-gold transition-all duration-300 flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" /> Watch Demo
              </button>
            </div>
          </div>

          {/* MagicBento Grid */}
          <div className="w-full max-w-5xl mt-10 md:mt-0 relative z-30">
            <MagicBento 
              textAutoHide={true}
              enableStars={true}
              enableSpotlight={true}
              enableBorderGlow={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={300}
              particleCount={12}
              glowColor="167, 139, 113" 
            />
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="w-full max-w-7xl px-6 py-32">
          <div className="text-center mb-20">
            <h2 className="font-serif italic text-4xl md:text-5xl mb-6">Uncover the Unseen</h2>
            <p className="text-white/60 max-w-2xl mx-auto">Our heuristics map search intent against local supply to find where demand vastly outstrips availability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Search, title: "Search Momentum", desc: "Track growing interest via Google Trends before markets saturate." },
              { icon: Globe, title: "Supply Gap", desc: "Analyze competitor density via Maps to find physical white space." },
              { icon: Sparkles, title: "Customer Pain", desc: "Identify underserved needs by analyzing poor competitor reviews." },
              { icon: LineChart, title: "Risk Scoring", desc: "Quantify the viability of a market using combined signal vectors." }
            ].map((feature, i) => (
              <div key={i} className="glass-card p-8 rounded-[32px] group hover:border-base-gold/50 transition-colors duration-500">
                <div className="w-12 h-12 rounded-2xl bg-[#a78b71]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500" style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                  <feature.icon className="w-6 h-6 text-base-gold" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-white/90">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full max-w-7xl px-6 py-32 border-t border-white/5 relative">
          <div className="text-center mb-16">
            <h2 className="font-serif italic text-4xl md:text-5xl mb-6">Invest in Evidence</h2>
            
            {/* Toggle */}
            <div className="inline-flex items-center p-1 bg-white/5 rounded-full border border-white/10 mt-6">
              <button className="px-6 py-2 rounded-full text-sm font-medium bg-white text-black transition-all">Monthly</button>
              <button className="px-6 py-2 rounded-full text-sm font-medium text-white/60 hover:text-white transition-all">Annual</button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center max-w-5xl mx-auto">
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
            <div className="glass-card p-10 rounded-[40px] text-center relative border border-[#a78b71]/40 scale-105 shadow-[0_0_50px_rgba(167,139,113,0.1)] z-10">
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
        </section>

        {/* Methodology Section */}
        <section id="methodology" className="w-full max-w-7xl px-6 py-32 border-t border-white/5">
           <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="font-serif italic text-4xl md:text-5xl mb-6">Opportunity Scoring Engine</h2>
            <p className="text-white/60">Our deterministic heuristics process live search evidence to map the viability of local markets. No black boxes. Pure data.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "Demand Strength", weight: "25%", src: "Google Trends", desc: "Measures absolute search volume indices to validate core local demand." },
               { title: "Supply Gap", weight: "20%", src: "Google Maps", desc: "Calculates the inverse density of competitors to identify physical whitespace." },
               { title: "Customer Pain", weight: "15%", src: "Maps Reviews", desc: "Extracts average local sentiment to find markets with low satisfaction." },
               { title: "Momentum", weight: "15%", src: "Trends Trajectory", desc: "Analyzes historical search trajectory to favor growing vs declining markets." },
               { title: "Risk Resilience", weight: "10%", src: "Business Volume", desc: "Evaluates competitor density and commercial signals to model market friction." }
             ].map((heuristic, i) => (
               <div key={i} className="glass-card p-8 rounded-[32px] group hover:bg-white/[0.05] transition-colors duration-500 relative overflow-hidden">
                 <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                    <span className="text-4xl font-serif text-base-gold italic">{heuristic.weight}</span>
                 </div>
                 <div className="mb-8">
                    <h3 className="font-bold text-xl mb-1 text-white/90">{heuristic.title}</h3>
                    <p className="text-[10px] uppercase tracking-widest text-base-gold">{heuristic.src}</p>
                 </div>
                 <p className="text-sm text-gray-400 leading-relaxed pr-8">{heuristic.desc}</p>
               </div>
             ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full bg-[#050505] pt-24 pb-8 px-6 md:px-12 relative z-10 font-sans border-t border-white/10">
        <div className="w-full max-w-[1400px] mx-auto flex flex-col md:flex-row justify-between gap-12 md:gap-4 lg:w-4/5 text-base md:text-xl font-light text-white">
          
          <div className="flex flex-col gap-3">
            <a href="/about" className="hover:text-base-gold transition-colors">about</a>
            <a href="/use-cases" className="hover:text-base-gold transition-colors">use cases</a>
            <a href="/contact" className="hover:text-base-gold transition-colors">contact</a>
            <a href="/pricing" className="hover:text-base-gold transition-colors mt-4">pricing</a>
          </div>

          <div className="flex flex-col gap-3">
            <a href="/api-docs" className="hover:text-base-gold transition-colors">api docs</a>
            <a href="/policy" className="hover:text-base-gold transition-colors">policy</a>
            <a href="/blog" className="hover:text-base-gold transition-colors">blog</a>
            <a href="/status" className="hover:text-base-gold transition-colors mt-4">system status</a>
            <a href="/cookie-settings" className="hover:text-base-gold transition-colors">cookie settings</a>
          </div>
        </div>

        {/* Massive Typography */}
        <div className="w-full flex justify-center items-center mt-24 md:mt-32 overflow-hidden pointer-events-none select-none border-b border-white/10 pb-8">
          <span className="font-sans font-black text-[20vw] leading-[0.75] tracking-tighter text-white">
            GAPMAP
          </span>
        </div>
      </footer>
    </div>
  )
}
