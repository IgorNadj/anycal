import { logInAction } from "../actions/logInAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useLogin = () => {
  const { setUserUuid } = useContext(AppContext);

  return useValidatedMutation({
    validatedMutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return logInAction({
        type: "emailAndPassword",
        email,
        password,
      });
    },
    onSuccess: async (result) => {
      console.log("calling setUserUuid after logging in");
      setUserUuid(result.userUuid);
    },
  });
};
