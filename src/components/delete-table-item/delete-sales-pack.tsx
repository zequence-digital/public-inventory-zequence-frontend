"use client";

import { Alert } from "../dialog/alert-dialog";
import type { GroupSales } from "@/types";
import SvgTrash from "../svg/svg-trash";
import { useActiveUser } from "@/crypto";
import { useDeleteSales } from "@/queries/sales";
import { useState } from "react";

type Props = {
  sales: GroupSales["data"]["records"][number];
};
export function DeleteSalesPack({ sales }: Props) {
  const [open, setOpen] = useState(false);
  const user = useActiveUser();

  console.log(sales);

  const { mutate: deleteSales, isPending } = useDeleteSales(sales.guid);

  return (
    <div>
      <Alert
        title="Delete Sales"
        description="Are you sure you want to delete this sale?"
        open={open}
        onOpenChange={setOpen}
        handleContinue={() => {
          deleteSales(sales.guid);
          setOpen(false);
        }}
        handleCancel={() => setOpen(false)}
      />
      {sales?.invoiceLogData &&
        sales?.invoiceLogData?.length === 0 &&
        user?.data?.roleName === "ADMIN" && (
          <button disabled={isPending} onClick={() => setOpen(true)}>
            <SvgTrash className="size-4 stroke-muted-400 hover:stroke-destructive cursor-pointer" />
          </button>
        )}
    </div>
  );
}
