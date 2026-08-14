import { getTasksApi } from "@/lib/apis/tasks.api";
import { KanbanBoard } from "@/components/kanban-board";
import { Task } from "@/lib/apis/tasks.api";

export default async function KanbanPage() {
    let tasks: Task[] = [] ;
    try {
        const res = await getTasksApi();
        tasks = res.items || [];
    } catch (error) {
        console.error("Failed to fetch tasks for kanban", error);
    }

    return (
        <div className="flex flex-col h-full gap-4">
            <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold tracking-tight">Kanban Board</h1>
                <p className="text-muted-foreground text-sm">
                    Manage and organize your tasks visually.
                </p>
            </div>
            
            <div className="flex-1 w-full">
                <KanbanBoard initialTasks={tasks} />
            </div>
        </div>
    );
}
