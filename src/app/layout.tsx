import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { siteSettings } from "@/data/siteData";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://photography-portfolio-uvk7.onrender.com'),
  title: siteSettings.siteName,
  description: siteSettings.description,
  openGraph: {
    title: siteSettings.siteName,
    description: siteSettings.description,
    type: "website",
    images: [
      {
        url: "https://jeremyjpangphotos.s3.us-east-2.amazonaws.com/hero/DSCF0035.jpeg",
        width: 1200,
        height: 630,
        alt: siteSettings.siteName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteSettings.siteName,
    description: siteSettings.description,
    images: ["https://jeremyjpangphotos.s3.us-east-2.amazonaws.com/hero/DSCF0035.jpeg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
