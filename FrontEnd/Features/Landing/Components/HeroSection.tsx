import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative pt-40 pb-32 px-6 text-center">
      <div className="max-w-4xl mx-auto">

-        <div className="inline-flex justify-center mb-6 animate-fade-up">
          <span className="badge-pill">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Offline-capable · PWA · Real-time
          </span>
        </div>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight mb-6 animate-fade-up-delay-1">
          Your store, <span className="gradient-text">smarter</span>
          {" &"} faster.
        </h1>

        <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed mb-10 animate-fade-up-delay-2">
          StoreOS is a full-featured Point-of-Sale system built for modern
          retail. Sell, track inventory, manage clients, analyse revenue —
          even offline.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up-delay-3">
          <Link href="/login" className="btn-glow text-base">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
            Launch Dashboard
          </Link>
          <a href="#features" className="btn-outline text-base">
            Explore Features
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs text-slate-500 tracking-widest uppercase">
          Scroll
        </span>
        <div className="w-5 h-8 rounded-full border border-slate-600 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 bg-blue-500 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
