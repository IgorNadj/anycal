import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useCalendars } from "../../hooks/useCalendars.ts";
import type { Calendar } from "../../types.ts";

type CalendarPickerProps = {
  selectedCalendar: Calendar | null;
  onChangeCalendar: (cal: Calendar) => void;
  label?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  error?: boolean;
  helperText?: string;
};

export const CalendarPicker = ({
  selectedCalendar,
  onChangeCalendar,
  label = "Calendar",
  disabled,
  fullWidth = true,
  error,
  helperText,
}: CalendarPickerProps) => {
  const { data: calendars, isLoading } = useCalendars();

  const isDisabled = !!disabled || isLoading;

  const onChange = (uuid: string) => {
    const cal = calendars.find((c) => c.uuid === uuid);
    if (cal) {
      onChangeCalendar(cal);
    }
  }

  return (
    <FormControl
      fullWidth={fullWidth}
      disabled={isDisabled}
      error={error}
      size="small"
      sx={{ my: 1 }}
    >
      {label ? (
        <InputLabel id="calendar-picker-label">{label}</InputLabel>
      ) : null}
      <Select
        labelId="calendar-picker-label"
        value={selectedCalendar?.uuid ?? ""}
        label={label}
        displayEmpty
        renderValue={(val) =>
          isLoading ? <CircularProgress size={16} /> : (calendars.find(c => c.uuid === (val as string))?.name ?? "")
        }
        onChange={(e) => onChange(e.target.value as string)}
        MenuProps={{
          PaperProps: {
            sx: { maxHeight: 360 },
          },
        }}
      >
        {calendars.map((cal: Calendar) => (
          <MenuItem
            key={cal.uuid}
            value={cal.uuid}
            sx={{ display: "flex", gap: 1, alignItems: "center" }}
          >
            <CircleIcon
              fontSize="small"
              sx={{ color: CALENDAR_COLOURS[cal.colour] }}
            />
            {cal.name}
          </MenuItem>
        ))}
      </Select>
      {helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
    </FormControl>
  );
};
