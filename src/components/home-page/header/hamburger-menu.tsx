"use client";

import { cn } from "@/lib/utils";

type Props = {
  open: boolean;
  dispatch: React.DispatchWithoutAction;
};

export function HamBurgerMenu({ open, dispatch }: Props) {
  return (
    <button
      onClick={dispatch}
      className={cn(
        `
                        lg:hidden flex flex-col justify-between w-[24px] h-[16px] p-0 relative z-50
                        `,
      )}
    >
      <span
        className={cn(
          `
                            block w-full h-[3px] bg-black transition-all duration-300 ease-in-out
                            `,
          {
            "transform rotate-45": open,
            "translate-y-[8px]": open,
          },
        )}
      />
      <span
        className={cn(
          `
                            block w-full h-[3px] bg-black transition-all duration-300 ease-in-out
                            `,
          {
            hidden: open,
          },
        )}
      />
      <span
        className={cn(
          `
                            block w-full h-[3px] bg-black transition-all duration-300 ease-in-out
                            `,
          {
            "transform -rotate-45": open,
            "translate-y-[-6px]": open,
          },
        )}
      />
    </button>
  );
}
