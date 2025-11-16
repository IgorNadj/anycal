import type { CalendarEvent, EventsWithSpecificDate } from "../types.ts";

export const WEEKDAY_LABELS_3_LETTER = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
] as const;
export const WEEKDAY_LABELS_1_LETTER = ["S", "M", "T", "W", "T", "F", "S"] as const;

export const MONTH_LABELS_FULL = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const startOfWeekSunday = (d: Date) => {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay(); // 0=Sun
  date.setDate(date.getDate() - day);
  date.setHours(0, 0, 0, 0);
  return date;
};

export const endOfWeekSaturday = (d: Date) => {
  const date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  const day = date.getDay();
  date.setDate(date.getDate() + (6 - day));
  date.setHours(23, 59, 59, 999);
  return date;
};

export const getMonthGridRange = (anchor: Date) => {
  const firstOfMonth = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const lastOfMonth = new Date(anchor.getFullYear(), anchor.getMonth() + 1, 0);
  const start = startOfWeekSunday(firstOfMonth);
  const end = endOfWeekSaturday(lastOfMonth);
  return { start, end };
};

export const eachDayOfInterval = (start: Date, end: Date) => {
  const days: Date[] = [];
  const cur = new Date(start);
  while (cur <= end) {
    days.push(new Date(cur));
    cur.setDate(cur.getDate() + 1);
  }
  return days;
};

export const getEventsByDayMapper = (events: EventsWithSpecificDate[]) => {
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

export const getToday = () => {
  const n = new Date();
  n.setHours(0, 0, 0, 0);
  return n;
};

export const getMonthGrid = (anchor: Date) => {
  const { start, end } = getMonthGridRange(anchor);
  const days = eachDayOfInterval(start, end);
  const numWeeks = Math.ceil(days.length / 7);
  return { start, end, days, numWeeks };
};
