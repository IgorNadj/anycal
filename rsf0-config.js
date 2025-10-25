/** @type { import('rsf-zero').RsfZeroConfig } */
export default {
  startStatic: {
    setHeaders: (res, path, stat) => {
      res.setHeader(
        "Content-Security-Policy",
        "script-src 'self' https://anycal.dev.igornadj.io",
      );
    },
  },
  routes: ["./src/routes/calendar-ics.ts"],
};
