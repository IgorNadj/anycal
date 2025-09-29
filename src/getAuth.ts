import type { Auth } from "./types.ts";
import { GuestDataStore } from "./state/GuestDataStore.ts";

export const getAuth = (): Auth => {
  const userUuid = window.localStorage.getItem("anycal_userUuid");
  if (userUuid) {
    return {
      isLoggedIn: true,
      userUuid,
    };
  } else {
    return {
      isLoggedIn: false,
      guestUuid: GuestDataStore.user.getUuid(),
    };
  }
};
