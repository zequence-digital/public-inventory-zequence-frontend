"use client";

import SvgView from "@/components/svg/svg-view";

type Props = {
  onOpenChange: (open: boolean) => void;
};
export function ViewInvoice({ onOpenChange }: Props) {
  return (
    <div onClick={() => onOpenChange(true)} className="flex gap-4 items-center">
      <SvgView className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-5" />
    </div>
  );
}
