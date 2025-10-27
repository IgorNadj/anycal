import { Alert, Box, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link } from "react-router";
import { AuthContext } from "../providers/AuthContext.tsx";

export const SignOutPage = () => {
  const { userUuid, setUserUuid } = useContext(AuthContext);

  useEffect(() => {
    setUserUuid(null);
  }, []);

  const onSignOutClick = () => {
    setUserUuid(null);
  };

  return (
    <Box
      sx={{
        paddingTop: 5,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h3" gutterBottom>
        Add Anything
      </Typography>

      {userUuid && (
        <>
          <button onClick={onSignOutClick}>Sign out</button>
        </>
      )}

      {!userUuid && (
        <Alert severity="success">
          <p>You are now signed out.</p>

          <Link to="/">Back to home</Link>
        </Alert>
      )}
    </Box>
  );
};
