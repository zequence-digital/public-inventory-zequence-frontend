import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "products";

const productKeys = {
  ...getQueryKeys(namespace),
};

export default productKeys;
