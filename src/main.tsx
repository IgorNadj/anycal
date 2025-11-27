import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://dfd824af619b78a9239b2e34b5801912@o4510436135665664.ingest.us.sentry.io/4510436511514624",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
