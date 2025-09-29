import { Year } from "./Year.tsx";
import { Header } from "./Header.tsx";
import { useEvents } from "../../hooks/useEvents.ts";

export const Calendar = () => {
  const { data: events } = useEvents();

  const earliestYear = new Date().getFullYear();
  const latestYear =
    events.length === 0
      ? earliestYear
      : Math.max(...events.map((event) => event.date.getFullYear()));
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
          <Year year={year} />
        </div>
      ))}
    </>
  );
};
