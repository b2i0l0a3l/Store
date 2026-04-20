import type { Metadata } from "next";
import "./globals.css";
import SidebarProvider from "../components/side-bar/SidebarProvider";
import TopBar from "../components/top-bar/TopBar";
import ToastContainer from "../components/Ui/Toast/ToastContainer";
import { CurrentUser } from "../util/currentUser";

export const metadata: Metadata = {
  title: "My Store",
  description: "  description: Verwalten sie dein Geschaft.",
};

export default async function MarketingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await CurrentUser();

  return (
    <>
      <SidebarProvider topBar={<TopBar />} userRole={user?.role}>
        {children}
      </SidebarProvider>
      <ToastContainer />
    </>
  );
}
