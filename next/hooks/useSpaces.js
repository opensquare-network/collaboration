import { EmptyQuery } from "frontedUtils/constants";
import { useState } from "react";
import nextApi from "services/nextApi";
import useUpdateEffect from "./useUpdateEffect";

export default function useSpaces({
  initialSpaces = {},
  page = 1,
  search = "",
}) {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [isLoading, setIsLoading] = useState(false);

  useUpdateEffect(() => {
    setIsLoading(true);
    nextApi
      .fetch("spaces", { page, pageSize: 15, search })
      .then((res) => {
        setSpaces(res?.result || EmptyQuery);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [search, page]);

  return { spaces, isLoading };
}
