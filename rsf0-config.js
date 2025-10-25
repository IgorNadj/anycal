/** @type { import('rsf-zero').RsfZeroConfig } */
export default {
  startStatic: {
    setHeaders: (res, path, stat) => {
      res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; script-src *.igornadj.io",
      );
    },
  },
  routes: ["./src/routes/calendar-ics.ts"],
};
