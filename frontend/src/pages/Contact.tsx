import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";

export default function Contact() {
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
                <Mail className="w-6 h-6 text-base-gold" />
            </div>
            <div>
              <h1 className="font-serif italic text-4xl text-white">Contact Us</h1>
              <p className="text-base-gold text-sm tracking-widest uppercase mt-2">Get in touch with the team</p>
            </div>
          </div>
          
          <div className="text-white/70 font-light leading-relaxed mb-8">
            <p>Have questions about integrating the API, requesting new features, or just want to say hi? We'd love to hear from you. Fill out the form below or reach us directly.</p>
          </div>

          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Name</label>
                <input type="text" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-base-gold/50 transition-colors" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/80">Email</label>
                <input type="email" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 focus:outline-none focus:border-base-gold/50 transition-colors" placeholder="you@example.com" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">Message</label>
              <textarea className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 min-h-[150px] focus:outline-none focus:border-base-gold/50 transition-colors" placeholder="How can we help?"></textarea>
            </div>

            <button type="submit" className="bg-white text-black px-8 py-4 rounded-full text-sm font-semibold tracking-wide hover:bg-light-gold transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  )
}
