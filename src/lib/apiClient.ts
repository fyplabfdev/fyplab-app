import { env } from "../config/env";

type ApiError = { message: string; status?: number; details?: unknown };

async function parseError(res: Response): Promise<ApiError> {
  let details: unknown = undefined;
  try { details = await res.json(); } catch {}
  return {
    message: (details as any)?.message ?? `Request failed (${res.status})`,
    status: res.status,
    details,
  };
}

export async function api<T>(
  path: string,
  init?: RequestInit & { json?: unknown }
): Promise<T> {
  const base = env.API_BASE_URL ?? "";
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(init?.headers as any),
  };

  const res = await fetch(`${base}${path}`, {
    ...init,
    headers,
    body: init?.json ? JSON.stringify(init.json) : init?.body,
    credentials: "include",
  });

  if (!res.ok) throw await parseError(res);

  // handle empty response
  if (res.status === 204) return undefined as T;

  return (await res.json()) as T;
}
