import { Input } from "@/components/ui/input";

export function SubscribeNewsLetter() {
  return (
    <div className="w-full flex-col justify-start items-start lg:gap-8 gap-10 inline-flex">
      <div className="self-stretch h-16 flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch text-white text-base font-semibold leading-normal">
          Subscribe
        </div>
        <div className="self-stretch text-muted-900 text-base font-normal leading-normal">
          Join our newsletter to stay up to date on features and releases.
        </div>
      </div>
      <div className="self-stretch h-[100px] flex-col justify-start items-start gap-4 flex">
        <div className="self-stretch justify-start items-start gap-4 lg:flex ">
          <Input
            placeholder="Enter your email"
            className="text-white h-12 rounded-full w-full mb-4 lg:mb-0"
          />
          <div className="px-6 py-3 bg-muted-900 rounded-3xl border border-muted-900 justify-center cursor-pointer items-center gap-2 flex">
            <div className="text-black text-base font-normal leading-normal">
              Subscribe
            </div>
          </div>
        </div>
        <div className="self-stretch">
          <span className="text-muted-900 text-xs font-normal leading-[18px]">
            By subscribing you agree to with our{" "}
          </span>
          <span className="text-muted-900 text-xs font-normal underline leading-[18px]">
            Privacy Policy
          </span>
          <span className="text-muted-900 text-xs font-normal leading-[18px]">
            {" "}
            and provide consent to receive updates from our company.
          </span>
        </div>
      </div>
    </div>
  );
}
