import { IconButton, Menu, MenuItem } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";
import { CalendarColour } from "../../types/types.ts";
import { CALENDAR_COLOURS } from "../../constants.ts";
import { useState } from "react";
import { objectKeys } from "../../utils.ts";

type Props = {
  colour: CalendarColour;
  onChange: (newColour: CalendarColour) => void;
};

export const CalendarColourPicker = ({ colour, onChange }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <CircleIcon sx={{ color: CALENDAR_COLOURS[colour] }} />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        {objectKeys(CALENDAR_COLOURS).map((key) => (
          <MenuItem
            key={key}
            onClick={() => {
              onChange(key);
              setAnchorEl(null);
            }}
          >
            <CircleIcon sx={{ color: CALENDAR_COLOURS[key] }} />
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};
