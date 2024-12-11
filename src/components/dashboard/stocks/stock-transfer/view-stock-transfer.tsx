import SvgView from "@/components/svg/svg-view";
import { useActiveUser } from "@/crypto";
import type { GetStockTransfer } from "@/types";
import Link from "next/link";

type Props = {
  stock: GetStockTransfer["data"]["records"][number];
};

export function ViewStockTransfer({ stock }: Props) {
  const user = useActiveUser();

  return (
    <>
      {user?.data?.branch?.name.toLocaleLowerCase() ===
      stock?.fromBranch?.name.toLocaleLowerCase() ? null : (
        <Link
          href={`/dashboard/stocks/add-stock-transfer/${stock.guid}/stock-transfer`}
        >
          <SvgView className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-5" />
        </Link>
      )}
    </>
  );
}
