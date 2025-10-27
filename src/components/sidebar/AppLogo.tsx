import { Box, Typography } from "@mui/material";
import { Link } from "react-router";

export const AppLogo = () => {
  return (
    <Box sx={{ width: "100", padding: 1 }}>
      <Typography component="h2" variant="h4" gutterBottom sx={{ color: "text.primary" }}>
        <Link to="/">Any Cal</Link>
      </Typography>
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Add anything to your calendar
      </Typography>
    </Box>
  );
};
