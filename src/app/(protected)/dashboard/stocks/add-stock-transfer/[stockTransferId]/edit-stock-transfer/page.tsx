import { EditStockTransferForm } from "@/components/dashboard/stocks/stock-transfer/edit-stock-transfer-form";

type Props = {
  params: {
    stockTransferId: string;
  };
};

const EditStockTransferPage = ({ params: { stockTransferId } }: Props) => {
  return <EditStockTransferForm stockTransferId={stockTransferId} />;
};

export default EditStockTransferPage;
