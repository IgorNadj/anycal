import { useState } from "react";
import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { CreateAccountDialog } from "./auth/CreateAccountDialog.tsx";
import { SignInDialog } from "./auth/SignInDialog.tsx";
import { EditUserDialog } from "./auth/EditUserDialog.tsx";
import { useAuth } from "../hooks/useAuth.ts";

export const AuthAvatar = () => {
  const auth = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) =>
    setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [showCreate, setShowCreate] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const onSignOut = async () => {
    await auth.logOut();
    handleClose();
  };

  const letter = auth.state.isLoggedIn ? (auth.state.user.email[0]?.toUpperCase() ?? "") : "";

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
            bgcolor: auth.state.isLoggedIn ? undefined : "grey.400",
          }}
        >
          {auth.state.isLoggedIn ? letter : undefined}
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
        {!auth.state.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowCreate(true);
            }}
          >
            Create account
          </MenuItem>
        )}
        {!auth.state.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowSignIn(true);
            }}
          >
            Sign in
          </MenuItem>
        )}
        {auth.state.isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowSettings(true);
            }}
          >
            Settings
          </MenuItem>
        )}
        {auth.state.isLoggedIn && (
          <MenuItem onClick={onSignOut}>Sign out</MenuItem>
        )}
      </Menu>

      {/* Dialogs */}
      <CreateAccountDialog
        open={showCreate}
        onClose={() => setShowCreate(false)}
      />
      <SignInDialog open={showSignIn} onClose={() => setShowSignIn(false)} />
      <EditUserDialog
        open={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </Box>
  );
};
