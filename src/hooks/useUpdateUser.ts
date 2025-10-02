import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { User } from "../types.ts";
import {
  updateUserAction,
  type UpdateUserInput,
  type UpdateUserResult,
  type UpdateUserError,
} from "../actions/auth/updateUserAction.ts";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation<User, UpdateUserError, UpdateUserInput>({
    mutationFn: async (input: UpdateUserInput) => {
      const result: UpdateUserResult = await updateUserAction(input);
      if (!result.success) {
        throw result.error;
      }
      return result.user;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
