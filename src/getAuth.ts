import type { Auth } from "./types.ts";

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
      guestUuid: "55efff64-f768-4cc0-baaa-0f1312afa190",
    };
  }
};
