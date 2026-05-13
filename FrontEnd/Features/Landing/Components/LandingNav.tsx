import Link from "next/link";

export default function LandingNav() {
  return (
    <nav className="nav-blur fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-lg font-bold"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            }}
          >
            S
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            StoreOS
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">
            Features
          </a>
          <a href="#stats" className="hover:text-white transition-colors">
            Stats
          </a>
          <a href="#preview" className="hover:text-white transition-colors">
            Preview
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/login" className="btn-outline text-sm py-2 px-5">
            Sign In
          </Link>
          <Link href="/register" className="btn-glow text-sm py-2 px-5">
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
