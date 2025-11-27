/** @type { import("rsf-zero").RsfZeroConfig } */
export default {
  routes: ["./src/api/calendar-ics.ts", "./src/api/debug-sentry.ts"],
  onStart: "./src/api/onStart.ts",
};
