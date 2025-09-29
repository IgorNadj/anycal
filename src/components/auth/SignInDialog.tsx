import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Alert } from "@mui/material";
import { signInAction } from "../../actions/auth/signInAction.ts";

export type SignInDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { uuid: string; email?: string | null }) => Promise<void> | void;
};

export const SignInDialog = ({ open, onClose, onSuccess }: SignInDialogProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setEmail("");
    setPassword("");
    setError(null);
  };

  const handleClose = () => {
    if (!submitting) {
      reset();
      onClose();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const result = await signInAction({ email: email.trim(), password });
      if (result.success) {
        await onSuccess(result.user);
        reset();
        onClose();
      } else {
        setError(result.error || "Failed to sign in");
      }
    } catch (e: any) {
      setError(e?.message ?? "Failed to sign in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Sign in</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            {error && <Alert severity="error">{error}</Alert>}
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
          <Button onClick={handleClose} disabled={submitting}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={submitting}>Sign in</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
