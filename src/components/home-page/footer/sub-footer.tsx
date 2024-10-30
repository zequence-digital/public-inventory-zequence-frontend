import Link from "next/link";
import { Social } from "./social";

export function SubFooter() {
  return (
    <div className="self-stretch flex-col justify-start items-start gap-8 flex">
      <div className="self-stretch h-px bg-muted-900 border border-muted-900 mt-12" />
      <div className="self-stretch justify-between items-start inline-flex max-md:flex-col-reverse gap-4">
        <div className="justify-start lg:items-center gap-6 flex max-lg:flex-col items-start">
          <div className="text-muted-900 text-sm font-normal leading-[21px]">
            © {new Date().getFullYear()} Zequence. All rights reserved.
          </div>
          <div className="justify-start items-start gap-6 flex max-lg:flex-col">
            <Link
              href={"#"}
              className="text-muted-900 text-sm font-normal underline leading-[21px]"
            >
              Privacy Policy
            </Link>
            <Link
              href={"#"}
              className="text-muted-900 text-sm font-normal underline leading-[21px]"
            >
              Terms of Service
            </Link>
            <Link
              href={"#"}
              className="text-muted-900 text-sm font-normal underline leading-[21px]"
            >
              Cookies Settings
            </Link>
          </div>
        </div>
        <div />
        <div className="justify-start items-center gap-3 flex order-1">
          <Social src="/images/linkedin.svg" alt="LinkedIn" />
          <Social src="/images/twitter.svg" alt="Twitter" />
          <Social src="/images/facebook.svg" alt="Facebook" />

          <Social src="/images/instagram.svg" alt="Instagram" />

          <Social src="/images/youtube.svg" alt="Youtube" />
        </div>
      </div>
    </div>
  );
}
