import { Box } from "@mui/material";
import { Outlet } from "react-router";
import { AppHeader } from "../../../components/header/AppHeader.tsx";
import { HEADER_HEIGHT } from "../../../constants.ts";

export const CalendarLayout = () => {
  return (
    <Box>
      {/* App Header */}
      <Box sx={{ height: HEADER_HEIGHT }}>
        <AppHeader calendarControls={true} />
      </Box>

      {/* Calendar (non-scrollable) */}
      <Box
        sx={{
          height: `calc(100vh - ${HEADER_HEIGHT}px)`,
          overflowY: "hidden",
          backgroundColor: "#fff",
          borderTopLeftRadius: 5,
          borderTopRightRadius: 5,
          border: "1px solid #ddd",
          marginRight: 1,
          marginBottom: 1,
        }}
      >
        <Box
          sx={{
            height: "100%",
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
