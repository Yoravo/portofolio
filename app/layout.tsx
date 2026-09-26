import type { Metadata } from "next";
import { Dela_Gothic_One, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import { siteConfig, siteUrl, uiCopy } from "@/lib/config";

// Manga display: wide, inked letterforms that anchor the cover and chapter headers.
const dela = Dela_Gothic_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-dela",
  display: "swap",
});

// Editorial body: grotesque proportions that stay legible inside dense speech bubbles.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

// Code and narration captions.
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  keywords: [
    "Radja Ravine Salfriandry",
    "Web Developer",
    "Frontend Developer",
    "Next.js Developer",
    "React Developer",
    "Laravel Developer",
    "Indonesia Web Developer",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: siteConfig.title,
    description: siteConfig.tagline,
    siteName: siteConfig.title,
    images: [{ url: siteConfig.avatar, alt: siteConfig.name }],
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.tagline,
    images: [siteConfig.avatar],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: siteConfig.name,
      jobTitle: siteConfig.role,
      url: siteUrl,
      sameAs: [
        siteConfig.github,
        siteConfig.linkedin,
        siteConfig.instagram,
      ],
      address: {
        "@type": "PostalAddress",
        addressLocality: "Karawang",
        addressCountry: "ID",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Singaperbangsa Karawang University",
      },
    },
    {
      "@type": "WebSite",
      name: siteConfig.title,
      url: siteUrl,
      author: {
        "@type": "Person",
        name: siteConfig.name,
      },
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${dela.variable} ${hanken.variable} ${jetbrains.variable} flex min-h-screen flex-col`}
      >
        <a href="#main-content" className="skip-link">
          {uiCopy.skipLink}
        </a>
        <Navbar />
        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
