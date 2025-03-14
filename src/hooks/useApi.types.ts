export interface ApiOptions {
  method: "GET";
  headers?: Headers;
}

export type ApiResponse<Data> =
  | { status: "initial" | "loading" }
  | { status: "done"; data: Data }
  | ({ status: "failed" } & ApiError);

export interface ApiError {
  kind: "general-error";
  error: Error;
}
