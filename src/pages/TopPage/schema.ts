import { z } from 'zod';

/**
 * Zod schema for login form validation
 */
export const loginFormSchema = z.object({
  password: z
    .string()
    .min(1, 'パスワードを入力してください')
    .min(4, 'パスワードは4文字以上である必要があります'),
});

/**
 * TypeScript type inferred from Zod schema
 */
export type LoginFormData = z.infer<typeof loginFormSchema>;
