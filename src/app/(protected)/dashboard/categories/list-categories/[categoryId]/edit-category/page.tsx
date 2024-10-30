import { EditCategoryForm } from "@/components/dashboard/categories/form/edit-category-form";

type Props = {
  params: {
    categoryId: string;
  };
};
export default function EditProductPage({ params: { categoryId } }: Props) {
  return <EditCategoryForm categoryId={categoryId} />;
}
