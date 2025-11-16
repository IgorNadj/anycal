import { Box, Typography } from "@mui/material";
import { MONTH_LABELS_FULL } from "../../utils/date.ts";
import { PrevNext } from "../header/PrevNext.tsx";

type Props = {
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
};

export const Header = ({ currentDate, setCurrentDate }: Props) => {
  const currentMonthIndex = currentDate.getMonth();
  const currentMonthLabel = MONTH_LABELS_FULL[currentMonthIndex];

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Box sx={{ flex: 1, paddingLeft: 1.5 }}>
        <Typography variant="body1">
          {currentMonthLabel + " " + currentDate.getFullYear()}{" "}
        </Typography>
      </Box>
      <Box>
        <PrevNext
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
          viewMode="month"
          size="small"
        />
      </Box>
    </Box>
  );
};
