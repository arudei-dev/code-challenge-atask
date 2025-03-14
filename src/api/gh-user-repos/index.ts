import useApi from "@/hooks/useApi";
import { GhSearchUserReposResponse } from "./types";

export default function useGhUserRepos(username: string) {
  return useApi<GhSearchUserReposResponse>(
    `https://api.github.com/users/${username}/repos`
  );
}
