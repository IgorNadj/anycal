import { Box } from "@mui/material";
import { Outlet } from "react-router";

export const AppDataPageLayout = () => {
  return (
    <Box sx={{ height: "100%", flex: 1 }}>
      <Outlet />
    </Box>
  );
};
