import { useLocalStorage } from "./useLocalStorage.ts";

type DbType = {
  thingRefUuids: string[];
};

const emptyDb = {
  thingRefUuids: [],
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
