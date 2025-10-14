import { Check, ContentCopy } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

interface TextFieldWithCopyButtonProps {
  value: string;
  sx?: any;
}

export const TextFieldWithCopyButton: React.FC<TextFieldWithCopyButtonProps> = ({
  value,
  sx = {},
}) => {
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
        fontSize: "0.875rem",
        backgroundColor: "grey.100",
        padding: 1,
        borderRadius: 1,
        gap: 1,
        ...sx,
      }}
    >
      <Box
        sx={{
          flex: 1,
          overflow: "hidden",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          minWidth: 0,
        }}
      >
        {value}
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
