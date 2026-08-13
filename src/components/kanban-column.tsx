import { Task, TaskStatus } from "@/lib/apis/tasks.api";
import { KanbanCard } from "./kanban-card";
import { cn } from "@/lib/utils/cn";
import { Circle, Clock, CheckCircle2, CircleDashed } from "lucide-react";

interface KanbanColumnProps {
  status: TaskStatus;
  title: string;
  tasks: Task[];
}

export function KanbanColumn({ status, title, tasks }: KanbanColumnProps) {
  const getStatusIcon = () => {
    switch (status) {
      case "todo":
        return <Circle className="w-4 h-4 text-slate-500" />;
      case "in_progress":
        return <Clock className="w-4 h-4 text-blue-500" />;
      case "done":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "pending":
        return <CircleDashed className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case "todo":
        return "bg-slate-100 dark:bg-slate-900";
      case "in_progress":
        return "bg-blue-100/50 dark:bg-blue-900/20";
      case "done":
        return "bg-green-100/50 dark:bg-green-900/20";
      case "pending":
        return "bg-amber-100/50 dark:bg-amber-900/20";
    }
  };

  return (
    <div className={cn("flex flex-col w-80 shrink-0 max-h-full rounded-xl overflow-hidden border border-border/50", getStatusColor())}>
      <div className="flex items-center justify-between p-4 pb-2">
        <div className="flex items-center gap-2">
          {getStatusIcon()}
          <h3 className="font-semibold text-sm">{title}</h3>
        </div>
        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background text-xs font-medium text-muted-foreground shadow-sm">
          {tasks.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-3 custom-scrollbar">
        {tasks.map((task) => (
          <KanbanCard key={task.id} task={task} />
        ))}
        {tasks.length === 0 && (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-border rounded-lg text-xs text-muted-foreground">
            No tasks
          </div>
        )}
      </div>
    </div>
  );
}
