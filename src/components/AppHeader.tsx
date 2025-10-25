import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import type { ViewMode } from "../types.ts";

type Props = {
  viewMode: ViewMode;
  onChange: (newViewMode: ViewMode) => void;
};

export const AppHeader = ({ viewMode, onChange }: Props) => {
  return (
    <>
      <ToggleButtonGroup
        value={viewMode}
        exclusive
        onChange={(_e, nextViewMode) => onChange(nextViewMode)}
      >
        <ToggleButton value="month">Month</ToggleButton>
        <ToggleButton value="agenda">Agenda</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
