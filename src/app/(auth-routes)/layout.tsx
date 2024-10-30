import { Metadata } from "next";

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

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col h-screen overflow-y-auto px-2">
      <div className="flex flex-col items-center justify-center flex-1 ">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
