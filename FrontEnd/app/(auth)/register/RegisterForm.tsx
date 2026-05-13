import Link from "next/link";
import RegisterFormCard from "./card";
import Form from "./form";

export default function RegisterForm() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Ambient orbs */}
      <div
        className="fixed pointer-events-none animate-float-slow"
        style={{
          top: "-120px",
          right: "-100px",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.18) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed pointer-events-none animate-float-slower"
        style={{
          bottom: "-100px",
          left: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.14) 0%, transparent 70%)",
        }}
      />

      {/* Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-up">
        {/* Back to landing */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/landing"
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-full text-[0.8rem] text-blue-300 font-medium text-xs">StoreOS</span>
        </div>

        {/* Logo + heading */}
        <div className="text-center mb-8">
          <div
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 shadow-lg"
            style={{
              background: "linear-gradient(135deg, #06b6d4, #3b82f6)",
              boxShadow: "0 8px 32px rgba(6,182,212,0.4)",
            }}
          >
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">Create account</h1>
          <p className="text-slate-400 text-sm">
            Join{" "}
            <span className="bg-gradient-to-br from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent font-semibold">StoreOS</span>{" "}
            — it&apos;s free
          </p>
        </div>

        <RegisterFormCard>
          <Form />
          <div className="relative text-center mt-6 mb-5 before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-white/10">
            <span className="relative bg-slate-900 px-3 text-slate-500 text-[0.8rem]">Already have an account?</span>
          </div>
          <Link href="/login" className="w-full mt-2 py-[0.875rem] px-6 bg-transparent text-slate-400 font-medium rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all hover:bg-white/5 hover:border-blue-500/35 hover:text-blue-400">
            Sign in instead
          </Link>
        </RegisterFormCard>
      </div>
    </div>
  );
}
