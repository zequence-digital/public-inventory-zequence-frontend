import { EditStockUsageForm } from "@/components/dashboard/stocks/stock-usage/form/edit-stock-usage-form";

type Props = {
  params: Promise<{
    stockUsageId: string;
  }>;
};
export default async function EditStockUsagePage(props: Props) {
  const params = await props.params;

  const { stockUsageId } = params;

  return <EditStockUsageForm stockUsageId={stockUsageId} />;
}
