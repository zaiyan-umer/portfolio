import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "@/features/theme/components/ThemeInitializer";
import { TooltipProvider } from "@/components/ui/tooltip"
import { GlobalErrorBoundary } from "@/components/errors/GlobalErrorBoundary";
import { themeInitializationScript } from '@/features/theme/lib/theme';
import { siteOrigin } from '@/lib/site';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteOrigin),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalErrorBoundary>
          <ThemeInitializer />
          <TooltipProvider>
            {children}
          </TooltipProvider>
        </GlobalErrorBoundary>
      </body>
    </html>
  );
}
