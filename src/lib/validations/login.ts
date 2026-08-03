import { z } from "zod";

export const loginSchema = z.object({
  phone: z.string().min(9).max(15),
  password: z.string().min(6).max(100),
});
