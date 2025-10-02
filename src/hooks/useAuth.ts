import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  signInAction,
  type SignInResult,
} from "../actions/auth/signInAction.ts";
import type { User } from "../types.ts";
import { GuestDataStore } from "../state/GuestDataStore.ts";

const STORAGE_KEY_USER = "anycal_loggedInUserUuid";

type AuthState = {
  isLoading: boolean;
} & LoggedInStateOrGuestState;

type LoggedInState = {
  isLoggedIn: true;
  user: User;
};

type GuestState = {
  isLoggedIn: false;
  guestUuid: string;
};

type LoggedInStateOrGuestState = LoggedInState | GuestState;

export type UseAuth = {
  state: AuthState;
  logIn: (email: string, password: string) => Promise<SignInResult>;
  logOut: () => Promise<void>;
};

export const useAuth = (): UseAuth => {
  const queryClient = useQueryClient();

  const [loadingPromise, setLoadingPromise] = useState<Promise<void> | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);

  const state: AuthState = user
    ? { isLoggedIn: true, user, isLoading }
    : { isLoggedIn: false, guestUuid: GuestDataStore.guestUserUuid, isLoading };

  useEffect(() => {
    console.log("auth state", state);
  }, [user]);

  const rememberLoggedInUser = (uuid: string) => {
    window.localStorage.setItem(STORAGE_KEY_USER, uuid);
  };

  const getRememberedLoggedInUser = (): string | null => {
    return window.localStorage.getItem(STORAGE_KEY_USER);
  };

  const forgetLoggedInUser = () => {
    window.localStorage.removeItem(STORAGE_KEY_USER);
  };

  const logIn = async (
    email: string,
    password: string,
  ): Promise<SignInResult> => {
    const result = await signInAction({
      type: "emailAndPassword",
      email,
      password,
    });
    if (result.success) {
      rememberLoggedInUser(result.user.uuid);
      setUser(result.user);
      await queryClient.invalidateQueries();
    }
    return result;
  };

  const attemptAutologin = async (): Promise<void> => {
    try {
      const uuid = getRememberedLoggedInUser();
      if (uuid && !user) {
        const result = await signInAction({
          type: "uuid",
          userUuid: uuid,
        });
        if (result.success) {
          setUser(result.user);
          await queryClient.invalidateQueries();
          return;
        }
      }
    } catch (e) {
      console.error("Auto log-in error", e);
      // ignore storage errors
    }
  };

  const logOut = async () => {
    forgetLoggedInUser();
    setUser(null);
    await queryClient.invalidateQueries();
  };

  if (loadingPromise === null) {
    console.log("useAuth loading");
    setLoadingPromise(async () => {
      await attemptAutologin();
      setIsLoading(false);
      console.log("useAuth loading finished");
    });
    setIsLoading(true);
  }

  return {
    state,
    logIn,
    logOut,
  };
};
