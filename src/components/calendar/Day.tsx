import { EventChip } from "./EventChip.tsx";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { AppContext } from "../../state/AppContext.tsx";
import { useContext } from "react";
import { eventsOnDate, getThingForEvent } from "../../utils.ts";

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

export const Day = ({
  year,
  month,
  day,
}: {
  year: number;
  month: number;
  day: number;
}) => {
  const ctx = useContext(AppContext);
  const { events, things, viewMode } = ctx;
  const eventsThisDate = eventsOnDate(events, year, month, day);

  return (
    <DayContainer
      className={`${eventsThisDate.length > 0 ? "" : "empty"} view-mode-${viewMode}`}
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
        {eventsThisDate.map(
          (event) =>
            getThingForEvent(event, things)?.visible && (
              <EventChip key={event.uuid} event={event} />
            ),
        )}
      </ThingsContainer>
    </DayContainer>
  );
};
