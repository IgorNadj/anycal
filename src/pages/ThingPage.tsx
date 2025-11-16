import { Box } from "@mui/material";
import { useParams } from "react-router";
import { useThings } from "../hooks/useThings.ts";
import { Content } from "./thing/Content.tsx";

export const ThingPage = () => {
  const { thingUuid } = useParams();
  const { data: allThings } = useThings();
  const thing = thingUuid ? allThings.find((t) => t.uuid === thingUuid) : null;

  return (
    <Box>
      {thing && <Content key={thing.uuid} thing={thing} />}
      {!thing && <>Error: Thing not found</>}
    </Box>
  );
};
