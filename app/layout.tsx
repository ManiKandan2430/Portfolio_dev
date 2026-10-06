import type { Metadata } from "next";
import "./globals.css";
import LenisProvider from "@/components/animations/LenisProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL("https://manikandan.dev"),
  title: {
    default:
      "Manikandan S — Full Stack Developer | React.js | Node.js | Express.js",
    template: "%s | Manikandan S",
  },
  description:
    "Full Stack Developer with 1+ year of hands-on experience building production-grade web applications using React.js, Node.js, Express.js, and MySQL. Specializing in SaaS, EdTech, and Government platforms.",
  keywords: [
    "Manikandan S",
    "Full Stack Developer",
    "React.js Developer",
    "Node.js Developer",
    "MERN Stack Developer",
    "Portfolio",
    "Web Developer India",
    "Coimbatore Developer",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Manikandan S — Portfolio",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", creator: "@manikandan_dev" },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://manikandan.dev" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Manikandan S",
  jobTitle: "Full Stack Developer",
  url: "https://manikandan.dev",
  email: "maniselvan231@gmail.com",
  telephone: "+91-9677987289",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Coimbatore",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "Erode Arts and Science College",
    },
    {
      "@type": "CollegeOrUniversity",
      name: "Gobi Arts and Science College",
    },
  ],
  knowsAbout: [
    "React.js", "Node.js", "Express.js", "TypeScript", "MongoDB",
    "MySQL", "PostgreSQL", "Docker", "REST API", "JWT Authentication",
  ],
  sameAs: [
    "https://github.com/manikandan",
    "https://linkedin.com/in/manikandan",
  ],
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
