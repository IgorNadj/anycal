import { type ReactNode, useState } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext.tsx";

const STORAGE_KEY = "anycal_userUuid";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userUuid, setUserUuid] = useState<string | null>(
    localStorage.getItem(STORAGE_KEY),
  );

  const setUserUuidAndRemember = (uuid: string | null) => {
    setUserUuid(uuid);
    if (uuid) {
      localStorage.setItem(STORAGE_KEY, uuid);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const value: AuthContextType = {
    userUuid,
    setUserUuid: setUserUuidAndRemember,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
