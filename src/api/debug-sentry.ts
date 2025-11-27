import type { Express } from "express";

export const debugSentry = (app: Express) => {
  // @ts-ignore
  app.get("/debug-sentry", function mainHandler(req, res) {
    throw new Error("My first Sentry error!");
  });
};
