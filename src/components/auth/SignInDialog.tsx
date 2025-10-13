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
import { useLogin } from "../../hooks/useLogin.ts";

export type SignInDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const SignInDialog = ({ open, onClose }: SignInDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const useLoginMutation = useLogin();
  const { mutate: login, error, isSuccess, isPending } = useLoginMutation;

  const reset = () => {
    setEmail("");
    setPassword("");
    useLoginMutation.reset();
  };

  const handleClose = () => {
    if (!isPending) {
      reset();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    login({
      email: email.trim(),
      password,
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      {!isSuccess ? (
        <form onSubmit={handleSubmit}>
          <DialogTitle>Sign in</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              {error && <Alert severity="error">{error.message}</Alert>}
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                fullWidth
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
              Sign in
            </Button>
          </DialogActions>
        </form>
      ) : (
        <>
          <DialogTitle>Signed in</DialogTitle>
          <DialogContent>
            <Stack spacing={2} sx={{ mt: 1 }}>
              <Alert severity="success">You have signed in successfully.</Alert>
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
