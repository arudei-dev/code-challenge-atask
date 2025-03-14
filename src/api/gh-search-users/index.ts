import useApi from "@/hooks/useApi";
import { GhSearchUserResponse } from "./types";

export default function useGhSearchUsers(query: string) {
  const queryParams = new URLSearchParams("");

  queryParams.set("q", query);
  queryParams.set("per_page", String(5));

  return useApi<GhSearchUserResponse>(
    "https://api.github.com/search/users?" + queryParams.toString()
  );
}
