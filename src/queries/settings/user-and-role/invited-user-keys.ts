import { getQueryKeys } from "@/helpers/query-keys";

const namespace = "invited-users";

const invitedUsersKey = {
  ...getQueryKeys(namespace),
};

export default invitedUsersKey;
