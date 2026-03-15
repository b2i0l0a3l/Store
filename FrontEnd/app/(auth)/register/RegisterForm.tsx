import Link from "next/link";
import RegisterFormCard from "./card";
import Form from "./form";

export default function RegisterForm() {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/30 mb-4">
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
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white">Create account</h1>
          <p className="text-slate-400 mt-1">Join us today, it&apos;s free</p>
        </div>

        <RegisterFormCard>
          <Form />

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50" />
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-slate-900/80 text-slate-500">
                Already have an account?
              </span>
            </div>
          </div>

          <Link
            href="/login"
            className="flex items-center justify-center w-full py-3 px-4 border border-slate-700/50 text-slate-300 font-medium rounded-xl hover:bg-slate-800/60 hover:border-slate-600/60 hover:text-white focus:outline-none transition-all duration-200"
          >
            Sign in instead
          </Link>
        </RegisterFormCard>
      </div>
    </div>
  );
}
