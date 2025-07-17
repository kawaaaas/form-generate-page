import { z } from 'zod';

export const uuidSchema = z.string().uuid();

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
});

export const errorResponseSchema = z.object({
  success: z.literal(false),
  error: z.string(),
  details: z.record(z.unknown()).optional(),
});

export const successResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.object({
    success: z.literal(true),
    data: dataSchema,
    message: z.string().optional(),
  });

export const apiResponseSchema = <T extends z.ZodType>(dataSchema: T) =>
  z.union([successResponseSchema(dataSchema), errorResponseSchema]);
