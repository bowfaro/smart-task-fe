import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { cookies } from "next/headers";
import { setCookie } from "../utils/functions";
import { refreshApi } from "./auth.api";

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
    retryClient.defaults.headers.common["Authorization"] =
      `Bearer ${refreshed}`;
    const res = await retryClient.request<T>(config);
    return res.data;
  }
}

async function refreshAccessToken(): Promise<any> {
  const cookieStore = await cookies();
  const rf = cookieStore.get("rf")?.value;
  if (!rf) return "";

  try {
    const res = await refreshApi(rf);
    const { accessToken } = res;
    try {
      await setCookie("ac", accessToken, {
        maxAge: parseInt(process.env.AC_MAXAGE || "900"),
      });
    } catch (error) {}

    return accessToken;
  } catch {
    cookieStore.delete("ac");
    cookieStore.delete("rf");
    return "";
  }
}
