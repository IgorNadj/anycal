import { Box } from "@mui/material";
import type { ReactNode } from "react";

export const NarrowContainer = ({ children }: { children: ReactNode }) => {
  return <Box sx={{ width: { xs: "auto", sm: 400 }, marginTop: 5 }}>{children}</Box>;
};
