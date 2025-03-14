import { useCallback } from "react";
import { useSearchParams } from "next/navigation";

export default function useQueryParams(queryName: string) {
  const searchParams = useSearchParams();

  const query = searchParams.get(queryName) || "";

  const setQuery = useCallback(
    (value: string) => {
      const newQuery = new URLSearchParams(searchParams);

      if (value) {
        newQuery.set(queryName, value);
      } else {
        newQuery.delete(queryName);
      }

      const stringified = newQuery.toString();
      window.history.replaceState(null, "", `?${stringified}`);
    },
    [queryName, searchParams]
  );

  return [query, setQuery] as const;
}
