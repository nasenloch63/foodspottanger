import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/data/site";
const title = "The Food Spot Tanger | Burgers halal à Tanger";
const description =
  "The Food Spot Tanger : burgers généreux, fast-food halal et commandes jusqu’à 5h du matin. Retrouvez-nous rue Caïd Ahmed Riffi à Tanger.";
const baseUrl =
  site.url ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");
export const metadata: Metadata = {
  title,
  description,
  metadataBase: new URL(baseUrl),
  ...(site.url ? { alternates: { canonical: site.url } } : {}),
  openGraph: {
    title,
    description,
    type: "website",
    locale: "fr_MA",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" dir="ltr">
      <body>{children}</body>
    </html>
  );
}
