import { useEffect, useState } from "react";

import type { LoginResponse } from "@/types";

export function useCurrentUser() {
  const [user, setUser] = useState<LoginResponse | null>(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      return;
    }

    const currentUser = JSON.parse(user) as LoginResponse;

    setUser(currentUser);
  }, []);

  return user;
}
