import { useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import {
  updateUserProfileAction,
  type UpdateUserProfileInput,
} from "../actions/updateUserProfileAction.ts";
import { AuthContext } from "../providers/AuthContext.tsx";
import { useValidatedMutation } from "../utils/validation.ts";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AuthContext);

  return useValidatedMutation({
    validatedMutationFn: async (input: UpdateUserProfileInput) => {
      return updateUserProfileAction(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "user_profile"] });
    },
  });
};
