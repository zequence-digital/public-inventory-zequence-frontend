import { LandingPageButton } from "../buttons/landing-page-button";
import { PricingCard } from "./pricing-card";

export function BusinessPrice() {
  return (
    <div className="flex flex-col max-w-[1200px] w-full px-4  justify-center items-center mx-auto mt-20">
      <div className="mb-16 flex flex-col gap-12 items-center justify-center">
        <div className="text-center text-black lg:text-5xl md:text-4xl text-3xl font-bold">
          Flexible plans for every businesses
        </div>
        <div className="flex">
          <LandingPageButton
            className=" rounded-r-none border border-primary-100 "
            label="Pay yearly, save 20%"
          />
          <LandingPageButton
            className=" rounded-l-none w-[193px]"
            label="Pay monthly"
            hasNoBg
          />
        </div>
      </div>
      <div className=" grid grid-auto-fit-xl w-full gap-6">
        <PricingCard
          btnLabel="Try for free"
          btnBorder
          title="Standard plan"
          description="Simple for small teams"
          price={29}
          billedYearly={348}
        />
        <PricingCard
          btnLabel="Try for free"
          title="Premium plan"
          description="Advanced for medium teams"
          price={79}
          billedYearly={948}
        />
        <PricingCard
          btnLabel="Request for demo"
          btnBorder
          title="Enterprise plan"
          description="Tailored foe larger teams"
          price={129}
          billedYearly={1548}
        />
      </div>
    </div>
  );
}
