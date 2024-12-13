import { EditCategoryForm } from "@/components/dashboard/categories/form/edit-category-form";

type Props = {
  params: Promise<{
    categoryId: string;
  }>;
};

export const dynamic = "force-static";

export default async function EditCategoryPage(props: Props) {
  const params = await props.params;

  const { categoryId } = params;

  return <EditCategoryForm categoryId={categoryId} />;
}
