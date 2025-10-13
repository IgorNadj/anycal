import { useQueryClient } from "@tanstack/react-query";
import {
  updateUserProfileAction,
  type UpdateUserProfileInput,
} from "../actions/updateUserProfileAction.ts";
import { useValidatedMutation } from "../utils/validation.ts";
import { useContext } from "react";
import { AppContext } from "../state/AppContext.tsx";

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  const { userUuid } = useContext(AppContext);

  return useValidatedMutation({
    validatedMutationFn: async (input: UpdateUserProfileInput) => {
      return updateUserProfileAction(input);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: [userUuid, "user_profile"] });
    },
  });
};
