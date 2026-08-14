import { publicApi, apiRequest } from "./axiosClient";

interface LoginPayload {
  phone: string;
  password: string;
}

interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export function loginApi(payload: LoginPayload) {
  return publicApi
    .post<AuthResponse>("/auth/login", payload)
    .then((r) => r.data);
}

export function refreshApi(rf: string) {
  return publicApi
    .post<AuthResponse>("/auth/refresh", { rf })
    .then((r) => r.data);
}

export function logoutApi(rf: string) {
  return publicApi.post("/auth/logout", { rf }).then((r) => r.data);
}

export function registerApi(payload: any) {
  return publicApi.post("/auth/register", payload).then((r) => r.data);
}

export function getMeApi() {
  return apiRequest<{ id: string; email: string; name: string }>({
    method: "GET",
    url: "/users/me",
  });
}
