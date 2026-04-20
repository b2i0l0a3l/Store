import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Auth | My Store",
  description: "Login or register to access the store.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
