import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AppProvider from "@/providers/AppProvider";
import { Navbar } from "@/components/layout/Navbar";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { MainContainer } from "@/components/layout/MainContainer";
import { LayoutWrapper } from "@/components/layout/LayoutWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "WeatherAI | Advanced Immersive Telemetry Platform",
  description:
    "Real-time atmospheric analysis and situational environmental telemetry data.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
      suppressHydrationWarning
    >
      <body className="relative min-h-full bg-[#030914] font-sans text-slate-100 selection:bg-[#1bf8c3]/30 selection:text-[#1bf8c3]">
        {/* Global state container orchestration layer */}
        <AppProvider>
          <LayoutWrapper>
            <div className="relative flex min-h-screen flex-col justify-between overflow-x-hidden">
              {/* Primary Desktop/Tablet Sticky Header Control */}
              <Navbar />

              {/* 
                Central Display Pipeline:
                MainContainer isolates child pages. When those pages wrap their grids in 
                WeatherThemeWrapper, the gradient fills down this main window axis seamlessly.
              */}
              <MainContainer>{children}</MainContainer>

              {/* Global Mobile Structural Foothold Space Cushion */}
              <div className="h-16 w-full md:hidden" aria-hidden="true" />

              {/* Floating Context-Aware Mobile Navigation Axis */}
              <MobileBottomNav />
            </div>
          </LayoutWrapper>
        </AppProvider>
      </body>
    </html>
  );
}
