import { Box, Container } from "@mui/material";
import { Outlet } from "react-router";

export const AppContentPageLayout = () => {
  return (
    <Box sx={{ height: "100%", flex: 1 }}>
      {/* Scrollable content */}
      <Box
        sx={{
          height: `100%`,
          backgroundColor: "#fff",
          border: "1px solid #ddd",
          overflowY: "auto",
        }}
      >
        <Box>
          <Box sx={{ padding: 5, paddingBottom: 7 }}>
            <Container>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
