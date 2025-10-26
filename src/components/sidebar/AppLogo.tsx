import { Typography } from "@mui/material";

export const AppLogo = () => {
  return (
    <>
      <Typography component="h2" variant="h4" gutterBottom sx={{ color: "text.primary" }}>
        Any Cal
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary", mb: { xs: 2, sm: 4 } }}>
        Add anything to your calendar.
      </Typography>
    </>
  );
};
