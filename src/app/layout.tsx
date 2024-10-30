import "./globals.css";

import { Inter } from "next/font/google";
import type { Metadata } from "next";
import TanstackQueryProviders from "@/providers/tanstackQuery";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Zequence Digital Inventory Management System",
    template: "%s | Zequence Digital Inventory Management System",
  },
  metadataBase: new URL("https://staging-inventory.zequencedigital.com"),
  description:
    "Inventory Management System is a web application that helps businesses manage their inventory.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
  ],
  icons: {
    icon: [
      {
        url: "/favicon.ico",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(`antialiased ${inter.className} h-screen`)}>
        <TanstackQueryProviders>
          <div>{children}</div>
        </TanstackQueryProviders>
      </body>
    </html>
  );
}
