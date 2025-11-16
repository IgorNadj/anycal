import type { ViewMode } from "./types.ts";

export const CALENDAR_COLOURS = {
  purple_400: "#ab47bc",
  orange_400: "#ffa726",
  green_400: "#66bb6a",
  red_400: "#ef5350",
  blue_400: "#42a5f5",
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
export const HEADER_HEIGHT = 70;

export const TODAY_COLOUR = "#a100ff";
