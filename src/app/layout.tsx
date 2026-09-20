import type { Metadata } from "next";
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

// This app is fully authenticated and all data is per-user — disable static
// pre-rendering. The super-admin is seeded by the backend (`npm run db:seed`).
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: "Project Tracker | GHL Prime",
  description: "Real-time project tracking and Kanban system for the GHL Prime team",
  // Served from public/ so the tab icon doesn't depend on a third-party CDN.
  icons: {
    icon: "/logo-icon.png",
    shortcut: "/logo-icon.png",
    apple: "/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="min-h-screen antialiased">
        {/* The pre-hydration theme script that used to live here applied a
            `dark` class from localStorage / prefers-color-scheme before React
            booted. The app is light-only now, so it would have flashed dark
            for anyone on a dark-mode OS before the provider could correct it. */}
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
