import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { ViewMode } from "../../types.ts";

type Props = {
  viewMode: ViewMode;
  setViewMode: (newViewMode: ViewMode) => void;
};

export const ViewModeSelector = ({ viewMode, setViewMode }: Props) => {
  return (
    <ToggleButtonGroup
      value={viewMode}
      exclusive
      onChange={(_e, nextViewMode) => setViewMode(nextViewMode)}
    >
      <ToggleButton value="month">Month</ToggleButton>
      <ToggleButton value="agenda">Agenda</ToggleButton>
    </ToggleButtonGroup>
  );
};
