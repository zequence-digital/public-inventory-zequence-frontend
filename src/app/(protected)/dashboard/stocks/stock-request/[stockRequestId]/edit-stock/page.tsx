import { EditStockRequestForm } from "@/components/dashboard/stocks/stock-request/edit-stock-request-form";

type Props = {
  params: Promise<{
    stockRequestId: string;
  }>;
};

export const dynamic = "force-static";

const EditStockRequestPage = async (props: Props) => {
  const params = await props.params;

  const { stockRequestId } = params;

  return <EditStockRequestForm stockRequestId={stockRequestId} />;
};

export default EditStockRequestPage;
