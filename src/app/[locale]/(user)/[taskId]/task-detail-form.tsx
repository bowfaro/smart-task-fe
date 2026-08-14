"use client";

import {  useTransition } from "react";
import { Task } from "@/lib/apis/tasks.api";
import { updateTaskAction } from "@/lib/actions/update-task.action";
import { updateTaskSchema, UpdateTaskInput } from "@/lib/validations/task";
import { useForm, Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export function TaskDetailForm({ task }: { task: Task }) {
  const t = useTranslations("taskDetail");
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskSchema) as Resolver<UpdateTaskInput>,
    defaultValues: {
      title: task.title,
      description: task.description || "",
      startAt: task.startAt,
      endAt: task.endAt || "",
      status: task.status,
      priority: task.priority,
      estimatedHours: task.estimatedHours ? Number(task.estimatedHours) : undefined,
    },
  });

  const onSubmit = (data: UpdateTaskInput) => {
    startTransition(async () => {
      const result = await updateTaskAction(task.id, {
        title: data.title,
        description: data.description,
        startAt: data.startAt,
        endAt: data.endAt,
        status: data.status,
        priority: data.priority,
        estimatedHours: data.estimatedHours,
      });

      if (result.success) {
        toast.success(t("saveSuccess"));
        router.back();
      } else {
        toast.error(result.error || t("saveError"));
      }
    });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center gap-2 mb-2">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <CardTitle className="text-2xl">{t("title")}</CardTitle>
        </div>
        <CardDescription>{t("description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("taskTitle")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("taskDescription")}</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="startAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("startAt")}</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="endAt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("endAt")}</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("status")}</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="todo">To Do</option>
                        <option value="pending">Pending</option>
                        <option value="in_progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("priority")}</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={field.value}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                      >
                        <option value={1}>Very Low</option>
                        <option value={2}>Low</option>
                        <option value={3}>Medium</option>
                        <option value={4}>High</option>
                        <option value={5}>Very High</option>
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="estimatedHours"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("estimatedHours")}</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.5"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Saving..." : t("save")}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
