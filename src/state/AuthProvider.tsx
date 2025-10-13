import { type ReactNode, useState } from "react";
import { AuthContext, type AuthContextType } from "./AuthContext.tsx";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userUuid, setUserUuid] = useState<string | null>(null);

  const value: AuthContextType = {
    userUuid,
    setUserUuid,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
