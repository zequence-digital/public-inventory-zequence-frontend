import Link from "next/link";
import { LandingPageButton } from "./buttons/landing-page-button";

export function HeroHeading() {
  return (
    <section className="md:px-8 px-4 mx-auto flex justify-center mt-10">
      <div className="max-w-[768px] w-full flex-col justify-start items-center gap-6 inline-flex">
        <div className="self-stretch flex-col justify-start items-center gap-6 flex">
          <div className="self-stretch text-center text-black lg:text-5xl md:text-4xl text-2xl font-bold">
            Streamline your inventory, supercharge your sales
          </div>
          <div className="self-stretch text-center text-black font-normal max-w-[530px] text-lg mx-auto">
            Effortlessly track, manage, and optimize your stock with our
            cutting-edge system designed for businesses of all sizes.
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
