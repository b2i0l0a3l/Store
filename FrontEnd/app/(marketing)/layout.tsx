import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SidebarProvider from "../components/side-bar/SidebarProvider";
import TopBar from "../components/top-bar/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My Store",
  description: "  description: Verwalten sie dein Geschaft.",
};

import ToastContainer from "../components/Ui/Toast/ToastContainer";
import { CurrentUser } from "../util/currentUser";

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await CurrentUser();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider topBar={<TopBar />} userRole={user?.role}>
          {children}
        </SidebarProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
