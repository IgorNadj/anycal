import { Typography } from "@mui/material";
import { useMemo } from "react";
import type { CalendarEvent } from "../../types.ts";
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

const eventsByDay = (events: CalendarEvent[]) => {
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
  events: CalendarEvent[];
  currentDate: Date;
};

export const MonthView = ({ events, currentDate }: Props) => {
  const { start, end } = useMemo(() => getMonthGridRange(currentDate), [currentDate]);
  const days = useMemo(() => eachDayOfInterval(start, end), [start, end]);
  const getEvents = useMemo(() => eventsByDay(events), [events]);

  const today = useMemo(() => {
    const n = new Date();
    n.setHours(0, 0, 0, 0);
    return n;
  }, []);

  const activeMonth = currentDate.getMonth();

  return (
    <div style={{ display: "grid", gridTemplateRows: "auto 1fr", rowGap: 8 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
          gap: 1,
          border: "1px solid #ddd",
          backgroundColor: "#ddd",
        }}
      >
        {/* Day of week header */}
        {WEEKDAY_LABELS.map((lbl) => (
          <Typography
            key={lbl}
            variant="body2"
            sx={{
              textAlign: "center",
              py: 0.5,
              backgroundColor: "#fff",
            }}
          >
            {lbl}
          </Typography>
        ))}

        {/* Days grid */}
        {days.map((day) => {
          const outOfMonth = day.getMonth() !== activeMonth;
          const isToday = isSameDay(day, today);
          const dayEvents = getEvents(day);

          return (
            <div
              key={day.toISOString()}
              style={{
                padding: 6,
                minHeight: 90,
                cursor: "pointer",
                backgroundColor: outOfMonth ? "#f7f7f7" : "#fff",
                display: "flex",
                flexDirection: "column",
                gap: 4,
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <div style={{ textAlign: "center", marginBottom: 4 }}>
                <Typography
                  variant="body2"
                  sx={{ color: isToday ? "primary.main" : "inherit" }}
                >
                  {day.getDate()}
                </Typography>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 4,
                  minWidth: 0,
                  overflow: "hidden",
                }}
              >
                {dayEvents.map((ev) => (
                  <EventChip key={ev.uuid} event={ev} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
