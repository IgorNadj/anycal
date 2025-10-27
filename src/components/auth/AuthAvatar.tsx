import { Avatar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { useContext, useState } from "react";
import { NavLink } from "react-router";
import { useUserProfile } from "../../hooks/useUserProfile.ts";
import { AuthContext } from "../../providers/AuthContext.tsx";
import { EditUserDialog } from "./EditUserDialog.tsx";

export const AuthAvatar = () => {
  const { userUuid, setUserUuid } = useContext(AuthContext);

  const isLoggedIn = !!userUuid;
  const { data: profile } = useUserProfile();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const [showSettings, setShowSettings] = useState(false);

  const onSignOut = async () => {
    await setUserUuid(null);
    handleClose();
  };

  const letter = profile ? (profile.email[0]?.toUpperCase() ?? "") : "";

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
            bgcolor: isLoggedIn ? undefined : "grey.400",
          }}
        >
          {isLoggedIn ? letter : undefined}
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
        {!isLoggedIn && (
          <MenuItem>
            <NavLink to="/">Create account</NavLink>
          </MenuItem>
        )}
        {isLoggedIn && (
          <MenuItem
            onClick={() => {
              handleClose();
              setShowSettings(true);
            }}
          >
            Settings
          </MenuItem>
        )}
        {isLoggedIn && <MenuItem onClick={onSignOut}>Sign out</MenuItem>}
      </Menu>

      {/* Dialogs */}
      <EditUserDialog open={showSettings} onClose={() => setShowSettings(false)} />
    </Box>
  );
};
