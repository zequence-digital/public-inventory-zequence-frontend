import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "category";

const categoryKeys = {
  ...getQueryKeys(namespace),
};

export default categoryKeys;
