import { EventChip } from "./EventChip.tsx";
import { Typography } from "@mui/material";
import styled from "styled-components";
import { AppContext } from "../../state/AppContext.tsx";
import { useContext } from "react";
import { eventsOnDate, getCalendarForEvent } from "../../utils.ts";
import { useEvents } from "../../data/useEvents.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useCalendars } from "../../data/useCalendars.ts";

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

const CalendarEventContainer = styled.div`
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
  const { viewMode } = ctx;

  const user = useUser();
  const { data: events } = useEvents(user);
  const { data: calendars } = useCalendars(user);

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
      <CalendarEventContainer>
        {eventsThisDate.map(
          (event) =>
            getCalendarForEvent(event, calendars)?.visible && (
              <EventChip key={event.uuid} event={event} />
            ),
        )}
      </CalendarEventContainer>
    </DayContainer>
  );
};
