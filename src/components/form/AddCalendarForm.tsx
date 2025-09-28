import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFirstUnusedColour } from "../../utils.ts";
import { useDebounce } from "../../hooks/useDebounce.ts";
import type { CalendarEvent, Suggestion } from "../../types.ts";
import { SearchWithSuggestions } from "../dropdown/SearchWithSuggestions.tsx";
import { useFetchSuggestions } from "../../data/useFetchSuggestions.ts";
import { useUser } from "../../hooks/useUser.ts";
import { useCreateEvent } from "../../data/useCreateEvent.ts";
import { useCreateCalendar } from "../../data/useCreateCalendar.ts";
import { useCalendars } from "../../data/useCalendars.ts";

export const AddCalendarForm = () => {
  const user = useUser();
  const { data: calendars } = useCalendars(user);
  const { mutate: createCalendar } = useCreateCalendar();
  const { mutate: createEvent } = useCreateEvent();

  const [date, setDate] = useState<Date>(new Date());

  const [input, setInput] = useState<string>("");

  const debouncedInput = useDebounce(input, 500);
  console.log("debouncedInput", debouncedInput);

  const { data: suggestions, isLoading: isLoadingSuggestions } =
    useFetchSuggestions(debouncedInput);

  const create = (name: string, date: Date) => {
    const newCalendar = {
      name,
      uuid: uuidv4(),
      colour: getFirstUnusedColour(calendars),
      visible: true,
      userUuid: user.uuid,
    };
    const newEvent: CalendarEvent = {
      name,
      date,
      uuid: uuidv4(),
      calendarUuid: newCalendar.uuid,
    };
    createCalendar(newCalendar);
    createEvent(newEvent);

    setInput("");
  };

  const handleAddButtonClick = () => {
    create(input, date);
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    create(suggestion.title, suggestion.date);
  };

  return (
    <>
      <DialogContent>
        <Typography variant="h6">What</Typography>
        <SearchWithSuggestions
          value={input}
          onInputChange={setInput}
          suggestions={suggestions}
          isLoading={isLoadingSuggestions}
          onSuggestionSelect={handleSuggestionClick}
        />

        <Typography variant="h6">When</Typography>
        <DatePicker value={date} onChange={(date) => date && setDate(date)} />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleAddButtonClick}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};
