import type { Metadata } from "next";
import { AppStateProvider } from "@/components/AppStateProvider";
import { AppShell } from "@/components/app/AppShell";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArabEng Translate",
  description: "Fast Arabic and English translation with a premium bilingual workspace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className="h-full antialiased"
      suppressHydrationWarning
    >
      <body className="min-h-full">
        <ThemeProvider>
          <AppStateProvider>
            <AppShell>{children}</AppShell>
          </AppStateProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
