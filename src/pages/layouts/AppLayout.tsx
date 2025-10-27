import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { LeftSidebar } from "../../components/sidebar/LeftSidebar.tsx";

export const AppLayout = () => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f3f8fb",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left: Sidebar */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <LeftSidebar />
      </Box>

      {/* Right: pass either a ScrollableContentLayout or NonScrollableContentLayout */}
      <Box sx={{ height: "100%", flex: 1 }}>
        <Outlet />
      </Box>
    </Box>
  );
};
