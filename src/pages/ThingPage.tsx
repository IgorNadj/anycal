import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { CALENDAR_COLOURS } from "../constants.ts";
import { useEvents } from "../hooks/useEvents.ts";
import { useThings } from "../hooks/useThings.ts";
import { getEventsForThing } from "../utils.ts";
import { Content } from "./thing/Content.tsx";
import { Examples } from "./thing/Examples.tsx";
import { ProblemResults } from "./thing/ProblemResults.tsx";
import { GoodResults } from "./thing/GoodResults.tsx";

export const ThingPage = () => {
  const { thingUuid } = useParams();
  const { data: allThings } = useThings();
  const thing = thingUuid ? allThings.find((t) => t.uuid === thingUuid) : null;

  const { data: allEvents } = useEvents();
  const events = thing ? getEventsForThing(thing, allEvents) : [];
  const hasEvents = events.length > 0;

  const goodEvents = events.filter(
    (e) => e.type === "NormalEvent" || e.type === "SubjectToChangeEvent",
  );
  const problemEvents = events.filter(
    (e) => e.type === "UnknownDateEvent" || e.type === "VagueDateEvent",
  );

  if (!thing) {
    return <>Error: Thing not found</>;
  }

  return (
    <Box sx={{ display: "flex", backgroundColor: "#cae2f8", height: "100%" }}>
      {/* Middle Col: Thing */}
      <Box sx={{ flex: 0.5, backgroundColor: "rgba(255,255,255,0.3)" }}>
        {/* header */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: 3,
          }}
        >
          <Typography variant="h2" sx={{ color: CALENDAR_COLOURS[thing.colour] }}>
            {thing.niceName || thing.name || "New Thing"}
          </Typography>
        </Box>

        {/* thing form */}
        <Box sx={{ padding: 3 }}>
          <Content key={thing.uuid} thing={thing} />
        </Box>
      </Box>

      {/* Right Col: Results */}
      <Box sx={{ flex: 1 }}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            backgroundColor: "#bcd7f3",
            borderRadius: 2,
            border: "1px solid #ddd",
            padding: 3,
          }}
        >
          {problemEvents.length > 0 && (
            <ProblemResults thing={thing} events={problemEvents} />
          )}
          {goodEvents.length > 0 && <GoodResults events={goodEvents} />}
          {!hasEvents && problemEvents.length === 0 && <Examples />}
        </Box>
      </Box>
    </Box>
  );
};
