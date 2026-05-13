import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 pb-12 px-6 overflow-hidden">
      {/* Dynamic Background Effects for Hero */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] opacity-20"
          style={{
            background: "radial-gradient(ellipse at center, #3b82f6 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] bg-center [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto flex flex-col items-center text-center">
        {/* Animated Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md text-sm text-blue-300 font-medium shadow-[0_0_20px_rgba(59,130,246,0.15)] animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Next-Gen Point of Sale System
        </div>

        {/* Main Headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-[5rem] font-extrabold tracking-tight text-white leading-[1.1] mb-8 animate-fade-up-delay-1 max-w-4xl mx-auto">
          Manage your store{" "}
          <span className="relative whitespace-nowrap">
            <span className="absolute -inset-2 bg-gradient-to-r from-blue-600 to-cyan-600 blur-xl opacity-30 rounded-full"></span>
            <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
              smarter & faster
            </span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-12 animate-fade-up-delay-2">
          StoreOS transforms how you do business. From offline-first sales to real-time analytics and inventory management, all in one beautiful, lightning-fast platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto animate-fade-up-delay-3">
          <Link
            href="/login"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-base font-bold text-white transition-all duration-300 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:shadow-[0_0_60px_rgba(59,130,246,0.6)] hover:-translate-y-1"
          >
            Launch Dashboard
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          
          <a
            href="#features"
            className="group inline-flex items-center justify-center gap-3 px-8 py-4 w-full sm:w-auto text-base font-bold text-slate-300 transition-all duration-300 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
          >
            Explore Features
            <svg
              className="w-5 h-5 transition-transform group-hover:translate-y-1 opacity-70 group-hover:opacity-100"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Floating App Preview Abstract */}
        <div className="mt-20 w-full max-w-5xl mx-auto perspective-[2000px] animate-fade-up-delay-3 hidden md:block">
          <div className="relative rounded-3xl border border-white/10 bg-slate-900/50 backdrop-blur-md p-2 shadow-2xl transform rotate-x-12 hover:rotate-x-0 transition-transform duration-700 ease-out">
            <div className="absolute inset-0 bg-gradient-to-t from-[#03060f] via-transparent to-transparent z-10 rounded-3xl pointer-events-none" />
            <div className="rounded-2xl overflow-hidden border border-white/5 bg-slate-950/80 aspect-[16/9] flex flex-col">
              {/* Header */}
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-4 bg-slate-900/50">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="flex-1 max-w-md mx-auto h-6 rounded-md bg-white/5 border border-white/5" />
              </div>
              {/* Body */}
              <div className="flex-1 p-6 flex gap-6">
                {/* Sidebar */}
                <div className="w-48 flex flex-col gap-3">
                  <div className="h-8 rounded-lg bg-blue-500/20 border border-blue-500/30" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                  <div className="h-8 rounded-lg bg-white/5" />
                </div>
                {/* Content */}
                <div className="flex-1 flex flex-col gap-6">
                  <div className="flex gap-4">
                    <div className="flex-1 h-24 rounded-xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-white/5" />
                    <div className="flex-1 h-24 rounded-xl bg-gradient-to-br from-purple-500/10 to-pink-500/5 border border-white/5" />
                    <div className="flex-1 h-24 rounded-xl bg-gradient-to-br from-emerald-500/10 to-teal-500/5 border border-white/5" />
                  </div>
                  <div className="flex-1 rounded-xl bg-white/5 border border-white/5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
