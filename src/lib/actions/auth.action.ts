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
    const result = await loginApi(parsed.data);
    console.log(result);
    // setCookie("ac", ac, { maxAge: parseInt(process.env.AC_MAXAGE || "1") });
    // setCookie("rf", rf, { maxAge: parseInt(process.env.RF_MAXAGE || "5") });
    // console.log(cookieStore.get("ac"));
  } catch {
    return { success: false, error: "Sai tài khoản hoặc mật khẩu" };
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
