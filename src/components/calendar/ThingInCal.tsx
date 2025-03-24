import { Thing } from "../../types/types.ts";
import { Chip } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";

export const ThingInCal = ({ thing }: { thing: Thing }) => {
  const ctx = useContext(AppContext);
  const { setCurrentlyEditingThing } = ctx;

  return (
    <Chip label={thing.name} onClick={() => setCurrentlyEditingThing(thing)} />
  );
};
