import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import { UpdateEmailForm } from "../components/form/UpdateEmailForm.tsx";
import { UpdatePasswordForm } from "../components/form/UpdatePasswordForm.tsx";
import { NarrowContainer } from "../components/NarrowContainer.tsx";

export const SettingsPage = () => {
  const [tab, setTab] = useState(0);

  const fakeElems = [];
  for (let i = 0; i < 100; i++) {
    fakeElems.push(<p>Hello ${i}</p>);
  }

  return (
    <Box>
      <Typography variant="h3" gutterBottom>
        Settings
      </Typography>

      <Tabs value={tab} onChange={(_, v) => setTab(v)} aria-label="auth tabs">
        <Tab value={0} label="Account" />
        <Tab value={1} label="Security" />
        <Tab value={2} label="Third" />
      </Tabs>
      <NarrowContainer>
        {tab === 0 && <UpdateEmailForm />}
        {tab === 1 && <UpdatePasswordForm />}
        {tab === 2 && (
          <div>
            Hello there
            {fakeElems}
          </div>
        )}
      </NarrowContainer>
    </Box>
  );
};
