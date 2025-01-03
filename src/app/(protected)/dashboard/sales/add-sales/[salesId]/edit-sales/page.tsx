import { EditSalesForm } from "@/components/dashboard/sales/form/edit-sales-form";

type Props = {
  params: Promise<{
    salesId: string;
  }>;
};

export const dynamic = "force-static";

const EditSalesPage = async (props: Props) => {
  const params = await props.params;

  const { salesId } = params;

  return <EditSalesForm salesId={salesId} />;
};

export default EditSalesPage;
