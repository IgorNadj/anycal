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
  ThingRun_NormalEvent,
  ThingRun_Resp,
  ThingRun_SubjectToChangeEvent,
  ThingRun_UnknownDateEvent,
  ThingRun_VagueDateEvent,
} from "../../types.ts";

type Props = {
  resp: ThingRun_Resp;
};

const trNormalEvent = (event: ThingRun_NormalEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{event.description}</TableCell>
    <TableCell>{format(event.date, "dd MMM yyyy")}</TableCell>
    <TableCell></TableCell>
  </>
);

const trSubjectToChangeEvent = (event: ThingRun_SubjectToChangeEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{event.description}</TableCell>
    <TableCell>{format(event.date, "dd MMM yyyy")}</TableCell>
    <TableCell>
      <Chip label="Subject to change" />
      <>{event.reason}</>
    </TableCell>
  </>
);

const trVagueDateEvent = (event: ThingRun_VagueDateEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{event.description}</TableCell>
    <TableCell>{event.vagueDate}</TableCell>
    <TableCell>
      <Chip label="Vague date" />
      <>{event.reason}</>
    </TableCell>
  </>
);

const trUnknownDateEvent = (event: ThingRun_UnknownDateEvent) => (
  <>
    <TableCell>{event.name}</TableCell>
    <TableCell>{event.description}</TableCell>
    <TableCell></TableCell>
    <TableCell>
      <Chip label="Unknown date" />
      <>{event.reason}</>
    </TableCell>
  </>
);

export const ThingRunResultTable = ({ resp }: Props) => {
  const { events, reasonForNoResults } = resp;
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      ></Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Type & Reason</TableCell>
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
