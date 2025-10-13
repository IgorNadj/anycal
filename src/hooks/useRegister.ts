import { useContext } from "react";
import { registerAction } from "../actions/registerAction.ts";
import { AuthContext } from "../state/AuthContext.tsx";
import { useValidatedMutation } from "../utils/validation.ts";

export const useRegister = () => {
  const { setUserUuid } = useContext(AuthContext);

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
