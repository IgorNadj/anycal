export type ViewMode = "compact" | "expanded";

import { CALENDAR_COLOURS } from "./constants.ts";

export type Auth =
  | {
      isLoggedIn: true;
      userUuid: string;
    }
  | {
      isLoggedIn: false;
      guestUuid: string;
    };

export type User = {
  uuid: string;
  email: string | null;
};

export type Calendar = {
  uuid: string;
  name: string;
  colour: CalendarColour;
  visible: boolean;
  userUuid: string;
};

export type CalendarEvent = {
  uuid: string;
  name: string;
  date: Date;
  calendarUuid: string;
};

export type Suggestion = {
  title: string;
  date: Date;
};

export type CalendarColour = keyof typeof CALENDAR_COLOURS;
