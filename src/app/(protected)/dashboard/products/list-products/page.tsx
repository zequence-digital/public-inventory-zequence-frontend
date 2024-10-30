import { ProductList } from "@/components/dashboard/products/product-list";
import { Suspense } from "react";

const ListProductsPage = () => {
  return (
    <Suspense>
      <ProductList />
    </Suspense>
  );
};

export default ListProductsPage;
