import { BusinessBreakdown } from "@/components/home-page/business-breakdown";
import { BusinessPrice } from "@/components/home-page/business-price/business-price";
import { ConnectAndGrow } from "@/components/home-page/connect-and-grow/connect-and-grow";
import { Footer } from "@/components/home-page/footer/footer";
import { HeroHeading } from "@/components/home-page/hero-heading";
import { InventoryAppImage } from "@/components/home-page/inventory-app-image";
import { InventoryNeeds } from "@/components/home-page/inventories-need/inventory-needs";
import { LandingPageNavigation } from "@/components/home-page/header/landing-page-navigation";
import { Metadata } from "next";
import { ScrollToTopButton } from "@/components/home-page/footer/scroll-to-top";
import { SuccessStory } from "@/components/home-page/success-story/success-story";
import { TransformInventory } from "@/components/home-page/transform/transform-inventory";

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
    <main>
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
