import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Asap } from "next/font/google";
import Navbar from "@/components/navbar/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/navbar/Footer";
import MobileBottomNav from "@/components/navbar/MobileBottomNav";

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
    formButtonPrimary__continue: "Nastavite",
    formButtonPrimary__finish: "Završi",
    formButtonReset: "Otkažite",
    navbar: {
      title: "Account",
      description: "Manage your account info.",
    },
    start: {
      profileSection: {
        title: "Profil",
        primaryButton: "Uredite Profil",
      },
      headerTitle__account: "Moj Profil",
      headerSubtitle__account: "Upravljajte informacijama o vašem profilu.",
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
        "Vaši podaci o profilu su dostavljeni putem enterprise veze i ne mogu se uređivati.",
      successMessage: "Vaša profilna slika je ažurirana.",
    },
  },
  userButton: {
    action__manageAccount: 'Upravljajte računom',
    action__signOut: 'Odjava',
    action__signOutAll: 'Odjvaite se sa svih računa',
    action__addAccount: 'Dodajte novi račun',
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
          <MobileBottomNav />
          <Footer />
          <Toaster />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
