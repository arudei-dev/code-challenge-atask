export interface GhSearchUserResponse {
  total_count: number;
  incomplete_results: boolean;
  items: ResponseItem[];
}

interface ResponseItem {
  id: number;
  login: string;
  avatar_url: string;
}
