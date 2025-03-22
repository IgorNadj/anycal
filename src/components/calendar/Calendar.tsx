import { Thing } from "../../types/types.ts";

export const Calendar = ({ things }: { things: Thing[] }) => {
  if (things.length === 0)
    return (
      <div>
        <h1>No things to show</h1>
      </div>
    );

  const earliestYear = new Date().getFullYear();
  const latestYear = Math.max(
    ...things.map((thing) => thing.date.getFullYear()),
  );
  let years: number[] = [];
  for (let y = earliestYear; y <= latestYear; y++) {
    years = [...years, y];
  }

  return (
    <>
      {years.map((year) => (
        <div key={year}>{year}</div>
      ))}
    </>
  );
};
