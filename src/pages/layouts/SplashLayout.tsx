import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";
import { Footer } from "../../components/Footer.tsx";
import { AuthAvatar } from "../../components/header/AuthAvatar.tsx";
import { AppLogo } from "../../components/sidebar/AppLogo.tsx";

export const SplashLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#f3f8fb" }}>
      <Box
        sx={{
          background: `radial-gradient(at 14% 60%, #fa5cfd 0px, transparent 50%), radial-gradient(at 3% 84%, #fd5caf 0px, transparent 50%), radial-gradient(at 67% 14%, #fd5c5f 0px, transparent 50%), radial-gradient(at 94% 40%, #5ffd5c 0px, transparent 50%), radial-gradient(at 13% 66%, #5cfdfa 0px, transparent 50%) #FFAC5E`,
          minHeight: "100vh",
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", padding: 2 }}>
          <AppLogo />
          <AuthAvatar />
        </Box>
        <Container maxWidth="md" sx={{ paddingTop: 5, paddingBottom: 5 }}>
          <Box sx={{ paddingBottom: 10, minHeight: `calc(100vh - 220px)` }}>
            <Outlet />
          </Box>
          <Footer />
        </Container>
      </Box>
    </Box>
  );
};
