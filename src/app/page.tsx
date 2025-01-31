import { BusinessBreakdown } from "@/components/home-page/business-breakdown";
import { BusinessPrice } from "@/components/home-page/business-price/business-price";
import { ConnectAndGrow } from "@/components/home-page/connect-and-grow/connect-and-grow";
import { Footer } from "@/components/home-page/footer/footer";
import { ScrollToTopButton } from "@/components/home-page/footer/scroll-to-top";
import { LandingPageNavigation } from "@/components/home-page/header/landing-page-navigation";
import { HeroHeading } from "@/components/home-page/hero-heading";
import { InventoryNeeds } from "@/components/home-page/inventories-need/inventory-needs";
import { InventoryAppImage } from "@/components/home-page/inventory-app-image";
import { SuccessStory } from "@/components/home-page/success-story/success-story";
import { TransformInventory } from "@/components/home-page/transform/transform-inventory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zequence Digital Inventory Management System",
  description:
    "Welcome to Zequence Digital Inventory Management System. Sign up to get started.",
  keywords: [
    "Inventory Management System",
    "Inventory",
    "Management",
    "System",
    "Zequence",
    "Digital",
  ],
};

export default function Home() {
  return (
    <main className="w-full">
      <LandingPageNavigation />
      <HeroHeading />
      <InventoryAppImage />
      <BusinessBreakdown />
      <InventoryNeeds />
      <ConnectAndGrow />
      <BusinessPrice />
      <SuccessStory />
      <TransformInventory />
      <Footer />
      <ScrollToTopButton />
    </main>
  );
}
