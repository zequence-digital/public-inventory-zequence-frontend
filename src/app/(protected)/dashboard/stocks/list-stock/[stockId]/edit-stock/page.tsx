import { EditStockForm } from "@/components/dashboard/stocks/form/edit-stock-form";

type Props = {
  params: Promise<{
    stockId: string;
  }>;
};
export default async function EditStockPage(props: Props) {
  const params = await props.params;

  const { stockId } = params;

  return (
    <div>
      <EditStockForm stockId={stockId} />
    </div>
  );
}
