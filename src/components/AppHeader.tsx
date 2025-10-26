import { Box } from "@mui/material";
import type { ViewMode } from "../types.ts";
import { AuthAvatar } from "./auth/AuthAvatar.tsx";
import { CurrentDateDisplay } from "./header/CurrentDateDisplay.tsx";
import { PrevNext } from "./header/PrevNext.tsx";
import { Today } from "./header/Today.tsx";
import { ViewModeSelector } from "./header/ViewModeSelector.tsx";

type Props = {
  viewMode: ViewMode;
  setViewMode: (newViewMode: ViewMode) => void;
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
};

export const AppHeader = ({
  viewMode,
  setViewMode,
  currentDate,
  setCurrentDate,
}: Props) => {
  return (
    <Box
      sx={{
        height: "70px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1,
      }}
    >
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", gap: 1 }}>
        <Today setCurrentDate={setCurrentDate} />
        <PrevNext
          viewMode={viewMode}
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <CurrentDateDisplay currentDate={currentDate} viewMode={viewMode} />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <ViewModeSelector viewMode={viewMode} setViewMode={setViewMode} />
        <AuthAvatar />
      </Box>
    </Box>
  );
};
