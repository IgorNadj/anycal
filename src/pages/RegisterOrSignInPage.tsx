import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { useParams } from "react-router";
import { RegisterForm } from "../components/form/RegisterForm.tsx";
import { SignInForm } from "../components/form/SignInForm.tsx";
import { NarrowContainer } from "../components/NarrowContainer.tsx";

type FormParam = "register" | "sign-in";

export const RegisterOrSignInPage = () => {
  const { form } = useParams();
  const formParam: FormParam = form === "sign-in" ? "sign-in" : "register";

  const [tab, setTab] = useState<FormParam>(formParam);

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

      <Box sx={{ marginTop: 5 }}>
        <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="auth tabs">
          <Tab value="register" label="Register" />
          <Tab value="sign-in" label="Sign in" />
        </Tabs>
        <NarrowContainer>
          {tab === "register" && <RegisterForm />}
          {tab === "sign-in" && <SignInForm />}
        </NarrowContainer>
      </Box>
    </Box>
  );
};
