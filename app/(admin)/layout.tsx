import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { Asap } from "next/font/google";
import Sidebar from "@/components/admin/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import AdminNavbar from "@/components/admin/AdminNavbar";

import "../globals.css";

const font = Asap({ subsets: ["latin"] });

export const metadata = {
  title: "Parfemi | Admin",
  description: "Go administrate",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <AdminNavbar />
          <main className="flex flex-row">
            <Sidebar />
            {children}
          </main>
          <Toaster />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
