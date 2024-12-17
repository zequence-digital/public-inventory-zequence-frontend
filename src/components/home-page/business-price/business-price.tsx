"use client";

import { useEffect, useState } from "react";

import { LandingPageButton } from "../buttons/landing-page-button";
import { PricingCard } from "./pricing-card";
import { cn } from "@/lib/utils";

export function BusinessPrice() {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(4);
  }, []);

  return (
    <div
      id="business-pricing"
      className="flex flex-col max-w-[1200px] w-full px-4  justify-center items-center mx-auto mt-20"
    >
      <div className="mb-16 flex flex-col gap-12 items-center justify-center">
        <div className="text-center text-black lg:text-5xl md:text-4xl text-3xl font-bold">
          Flexible plans for every business
        </div>
        <div className="flex">
          <LandingPageButton
            hasNoBg={price === 5}
            onClick={() => setPrice(4)}
            className={cn(`rounded-r-none border border-primary-100`, {})}
            label="Pay yearly, save 20%"
          />
          <LandingPageButton
            hasNoBg={price === 4}
            onClick={() => setPrice(5)}
            className=" rounded-l-none w-[193px]"
            label="Pay monthly"
          />
        </div>
      </div>
      <div className=" grid grid-auto-fit-xl w-full gap-8">
        <PricingCard
          badged
          badgedText="Most popular"
          priced
          link="https://demo-inventory.zequencedigital.com/auth/sign-up"
          btnLabel="Try for free"
          title="Standard plan"
          description="Simple for small teams"
          price={price}
        />
        <PricingCard
          link="https://calendly.com/zequencedigital/30min"
          linkTarget="_blank"
          element={
            <div className="text-black text-3xl w-full xl:text-5xl font-bold leading-[67.20px]">
              Contact us
            </div>
          }
          btnBorder
          btnLabel="Contact sales"
          title="Premium plan"
          description="Advanced for medium teams"
          price={10}
          billedYearly={90}
        />
        <PricingCard
          link="https://calendly.com/zequencedigital/30min"
          linkTarget="_blank"
          element={
            <div className="text-black text-3xl w-full xl:text-5xl font-bold leading-[67.20px]">
              Contact us
            </div>
          }
          btnLabel="Contact sales"
          btnBorder
          title="Enterprise plan"
          description="Tailored for larger teams"
          price={129}
          billedYearly={1548}
        />
      </div>
    </div>
  );
}
