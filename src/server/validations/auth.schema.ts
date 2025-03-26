import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import { z } from "zod";

import { accounts, sessions, users, verifications } from "@/server/db/auth-schema.sql";

export const userSelect = createSelectSchema(users);
export type User = z.infer<typeof userSelect>;

export const userCreate = createInsertSchema(users);
export type UserCreate = z.infer<typeof userCreate>;

export const userUpdate = createUpdateSchema(users);
export type UserUpdate = z.infer<typeof userUpdate>;

export const sessionSelect = createSelectSchema(sessions);
export type Session = z.infer<typeof sessionSelect>;

export const sessionCreate = createInsertSchema(sessions);
export type SessionCreate = z.infer<typeof sessionCreate>;

export const sessionUpdate = createUpdateSchema(sessions);
export type SessionUpdate = z.infer<typeof sessionUpdate>;

export const accountSelect = createSelectSchema(accounts);
export type Account = z.infer<typeof accountSelect>;

export const accountCreate = createInsertSchema(accounts);
export type AccountCreate = z.infer<typeof accountCreate>;

export const accountUpdate = createUpdateSchema(accounts);
export type AccountUpdate = z.infer<typeof accountUpdate>;

export const verificationSelect = createSelectSchema(verifications);
export type Verification = z.infer<typeof verificationSelect>;

export const verificationCreate = createInsertSchema(verifications);
export type VerificationCreate = z.infer<typeof verificationCreate>;

export const verificationUpdate = createUpdateSchema(verifications);
export type VerificationUpdate = z.infer<typeof verificationUpdate>;

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z.string().min(2, {
      message: "Name must be at least 2 characters",
    }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export type RegisterSchema = z.infer<typeof registerSchema>;
