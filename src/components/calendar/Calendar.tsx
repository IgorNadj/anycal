import { Thing } from "../../types/types.ts";
import { thingsInYear } from "../../utils.ts";
import { Year } from "./Year.tsx";
import { Header } from "./Header.tsx";
import { CalendarProvider } from "../../state/CalendarProvider.tsx";

export const Calendar = ({ things }: { things: Thing[] }) => {
  const earliestYear = new Date().getFullYear();
  const latestYear =
    things.length === 0
      ? earliestYear
      : Math.max(...things.map((thing) => thing.date.getFullYear()));
  let years: number[] = [];
  for (let y = earliestYear; y <= latestYear; y++) {
    years = [...years, y];
  }

  return (
    <>
      <CalendarProvider>
        <Header />
        {years.map((year) => (
          <div key={year}>
            <h5>{year}</h5>
            <Year year={year} things={thingsInYear(things, year)} />
          </div>
        ))}
      </CalendarProvider>
    </>
  );
};
