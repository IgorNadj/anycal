import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Stack, Alert } from "@mui/material";
import { createAccountAction } from "../../actions/auth/createAccountAction.ts";

export type CreateAccountDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: { uuid: string; email?: string | null }) => Promise<void> | void;
};

export const CreateAccountDialog = ({ open, onClose, onSuccess }: CreateAccountDialogProps) => {
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
      const user = await createAccountAction({ email: email.trim(), password });
      await onSuccess(user);
      reset();
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to create account");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Create account</DialogTitle>
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
          <Button type="submit" variant="contained" disabled={submitting}>Create</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
