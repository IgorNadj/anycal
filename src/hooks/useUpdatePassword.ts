import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateUserPasswordAction,
  type UpdatePasswordInput,
  type UpdatePasswordResult,
  type UpdatePasswordError,
} from "../actions/auth/updateUserPasswordAction.ts";

export const useUpdatePassword = () => {
  const queryClient = useQueryClient();

  return useMutation<void, UpdatePasswordError, UpdatePasswordInput>({
    mutationFn: async (input: UpdatePasswordInput) => {
      const result: UpdatePasswordResult = await updateUserPasswordAction(input);
      if (!result.success) {
        throw result.error;
      }
      return;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries();
    },
  });
};
