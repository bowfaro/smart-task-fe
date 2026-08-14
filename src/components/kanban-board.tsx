"use client";

import { Task, TaskStatus } from "@/lib/apis/tasks.api";
import { KanbanColumn } from "./kanban-column";

interface KanbanBoardProps {
  initialTasks: Task[];
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "done", title: "Done" },
  { id: "pending", title: "Pending" },
];

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  return (
    <div className="flex h-[calc(100vh-140px)] w-full overflow-x-auto overflow-y-hidden gap-6 pb-4 pt-2">
      {COLUMNS.map((column) => {
        const columnTasks = initialTasks.filter((task) => task.status === column.id);
        
        return (
          <KanbanColumn
            key={column.id}
            status={column.id}
            title={column.title}
            tasks={columnTasks}
          />
        );
      })}
    </div>
  );
}
