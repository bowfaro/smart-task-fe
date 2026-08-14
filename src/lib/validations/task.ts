import { z } from "zod";

export const updateTaskSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  startAt: z.string().min(1, { message: "Start date is required" }),
  endAt: z.string().optional(),
  status: z.enum(["todo", "pending", "in_progress", "done"], {
    message: "Status is required",
  }),
  priority: z.coerce.number().min(1).max(5),
  estimatedHours: z.coerce.number().optional(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
