"use server";

import { updateTaskApi, UpdateTaskPayload } from "../apis/tasks.api";
import { revalidatePath } from "next/cache";

export async function updateTaskAction(taskId: string, data: UpdateTaskPayload) {
  try {
    const result = await updateTaskApi(taskId, data);
    revalidatePath("/");
    revalidatePath(`/[locale]/(user)/${taskId}`, "page");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to update task" };
  }
}
