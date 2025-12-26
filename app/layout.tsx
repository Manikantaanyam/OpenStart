import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "OpenStart",
  description: "A beginner-friendly open source issue tracker.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased min-h-screen bg-[#FDFBF7] text-stone-900 font-sans selection:bg-yellow-200 selection:text-yellow-900 transition-colors`}
      >
        {children}
      </body>
    </html>
  );
}
