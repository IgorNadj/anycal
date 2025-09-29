import {
  Button,
  DialogActions,
  DialogContent,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDebounce } from "../../hooks/useDebounce.ts";
import type { Calendar, CalendarEvent, Suggestion } from "../../types.ts";
import { SearchWithSuggestions } from "../dropdown/SearchWithSuggestions.tsx";
import { useFetchSuggestions } from "../../hooks/useFetchSuggestions.ts";
import { useCreateEvent } from "../../hooks/useCreateEvent.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import { CalendarPicker } from "./CalendarPicker.tsx";

export const AddEventForm = () => {
  const { data: calendars } = useCalendars();
  const { mutate: createEvent } = useCreateEvent();

  const [date, setDate] = useState<Date>(new Date());

  const [input, setInput] = useState<string>("");

  const debouncedInput = useDebounce(input, 500);

  const [selectedCalendar, setSelectedCalendar] = useState<Calendar | null>(
    null,
  );

  // Default calendar is the first one
  useEffect(() => {
    if (calendars.length === 0) return;
    const [firstCal] = calendars;
    setSelectedCalendar(firstCal);
  }, [calendars]);

  const { data: suggestions, isLoading: isLoadingSuggestions } =
    useFetchSuggestions(debouncedInput);

  const create = (name: string, date: Date) => {
    if (!selectedCalendar) return;
    const newEvent: CalendarEvent = {
      name,
      date,
      uuid: uuidv4(),
      calendarUuid: selectedCalendar.uuid,
    };
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
        <CalendarPicker
          selectedCalendar={selectedCalendar}
          onChangeCalendar={setSelectedCalendar}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={handleAddButtonClick}>
          Add
        </Button>
      </DialogActions>
    </>
  );
};
