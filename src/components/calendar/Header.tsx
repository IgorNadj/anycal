import { Button } from "@mui/material";
import { useContext } from "react";
import { CalendarContext } from "./state/CalendarContext.tsx";

export const Header = () => {
  const ctx = useContext(CalendarContext);
  return (
    <>
      <Button
        variant={ctx.viewMode === "compact" ? "outlined" : "contained"}
        onClick={() => ctx.setViewMode("compact")}
      >
        Compact
      </Button>
      <Button
        variant={ctx.viewMode === "expanded" ? "outlined" : "contained"}
        onClick={() => ctx.setViewMode("expanded")}
      >
        Expanded
      </Button>
    </>
  );
};
