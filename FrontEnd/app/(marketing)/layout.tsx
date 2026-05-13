import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import SidebarProvider from "../../components/side-bar/SidebarProvider";
import TopBar from "../../components/top-bar/TopBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StoreOS — Point of Sale",
  description:
    "Manage your store: sell products, track inventory, manage clients, and analyse revenue — all in one place.",
  manifest: "/manifest.json",
};

import ToastContainer from "../../components/Ui/Toast/ToastContainer";
import { CurrentUser } from "../../util/currentUser";
import OfflineManager from "../../components/OfflineManager";

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
        <OfflineManager />
      </body>
    </html>
  );
}
