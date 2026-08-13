import { Task } from "@/lib/apis/tasks.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface KanbanCardProps {
  task: Task;
}

export function KanbanCard({ task }: KanbanCardProps) {
  const getPriorityColor = (priority: number) => {
    if (priority >= 3) return "text-red-500 bg-red-50 dark:bg-red-950/50";
    if (priority === 2) return "text-amber-500 bg-amber-50 dark:bg-amber-950/50";
    return "text-green-600 bg-green-50 dark:bg-green-950/50";
  };

  const getPriorityLabel = (priority: number) => {
    if (priority >= 3) return "High";
    if (priority === 2) return "Medium";
    return "Low";
  };

  return (
    <Card className="group relative overflow-hidden transition-all hover:shadow-md hover:border-primary/50 cursor-grab active:cursor-grabbing">
      <CardHeader className="p-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm leading-tight text-foreground line-clamp-2">
            {task.title}
          </h4>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 flex flex-col gap-3">
        {task.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {task.description}
          </p>
        )}
        
        <div className="flex items-center justify-between mt-1">
          <div
            className={cn(
              "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border",
              getPriorityColor(task.priority),
              task.priority >= 3 ? "border-red-200 dark:border-red-900" : 
              task.priority === 2 ? "border-amber-200 dark:border-amber-900" : 
              "border-green-200 dark:border-green-900"
            )}
          >
            <AlertCircle className="w-3 h-3" />
            {getPriorityLabel(task.priority)}
          </div>
          
          {task.dueAt && (
            <div className="flex items-center gap-1 text-[11px] text-muted-foreground font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{new Date(task.dueAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
