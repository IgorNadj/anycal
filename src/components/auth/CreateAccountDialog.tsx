import { useState } from "react";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useRegister } from "../../hooks/useRegister.ts";

export type CreateAccountDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const CreateAccountDialog = ({ open, onClose }: CreateAccountDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const useRegisterMutation = useRegister();
  const { mutate: register, error, isSuccess, isPending } = useRegisterMutation;

  const reset = () => {
    setEmail("");
    setPassword("");
    useRegisterMutation.reset();
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const errorMessage = error?.message;
  const isEmailField = error?.field === "email";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    register({ email: email.trim(), password });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create account</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                fullWidth
                error={isEmailField}
                helperText={isEmailField ? errorMessage : undefined}
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                fullWidth
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" variant="contained" disabled={isPending}>
              Create
            </Button>
          </DialogActions>
        </form>
      ) : (
        <>
          <DialogTitle>Account created</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="success">Your account has been created.</Alert>
              <Typography variant="body2">You are now signed in.</Typography>
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" onClick={handleClose}>
              Continue
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};
