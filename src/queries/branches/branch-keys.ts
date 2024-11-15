import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "branches";

const branchKeys = {
  ...getQueryKeys(namespace),
};

export default branchKeys;
