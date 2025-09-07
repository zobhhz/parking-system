import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Parking System | Object-Oriented Mall",
  description: "A parking system for Object-Oriented Mall",
  authors: [{ name: "Alyssa Palmares", url: "https://zobhhz.github.io" }],
  openGraph: {
    title: "Parking System | Object-Oriented Mall",
    description: "A parking system for Object-Oriented Mall",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased mx-4 mb-10`}
      >
        <div className="flex flex-col items-center my-10">
          <h1 className="mb-2">Object-Oriented Mall</h1>
          <p>Parking Allocation System</p>
        </div>
        {children}
        <footer className="mt-2 p-4">
          <p className="text-gray-500 text-center">Built by Alyssa Palmares. Source code available on Github (soon).</p>
        </footer>
      </body>
    </html>
  );
}
