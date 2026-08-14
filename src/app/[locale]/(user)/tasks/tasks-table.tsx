"use client";

import { useState, useTransition } from "react";
import { Task } from "@/lib/apis/tasks.api";
import { deleteTaskAction } from "@/lib/actions/delete-task.action";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils/cn";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit2, Trash2 } from "lucide-react";
import { PRIORITY_META, STATUS_STYLES } from "@/lib/utils/constant";


function StatusBadge({ status, label }: { status: string; label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
        STATUS_STYLES[status] ?? "bg-muted text-muted-foreground"
      )}
    >
      {label}
    </span>
  );
}

function PriorityBadge({ priority }: { priority: number }) {
  const { key, label } = PRIORITY_META[priority] ?? PRIORITY_META[1];
  return (
    <span
      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold border"
      style={{
        color:           `var(--priority-${key}-text)`,
        backgroundColor: `var(--priority-${key}-bg)`,
        borderColor:     `var(--priority-${key}-border)`,
      }}
    >
      <span
        className="h-1.5 w-1.5 rounded-full shrink-0"
        style={{ backgroundColor: `var(--priority-${key}-dot)` }}
      />
      {label}
    </span>
  );
}


function DeleteConfirmPopover({
  onConfirm,
  disabled,
}: {
  onConfirm: () => void;
  disabled: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" title="Delete" disabled={disabled}>
          <Trash2 className="h-4 w-4 text-destructive" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-52 p-3" align="end">
        <p className="mb-3 text-sm font-medium">Delete this task?</p>
        <div className="flex justify-end gap-2">
          <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function TasksTable({
  initialTasks,
  total,
  page,
  limit,
}: {
  initialTasks: Task[];
  total?: number;
  page?: number;
  limit?: number;
}) {
  const t = useTranslations("tasksList");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [isPending, startTransition] = useTransition();

  const handleDelete = (taskId: string) => {
    startTransition(async () => {
      const result = await deleteTaskAction(taskId);
      if (result.success) {
        toast.success("Task deleted");
        setTasks((prev) => prev.filter((t) => t.id !== taskId));
      } else {
        toast.error(result.error || "Failed to delete task");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>{t("columns.title")}</TableHead>
              <TableHead>{t("columns.status")}</TableHead>
              <TableHead>{t("columns.priority")}</TableHead>
              <TableHead>{t("columns.startAt")}</TableHead>
              <TableHead>Est. hrs</TableHead>
              <TableHead className="text-right">{t("columns.actions")}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium max-w-[200px]">
                  <span className="line-clamp-1">{task.title}</span>
                </TableCell>

                <TableCell>
                  <StatusBadge
                    status={task.status}
                    label={t(`status.${task.status}`)}
                  />
                </TableCell>

                <TableCell>
                  <PriorityBadge priority={task.priority} />
                </TableCell>

                <TableCell className="text-sm text-muted-foreground whitespace-nowrap">
                  {task.startAt ? new Date(task.startAt).toLocaleDateString() : "—"}
                </TableCell>

                <TableCell className="text-sm text-muted-foreground">
                  {task.estimatedHours ? `${task.estimatedHours}h` : "—"}
                </TableCell>

                <TableCell className="text-right">
                  <div className="flex justify-end items-center gap-1">
                    <Link href={`/${task.id}`}>
                      <Button variant="ghost" size="icon" title={t("actions.view")}>
                        <Edit2 className="h-4 w-4" />
                      </Button>
                    </Link>
                    <DeleteConfirmPopover
                      onConfirm={() => handleDelete(task.id)}
                      disabled={isPending}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {tasks.length === 0 && (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-10 text-muted-foreground"
                >
                  No tasks found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
