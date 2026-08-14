import { getTasksApi } from "@/lib/apis/tasks.api";
import { TasksTable } from "./tasks-table";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function TasksPage({ searchParams }: Props) {
  try {
    const resolvedSearchParams = await searchParams;
    const page = Number(resolvedSearchParams.page) || 1;
    const limit = 10;
    const data = await getTasksApi({ page, limit });

    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <TasksTable 
          initialTasks={data.items} 
          total={data.total}
          page={page}
          limit={limit}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="flex-1 p-4 md:p-8 pt-6 text-center text-red-500">
        Failed to load tasks.
      </div>
    );
  }
}
