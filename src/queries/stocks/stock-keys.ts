import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "stocks";

const stockKeys = {
  ...getQueryKeys(namespace),
};

export default stockKeys;
