import { Box } from "@mui/material";
import { useParams } from "react-router";
import { ThingForm } from "../components/form/ThingForm.tsx";
import { HEADER_HEIGHT } from "../constants.ts";
import { useThings } from "../hooks/useThings.ts";

export const ThingPage = () => {
  let params = useParams();
  const thingUuid = params.uuid;
  const { data: things } = useThings();

  if (!thingUuid) {
    return <div>Thing not found</div>;
  }

  const thing = things.find((t) => t.uuid === thingUuid);
  if (!thing) {
    return <div>Thing not found</div>;
  }

  return (
    <Box>
      <Box
        sx={{
          height: HEADER_HEIGHT,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
        }}
      />
      <ThingForm initialThing={thing} key={thing.uuid} />
    </Box>
  );
};
