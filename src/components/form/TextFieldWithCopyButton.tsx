import { Check, ContentCopy } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type Props = {
  value: string;
};

export const TextFieldWithCopyButton = ({ value }: Props) => {
  const [copySuccess, setCopySuccess] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopySuccess(true);

      // Clear existing timeout if any
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // Reset success state after 2.5 seconds
      timeoutRef.current = setTimeout(() => {
        setCopySuccess(false);
        timeoutRef.current = null;
      }, 2500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        fontFamily: "monospace",
        backgroundColor: "grey.100",
        padding: 1,
        borderRadius: 1,
        gap: 1,
        minWidth: 0,
      }}
    >
      <Box
        sx={{
          flex: 1,
        }}
      >
        <Typography variant="body2">{value}</Typography>
      </Box>

      <IconButton
        size="small"
        onClick={copyToClipboard}
        sx={{
          flexShrink: 0,
          color: copySuccess ? "success.main" : "inherit",
        }}
        aria-label={copySuccess ? "Copied to clipboard" : "Copy to clipboard"}
      >
        {copySuccess ? <Check fontSize="small" /> : <ContentCopy fontSize="small" />}
      </IconButton>
    </Box>
  );
};
