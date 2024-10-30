import { EditStockForm } from "@/components/dashboard/stocks/form/edit-stock-form";

type Props = {
  params: {
    stockId: string;
  };
};
export default function EditStockPage({ params: { stockId } }: Props) {
  return <EditStockForm stockId={stockId} />;
}
