import { useLocalStorage } from "./useLocalStorage.ts";

type DbType = {
  calendarRefUuids: string[];
};

const emptyDb = {
  calendarRefUuids: [],
};

export const useAnycalLocalStorage = () => {
  const { value, setValue, isLoading } = useLocalStorage<DbType>(
    "anycal",
    emptyDb,
  );

  return {
    data: value,
    setData: setValue,
    isLoading: isLoading,
  };
};
