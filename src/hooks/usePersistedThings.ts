import { useLocalStorage } from "./useLocalStorage.ts";
import { Thing } from "../types/types.ts";

export const usePersistedThings = () => {
  const { value, setValue, isLoading } = useLocalStorage<Thing[]>("things", []);

  const hydratedThings = value.map((thing: Thing) => ({
    ...thing,
    date: new Date(thing.date),
  }));

  return {
    things: hydratedThings,
    setThings: setValue,
    isLoading: isLoading,
  };
};
