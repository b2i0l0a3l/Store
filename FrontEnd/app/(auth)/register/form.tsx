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
    icon: (
      <svg
        className="w-5 h-5 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),
  },
  {
    id: "email" as const,
    label: "Email Address",
    type: "email",
    placeholder: "you@example.com",
    autoComplete: "email",
    icon: (
      <svg
        className="w-5 h-5 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
  {
    id: "password" as const,
    label: "Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    icon: (
      <svg
        className="w-5 h-5 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </svg>
    ),
  },
  {
    id: "confirmPassword" as const,
    label: "Confirm Password",
    type: "password",
    placeholder: "••••••••",
    autoComplete: "new-password",
    icon: (
      <svg
        className="w-5 h-5 text-slate-500"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
        />
      </svg>
    ),
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

    const errors = validateRegisterFields(
      userName,
      email,
      password,
      confirmPassword,
    );

    if (errors) {
      setState({ errors });
      setPending(false);
      return;
    }

    try {
      const data = await register({ userName, email, password });
      if (!data.isSuccess) {
        setState({
          errors: {
            general: data.message ?? "Registration failed. Please try again.",
          },
        });
        setPending(false);
        return;
      }

      setState({ success: true });
      setPending(false);
    } catch (err) {
      setState({
        errors: {
          general: "An unexpected error occurred.",
        },
      });
      setPending(false);
    }
  };

  return (
    <>
      {/* Success Banner */}
      {state.success && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
          <svg
            className="w-5 h-5 text-emerald-400 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-emerald-400 text-sm font-medium">
            Account created!{" "}
            <Link href="/login" className="underline">
              Sign in now →
            </Link>
          </p>
        </div>
      )}

      {/* General Error */}
      {state.errors?.general && (
        <div className="mb-6 flex items-center gap-3 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-xl">
          <svg
            className="w-5 h-5 text-red-400 shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <p className="text-red-400 text-sm">{state.errors.general}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {fields.map((field) => (
          <div key={field.id}>
            <label
              htmlFor={field.id}
              className="block text-sm font-medium text-slate-300 mb-1.5"
            >
              {field.label}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                {field.icon}
              </div>
              <input
                id={field.id}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                className={`w-full pl-11 pr-4 py-3 bg-slate-800/60 border rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  state.errors?.[field.id]
                    ? "border-red-500/60 focus:ring-red-500/30"
                    : "border-slate-700/50 focus:ring-cyan-500/40 focus:border-cyan-500/50"
                }`}
              />
            </div>
            {state.errors?.[field.id] && (
              <p className="mt-1.5 text-xs text-red-400">
                {state.errors[field.id]}
              </p>
            )}
          </div>
        ))}

        <button
          type="submit"
          disabled={pending || state.success}
          className="w-full py-3 px-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-semibold rounded-xl shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:from-cyan-500 hover:to-blue-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:active:scale-100 mt-2"
        >
          {pending ? (
            <span className="flex items-center justify-center gap-2">
              <svg
                className="animate-spin w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>
      </form>
    </>
  );
}
