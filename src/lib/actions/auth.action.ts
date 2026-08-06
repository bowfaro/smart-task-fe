"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginApi, logoutApi } from "@/lib/apis/auth.api";
import { loginSchema } from "@/lib/validations/login";
import { setCookie } from "../utils/functions";

export async function loginAction(formData: FormData) {
  const parsed = loginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.flatten().fieldErrors };
  }
  try {
    const { countryCode, phone, password } = parsed.data;
    const fullPhone = `${countryCode}${phone}`;
    const { accessToken, refreshToken } = await loginApi({
      phone: fullPhone,
      password,
    });
    await setCookie("ac", accessToken, {
      maxAge: parseInt(process.env.AC_MAXAGE || "900"),
    });
    await setCookie("rf", refreshToken, {
      maxAge: parseInt(process.env.RF_MAXAGE || "604800"),
    });
  } catch (error) {
    return error;
  }
  redirect("/overview");
}

export async function logoutAction() {
  const cookieStore = await cookies();
  const rf = cookieStore.get("rf")?.value;

  if (rf) {
    try {
      await logoutApi(rf);
    } catch {}
  }

  cookieStore.delete("ac");
  cookieStore.delete("rf");
  redirect("/login");
}
