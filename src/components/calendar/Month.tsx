import styled from "styled-components";
import { Typography } from "@mui/material";
import { daysInMonth } from "../../utils.ts";
import { Day } from "./Day.tsx";

const MonthContainer = styled.div`
  outline: 1px solid gray;
  display: flex;
  align-items: flex-start;
`;

const MonthTitleContainer = styled.h6`
  width: 5em;
  margin: 0.2em;
`;

const DayContainer = styled.div`
  outline: 1px solid red;
  flex: 1;
`;

const MONTH_NAMES: Record<number, string> = {
  0: "Jan",
  1: "Feb",
  2: "Mar",
  3: "Apr",
  4: "May",
  5: "Jun",
  6: "Jul",
  7: "Aug",
  8: "Sep",
  9: "Oct",
  10: "Nov",
  11: "Dec",
};

export const Month = ({ year, month }: { year: number; month: number }) => {
  const days = [];

  for (let day = 0; day < daysInMonth(month, year); day++) {
    days.push(day);
  }

  return (
    <MonthContainer>
      <MonthTitleContainer>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 0 } }}
        >
          {MONTH_NAMES[month]}
        </Typography>
      </MonthTitleContainer>

      <DayContainer>
        {days.map((day) => (
          <Day key={day} year={year} month={month} day={day} />
        ))}
      </DayContainer>
    </MonthContainer>
  );
};
