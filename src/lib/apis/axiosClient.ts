import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const publicApi = axios.create({
  baseURL: process.env.API_URL,
  headers: { "Content-Type": "application/json" },
});

async function createAuthedAxios() {
  const cookieStore = await cookies();
  const token = cookieStore.get("ac")?.value;

  const client = axios.create({
    baseURL: process.env.API_URL,
    headers: { "Content-Type": "application/json" },
  });

  if (token) {
    client.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
  return client;
}

export async function apiRequest<T = unknown>(
  config: AxiosRequestConfig,
): Promise<T> {
  const client = await createAuthedAxios();

  try {
    const res = await client.request<T>(config);
    return res.data;
  } catch (err) {
    const error = err as AxiosError;
    if (error.response?.status !== 401) throw error;

    const refreshed = await refreshAccessToken();
    if (!refreshed) throw error;

    const retryClient = await createAuthedAxios();
    const res = await retryClient.request<T>(config);
    return res.data;
  }
}

async function refreshAccessToken(): Promise<boolean> {
  const cookieStore = await cookies();
  const rf = cookieStore.get("rf")?.value;
  if (!rf) return false;

  try {
    const res = await publicApi.post("/auth/refresh", { rf });
    const { ac, rf: newRf } = res.data;

    cookieStore.set("ac", ac, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 15 * 60,
    });
    if (newRf) {
      cookieStore.set("rf", newRf, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/api/auth",
        maxAge: 30 * 24 * 60 * 60,
      });
    }
    return true;
  } catch {
    cookieStore.delete("ac");
    cookieStore.delete("rf");
    return false;
  }
}
