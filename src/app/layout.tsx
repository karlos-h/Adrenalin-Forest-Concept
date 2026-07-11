import type { Metadata } from "next";
import { Barlow, Barlow_Condensed } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { NoticeBanner } from "@/components/ui/NoticeBanner";
import { getGlobalSettings } from "@/lib/content";

const barlow = Barlow({
  variable: "--font-barlow",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.adrenalin-forest.co.nz"),
  title: {
    default: "Adrenalin Forest — Claim your bragging rights",
    template: "%s | Adrenalin Forest",
  },
  description:
    "High-wire aerial obstacle courses in real NZ forest. 6 levels, 20m up, 100+ challenges across Christchurch, Wellington, Bay of Plenty and Auckland. How far will you get?",
  openGraph: {
    siteName: "Adrenalin Forest",
    locale: "en_NZ",
    type: "website",
    images: [{ url: "/images/hero-home.svg" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await getGlobalSettings();
  const notice = settings.siteNotice;
  return (
    <html
      lang="en-NZ"
      className={`${barlow.variable} ${barlowCondensed.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-white focus:text-forest-700 focus:px-4 focus:py-2 focus:rounded-md focus:m-2"
        >
          Skip to content
        </a>
        {notice?.enabled && <NoticeBanner id={notice.id} message={notice.message} />}
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
