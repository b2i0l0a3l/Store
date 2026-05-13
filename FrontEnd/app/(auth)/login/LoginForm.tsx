import Link from "next/link";
import LoginFormCard from "./card";
import Form from "./form";

export default function LoginForm() {
  return (
    <div className="relative min-h-screen flex items-center justify-center p-4">
      {/* Ambient orbs */}
      <div
        className="fixed pointer-events-none animate-float-slow"
        style={{
          top: "-150px",
          left: "-100px",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)",
        }}
      />
      <div
        className="fixed pointer-events-none animate-float-slower"
        style={{
          bottom: "-120px",
          right: "-80px",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)",
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
                d="M15 19l-7-7 7-7"
              />
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
              background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
              boxShadow: "0 8px 32px rgba(59,130,246,0.4)",
            }}
          >
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Welcome back
          </h1>
          <p className="text-slate-400 text-sm">
            Sign in to your{" "}
            <span className="bg-gradient-to-br from-blue-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent font-semibold">StoreOS</span>{" "}
            account
          </p>
        </div>

        <LoginFormCard>
          <Form />
          <div className="relative text-center mt-6 mb-5 before:absolute before:top-1/2 before:left-0 before:right-0 before:h-px before:bg-white/10">
            <span className="relative bg-slate-900 px-3 text-slate-500 text-[0.8rem]">New to the platform?</span>
          </div>
          <Link href="/register" className="w-full mt-2 py-[0.875rem] px-6 bg-transparent text-slate-400 font-medium rounded-2xl border border-white/10 flex items-center justify-center gap-2 transition-all hover:bg-white/5 hover:border-blue-500/35 hover:text-blue-400">
            Create an account
          </Link>
        </LoginFormCard>
      </div>
    </div>
  );
}
