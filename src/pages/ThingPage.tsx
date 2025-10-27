import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { ThingForm } from "../components/form/ThingForm.tsx";
import { useThings } from "../hooks/useThings.ts";

export const ThingPage = () => {
  const { thingUuid } = useParams();
  const { data: allThings } = useThings();
  const thing = thingUuid ? allThings.find((t) => t.uuid === thingUuid) : null;

  if (!thingUuid || !thing) {
    return <div>Error: Thing not found</div>;
  }

  return (
    <Box>
      <Typography variant="h3">{thing.name}</Typography>
      <ThingForm initialThing={thing} key={thing.uuid} />
    </Box>
  );
};
