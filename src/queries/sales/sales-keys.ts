import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "sales";

const salesKeys = {
  ...getQueryKeys(namespace),
};

export default salesKeys;
