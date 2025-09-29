import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Alert,
} from "@mui/material";
import { updateSettingsAction } from "../../actions/auth/updateSettingsAction.ts";
import { useUser } from "../../hooks/useUser.ts";
import { getAuth } from "../../getAuth.ts";

export type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: (user: {
    uuid: string;
    email?: string | null;
  }) => Promise<void> | void;
};

export const SettingsDialog = ({
  open,
  onClose,
  onSuccess,
}: SettingsDialogProps) => {
  const auth = getAuth();

  if (!auth.isLoggedIn) {
    return;
  }

  const { data: user } = useUser();

  const [email, setEmail] = useState(user?.email ?? "");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setEmail(user?.email ?? "");
      setPassword("");
      setError(null);
    }
  }, [open, user?.email]);

  const handleClose = () => {
    if (!submitting) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const updated = await updateSettingsAction({
        uuid: auth.userUuid,
        email: email.trim(),
        password: password.length ? password : undefined,
      });
      await onSuccess(updated);
      onClose();
    } catch (e: any) {
      setError(e?.message ?? "Failed to update settings");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <form onSubmit={handleSubmit}>
        <DialogTitle>Account settings</DialogTitle>
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
              label="New password (optional)"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              helperText="Leave blank to keep current password"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={submitting}>
            Cancel
          </Button>
          <Button type="submit" variant="contained" disabled={submitting}>
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
