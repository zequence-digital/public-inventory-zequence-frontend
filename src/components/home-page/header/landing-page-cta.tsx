import Link from "next/link";
import { LandingPageButton } from "../buttons/landing-page-button";

export function LandingPageCta() {
  return (
    <div className=" flex items-center justify-center lg:mx-0 mx-auto max-lg:flex-col gap-6 mt-10 lg:mt-0 w-full lg:w-fit">
      <Link
        href={`/auth/login`}
        className="text-black text-base font-normal leading-normal hover:text-primary-100 border border-black w-full items-center flex justify-center py-3 px-4 rounded-full lg:border-none lg:w-fit"
      >
        Login
      </Link>
      <LandingPageButton
        className=" w-full lg:w-fit"
        label="Get a demo"
        hasNoBg
      />
      <Link className=" w-full lg:w-fit" href="/auth/sign-up">
        <LandingPageButton className=" w-full lg:w-fit" label="Try for free" />
      </Link>
    </div>
  );
}
