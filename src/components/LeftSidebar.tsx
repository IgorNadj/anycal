import { Box, Typography } from "@mui/material";
import { AppLogo } from "./AppLogo.tsx";
import { CalendarsList } from "./CalendarsList.tsx";
import { AddEventForm } from "./form/AddEventForm.tsx";

export const LeftSidebar = () => {
  return (
    <>
      <AppLogo />
      <Box>
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}
        >
          Add anything to your calendar.
        </Typography>
      </Box>
      <AddEventForm />
      <CalendarsList />
    </>
  );
};
