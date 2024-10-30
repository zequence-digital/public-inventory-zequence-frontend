import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "states";

const stateKeys = {
  ...getQueryKeys(namespace),
};

export default stateKeys;
