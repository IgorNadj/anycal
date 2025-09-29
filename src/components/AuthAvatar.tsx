import { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { getAuth } from "../getAuth.ts";
import { useQueryClient } from "@tanstack/react-query";
import { CreateAccountDialog } from "./auth/CreateAccountDialog.tsx";
import { SignInDialog } from "./auth/SignInDialog.tsx";
import { SettingsDialog } from "./auth/SettingsDialog.tsx";
import { useUser } from "../hooks/useUser.ts";

export const AuthAvatar = () => {
  const auth = getAuth();
  const { data: user } = useUser();
  const qc = useQueryClient();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const persistUser = async (u: { uuid: string; email?: string | null }) => {
    localStorage.setItem("anycal_authUser", JSON.stringify(u));
    await qc.invalidateQueries();
  };

  const clearUser = async () => {
    localStorage.removeItem("anycal_authUser");
    await qc.invalidateQueries();
  };

  const [showCreate, setShowCreate] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const onSignOut = async () => {
    handleClose();
    await clearUser();
  };

  const letter = user?.email ? user.email[0].toUpperCase() : "";

  return (
    <Box>
      <IconButton
        onClick={handleOpen}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
      >
        <Avatar
          sx={{
            width: 32,
            height: 32,
            bgcolor: auth.isLoggedIn ? undefined : "grey.400",
          }}
        >
          {auth.isLoggedIn ? letter : undefined}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{ paper: { elevation: 3 } }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {!auth.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowCreate(true);
            }}
          >
            Create account
          </MenuItem>
        )}
        {!auth.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowSignIn(true);
            }}
          >
            Sign in
          </MenuItem>
        )}
        {auth.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowSettings(true);
            }}
          >
            Settings
          </MenuItem>
        )}
        {auth.isLoggedIn && <MenuItem onClick={onSignOut}>Sign out</MenuItem>}
      </Menu>

      {/* Dialogs */}
      <CreateAccountDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSuccess={persistUser}
      />
      <SignInDialog
        open={showSignIn}
        onClose={() => setShowSignIn(false)}
        onSuccess={persistUser}
      />
      <SettingsDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
        onSuccess={persistUser}
      />
    </Box>
  );
};
