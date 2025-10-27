import { Typography } from "@mui/material";
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

  return <Typography variant="h5">{textContent}</Typography>;
};
