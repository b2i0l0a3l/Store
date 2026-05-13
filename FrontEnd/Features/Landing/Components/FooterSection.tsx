import Link from "next/link";

export default function FooterSection() {
  return (
    <footer
      className="border-t px-6 py-10"
      style={{ borderColor: "rgba(255,255,255,0.06)" }}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-base font-bold"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
            }}
          >
            S
          </div>
          <span className="font-bold text-white">StoreOS</span>
        </div>
        <p className="text-sm text-slate-600">
          © {new Date().getFullYear()} StoreOS. Built with Next.js & ❤️
        </p>
        <div className="flex items-center gap-6 text-sm text-slate-500">
          <Link href="/login" className="hover:text-slate-300 transition-colors">
            Login
          </Link>
          <Link href="/register" className="hover:text-slate-300 transition-colors">
            Register
          </Link>
          <a href="#features" className="hover:text-slate-300 transition-colors">
            Features
          </a>
        </div>
      </div>
    </footer>
  );
}
