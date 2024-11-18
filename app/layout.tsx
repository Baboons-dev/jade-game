import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import AppProvider from "@/providers/AppProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drilling Game",
  description: "A fun drilling game where you dig deep and collect rewards!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Suspense>
            <AppProvider>
              <Navigation />
              <main className="lg:pl-20">{children}</main>
            </AppProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
