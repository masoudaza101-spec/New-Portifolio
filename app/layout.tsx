import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, DM_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { site } from "@/data/site";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-bodoni-moda",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.metaDescription,
  keywords: site.keywords,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: {
    telephone: true,
    email: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.name,
    title: site.title,
    description: site.metaDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: `${site.name} — Information Systems & Web Developer`,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.metaDescription,
    images: ["/opengraph-image"],
  },
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon",
  },
  alternates: {
    canonical: site.url,
  },
};

export const viewport: Viewport = {
  themeColor: "#04060a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bodoniModa.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-svh flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
