import { Box } from "@mui/material";
import { useContext } from "react";
import { StateContext } from "../../providers/StateContext.tsx";
import { CurrentDateDisplay } from "./CurrentDateDisplay.tsx";
import { PrevNext } from "./PrevNext.tsx";
import { Today } from "./Today.tsx";
import { ViewModeSelector } from "./ViewModeSelector.tsx";

type Props = {
  calendarControls?: boolean;
};

export const AppHeader = ({ calendarControls = false }: Props) => {
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
      </Box>
    </Box>
  );
};
