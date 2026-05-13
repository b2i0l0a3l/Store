"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/app/(auth)/api/authApi";
import { validateRegisterFields } from "../util/validation";
import type { RegisterState } from "../util/types";

const fields = [
  {
    id: "userName" as const,
    label: "Username",
    type: "text",
    placeholder: "john_doe",
    autoComplete: "username",
    iconPath:
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z",
  },
  {
    id: "email" as const,
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    iconPath:
      "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
  },
  {
    id: "password" as const,
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    iconPath:
      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z",
  },
  {
    id: "confirmPassword" as const,
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    iconPath:
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
  },
];

export default function Form() {
  const [state, setState] = useState<RegisterState>({});
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setState({});

    const formData = new FormData(e.currentTarget);
    const userName = (formData.get("userName") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    const errors = validateRegisterFields(userName, email, password, confirmPassword);
    if (errors) {
      setState({ errors });
      setPending(false);
      return;
    }

    try {
      const submitData = new FormData();
      if (userName) submitData.append("FullName", userName);
      if (email) submitData.append("Email", email);
      if (password) submitData.append("Password", password);

      const imageFile = formData.get("image") as File;
      if (imageFile && imageFile.size > 0) submitData.append("Image", imageFile);

      const data = await register(submitData);
      if (!data.isSuccess) {
        setState({
          errors: { general: data.message ?? "Registration failed. Please try again." },
        });
        setPending(false);
        return;
      }

      setState({ success: true });
      setPending(false);
    } catch {
      setState({ errors: { general: "An unexpected error occurred." } });
      setPending(false);
    }
  };

  return (
    <>
      {/* Success */}
      {state.success && (
        <div
          className="mb-5 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
          style={{
            background: "rgba(16,185,129,0.1)",
            border: "1px solid rgba(16,185,129,0.3)",
            color: "#34d399",
          }}
        >
          <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p>
            Account created!{" "}
            <Link href="/login" className="underline font-medium">
              Sign in now →
            </Link>
          </p>
        </div>
      )}

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

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {fields.map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id} className="block text-[0.85rem] font-medium text-slate-400 mb-2">
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  style={{ color: "#475569" }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d={field.iconPath}
                  />
                </svg>
              </div>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                className={`w-full bg-white/5 border border-white/10 rounded-2xl text-slate-100 py-[0.825rem] pr-4 pl-11 text-[0.9rem] outline-none transition-all focus:border-blue-500/50 focus:bg-blue-500/5 focus:ring-[3px] focus:ring-blue-500/15 ${
                  state.errors?.[field.id] ? "border-red-500/50 ring-[3px] ring-red-500/10" : ""
                }`}
              />
            </div>
            {state.errors?.[field.id] && (
              <p className="mt-1.5 text-xs" style={{ color: "#f87171" }}>
                {state.errors[field.id]}
              </p>
            )}
          </div>
        ))}

        {/* Profile picture */}
        <div>
          <label htmlFor="image" className="block text-[0.85rem] font-medium text-slate-400 mb-2">
            Profile Picture{" "}
            <span style={{ color: "#475569", fontWeight: 400 }}>(Optional)</span>
          </label>
          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            className="w-full px-4 py-2.5 rounded-xl text-sm cursor-pointer"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "#94a3b8",
            }}
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={pending || state.success}
          className="w-full mt-2 py-[0.875rem] px-6 bg-gradient-to-br from-cyan-500 to-blue-500 text-white font-semibold rounded-2xl flex items-center justify-center gap-2 relative overflow-hidden transition-all shadow-[0_4px_24px_rgba(59,130,246,0.4)] hover:-translate-y-0.5 hover:shadow-[0_8px_36px_rgba(59,130,246,0.55)] disabled:opacity-55 disabled:cursor-not-allowed disabled:transform-none before:absolute before:inset-0 before:bg-gradient-to-br before:from-transparent before:to-white/15"
        >
          {pending ? (
            <>
              <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12" cy="12" r="10"
                  stroke="currentColor" strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account…
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </>
  );
}
