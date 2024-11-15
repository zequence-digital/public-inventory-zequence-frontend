import { EditProductForm } from "@/components/dashboard/products/form/edit-product-form";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};
export default async function EditProductPage(props: Props) {
  const params = await props.params;

  const { productId } = params;

  return <EditProductForm productId={productId} />;
}
