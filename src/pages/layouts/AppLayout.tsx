"use client";

import { Menu } from "@mui/icons-material";
import { Box, Drawer, IconButton, lighten } from "@mui/material";
import { useContext, useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { AppLogo } from "../../components/sidebar/AppLogo.tsx";
import { LeftSidebar } from "../../components/sidebar/LeftSidebar.tsx";
import { CAL_HEADER_HEIGHT } from "../../constants.ts";
import { StateContext } from "../../providers/StateContext.tsx";

export const AppLayout = () => {
  const { isSidebarOpen, setSidebarOpen } = useContext(StateContext);

  const location = useLocation();

  useEffect(() => {
    console.log("location changed", location);
    // Hide sidebar when pressing things on it (navigating away)
    setSidebarOpen(false);
  }, [location]);

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundColor: lighten("#f3f8fb", 0.3),
      }}
    >
      {/* App Header */}
      <Box
        sx={{
          height: CAL_HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#e7f1f8",
        }}
      >
        <IconButton
          sx={{ marginLeft: 2, display: { sm: "none" } }}
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Menu />
        </IconButton>
        <Box sx={{ paddingLeft: { xs: 2, sm: 2 } }}>
          <AppLogo />
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          height: `calc(100vh - ${CAL_HEADER_HEIGHT}px)`,
          display: "flex",
          flexDirection: "row",
        }}
      >
        {/* Left: Sidebar [Mobile] */}
        <Drawer
          variant="temporary"
          open={isSidebarOpen}
          onClose={() => setSidebarOpen(false)}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 250 },
          }}
        >
          <LeftSidebar />
        </Drawer>

        {/* Left: Sidebar [Desktop] */}
        <Box
          sx={{
            height: "100%",
            display: {
              xs: "none", // we use the Drawer instead on mobile
              sm: "flex",
            },
            flex: {
              xs: 1,
              sm: 0,
            },
          }}
        >
          <LeftSidebar />
        </Box>

        {/* Right: main content */}
        <Box
          sx={{
            height: "100%",
            display: "flex",
            flex: 1,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
