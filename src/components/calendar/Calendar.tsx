'use client';

import { Year } from "./Year.tsx";
import { Header } from "./Header.tsx";
import { useContext } from "react";
import { AppContext } from "../../state/AppContext.tsx";

export const Calendar = () => {
  const ctx = useContext(AppContext);
  const { events } = ctx;

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
