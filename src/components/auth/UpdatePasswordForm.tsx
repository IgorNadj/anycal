import { useState } from "react";
import { Alert, Button, DialogActions, Stack, TextField } from "@mui/material";
import { useAuth } from "../../hooks/useAuth.ts";
import { useUpdatePassword } from "../../hooks/useUpdatePassword.ts";

export const UpdatePasswordForm = () => {
  const auth = useAuth();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const {
    mutate: updatePassword,
    isPending,
    error,
    isSuccess,
  } = useUpdatePassword();

  const loggedInUser = auth.state.isLoggedIn ? auth.state.user : null;
  if (!loggedInUser) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePassword(
      { uuid: loggedInUser.uuid, oldPassword, newPassword },
      {
        onSuccess: () => {
          reset();
        },
      },
    );
  };

  const reset = () => {
    setOldPassword("");
    setNewPassword("");
  };

  const errorMessage = error?.message;
  const isOldPasswordField = error?.field === "oldPassword";

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <>
          {isSuccess && (
            <Alert severity="success">Your password has been updated.</Alert>
          )}
          {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
          <TextField
            label="Current password"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            required
            fullWidth
            error={isOldPasswordField}
            helperText={isOldPasswordField ? errorMessage : ""}
          />
          <TextField
            label="New password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            fullWidth
          />
          <DialogActions sx={{ px: 0 }}>
            <Button type="submit" variant="contained" disabled={isPending}>
              Change password
            </Button>
          </DialogActions>
        </>
      </Stack>
    </form>
  );
};
