import { CategoryList } from "@/components/dashboard/categories/list-category/list-category";
import { Suspense } from "react";

const CategoryListPage = () => {
  return (
    <Suspense>
      <CategoryList />
    </Suspense>
  );
};

export default CategoryListPage;
