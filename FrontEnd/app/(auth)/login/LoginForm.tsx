import Link from "next/link";
import LoginFormCard from "./card";
import Form from "./form";

export default function LoginForm() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-blue-500 to-cyan-500 shadow-lg shadow-blue-500/30 mb-4">
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
          <h1 className="text-3xl font-bold text-white">Welcome back</h1>
          <p className="text-slate-400 mt-1">Sign in to your account</p>
        </div>

        <LoginFormCard>
          <Form />
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-900/80 text-slate-500">
                New to the platform?
              </span>
            </div>
          </div>
          <Link
            href="/register"
            className="flex items-center justify-center w-full py-3 px-4 border border-slate-700/50 text-slate-300 font-medium rounded-xl hover:bg-slate-800/60 hover:border-slate-600/60 hover:text-white focus:outline-none transition-all duration-200"
          >
            Create an account
          </Link>
        </LoginFormCard>
      </div>
    </div>
  );
}
