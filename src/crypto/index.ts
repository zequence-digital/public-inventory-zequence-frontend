import { getFromLocalStorage, user } from "@/utils";
import { useEffect, useState } from "react";

import CryptoJs from "crypto-js";
import type { LoginResponse } from "@/types";
import { useLocalStorage } from "@/hooks/use-local-storage";

export const encrypt = (data: string) => {
  return CryptoJs.AES.encrypt(
    data,
    process.env.NEXT_PUBLIC_CRYPTO_KEY!,
  ).toString();
};

export const useLoggedInUser = () => {
  const [loggedInUser, setLoggedInUser] = useState<LoginResponse | null>(null);

  const currentUser = getFromLocalStorage(user);

  useEffect(() => {
    if (!currentUser) return;

    const decrypt = (data: string) => {
      const bytes = CryptoJs.AES.decrypt(
        data,
        process.env.NEXT_PUBLIC_CRYPTO_KEY!,
      );
      return bytes.toString(CryptoJs.enc.Utf8);
    };

    setLoggedInUser(
      currentUser ? (JSON.parse(decrypt(currentUser)) as LoginResponse) : null,
    );
  }, [currentUser]);

  return loggedInUser;
};

export const useActiveUser = () => {
  const [activeUser, setActiveUser] = useState<LoginResponse | null>(null);

  const [currentUser] = useLocalStorage(user, "");

  useEffect(() => {
    if (!currentUser) return;
    setActiveUser(
      currentUser ? (JSON.parse(currentUser) as LoginResponse) : null,
    );
  }, [currentUser]);

  return activeUser;
};
