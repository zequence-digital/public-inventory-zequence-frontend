"use client";

import SvgEdit from "@/components/svg/svg-edit";

type Props = {
  onOpenChange: (open: boolean) => void;
};
export function EditInvoicePack({ onOpenChange }: Props) {
  return (
    <div onClick={() => onOpenChange(true)} className="flex gap-4 items-center">
      <SvgEdit className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-4" />
    </div>
  );
}
