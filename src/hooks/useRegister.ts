import { registerAction } from "../actions/registerAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

// type RegisterInput = { email: string; password: string };

export const useRegister = () => {
  const { setUserUuid } = useContext(AppContext);

  return useValidatedMutation({
    validatedMutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return registerAction({
        email,
        password,
      });
    },
    onSuccess: async (result) => {
      console.log("calling setUserUuid after registering");
      setUserUuid(result.userUuid);
    },
  });
};
