import type { Metadata, Viewport } from "next";
import { display, sans } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "AI agency", template: "%s · AI agency" },
  description: "Book a year of weekly lessons with a tutor from AI agency.",
};

export const viewport: Viewport = { themeColor: "#0D0930" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
