import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import { CalendarContext } from "./state/CalendarContext.tsx";

export const Header = () => {
  const ctx = useContext(CalendarContext);
  const { setViewMode } = ctx;

  return (
    <>
      <ToggleButtonGroup
        value={ctx.viewMode}
        exclusive
        onChange={(e, nextViewMode) => setViewMode(nextViewMode)}
      >
        <ToggleButton value="compact">Compact</ToggleButton>
        <ToggleButton value="expanded">Expanded</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
