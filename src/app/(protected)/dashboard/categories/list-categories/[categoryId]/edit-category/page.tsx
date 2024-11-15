import { EditCategoryForm } from "@/components/dashboard/categories/form/edit-category-form";

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
};
export default async function EditProductPage(props: Props) {
  const params = await props.params;

  const { categoryId } = params;

  return <EditCategoryForm categoryId={categoryId} />;
}
