import Link from "next/link";
import { LandingPageButton } from "../buttons/landing-page-button";

export function TransformInventory() {
  return (
    <section className="md:px-8 px-4 mx-auto flex bg-[#f5f5f7] py-20  justify-center mt-10">
      <div className="max-w-[1200px] w-full flex-col bg-white shadow rounded-2xl p-8 justify-start items-center gap-6 inline-flex">
        <div className="self-stretch flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch text-center text-black lg:text-6xl md:text-4xl text-2xl font-bold">
            Transform your inventory management now
          </div>
        </div>
        <div className="pt-4 justify-start items-start gap-4 inline-flex">
          <Link href="/auth/sign-up">
            <LandingPageButton label="Try for free" />
          </Link>
          <LandingPageButton label="Get a demo" hasNoBg />
        </div>
      </div>
    </section>
  );
}
