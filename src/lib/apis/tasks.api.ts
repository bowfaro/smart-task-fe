import { apiRequest } from "./axiosClient";

export interface Task {
  id: string;
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  status: "todo" | "in_progress" | "done";
  priority: number;
  estimatedHours?: string;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  startAt: string;
  estimatedHours: number;
  priority: number;
}

export async function getTasksApi() {
  return apiRequest<Task[]>({
    url: "/tasks",
    method: "GET",
  });
}

export async function createTaskApi(taskData: CreateTaskPayload) {
  return apiRequest<Task>({
    url: "/tasks",
    method: "POST",
    data: taskData,
  });
}
