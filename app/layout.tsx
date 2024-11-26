import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navigation } from "@/components/layout/Navigation";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import AppProvider from "@/providers/AppProvider";
import Script from "next/script";

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
      <head>
        <Script
          src="https://telegram.org/js/telegram-web-app.js"
          strategy="beforeInteractive"
        />
      </head>
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
              <main >{children}</main>
            </AppProvider>
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
