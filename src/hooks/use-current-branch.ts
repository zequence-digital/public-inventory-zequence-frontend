import { useBranches } from "@/queries/stocks";
import { useMemo } from "react";
import { useCurrentUser } from "./use-current-user";

export function useCurrentBranch() {
  const user = useCurrentUser();
  const {
    data: branches,
    isPending: pendingBranch,
    isError: isErrorBranch,
    error: errorBranch,
  } = useBranches();

  const currentBranch = useMemo(() => {
    return branches?.data?.find(
      (branch) => branch.name === user?.data?.branch.name,
    );
  }, [branches, user]);

  const filterNotCurrentBranch = useMemo(() => {
    return branches?.data?.filter(
      (branch) => branch.name !== currentBranch?.name,
    );
  }, [branches, currentBranch]);

  if (!currentBranch) {
    return {
      currentBranch: null,
      branches: null,
      pendingBranch,
      isErrorBranch,
      errorBranch,
    };
  }

  return {
    currentBranch,
    branches,
    pendingBranch,
    isErrorBranch,
    errorBranch,
    filterNotCurrentBranch,
  };
}
