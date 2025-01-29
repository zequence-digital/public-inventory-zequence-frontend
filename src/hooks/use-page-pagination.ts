import { useSearchParams } from "next/navigation";
import { useState } from "react";

export function usePagePagination() {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [pageNumber, setPageNumber] = useState(
    params.get("page") ? parseInt(params.get("page") as string) : 1,
  );

  return { pageNumber, setPageNumber };
}
