import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "stocks";

const fileUploadKeys = {
  ...getQueryKeys(namespace),
};

export default fileUploadKeys;
