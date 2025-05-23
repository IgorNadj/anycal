"use server";
import { getThings as dbGetThings } from "../database/database.ts";

// This type matches the structure of a thing row from the 'thing' table
export type SerializedThingFromDb = {
  uuid: string;
  name: string;
  colour: string;
  visible: number; // Visible is stored as a number (0 or 1) in the database
};

export const getThingsAction = async (): Promise<SerializedThingFromDb[]> => {
  // Explicitly type the result of dbGetThings.all()
  const thingsFromDb = dbGetThings.all() as SerializedThingFromDb[];
  const fixedThingsFromDb = thingsFromDb.map((thing) => ({ ...thing }));
  return fixedThingsFromDb;
};
