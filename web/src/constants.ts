import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  lightBlue,
  lightGreen,
  lime,
  orange,
  purple,
  red,
  teal,
} from "@mui/material/colors";
import { ViewMode } from "./types/types.ts";

export const DEFAULT_VIEW_MODE: ViewMode = "compact";

export const CALENDAR_COLOURS: Record<string, string> = {
  blue_400: blue[400],
  green_400: green[400],
  orange_400: orange[400],
  red_400: red[400],
  purple_400: purple[400],
  cyan_400: cyan[400],
  teal_400: teal[400],
  deepOrange_400: deepOrange[400],
  brown_400: brown[400],
  blueGrey_400: blueGrey[400],
  lightGreen_400: lightGreen[400],
  amber_400: amber[400],
  lightBlue_400: lightBlue[400],
  lime_400: lime[400],
  deepOrange_500: deepOrange[500],
  deepPurple_400: deepPurple[400],
};
