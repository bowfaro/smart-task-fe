import { z } from "zod";

export const registerSchema = z.object({
  phone: z.string().min(10).max(15),
  password: z.string().min(6).max(100),
  fullName: z.string().min(1),
});
