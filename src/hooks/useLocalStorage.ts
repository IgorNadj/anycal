import { useEffect, useState } from "react";

export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const [value, setValue] = useState<T>(initialValue);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        const valueStr = localStorage.getItem(key);
        if (valueStr !== null) {
          setValue(JSON.parse(valueStr));
        }
      } catch (error) {
        console.error("getItem error:", error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [key]);

  const updateStoredValue = async (value: T) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      console.log("setItem success:", value);
      setValue(value);
    } catch (error) {
      console.error("setItem error:", error);
    }
  };

  return {
    value,
    setValue: updateStoredValue,
    isLoading,
  };
};
