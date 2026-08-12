import { cookies } from "next/headers";

interface CookieOptions {
  maxAge: number;
  sameSite?: "strict" | "lax" | "none";
  path?: string;
}

export const setCookie = async (
  name: string,
  value: string,
  options: CookieOptions,
) => {
  const cookieStore = await cookies();

  cookieStore.set(name, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: options.sameSite || "lax",
    path: options.path || "/",
    maxAge: options.maxAge,
  });
};

export const formatDateTime = (dateString: string | null) => {
  if (!dateString) return "No date";
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const formatTimeOnly = (dateString: string | null) => {
  if (!dateString) return "--:--";
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
