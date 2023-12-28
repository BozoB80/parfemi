import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Asap } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/navbar/Footer";

const font = Asap({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parfemi",
  description: "Uživajte u kupnji",
};

const localization = {
  formFieldLabel__firstName: 'Ime',
  formFieldLabel__lastName: 'Prezime',
  formButtonPrimary: 'Nastavite',
  userProfile: {
    mobileButton__menu: "Menu",
    formButtonPrimary__save: "Save",
    // TODO-RETHEME remove
    formButtonPrimary__continue: "Continue",
    formButtonPrimary__finish: "Finish",
    formButtonReset: "Cancel",
    navbar: {
      title: "Account",
      description: "Manage your account info.",
    },
    start: {
      profileSection: {
        title: "Profil",
        primaryButton: "Uredite Profil",
      },
      headerTitle__account: "Vaš Profil",
      headerTitle__security: "",
      usernameSection: {
        title: "Username",
        primaryButton__changeUsername: "Change username",
        primaryButton__setUsername: "Set username",
      },
    },
    profilePage: {
      title: "Ažurirajte profil",
      imageFormTitle: "Profilna slika",
      imageFormSubtitle: "Dodajte",
      imageFormDestructiveActionSubtitle: "Izbrišite",
      fileDropAreaTitle: "Povucite slike ovdje, ili...",
      fileDropAreaAction: "Izaberite datoteku",
      fileDropAreaHint:
        "Dodajte u formatu JPG, PNG, GIF, or WEBP sliku manju od 10 MB",
      readonly:
        "Your profile information has been provided by the enterprise connection and cannot be edited.",
      successMessage: "Vaša profilna slika je ažurirana.",
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider localization={localization}>
      <html lang="en">
        <body className={font.className}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
