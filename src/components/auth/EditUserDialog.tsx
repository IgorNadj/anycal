import { Dialog, DialogContent, DialogTitle, Divider, Stack } from "@mui/material";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AuthContext } from "../../state/AuthContext.tsx";
import { UpdateEmailForm } from "./UpdateEmailForm.tsx";
import { UpdatePasswordForm } from "./UpdatePasswordForm.tsx";

export type EditUserDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const EditUserDialog = ({ open, onClose }: EditUserDialogProps) => {
  const { userUuid } = useContext(AuthContext);

  const [formKey, setFormKey] = useState<string>(uuidv4()); // allows us to reset child forms

  const handleClose = () => {
    setFormKey(uuidv4());
    onClose();
  };

  if (!userUuid) {
    return null;
  }

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>Account settings</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <UpdateEmailForm key={`email-${formKey}`} />
          <Divider />
          <UpdatePasswordForm key={`pw-${formKey}`} />
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
