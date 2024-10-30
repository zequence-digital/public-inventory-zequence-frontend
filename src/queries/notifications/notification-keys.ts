import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "notification";

const notificationKeys = {
  ...getQueryKeys(namespace),
};

export default notificationKeys;
