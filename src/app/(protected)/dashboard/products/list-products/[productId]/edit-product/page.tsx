import { EditProductForm } from "@/components/dashboard/products/form/edit-product-form";

type Props = {
  params: {
    productId: string;
  };
};
export default function EditProductPage({ params: { productId } }: Props) {
  return <EditProductForm productId={productId} />;
}
