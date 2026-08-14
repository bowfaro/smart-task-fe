import { Task } from "@/lib/apis/tasks.api";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, AlertCircle } from "lucide-react";
import { PRIORITY_META } from "@/lib/utils/constant";

interface KanbanCardProps {
  task: Task;
}

export function KanbanCard({ task }: KanbanCardProps) {
  const key = PRIORITY_META[task.priority]?.key ?? PRIORITY_META[1].key;
  const label = PRIORITY_META[task.priority]?.label ?? PRIORITY_META[1].label;

  const badgeStyle = {
    color: `var(--priority-${key}-text)`,
    backgroundColor: `var(--priority-${key}-bg)`,
    borderColor: `var(--priority-${key}-border)`,
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
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold border"
            style={badgeStyle}
          >
            <AlertCircle className="w-3 h-3" />
            {label}
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
