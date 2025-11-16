import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMemo } from "react";
import { TODAY_COLOUR } from "../../constants.ts";
import type { EventsWithSpecificDate } from "../../types.ts";
import {
  getEventsByDayMapper,
  WEEKDAY_LABELS_3_LETTER,
  isSameDay,
  getToday,
  getMonthGrid,
} from "../../utils/date.ts";
import { EventChip } from "./EventChip.tsx";

type Props = {
  events: EventsWithSpecificDate[];
  currentDate: Date;
};

export const MonthView = ({ events, currentDate }: Props) => {
  const { days, numWeeks } = useMemo(() => getMonthGrid(currentDate), [currentDate]);
  const getEvents = useMemo(() => getEventsByDayMapper(events), [events]);
  const today = getToday();

  return (
    <Box
      style={{
        height: "100%",
        minHeight: 0,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Weekday header row */}
      <div
        style={{
          height: 17,
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
        }}
      >
        {WEEKDAY_LABELS_3_LETTER.map((lbl) => (
          <Box
            key={lbl}
            sx={{
              borderLeft: lbl === "Sun" ? "none" : "1px solid #ddd",
              height: "100%",
            }}
          >
            <Typography
              key={lbl}
              variant="body2"
              padding={0}
              paddingTop={1}
              sx={{
                textAlign: "center",
                textTransform: "uppercase",
                fontSize: "10px",
              }}
            >
              {lbl}
            </Typography>
          </Box>
        ))}
      </div>

      {/* Days grid */}
      <div
        style={{
          flex: 1,
          minHeight: 0,
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gridTemplateRows: `repeat(${numWeeks}, 1fr)`,
        }}
      >
        {days.map((day, idx) => {
          // const outOfMonth = day.getMonth() !== activeMonth;
          const isToday = isSameDay(day, today);
          const isLeftmostColumn = idx % 7 === 0;
          const dayEvents = getEvents(day);

          return (
            <Box
              key={day.toISOString()}
              padding={0}
              sx={{
                height: "100%",
                minWidth: 0,
                overflow: "hidden",
                borderTop: idx >= 7 ? "1px solid #ddd" : "none",
                borderLeft: isLeftmostColumn ? "none" : "1px solid #ddd",
              }}
            >
              {/* Day label */}
              <Box
                paddingTop={0.5}
                sx={{ display: "flex", justifyContent: "center", flexDirection: "row" }}
              >
                {/* Day number */}
                <Box
                  sx={{
                    width: "1.4rem",
                    height: "1.4rem",
                    borderRadius: 100,
                    backgroundColor: isToday ? TODAY_COLOUR : "inherit",
                    color: isToday ? "white" : "inherit",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography textAlign="center" sx={{ flex: 1 }} variant="body2">
                    {day.getDate()}
                  </Typography>
                </Box>

                {/* 1st of Month */}
                {day.getDate() === 1 && (
                  <Box
                    paddingLeft={isToday ? 0.2 : 0}
                    paddingRight={0.9}
                    sx={{
                      width: "1.4rem",
                      height: "1.4rem",
                      borderRadius: 100,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2">{format(day, "MMM")}</Typography>
                  </Box>
                )}
              </Box>

              {/* Event Chips */}
              <Box
                paddingTop={0.5}
                paddingBottom={0.5}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 0,
                  overflow: "hidden",
                  justifyContent: "flex-start",
                }}
              >
                {dayEvents.map((ev) => (
                  <EventChip key={ev.uuid} event={ev} />
                ))}
              </Box>
            </Box>
          );
        })}
      </div>
    </Box>
  );
};
