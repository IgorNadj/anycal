import { useEffect, useState } from "react";
import { Alert, Button, DialogActions, Stack, TextField } from "@mui/material";
import { useAuth } from "../../hooks/useAuth.ts";
import { useUpdateUser } from "../../hooks/useUpdateUser.ts";

export type UpdateEmailFormProps = {
  initialEmail?: string;
  autoFocus?: boolean;
};

export const UpdateEmailForm = ({
  initialEmail = "",
  autoFocus = true,
}: UpdateEmailFormProps) => {
  const auth = useAuth();
  const [email, setEmail] = useState<string>(initialEmail);

  const { mutate: updateUser, isPending, error, isSuccess } = useUpdateUser();

  useEffect(() => {
    setEmail(initialEmail);
  }, [initialEmail]);

  const loggedInUser = auth.state.isLoggedIn ? auth.state.user : null;
  if (!loggedInUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ uuid: loggedInUser.uuid, email: email.trim() });
  };

  const errorMessage = error?.message;
  const isEmailField = error?.field === "email";

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {isSuccess && (
          <>
            <Alert severity="success">
              Your email address has been updated.
            </Alert>
          </>
        )}
        <>
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus={autoFocus}
            fullWidth
            error={isEmailField}
            helperText={isEmailField ? errorMessage : undefined}
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
