"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, KeyRound } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import handleForgotPassword from "../actions/forgot-password.actions";

export default function ForgotPasswordClient() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    const res = await handleForgotPassword(new FormData(form));
    setLoading(false);

    if (res.isSuccess) {
      setSent(true);
      toast.success("If the email exists, a reset link has been sent.");
    } else {
      toast.error(res.error || "Something went wrong");
    }
  }

  if (sent) {
    return (
      <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
        <Card className="min-w-[400px] border border-accent">
          <CardHeader>
            <KeyRound className="w-16 h-16 mx-auto bg-green-600 text-white rounded-lg p-2" />
            <CardTitle className="text-2xl font-bold text-center">Check Your Email</CardTitle>
            <CardDescription className="text-muted-foreground text-center">
              If an account with that email exists, we have sent a password reset link.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button className="w-full" asChild>
              <a href="/sign-in">Back to Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
      <Card className="min-w-[400px] border border-accent">
        <CardHeader>
          <KeyRound className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-lg p-2" />
          <CardTitle className="text-2xl font-bold text-center">Reset Password</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Enter your email to receive a reset link
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-semibold" htmlFor="email">
                  Email
                </label>
                <Input
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full"
                  type="email"
                  id="email"
                  name="email"
                  required
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Send Reset Link"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Remember your password?{" "}
                <a href="/sign-in" className="text-primary hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
