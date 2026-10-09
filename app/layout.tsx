import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ThemeInitializer from "@/features/theme/components/ThemeInitializer";
import { TooltipProvider } from "@/components/ui/tooltip"
import { GlobalErrorBoundary } from "@/components/errors/GlobalErrorBoundary";
import { themeInitializationScript } from '@/features/theme/lib/theme';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Zaiyan Umer | Portfolio",
    template: "%s · Zaiyan Umer",
  },
  description:
    "Full-stack developer building modern web experiences. Projects, case studies, and contact.",
  metadataBase: new URL("https://zaiyan-umer.vercel.app"),
  openGraph: {
    title: "Zaiyan Umer | Portfolio",
    description:
      "Full-stack developer building modern web experiences. Projects, case studies, and contact.",
    url: "https://zaiyan-umer.vercel.app",
    siteName: "Zaiyan Umer",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaiyan Umer | Portfolio",
    description:
      "Full-stack developer building modern web experiences. Projects, case studies, and contact.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
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
