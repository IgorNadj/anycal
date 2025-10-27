import { Alert, Button, DialogActions, Stack, TextField } from "@mui/material";
import { useContext, useState } from "react";
import { useUpdateUserProfile } from "../../hooks/useUpdateUserProfile.ts";
import { useUserProfile } from "../../hooks/useUserProfile.ts";
import { AuthContext } from "../../providers/AuthContext.tsx";

export const UpdateEmailForm = () => {
  const { data: userProfile } = useUserProfile();
  const { email: existingEmail } = userProfile || { email: "" };
  const [email, setEmail] = useState<string>(existingEmail);

  const { userUuid } = useContext(AuthContext);

  const mutation = useUpdateUserProfile();
  const { mutate: updateUserProfile, isPending, error, isSuccess } = mutation;

  if (!userUuid || !userProfile) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ uuid: userUuid, email: email.trim() });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {isSuccess && (
          <>
            <Alert severity="success">Your email address has been updated.</Alert>
          </>
        )}
        <>
          {error && <Alert severity="error">{error.message}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            error={error?.field === "email"}
            helperText={error?.field === "email" ? error?.message : undefined}
          />
          <DialogActions sx={{ px: 0 }}>
            <Button type="submit" variant="contained" disabled={isPending}>
              Save email
            </Button>
          </DialogActions>
        </>
      </Stack>
    </form>
  );
};
