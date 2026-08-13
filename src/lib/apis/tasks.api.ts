import { apiRequest } from "./axiosClient";

export type TaskStatus = "todo" | "pending" | "in_progress" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  startAt: string;
  dueAt?: string;
  endAt?: string;
  status: TaskStatus;
  priority: number;
  estimatedHours?: string;
  smartScore?: number;
}

export interface TaskListResponse {
  items: Task[];
  total: number;
}

export interface CreateTaskPayload {
  title: string;
  description: string;
  startAt: string;
  estimatedHours: number;
  priority: number;
}

export interface GetTasksParams {
  page?: number;
  limit?: number;
  status?: TaskStatus;
  search?: string;
}

export async function getTasksApi(params: GetTasksParams = {}) {
  return apiRequest<TaskListResponse>({
    url: "/tasks",
    method: "GET",
    params: {
      page: params.page ?? 1,
      limit: params.limit ?? 100,
      status: params.status,
      search: params.search,
    },
  });
}

export async function createTaskApi(taskData: CreateTaskPayload) {
  return apiRequest<Task>({
    url: "/tasks",
    method: "POST",
    data: taskData,
  });
}

export async function updateTaskStatusApi(taskId: string, status: TaskStatus) {
  return apiRequest<{ message: string }>({
    url: `/tasks/${taskId}/status`,
    method: "PATCH",
    data: { status },
  });
}

export interface UpdateTaskPayload {
  title: string;
  description?: string;
  startAt: string;
  endAt?: string;
  status: TaskStatus;
  priority: number;
  estimatedHours?: number;
}

export async function getTaskByIdApi(taskId: string) {
  return apiRequest<Task>({
    url: `/tasks/${taskId}`,
    method: "GET",
  });
}

export async function updateTaskApi(taskId: string, taskData: UpdateTaskPayload) {
  return apiRequest<Task>({
    url: `/tasks/${taskId}`,
    method: "PATCH",
    data: taskData,
  });
}
