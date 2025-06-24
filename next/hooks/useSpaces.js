import { useEffect, useState } from "react";
import nextApi from "services/nextApi";

export default function useSpaces({ initialSpaces = [], search = "" }) {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!search) {
      setSpaces(initialSpaces);
      return;
    }
    setIsLoading(true);
    nextApi
      .fetch("spaces", { page: 1, pageSize: 15, search })
      .then((res) => {
        setSpaces(res?.result || []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, initialSpaces]);

  return { spaces, isLoading };
}
