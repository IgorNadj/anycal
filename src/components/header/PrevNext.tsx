import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import type { ViewMode } from "../../types.ts";

type Props = {
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  viewMode: ViewMode;
  size?: "small" | "medium";
};

export const PrevNext = ({
  currentDate,
  setCurrentDate,
  viewMode,
  size = "medium",
}: Props) => {
  const onPrev = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    }
  };

  const onNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <IconButton size={size}>
        <ChevronLeft onClick={onPrev} fontSize={size} />
      </IconButton>
      <IconButton size={size}>
        <ChevronRight onClick={onNext} fontSize={size} />
      </IconButton>
    </Box>
  );
};
