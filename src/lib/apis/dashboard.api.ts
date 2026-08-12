import { apiRequest } from "./axiosClient";
import { Task } from "./tasks.api";

export interface DashboardStats {
  completionRate: number;
  counters: {
    todo: number;
    inProgress: number;
    done: number;
  };
  weeklyActivity: {
    day: string;
    count: number;
  }[];
}

export async function getStatsApi() {
  return apiRequest<DashboardStats>({
    url: "/dashboard/stats",
    method: "GET",
  });
}

export async function getUpcomingTasksApi() {
  return apiRequest<Task[]>({
    url: "/dashboard/upcoming-tasks",
    method: "GET",
  });
}
