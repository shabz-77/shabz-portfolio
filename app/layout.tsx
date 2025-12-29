import type { Metadata } from "next";
import "./globals.css";
import RouteTransition from "@/components/RouteTransition";
import HeaderClient from "@/components/HeaderClient";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shabz77.com/"), 
  title: {
    default: "Shahbaaz Nilgiriwala",
    template: "%s — Shahbaaz Nilgiriwala",
  },
  description:
    "Automotive designer focused on 3D design, livery systems, and interactive experiences.",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Shahbaaz Nilgiriwala",
    description:
      "Automotive designer focused on 3D design, livery systems, and interactive experiences.",
    images: [
      {
        url: "/og.jpg", // optional but recommended (put in /public/og.jpg)
        width: 1200,
        height: 630,
        alt: "Shahbaaz Nilgiriwala — Automotive Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shahbaaz Nilgiriwala",
    description:
      "Automotive designer focused on 3D design, livery systems, and interactive experiences.",
    images: ["/og.jpg"],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RouteTransition>
          <HeaderClient />
          {children}
        </RouteTransition>
      </body>
    </html>
  );
}
