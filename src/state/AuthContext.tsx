import { createContext } from "react";

export type AuthContextType = {
  userUuid: string | null;
  setUserUuid: (userUuid: string | null) => void;
};

// @ts-expect-error null is fine, provider will never be initialised without a real value
export const AuthContext = createContext<AuthContextType>(null);
