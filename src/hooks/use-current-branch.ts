import { useActiveUser } from "@/crypto";
import { useBranches } from "@/queries/branches";
import { useMemo } from "react";

export function useCurrentBranch() {
  const user = useActiveUser();
  const {
    data: branches,
    isPending: pendingBranch,
    isError: isErrorBranch,
    error: errorBranch,
  } = useBranches();

  const currentBranch = useMemo(() => {
    return branches?.data?.find(
      (branch) => branch?.name === user?.data?.branch?.name,
    );
  }, [branches, user]);

  const filterNotCurrentBranch = useMemo(() => {
    return branches?.data?.filter(
      (branch) => branch?.name !== currentBranch?.name,
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
