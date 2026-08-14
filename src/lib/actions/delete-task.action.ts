"use server";

import { apiRequest } from "../apis/axiosClient";
import { revalidatePath } from "next/cache";

export async function deleteTaskAction(taskId: string) {
  try {
    await apiRequest({ url: `/tasks/${taskId}`, method: "DELETE" });
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to delete task" };
  }
}
