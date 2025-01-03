import { EditStockForm } from "@/components/dashboard/stocks/form/edit-stock-form";

type Props = {
  params: Promise<{
    stockId: string;
  }>;
};

export const dynamic = "force-static";

export default async function EditStockPage(props: Props) {
  const params = await props.params;

  const { stockId } = params;

  return <EditStockForm stockId={stockId} />;
}
