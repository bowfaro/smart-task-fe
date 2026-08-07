import { z } from "zod";

export const loginSchema = z.object({
  countryCode: z.string().min(1),
  phone: z.string().regex(/^\d+$/).min(9).max(15),
  password: z.string().min(6).max(100),
});

