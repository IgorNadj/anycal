import { Box } from "@mui/material";
import { useContext } from "react";
import { HEADER_HEIGHT } from "../constants.ts";
import { StateContext } from "../providers/StateContext.tsx";
import { AddCalendarDialog } from "./form/AddCalendarDialog.tsx";
import { EditCalendarDialog } from "./form/EditCalendarDialog.tsx";
import { EditEventDialog } from "./form/EditEventDialog.tsx";
import { AppLogo } from "./sidebar/AppLogo.tsx";
import { LeftSidebar } from "./sidebar/LeftSidebar.tsx";

type Props = {
  children: React.ReactNode;
};

export const Layout = (props: Props) => {
  const { children } = props;

  const ctx = useContext(StateContext);
  const { currentlyEditingEvent, currentlyEditingCalendar } = ctx;

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundColor: "#f3f8fb",
        display: "flex",
        flexDirection: "row",
      }}
    >
      {/* Left */}
      <Box
        sx={{ height: "100%", display: "flex", flexDirection: "column", width: "300px" }}
      >
        <Box margin={2} height={HEADER_HEIGHT}>
          <AppLogo />
        </Box>
        <Box sx={{ flex: 1, overflow: "hidden" }}>
          {/* Scrollable content */}
          <Box sx={{ overflowY: "auto", height: "100%" }}>
            <Box padding={2}>
              <LeftSidebar />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* Right */}
      <Box sx={{ height: "100%", flex: 1 }}>{children}</Box>
      <EditEventDialog key={currentlyEditingEvent?.uuid} />
      <EditCalendarDialog key={currentlyEditingCalendar?.uuid} />
      <AddCalendarDialog />
    </Box>
  );
};
