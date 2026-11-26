
import { authClient } from "./auth-client";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
  results?: number;
};

export async function apiFetch<T>(
  path: string,
  options: RequestInit = {},
  authenticated = true
): Promise<ApiResponse<T>> {
  if (!API_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured");
  }

  const headers = new Headers(options.headers);

  if (authenticated) {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      throw new Error("Please sign in to continue");
    }

    headers.set("Authorization", `Bearer ${data.token}`);
  }

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(
    `${API_URL.replace(/\/$/, "")}${path}`,
    {
      ...options,
      headers,
      cache: "no-store",
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "API request failed"
    );
  }

  return result as ApiResponse<T>;
}
