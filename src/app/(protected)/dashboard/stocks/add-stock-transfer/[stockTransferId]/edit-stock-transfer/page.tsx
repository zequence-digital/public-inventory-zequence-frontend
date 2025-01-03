import { EditStockTransferForm } from "@/components/dashboard/stocks/stock-transfer/edit-stock-transfer-form";

type Props = {
  params: Promise<{
    stockTransferId: string;
  }>;
};

export const dynamic = "force-static";

const EditStockTransferPage = async (props: Props) => {
  const params = await props.params;

  const { stockTransferId } = params;

  return <EditStockTransferForm stockTransferId={stockTransferId} />;
};

export default EditStockTransferPage;
