import {
  Button,
  DialogActions,
  DialogContent,
  TextField,
  Typography,
  Box,
  List,
  ListItem,
  Paper,
  CircularProgress,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../../state/AppContext.tsx";
import { getFirstUnusedColour } from "../../utils.ts";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import { fetchSuggestions } from "../../api/fetchSuggestions.ts";
import { useDebounce } from "../../hooks/useDebounce.ts";
import { Suggestion } from "@anycal/types";

export const AddThingForm = () => {
  const ctx = useContext(AppContext);
  const { things, createThing, createEvent } = ctx;

  const [date, setDate] = useState<Date>(new Date());

  const [input, setInput] = useState<string>("");

  const debouncedInput = useDebounce(input, 500);
  console.log("debouncedInput", debouncedInput);

  const { data: suggestions, isLoading } = useQuery({
    queryKey: ["suggestions", debouncedInput],
    queryFn: () => fetchSuggestions(debouncedInput),
    staleTime: 1000 * 60 * 5,
    enabled: !!debouncedInput && debouncedInput.length > 0,
    refetchOnWindowFocus: false,
  });

  const create = (name: string, date: Date) => {
    const newThing = {
      name,
      uuid: uuidv4(),
      colour: getFirstUnusedColour(things),
      visible: true,
    };
    const newEvent = {
      name,
      date,
      uuid: uuidv4(),
      thingUuid: newThing.uuid,
    };
    createThing(newThing);
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
        <TextField
          variant="outlined"
          sx={{ width: "100%", mb: 1 }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        {isLoading && (
          <Box display="flex" justifyContent="center" my={1}>
            <CircularProgress size={24} />
          </Box>
        )}

        {suggestions && suggestions.length > 0 && (
          <Paper elevation={2} sx={{ mb: 2, maxHeight: 200, overflow: "auto" }}>
            <List dense>
              {suggestions.map((suggestion, index) => (
                <ListItem
                  key={index + "-" + suggestion.title}
                  onClick={() => handleSuggestionClick(suggestion)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  }}
                >
                  {suggestion.title} {format(suggestion.date, "yyyy-MM-dd")}
                </ListItem>
              ))}
            </List>
          </Paper>
        )}

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
