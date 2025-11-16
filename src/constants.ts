import type { ViewMode } from "./types.ts";

export const CALENDAR_COLOURS = {
  blue_400: "#42a5f5",
  green_400: "#66bb6a",
  orange_400: "#ffa726",
  red_400: "#ef5350",
  cyan_400: "#26c6da",
  deepOrange_400: "#ff7043",
  brown_400: "#8d6e63",
  blueGrey_400: "#78909c",
  teal_400: "#26a69a",
  lightGreen_400: "#9ccc65",
  amber_400: "#ffca28",
  lightBlue_400: "#29b6f6",
  lime_400: "#d4e157",
  deepOrange_500: "#ff5722",
  purple_400: "#ab47bc",
  deepPurple_400: "#7e57c2",
};

export const DEFAULT_VIEW_MODE: ViewMode = "month";

export const MONTH_NAMES_SHORT: Record<number, string> = {
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

export const SIDEBAR_WIDTH = 250;
export const CAL_HEADER_HEIGHT = 70;

export const TODAY_BG_COLOUR = "#eccdff";
export const TODAY_TEXT_COLOUR = "#171717";
