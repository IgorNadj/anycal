import { Box, IconButton, lighten, type Theme, Typography } from "@mui/material";
import { useContext, useMemo, useState } from "react";
import { TODAY_BG_COLOUR, TODAY_TEXT_COLOUR } from "../../constants.ts";
import { useThings } from "../../hooks/useThings.ts";
import { StateContext } from "../../providers/StateContext.tsx";
import type { EventsWithSpecificDate } from "../../types.ts";
import { getThingForEvent } from "../../utils.ts";
import {
  getEventsByDayMapper,
  getMonthGrid,
  getToday,
  isSameDay,
  WEEKDAY_LABELS_1_LETTER,
} from "../../utils/date.ts";
import { Dot } from "./Dot.tsx";
import { Header } from "./Header.tsx";

type Props = {
  events: EventsWithSpecificDate[];
  currentDate: Date;
};

export const MiniCalendar = ({ events }: Props) => {
  const { setCurrentDate } = useContext(StateContext);

  const [miniCurrentDate, setMiniCurrentDate] = useState(new Date());

  const { data: allThings } = useThings();

  const { days } = useMemo(() => getMonthGrid(miniCurrentDate), [miniCurrentDate]);
  const getEventsByDay = useMemo(() => getEventsByDayMapper(events), [events]);
  const today = getToday();

  const HEIGHT = 200;
  const HEADER_HEIGHT = 35;

  const onDayClicked = (day: Date) => {
    setCurrentDate(day);
    setMiniCurrentDate(day);
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: HEIGHT,
      }}
    >
      <Box sx={{ height: HEADER_HEIGHT }}>
        <Header currentDate={miniCurrentDate} setCurrentDate={setMiniCurrentDate} />
      </Box>
      <Box sx={{ height: HEIGHT - HEADER_HEIGHT }}>
        {/* Grid */}
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: "grid",
            gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
            gridTemplateRows: `repeat(7, 1fr)`, // 1 header row + 6 weeks rows
            height: HEIGHT - HEADER_HEIGHT,
          }}
        >
          {/* Weekday header row */}
          {WEEKDAY_LABELS_1_LETTER.map((lbl, index) => (
            <Box
              key={index}
              sx={{
                height: "100%",
              }}
            >
              <Typography
                key={lbl}
                variant="body2"
                padding={0}
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

          {/* Days */}
          {days.map((day) => {
            // const outOfMonth = day.getMonth() !== activeMonth;
            const isToday = isSameDay(day, today);
            const isSelected = isSameDay(day, miniCurrentDate);
            const dayEvents = getEventsByDay(day);

            const getDayCssExtra = (theme: Theme) => {
              if (isToday) {
                return {
                  backgroundColor: TODAY_BG_COLOUR,
                  color: TODAY_TEXT_COLOUR,
                  "&:hover": {
                    backgroundColor: lighten(TODAY_BG_COLOUR, 0.2),
                  },
                };
              }
              if (isSelected) {
                return {
                  backgroundColor: lighten(theme.palette.secondary.main, 0.6),
                  color: "#333",
                  "&:hover": {
                    backgroundColor: lighten(theme.palette.secondary.main, 0.8),
                  },
                };
              }
              return {};
            };

            return (
              <Box
                key={day.toISOString()}
                padding={0}
                sx={{
                  height: "100%",
                  minWidth: 0,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  position: "relative",
                }}
              >
                {/* Day label */}
                <Box sx={{ flex: 1 }}>
                  {/* Day number */}
                  <IconButton
                    disableTouchRipple={true}
                    sx={(theme) => ({
                      width: "1.4rem",
                      height: "1.4rem",
                      borderRadius: 100,
                      display: "flex",
                      alignItems: "center",
                      color: "#333",
                      ...getDayCssExtra(theme),
                    })}
                    onClick={() => onDayClicked(day)}
                  >
                    <Typography
                      textAlign="center"
                      sx={{ flex: 1, fontSize: 10 }}
                      variant="body2"
                    >
                      {day.getDate()}
                    </Typography>
                  </IconButton>
                </Box>

                {/* Dots */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {dayEvents.map((ev) => {
                      const thing = getThingForEvent(ev, allThings);
                      if (!thing) return null;
                      return <Dot key={ev.uuid} colour={thing.colour} />;
                    })}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </div>
      </Box>
    </Box>
  );
};
