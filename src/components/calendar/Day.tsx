import { Thing } from "../../types/types.ts";
import { ThingInCal } from "./ThingInCal.tsx";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { CalendarContext } from "../../state/CalendarContext.tsx";
import { useContext } from "react";

const DayContainer = styled.div`
  outline: 1px solid gray;
  display: flex;
  align-items: flex-start;

  &.view-mode-compact.empty {
    display: none;
  }
`;

const DayTitleContainer = styled.h6`
  width: 5em;
  margin: 0.2em;
`;

const ThingsContainer = styled.div`
  outline: 1px solid red;
  flex: 1;
`;

export const Day = ({ day, things }: { day: number; things: Thing[] }) => {
  const ctx = useContext(CalendarContext);

  return (
    <DayContainer
      className={`${things.length > 0 ? "" : "empty"} view-mode-${ctx.viewMode}`}
    >
      <DayTitleContainer>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 0 } }}
        >
          {day + 1}
        </Typography>
      </DayTitleContainer>
      <ThingsContainer>
        {things.map((thing) => (
          <ThingInCal key={thing.uuid} thing={thing} />
        ))}
      </ThingsContainer>
    </DayContainer>
  );
};
