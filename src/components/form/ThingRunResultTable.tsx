import {
  Box,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { format } from "date-fns";
import type {
  CalendarEvent,
  NormalEvent,
  SubjectToChangeEvent,
  Thing,
  UnknownDateEvent,
  VagueDateEvent,
} from "../../types.ts";

type Props = {
  thing: Thing;
  events: CalendarEvent[];
};

const trNormalEvent = (event: NormalEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{format(event.date, "dd MMM yyyy")}</TableCell>
    <TableCell></TableCell>
  </>
);

const trSubjectToChangeEvent = (event: SubjectToChangeEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{format(event.date, "dd MMM yyyy")}</TableCell>
    <TableCell>
      <Chip label="Subject to change" />
      <>{event.reason}</>
    </TableCell>
  </>
);

const trVagueDateEvent = (event: VagueDateEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{event.vagueDate}</TableCell>
    <TableCell>
      <Chip label="Vague date" />
      <>{event.reason}</>
    </TableCell>
  </>
);

const trUnknownDateEvent = (event: UnknownDateEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell></TableCell>
    <TableCell>
      <Chip label="Unknown date" />
      <>{event.reason}</>
    </TableCell>
  </>
);

export const ThingRunResultTable = ({ thing, events }: Props) => {
  const { reasonForNoResults, reasonForFailureToGenerateName } = thing;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        {reasonForNoResults && <>reasonForNoResults: {reasonForNoResults}</>}
        {reasonForFailureToGenerateName && (
          <>reasonForFailureToGenerateName: {reasonForFailureToGenerateName}</>
        )}
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>When</TableCell>
              <TableCell>...</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  {reasonForNoResults ? reasonForNoResults : "No results"}
                </TableCell>
              </TableRow>
            )}
            {events.length > 0 &&
              events.map((event) => (
                <TableRow key={event.uuid}>
                  {event.type === "NormalEvent" && trNormalEvent(event)}
                  {event.type === "SubjectToChangeEvent" && trSubjectToChangeEvent(event)}
                  {event.type === "VagueDateEvent" && trVagueDateEvent(event)}
                  {event.type === "UnknownDateEvent" && trUnknownDateEvent(event)}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
