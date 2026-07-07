import { z } from "zod";

export type LoginErrors = {
  form?: string;
  email?: string;
  password?: string;
};

export const loginSchema = z.object({
  email: z
    .email({ error: "Please enter a valid email address." })
    .trim()
    .toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export type LoginSchema = z.infer<typeof loginSchema>;
