"use client";

import { useRouter } from "next/navigation";

import { CustomModal } from "@/components/dialog/custom-modal";
import { useState } from "react";
import { SingleStockTransfer } from "./single-stock-transfer";

export function SingleStockTransferModal() {
  const [open, onOpenChange] = useState(true);
  const router = useRouter();

  return (
    <CustomModal
      title="stock transfer"
      open={open}
      onOpenChange={() => {
        onOpenChange(false);
        router.back();
      }}
    >
      <SingleStockTransfer />
    </CustomModal>
  );
}
