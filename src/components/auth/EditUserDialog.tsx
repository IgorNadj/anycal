import { Dialog, DialogTitle, DialogContent, Stack, Divider } from "@mui/material";
import { UpdateEmailForm } from "./UpdateEmailForm.tsx";
import { UpdatePasswordForm } from "./UpdatePasswordForm.tsx";
import { useAuth } from "../../hooks/useAuth.ts";

export type EditUserDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const EditUserDialog = ({ open, onClose }: EditUserDialogProps) => {
  const auth = useAuth();

  if (!auth.state.isLoggedIn) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="xs">
      <DialogTitle>Account settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <UpdateEmailForm initialEmail={auth.state.user.email} />
          <Divider />
          <UpdatePasswordForm />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
