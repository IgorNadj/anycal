import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import type { ViewMode } from "../../types.ts";

type Props = {
  currentDate: Date;
  setCurrentDate: (newDate: Date) => void;
  viewMode: ViewMode;
};

export const PrevNext = ({ currentDate, setCurrentDate, viewMode }: Props) => {
  const onPrev = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
    }
  };

  const onNext = () => {
    if (viewMode === "month") {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
    }
  };

  return (
    <>
      <IconButton>
        <ChevronLeft onClick={onPrev} />
      </IconButton>
      <IconButton>
        <ChevronRight onClick={onNext} />
      </IconButton>
    </>
  );
};
