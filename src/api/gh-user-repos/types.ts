export type GhSearchUserReposResponse = ResponseItem[];

interface ResponseItem {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}
