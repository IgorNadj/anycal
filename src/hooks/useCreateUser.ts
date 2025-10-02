import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types.ts";
import {
  createUserAction,
  type CreateUserInput,
  type CreateUserResult,
  type CreateUserError,
} from "../actions/auth/createUserAction.ts";
import { rememberLoggedInUser } from "../utils/auth.ts";

export const useCreateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User["uuid"], CreateUserError, CreateUserInput>({
    mutationFn: async (input: CreateUserInput) => {
      const result: CreateUserResult = await createUserAction(input);
      if (!result.success) {
        // Throw the structured error so consumers can use typed `mutation.error`
        throw result.error;
      }
      return result.userUuid;
    },
    onSuccess: async (userUuid) => {
      rememberLoggedInUser(userUuid);
      await queryClient.invalidateQueries();
    },
  });
};
