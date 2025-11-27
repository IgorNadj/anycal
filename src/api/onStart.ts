import * as Sentry from "@sentry/node";
import type { Express } from "express";
import { debuglog } from "node:util";

Sentry.init({
  dsn: "https://07accc5f245bff58b0327851fcc1df98@o4510436135665664.ingest.us.sentry.io/4510436365828096",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
  // debug: true,
});

export const onStart = async (app: Express) => {
  const log = debuglog("anycal");
  log("anycal onBeforeStart");

  // The error handler must be registered before any other error middleware and after all controllers
  Sentry.setupExpressErrorHandler(app);
};
