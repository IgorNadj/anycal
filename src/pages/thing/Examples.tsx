import { Box, Typography } from "@mui/material";

export const Examples = () => {
  return (
    <Box
      sx={{ padding: 3, backgroundColor: "#fff", height: "100%", borderTopLeftRadius: 5 }}
    >
      <Typography variant="h4">Examples</Typography>

      <ul>
        <li>Bosch legacy next season</li>
        <li>Severance s3</li>
        <li>Brisbane olympics</li>
        <li>Public Holidays Victoria</li>
        <li>
          Football matches in the champions league that include the team Manchester City
        </li>
        <li>Tennis matches with Novak Djokovic</li>
      </ul>
    </Box>
  );
};
