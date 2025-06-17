import { Year } from "./Year.tsx";
import { Header } from "./Header.tsx";
import { useEvents } from "../../data/useEvents.ts";
import { useUser } from "../../hooks/useUser.ts";

export const Calendar = () => {
  const user = useUser();
  const { data: events } = useEvents(user);

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
