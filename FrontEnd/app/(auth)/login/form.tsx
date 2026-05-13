"use client";
import { useState } from "react";
import { validateLoginFields } from "../util/validation";
import { login } from "@/app/(auth)/api/authApi";
import { setAccessToken, setRefreshToken } from "@/app/(auth)/util/session";
import type { LoginState } from "../util/types";

export default function LoginForm() {
  const [state, setState] = useState<LoginState>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setState({});

    const formData = new FormData(e.currentTarget);
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;

    const errors = validateLoginFields(email, password);
    if (errors) {
      setState({ errors });
      setPending(false);
      return;
    }

    try {
      const data = await login({ email, password });
      if (!data.isSuccess) {
        setState({
          errors: {
            general: data.message ?? "Login failed. Check your credentials.",
          },
        });
        setPending(false);
        return;
      }

      if (data.accessToken) await setAccessToken(data.accessToken);
      if (data.refreshToken) await setRefreshToken(data.refreshToken);
      window.location.href = "/";
    } catch {
      setState({ errors: { general: "An unexpected error occurred." } });
      setPending(false);
    }
  };

  return (
    <>
      {/* General error */}
      {state.errors?.general && (
        <div
          className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.3)",
            color: "#f87171",
          }}
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {state.errors.general}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-[0.85rem] font-medium text-slate-400 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "#475569" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              className={`w-full bg-white/5 border border-white/10 rounded-2xl text-slate-100 py-[0.825rem] pr-4 pl-11 text-[0.9rem] outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-[3px] focus:ring-blue-500/15 ${state.errors?.email ? "border-red-500/50 ring-[3px] ring-red-500/10" : ""}`}
            />
          </div>
          {state.errors?.email && (
            <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>
              {state.errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block text-[0.85rem] font-medium text-slate-400 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                style={{ color: "#475569" }}>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              className={`w-full bg-white/5 border border-white/10 rounded-2xl text-slate-100 py-[0.825rem] pr-4 pl-11 text-[0.9rem] outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-[3px] focus:ring-blue-500/15 ${state.errors?.password ? "border-red-500/50 ring-[3px] ring-red-500/10" : ""}`}
            />
          </div>
          {state.errors?.password && (
            <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>
              {state.errors.password}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending}
          className="w-full mt-2 py-[0.875rem] px-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 relative overflow-hidden transition-all shadow-[0_4px_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(59,130,246,0.55)] disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-white/15"
        >
          {pending ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Signing in…
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </>
  );
}
