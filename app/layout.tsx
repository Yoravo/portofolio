import type { Metadata } from "next";
import { JetBrains_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { siteConfig, uiCopy } from "@/lib/config";
import MotionPreferences from "@/components/ui/MotionPreferences";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
});

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.tagline,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          id="theme-init"
          dangerouslySetInnerHTML={{
            __html: `(()=>{let theme="dark";try{if(localStorage.getItem("theme")==="light")theme="light"}catch{}document.documentElement.dataset.theme=theme})()`,
          }}
        />
      </head>
      <body
        className={`${jetbrains.variable} ${syne.variable} antialiased flex flex-col min-h-screen scanline-overlay`}
      >
        <a href="#main-content" className="skip-link">{uiCopy.skipLink}</a>
        <MotionPreferences>
          <Navbar />
          <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">{children}</main>
          <Footer />
        </MotionPreferences>
      </body>
    </html>
  );
}
