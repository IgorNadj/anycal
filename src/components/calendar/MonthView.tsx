import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMemo } from "react";
import type { CalendarEvent, EventsWithSpecificDate } from "../../types.ts";
import { EventChip } from "./EventChip.tsx";

const WEEKDAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const startOfWeekSunday = (d: Date) => {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0=Sun
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
};

const endOfWeekSaturday = (d: Date) => {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay();
  date.setDate(date.getDate() + (6 - day));
  date.setHours(23, 59, 59, 999);
  return date;
};

const getMonthGridRange = (anchor: Date) => {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const lastOfMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const start = startOfWeekSunday(firstOfMonth);
  const end = endOfWeekSaturday(lastOfMonth);
  return { start, end };
};

const eachDayOfInterval = (start: Date, end: Date) => {
  const days: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

const eventsByDay = (events: EventsWithSpecificDate[]) => {
  // Bucket events by YYYY-MM-DD for fast lookup
  const map = new Map<string, CalendarEvent[]>();
  for (const ev of events) {
    const key = `${ev.date.getFullYear()}-${ev.date.getMonth()}-${ev.date.getDate()}`;
    const arr = map.get(key) ?? [];
    arr.push(ev);
    map.set(key, arr);
  }
  return (d: Date) => map.get(`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`) ?? [];
};

type Props = {
  events: EventsWithSpecificDate[];
  currentDate: Date;
};

export const MonthView = ({ events, currentDate }: Props) => {
  const { start, end } = useMemo(() => getMonthGridRange(currentDate), [currentDate]);
  const days = useMemo(() => eachDayOfInterval(start, end), [start, end]);
  const weeks = useMemo(() => Math.ceil(days.length / 7), [days]);
  const getEvents = useMemo(() => eventsByDay(events), [events]);

  const today = useMemo(() => {
    const n = new Date();
    n.setHours(0, 0, 0, 0);
    return n;
  }, []);

  // const activeMonth = currentDate.getMonth();

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
        {WEEKDAY_LABELS.map((lbl) => (
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
          gridTemplateRows: `repeat(${weeks}, 1fr)`,
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
                    backgroundColor: isToday ? "secondary.main" : "inherit",
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
