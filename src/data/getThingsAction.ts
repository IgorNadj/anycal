"use server";
import { getThings as dbGetThings } from "../database/database.ts";
import { Thing } from "../types/types.ts"; // Import the Thing type

// This type matches the structure of a thing row from the 'thing' table
type DbThing = {
  uuid: string;
  name: string;
  colour: string;
  visible: number; // Visible is stored as a number (0 or 1) in the database
};

export const getThingsAction = async (): Promise<Thing[]> => {
  const thingsFromDb = dbGetThings.all() as DbThing[];
  return thingsFromDb.map(thing => ({
    ...thing,
    visible: thing.visible === 1, // Convert visible number to boolean
  }));
};
