import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import type { ViewMode } from "../../types.ts";

type Props = {
  currentDate: Date;
  viewMode: ViewMode;
};

export const CurrentDateDisplay = ({ currentDate, viewMode }: Props) => {
  let textContent = currentDate.toLocaleDateString();

  if (viewMode === "month") {
    textContent = format(currentDate, "MMMM yyyy");
  }

  return (
    <Box>
      {/*Desktop*/}
      <Box sx={{ display: { xs: "none", sm: "block" } }}>
        <Typography variant="h5">{textContent}</Typography>
      </Box>
      {/*Mobile*/}
      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <Typography variant="body2">{textContent}</Typography>
      </Box>
    </Box>
  );
};
