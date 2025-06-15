// src/components/form/EditableEventRow.tsx
import {
  TableRow,
  TableCell,
  IconButton,
  TextField,
  styled,
  Tooltip,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState, useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";
import { Event } from "@anycal/types";

// Styled components for the editable cells
const EditableCell = styled(TableCell)(({ theme }) => ({
  position: "relative",
  cursor: "pointer",
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  "& .edit-field": {},
  "&:hover .edit-field": {
    display: "block",
  },
  "&:hover .display-value": {
    visibility: "hidden",
  },
}));

export const EditableEventRow = ({ event }: { event: Event }) => {
  const { updateEvent, deleteEvent } = useContext(AppContext);
  const [nameValue, setNameValue] = useState(event.name);

  // Handle name change with blur event for saving
  const handleNameBlur = () => {
    if (nameValue !== event.name) {
      updateEvent({ ...event, name: nameValue });
    }
  };

  // Update local state while typing
  const handleNameChange = (value: string) => {
    console.log("handleNameChange", value);
    setNameValue(value);
  };

  // Handle date change
  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      updateEvent({ ...event, date: newDate });
    }
  };

  // Handle delete
  const handleDelete = () => {
    deleteEvent(event);
  };

  return (
    <TableRow>
      <EditableCell>
        <TextField
          className="edit-field"
          variant="standard"
          value={nameValue}
          onChange={(e) => handleNameChange(e.target.value)}
          onBlur={handleNameBlur}
          fullWidth
          autoFocus
        />
      </EditableCell>
      <EditableCell>
        <DatePicker
          className="edit-field"
          value={event.date}
          onChange={handleDateChange}
          slotProps={{
            textField: {
              variant: "standard",
              fullWidth: true,
            },
          }}
        />
      </EditableCell>
      <TableCell align="right">
        <Tooltip title="Delete event">
          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};
