import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Wardro8e - AI-Powered Fashion Discovery",
    template: "%s | Wardro8e",
  },
  description: "Discover fashion that speaks to your soul. AI-powered platform connecting unique brands with style-conscious shoppers.",
  keywords: ["fashion", "AI", "style", "shopping", "brands", "marketplace"],
  authors: [{ name: "Wardro8e Team" }],
  openGraph: {
    title: "Wardro8e - Where AI Meets Personal Style",
    description: "Discover fashion that speaks to your soul through AI-powered recommendations.",
    url: "https://wardro8e.com",
    siteName: "Wardro8e",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wardro8e - AI-Powered Fashion Discovery",
    description: "Discover fashion that speaks to your soul through AI-powered recommendations.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${playfair.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased">
        <ThemeProvider>
          <div className="min-h-screen bg-background text-foreground">
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}