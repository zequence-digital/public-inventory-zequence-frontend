import "react-day-picker/style.css";
import "./globals.css";

import { LoginAlertForm } from "@/components/form/login-alert-form";
import { inter } from "@/fonts";
import { cn } from "@/lib/utils";
import TanstackQueryProviders from "@/providers/tanstackQuery";
import type { Metadata } from "next";

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
          <div>
            {children}
            <LoginAlertForm />
          </div>
        </TanstackQueryProviders>
      </body>
    </html>
  );
}
