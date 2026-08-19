import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Cursor from "@/components/Cursor";
import NoiseOverlay from "@/components/NoiseOverlay";
import LoadingScreen from "@/components/LoadingScreen";

export const metadata: Metadata = {
  metadataBase: new URL("https://thinkbeyondagency.com"),
  title: {
    default: "Think Beyond Agency — Creative Marketing & Branding Studio",
    template: "%s — Think Beyond Agency",
  },
  description:
    "Think Beyond Agency (TBA) is a creative marketing and branding agency helping businesses grow through strategy, storytelling, content creation, performance marketing and social media.",
  keywords: [
    "creative agency",
    "branding agency",
    "social media management",
    "performance marketing",
    "Think Beyond Agency",
  ],
  authors: [{ name: "Think Beyond Agency" }],
  openGraph: {
    title: "Think Beyond Agency — Creative Marketing & Branding Studio",
    description:
      "We don't just grow brands. We build obsessions. Strategy, content, performance marketing and branding for ambitious businesses.",
    url: "https://thinkbeyondagency.com",
    siteName: "Think Beyond Agency",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Think Beyond Agency — Creative Marketing & Branding Studio",
    description: "We don't just grow brands. We build obsessions.",
    images: ["/og-image.jpg"],
  },
   icons: {
    icon: "/favicon.png",
    shortcut: "/favicon.png",
    apple: "/favicon.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-paper text-ink antialiased dark:bg-paper-dark dark:text-ink-dark">
        <LoadingScreen />
        <NoiseOverlay />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
