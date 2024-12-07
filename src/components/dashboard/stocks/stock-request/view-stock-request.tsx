import SvgView from "@/components/svg/svg-view";
import { useActiveUser } from "@/crypto";
import type { GetStockRequest } from "@/types";
import Link from "next/link";

type Props = {
  stock: GetStockRequest["data"]["records"][number];
};

export function ViewStockRequest({ stock }: Props) {
  const user = useActiveUser();

  return (
    <>
      {user?.data?.branch?.name.toLocaleLowerCase() ===
      stock?.toBranch?.name.toLocaleLowerCase() ? null : (
        <Link
          href={`/dashboard/stocks/stock-request/${stock.guid}/stock-request`}
        >
          <SvgView className=" stroke-muted-400 hover:stroke-secondary-100 cursor-pointer size-5" />
        </Link>
      )}
    </>
  );
}
