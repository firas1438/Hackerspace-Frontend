import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hackerspace",
  description: "Discover hackathons, conferences, workshops, and exciting tech events.",
  metadataBase: new URL("https://www.hackerspace.tn"),
  openGraph: {
    title: "Hackerspace",
    description: "Discover hackathons, conferences, workshops, and exciting tech events.",
    url: "https://www.hackerspace.tn",
    siteName: "Hackerspace",
    images: [
      {
        url: "/preview.png",
        width: 1200,
        height: 630,
        alt: "Hackerspace – Discover hackathons, conferences, workshops, and exciting tech events.",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hackerspace",
    description: "Discover hackathons, conferences, workshops, and exciting tech events.",
    images: ["/preview.png"],
  },
};

import { Providers } from "@/app/providers";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-sans", inter.variable,)}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
