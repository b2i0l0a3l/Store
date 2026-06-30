"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useState } from "react";
import handleRegister from "../actions/register.actions";

export default function RegisterClient() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    setLoading(true);
    const res = await handleRegister(new FormData(form));
    setLoading(false);

    if (res.isSuccess) {
      toast.success("Account created! Please sign in.");
      router.push("/sign-in");
    } else {
      toast.error(res.error || "Registration failed");
    }
  }

  return (
    <div className="w-full h-[calc(100vh-56px)] flex justify-center items-center">
      <Card className="min-w-[400px] border border-accent h-[calc(100vh-112px)]">
        <CardHeader>
          <UserPlus className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-lg p-2" />
          <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
          <CardDescription className="text-muted-foreground text-center">
            Register a new account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-xs text-muted-foreground font-semibold" htmlFor="fullName">
                  Full Name
                </label>
                <Input
                  placeholder="Enter your full name"
                  className="w-full"
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  minLength={2}
                />
              </div>
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
                  placeholder="Create a password"
                  autoComplete="new-password"
                  className="w-full"
                  type="password"
                  id="password"
                  name="password"
                  required
                  minLength={6}
                />
              </div>
              <Button className="w-full" type="submit" disabled={loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create Account"}
              </Button>
              <p className="text-xs text-center text-muted-foreground">
                Already have an account?{" "}
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
