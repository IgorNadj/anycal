"use client";

import { Month } from "./Month.tsx";

const MONTHS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

export const Year = ({ year }: { year: number }) => {
  return (
    <>
      {MONTHS.map((month) => (
        <Month key={month} year={year} month={month} />
      ))}
    </>
  );
};
