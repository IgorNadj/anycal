import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";

export const Header = () => {
  const ctx = useContext(AppContext);
  const { setViewMode } = ctx;

  return (
    <>
      <ToggleButtonGroup
        value={ctx.viewMode}
        exclusive
        onChange={(_e, nextViewMode) => setViewMode(nextViewMode)}
      >
        <ToggleButton value="compact">Compact</ToggleButton>
        <ToggleButton value="expanded">Expanded</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
