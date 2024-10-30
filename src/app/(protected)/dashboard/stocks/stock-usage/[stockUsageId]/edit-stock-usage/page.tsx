import { EditStockUsageForm } from "@/components/dashboard/stocks/stock-usage/form/edit-stock-usage-form";

type Props = {
  params: {
    stockUsageId: string;
  };
};
export default function EditStockUsagePage({
  params: { stockUsageId },
}: Props) {
  return <EditStockUsageForm stockUsageId={stockUsageId} />;
}
