import { Box, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import { useMemo } from "react";
import type { EventsWithSpecificDate } from "../../types.ts";
import { EventChip } from "./EventChip.tsx";

type Props = {
  events: EventsWithSpecificDate[];
  currentDate?: Date;
};

export const AgendaView = ({ events }: Props) => {
  const sorted = useMemo(() => {
    return [...events].sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [events]);

  const yearRange = useMemo(() => {
    if (sorted.length === 0) return null;
    const start = sorted[0].date.getFullYear();
    const end = sorted[sorted.length - 1].date.getFullYear();
    const yrs: number[] = [];
    for (let y = start; y <= end; y++) yrs.push(y);
    return { start, end, years: yrs };
  }, [sorted]);

  const eventsByYear = useMemo(() => {
    const map = new Map<number, EventsWithSpecificDate[]>();
    for (const ev of sorted) {
      const y = ev.date.getFullYear();
      const arr = map.get(y) ?? [];
      arr.push(ev);
      map.set(y, arr);
    }
    return map;
  }, [sorted]);

  if (!yearRange) {
    return (
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fff",
          borderRadius: 2,
          border: "1px solid #ddd",
        }}
      >
        <Typography variant="body1" color="text.secondary">
          No events yet
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: "100%",
        minHeight: 0,
        overflow: "hidden",
        borderRadius: 2,
        border: "1px solid #ddd",
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ overflowY: "auto", flex: 1 }}>
        {/* Years stacked vertically */}
        {yearRange.years.map((year, idx) => {
          const list = eventsByYear.get(year) ?? [];
          return (
            <Box key={year} sx={{ display: "flex" }}>
              {/* Left year column */}
              <Box
                sx={{
                  width: 84,
                  flexShrink: 0,
                  borderRight: "1px solid #eee",
                  paddingX: 1,
                  paddingTop: 2,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    position: "sticky",
                    top: 0,
                    backgroundColor: "#fff",
                  }}
                >
                  {year}
                </Typography>
              </Box>

              {/* Right events column */}
              <Box sx={{ flex: 1, minWidth: 0, paddingX: 1, paddingTop: 1 }}>
                {list.length === 0 ? (
                  <Typography variant="body2" color="text.disabled" sx={{ paddingY: 1 }}>
                    No events this year
                  </Typography>
                ) : (
                  list.map((ev) => (
                    <Box
                      key={ev.uuid}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        paddingY: 0.5,
                      }}
                    >
                      {/* Date label */}
                      <Box sx={{ width: 72, flexShrink: 0 }}>
                        <Typography variant="body2" color="text.secondary">
                          {format(ev.date, "d MMM")}
                        </Typography>
                      </Box>
                      {/* Event chip takes remaining space */}
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <EventChip event={ev} />
                      </Box>
                    </Box>
                  ))
                )}
                {idx < yearRange.years.length - 1 && <Divider sx={{ marginTop: 1 }} />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
