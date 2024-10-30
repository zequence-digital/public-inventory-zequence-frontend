import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "auth";

const authKeys = {
  ...getQueryKeys(namespace),
};

export default authKeys;
