import {
  type UpdatePasswordInput,
  updateUserPasswordAction,
} from "../actions/updateUserPasswordAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";

export const useUpdatePassword = () => {
  return useValidatedMutation({
    validatedMutationFn: async (input: UpdatePasswordInput) => {
      return updateUserPasswordAction(input);
    },
  });
};
