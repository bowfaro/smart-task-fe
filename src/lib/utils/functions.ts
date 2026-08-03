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
