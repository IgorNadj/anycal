import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { AppHeader } from "../../../components/header/AppHeader.tsx";
import { HEADER_HEIGHT } from "../../../constants.ts";

export const ContentLayout = () => {
  return (
    <Box sx={{ height: "100%", flex: 1 }}>
      {/* App Header */}
      <Box sx={{ height: HEADER_HEIGHT }}>
        <AppHeader calendarControls={false} />
      </Box>

      {/* Scrollable content */}
      <Box
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          backgroundColor: "#fff",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          border: "1px solid #ddd",
          borderBottomWidth: 0,
          overflowY: "auto",
          marginRight: 1,
        }}
      >
        <Box>
          <Box sx={{ padding: 5, paddingBottom: 7 }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
