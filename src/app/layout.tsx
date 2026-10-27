import type { Metadata, Viewport } from "next";
import "./globals.css";
const url = process.env.NEXT_PUBLIC_SITE_URL;
export const metadata: Metadata = {
  metadataBase: new URL(url || "http://localhost:3000"),
  title: "BURGERISTA — Wir leben Burger | Redesign-Konzept",
  description:
    "Ein unabhängiges BURGERISTA Redesign-Konzept: interaktive Burger-Erlebnisse, Produktauswahl und Links zur offiziellen Restaurantwelt.",
  robots: url ? { index: true, follow: true } : { index: false, follow: false },
  alternates: url ? { canonical: "/" } : undefined,
  openGraph: {
    title: "BURGERISTA — Wir leben Burger",
    description: "Burger Love. Austrian Soul. Ein unabhängiges Designkonzept.",
    locale: "de_AT",
    type: "website",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export const viewport: Viewport = { themeColor: "#f9cf35" };
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de-AT">
      <body>{children}</body>
    </html>
  );
}
