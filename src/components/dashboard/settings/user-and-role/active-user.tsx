import { CustomImage } from "@/components/custom-image/custom-image";
import { InvitedUserDropdown } from "./invited-user-dropdown";

type Props = {
  name: string;
  roleName: string;
  emailAddress: string;
  src: string;
  alt: string;
};

export function ActiveUser({ name, roleName, emailAddress, src, alt }: Props) {
  return (
    <div className="self-stretch justify-start items-center gap-4 inline-flex">
      <CustomImage className="w-12 h-12 rounded-[50px]" src={src} alt={alt} />

      <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
            <div className="text-slate-700 text-sm font-semibold leading-[21px]">
              {name}
            </div>
            <InvitedUserDropdown
              emailAddress={emailAddress}
              roleName={roleName}
            />
          </div>
        </div>
        <div className="self-stretch text-slate-500 text-sm font-normal leading-[21px]">
          {emailAddress}
        </div>
      </div>
    </div>
  );
}
