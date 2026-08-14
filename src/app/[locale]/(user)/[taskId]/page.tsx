import { getTaskByIdApi } from "@/lib/apis/tasks.api";
import { notFound } from "next/navigation";
import { TaskDetailForm } from "./task-detail-form";

export default async function TaskDetailPage({
  params,
}: {
  params: Promise<{ taskId: string; locale: string }>;
}) {
  const { taskId } = await params;

  try {
    const task = await getTaskByIdApi(taskId);
    
    if (!task) {
      return notFound();
    }

    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <TaskDetailForm task={task} />
      </div>
    );
  } catch (error) {
    return notFound();
  }
}
