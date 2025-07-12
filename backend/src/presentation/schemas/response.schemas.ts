import { z } from 'zod'
import { uuidSchema } from './common.schemas'

export const submitResponseSchema = z.object({
  formId: uuidSchema,
  data: z.record(z.unknown()),
  metadata: z.record(z.unknown()).optional(),
})

export const responseIdParamSchema = z.object({
  id: uuidSchema,
})

export const formIdParamSchema = z.object({
  formId: uuidSchema,
})

export const responseDataSchema = z.record(z.unknown())

export const responseItemSchema = z.object({
  id: uuidSchema,
  formId: uuidSchema,
  data: responseDataSchema,
  metadata: z.record(z.unknown()).nullable(),
  createdAt: z.string().datetime(),
})

export const responseListSchema = z.array(responseItemSchema)

export const createResponseRequestSchema = z.object({
  data: responseDataSchema,
  metadata: z.record(z.unknown()).optional(),
})
