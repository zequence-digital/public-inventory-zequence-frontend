"use client";

import { CustomModal } from "@/components/dialog/custom-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SingleStockRequest } from "./single-stock-request";

export function SingleStockRequestModal() {
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
      <SingleStockRequest />
    </CustomModal>
  );
}
