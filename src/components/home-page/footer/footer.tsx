import { Logo } from "../logo";
import { FooterLinks } from "./footer-links";
import { SubFooter } from "./sub-footer";
import { SubscribeNewsLetter } from "./subscribe-news-letter";

const featuresLinks = [
  { href: "#", label: "Order management software" },
  { href: "#", label: "Warehouse management" },
  { href: "#", label: "Inventory tracking software" },
  { href: "#", label: "Inventory control" },
  { href: "#", label: "Inventory reports" },
];
const solutionsLinks = [
  { href: "#", label: "ManufManufacturers" },
  { href: "#", label: "Multi-channel system" },
  { href: "#", label: "Ecommerce inventory management" },
];
const resourcesLinks = [
  { href: "#", label: "Help documentation" },
  { href: "#", label: "FAQS" },
  { href: "#", label: "Small business guides" },
  { href: "#", label: "Blogs" },
];

export function Footer() {
  return (
    <footer className="bg-black px-8 pb-16">
      <div className="max-w-[1400px] mx-auto w-full py-10 flex justify-center gap-10 lg:justify-start max-lg:flex-col">
        <Logo src="/images/logo-white.svg" />

        <div className=" flex max-lg:flex-col gap-10">
          <FooterLinks title="Features" links={featuresLinks} />
          <FooterLinks title="Solutions" links={solutionsLinks} />
          <FooterLinks title="Resources" links={resourcesLinks} />
        </div>
        <div>
          <SubscribeNewsLetter />
        </div>
      </div>
      <div className=" mt-10">
        <SubFooter />
      </div>
    </footer>
  );
}
