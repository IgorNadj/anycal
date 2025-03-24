import { thingsInYear } from "../../utils.ts";
import { Year } from "./Year.tsx";
import { Header } from "./Header.tsx";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";

export const Calendar = () => {
  const ctx = useContext(AppContext);
  const { things } = ctx;

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
      <Header />
      {years.map((year) => (
        <div key={year}>
          <h5>{year}</h5>
          <Year year={year} things={thingsInYear(things, year)} />
        </div>
      ))}
    </>
  );
};
