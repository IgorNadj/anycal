import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { RegisterForm } from "../components/form/RegisterForm.tsx";
import { SignInForm } from "../components/form/SignInForm.tsx";

export const SignInPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h3" gutterBottom>
        Add Anything
      </Typography>

      {/* Small video placeholder */}
      <Box
        sx={{
          width: 480,
          maxWidth: "100%",
          aspectRatio: "16 / 9",
          bgcolor: "grey.200",
          borderRadius: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 3,
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Video placeholder
        </Typography>
      </Box>

      <Box>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="auth tabs">
          <Tab label="Register" />
          <Tab label="Sign in" />
        </Tabs>
        <Box padding={2}>
          {tab === 0 && <RegisterForm />}
          {tab === 1 && <SignInForm />}
        </Box>
      </Box>
    </Box>
  );
};
