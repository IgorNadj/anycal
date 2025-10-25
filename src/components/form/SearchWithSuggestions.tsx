import {
  TextField,
  Paper,
  List,
  ListItem,
  CircularProgress,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import type { Suggestion } from "../../types.ts";

interface SearchWithSuggestionsProps {
  value: string;
  onInputChange: (value: string) => void;
  suggestions: Suggestion[] | undefined;
  isLoading: boolean;
  onSuggestionSelect: (suggestion: Suggestion) => void;
}

export const SearchWithSuggestions = ({
  value,
  onInputChange,
  suggestions,
  isLoading,
  onSuggestionSelect,
}: SearchWithSuggestionsProps) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // Reset selected index when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!suggestions || suggestions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case "Enter":
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          e.preventDefault();
          onSuggestionSelect(suggestions[selectedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setSelectedIndex(-1);
        break;
    }
  };

  return (
    <Box sx={{ position: "relative" }}>
      <TextField
        value={value}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={handleKeyDown}
        fullWidth
        slotProps={{
          input: {
            autoComplete: "off",
          },
        }}
      />

      {isLoading && (
        <Box display="flex" justifyContent="center" my={1}>
          <CircularProgress size={24} />
        </Box>
      )}

      {suggestions && suggestions.length > 0 && (
        <Paper
          elevation={2}
          sx={{
            mt: 1,
            maxHeight: 200,
            overflow: "auto",
            position: "absolute",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <List dense>
            {suggestions.map((suggestion, index) => (
              <ListItem
                key={index + "-" + suggestion.title}
                onClick={() => onSuggestionSelect(suggestion)}
                sx={{
                  cursor: "pointer",
                  backgroundColor:
                    index === selectedIndex ? "rgba(0, 0, 0, 0.08)" : "inherit",
                  "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                }}
              >
                {suggestion.title} {format(suggestion.date, "yyyy-MM-dd")}
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};
