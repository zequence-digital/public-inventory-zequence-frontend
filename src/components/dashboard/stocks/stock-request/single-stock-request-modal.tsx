"use client";

import { CustomModal } from "@/components/dialog/custom-modal";
import { SingleStockRequest } from "./single-stock-request";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SingleStockRequestModal() {
  const [open, onOpenChange] = useState(true);
  const router = useRouter();

  return (
    <CustomModal
      title="stock request"
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
