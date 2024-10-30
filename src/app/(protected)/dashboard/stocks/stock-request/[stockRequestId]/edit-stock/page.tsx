import { EditStockRequestForm } from "@/components/dashboard/stocks/stock-request/edit-stock-request-form";

type Props = {
  params: {
    stockRequestId: string;
  };
};
const EditStockRequestPage = ({ params: { stockRequestId } }: Props) => {
  return <EditStockRequestForm stockRequestId={stockRequestId} />;
};

export default EditStockRequestPage;
