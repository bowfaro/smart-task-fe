"use server";

import { createTaskApi, CreateTaskPayload } from "../apis/tasks.api";
import { revalidatePath } from "next/cache";

export async function createTaskAction(data: CreateTaskPayload) {
  try {
    const result = await createTaskApi(data);
    revalidatePath("/");
    return { success: true, data: result };
  } catch (error: any) {
    return { success: false, error: error?.message || "Failed to create task" };
  }
}
