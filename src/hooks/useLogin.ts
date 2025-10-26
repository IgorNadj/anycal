import { useContext } from "react";
import { logInAction } from "../actions/logInAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import { useValidatedMutation } from "../utils/validation.ts";

export const useLogin = () => {
  const { setUserUuid } = useContext(AuthContext);

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
