"use client";

import { useEffect, useRef, useState } from "react";

import { ApiOptions, ApiResponse } from "./useApi.types";

export default function useApi<Data = unknown>(
  url: string,
  options?: ApiOptions
) {
  const [response, setResponse] = useState<ApiResponse<Data>>({
    status: "initial",
  });

  const refAbort = useRef<AbortController>(null);

  const { method, headers } = options ?? {};

  useEffect(() => {
    if (!url) {
      refAbort.current?.abort();
      refAbort.current = null;

      setResponse({ status: "initial" });
      return;
    }

    if (refAbort.current) {
      refAbort.current.abort();
      refAbort.current = new AbortController();
    }

    setResponse({
      status: "loading",
    });

    fetch(url, {
      method: method ?? "GET",
      signal: refAbort.current?.signal,
      headers,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((data) => {
        setResponse({ status: "done", data });
        refAbort.current = null;
      })
      .catch((error) => {
        setResponse({
          status: "failed",
          kind: "general-error",
          error,
        });
        refAbort.current = null;
      });

    return () => {
      refAbort.current?.abort();
      refAbort.current = null;
    };
  }, [headers, method, url]);

  return [response] as const;
}
