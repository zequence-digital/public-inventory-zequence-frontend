import { EditSalesForm } from "@/components/dashboard/sales/form/edit-sales-form";

type Props = {
  params: {
    salesId: string;
  };
};

const EditSalesPage = ({ params: { salesId } }: Props) => {
  return <EditSalesForm salesId={salesId} />;
};

export default EditSalesPage;
