import "../globals.css";
import type { Metadata } from "next";
import { Asap } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const font = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parfemi",
  description: "Uživajte u kupnji",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={font.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
