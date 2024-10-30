import { CustomImage } from "@/components/custom-image/custom-image";

type Props = {
  name: string;
  emailAddress: string;
  roleName: string;
};

export function InvitedUser({ name, emailAddress, roleName }: Props) {
  return (
    <div className=" w-full border-muted-650">
      <div className="h-[90px] flex-col justify-start items-start gap-5 inline-flex ">
        <div className="self-stretch justify-start items-center gap-4 inline-flex">
          <CustomImage
            fallBack={emailAddress?.charAt(0)?.toUpperCase()}
            className="w-12 h-12 rounded-[50px]"
            src=""
            alt="User"
          />

          <div className="grow shrink basis-0 flex-col justify-start items-start inline-flex">
            <div className="flex items-center gap-3">
              <div className="text-slate-700 text-sm font-semibold leading-[21px]">
                {name}
              </div>
              <span className="bg-muted-950 rounded-full text-xs px-2 py-1">
                {roleName}
              </span>
            </div>
            <div className="self-stretch text-slate-500 text-sm font-normal leading-[21px]">
              {emailAddress}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
