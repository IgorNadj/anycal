import { CALENDAR_COLOURS } from "../../constants.ts";
import type { CalendarColour } from "../../types.ts";

export const Dot = ({ colour }: { colour: CalendarColour }) => {
  return (
    <div
      style={{
        borderRadius: 5,
        width: 5,
        height: 5,
        backgroundColor: CALENDAR_COLOURS[colour],
      }}
    />
  );
};
