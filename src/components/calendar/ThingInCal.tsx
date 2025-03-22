import { Thing } from "../../types/types.ts";
import { Chip } from "@mui/material";

export const ThingInCal = ({ thing }: { thing: Thing }) => (
  <Chip label={thing.name} />
);
