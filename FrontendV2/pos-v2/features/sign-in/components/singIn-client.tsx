"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import handleSignIn from "../actions/sign-in.actions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, LogInIcon } from "lucide-react";
import { useState } from "react";

export default function SignInClient() {
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = e.currentTarget;
    if (!formData.checkValidity()) {
      formData.reportValidity();
      return;
    }
    setLoading(true);
    const res = await handleSignIn(new FormData(formData));
    if (!res.isSuccess) {
      toast.error(res.error);
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
      <Card className="min-w-[400px] border border-accent">
        <CardHeader>
          <Lock className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-lg p-2" />
          <CardTitle className="text-3xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Glad to see you again
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
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-semibold" htmlFor="password">
                  Password
                </label>
                <Input
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  className="w-full"
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                />
              </div>
              <div className="flex justify-end">
                <a
                  href="/forgot-password"
                  className="text-xs text-muted-foreground hover:text-primary hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a href="/sign-up" className="text-primary hover:underline">
                  Create one
                </a>
              </p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
