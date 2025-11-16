import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { NavLink } from "react-router";
import { ManageCalendarsForm } from "../components/form/ManageCalendarsForm.tsx";
import { UpdateEmailForm } from "../components/form/UpdateEmailForm.tsx";
import { UpdatePasswordForm } from "../components/form/UpdatePasswordForm.tsx";
import { NarrowContainer } from "../components/NarrowContainer.tsx";

export const SettingsPage = () => {
  const [tab, setTab] = useState(0);

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Settings
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="auth tabs">
        <Tab value={0} label="Calendars" />
        <Tab value={1} label="Account" />
        <Tab value={2} label="Security" />
      </Tabs>

      {tab === 0 && <ManageCalendarsForm />}
      {tab === 1 && (
        <NarrowContainer>
          <UpdateEmailForm />
        </NarrowContainer>
      )}
      {tab === 2 && (
        <NarrowContainer>
          <UpdatePasswordForm />
          <NavLink to="/sign-out">Sign out</NavLink>
        </NarrowContainer>
      )}
    </Box>
  );
};
