import { Thing } from "./types/types";
import { enGB, enUS, Locale } from "date-fns/locale";

const LOCALES: Record<string, Locale> = {
  "en-GB": enGB,
  "en-US": enUS,
};

export const thingsInYear = (things: Thing[], year: number) => {
  return things.filter((thing) => thing.date.getFullYear() === year);
};

export const thingsInMonth = (things: Thing[], month: number) => {
  return things.filter((thing) => thing.date.getMonth() === month);
};

export const thingsInDay = (things: Thing[], day: number) => {
  return things.filter((thing) => thing.date.getDate() === day + 1);
};

export const daysInMonth = (month: number, year: number) =>
  new Date(year, month, 0).getDate();

export const getUserLocale = (): Locale => {
  const [localeStr] = navigator.languages;
  return LOCALES[localeStr] ?? enGB;
};
