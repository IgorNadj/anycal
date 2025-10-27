import { Divider, Typography } from "@mui/material";

export const Footer = () => {
  return (
    <div>
      <Divider />
      <Typography variant="body2" sx={{ color: "text.secondary", textAlign: "right" }}>
        <a
          href="https://igornadj.io"
          style={{ color: "inherit", textDecoration: "none" }}
        >
          igornadj.io
        </a>
      </Typography>
    </div>
  );
};
