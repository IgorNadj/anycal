import { Box } from "@mui/material";
import { useContext } from "react";
import { Link } from "react-router";
import { StateContext } from "../../providers/StateContext.tsx";
import { AuthAvatar } from "./AuthAvatar.tsx";
import { CurrentDateDisplay } from "./CurrentDateDisplay.tsx";
import { PrevNext } from "./PrevNext.tsx";
import { Today } from "./Today.tsx";
import { ViewModeSelector } from "./ViewModeSelector.tsx";

type Props = {
  calendarControls?: boolean;
  showCalendarButton?: boolean;
};

export const AppHeader = ({
  calendarControls = false,
  showCalendarButton = false,
}: Props) => {
  const { viewMode, setViewMode, currentDate, setCurrentDate } = useContext(StateContext);

  const viewModeHasDate = viewMode !== "agenda";

  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
        paddingRight: 2,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
        {showCalendarButton && (
          <Box sx={{ paddingLeft: 2 }}>
            <Link to="/">Cal</Link>
          </Box>
        )}
        {calendarControls && viewModeHasDate && (
          <>
            <Today setCurrentDate={setCurrentDate} />
            <PrevNext
              viewMode={viewMode}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
            />
            <CurrentDateDisplay currentDate={currentDate} viewMode={viewMode} />
          </>
        )}
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        {calendarControls && (
          <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        )}
        <AuthAvatar />
      </Box>
    </Box>
  );
};
