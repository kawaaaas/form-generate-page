import { z } from 'zod';
import { uuidSchema } from './common.schemas';

export const formElementTypeSchema = z.enum([
  'input',
  'textarea',
  'radio',
  'select',
  'checkbox',
  'date',
  'number',
]);

export const formElementValidationSchema = z.object({
  required: z.boolean().optional(),
  minLength: z.number().int().min(0).optional(),
  maxLength: z.number().int().min(0).optional(),
  min: z.number().optional(),
  max: z.number().optional(),
  pattern: z.string().optional(),
  customMessage: z.string().optional(),
});

export const formElementSchema = z.object({
  id: z.string(),
  type: formElementTypeSchema,
  label: z.string().min(1),
  name: z.string().min(1),
  placeholder: z.string().optional(),
  options: z.array(z.string()).optional(),
  validation: formElementValidationSchema.optional(),
});

export const formSchemaSchema = z.object({
  elements: z.array(formElementSchema).min(1),
});

export const formSettingsSchema = z.object({
  requiresPassword: z.boolean(),
  confirmationMessage: z.string().optional(),
  redirectUrl: z.string().url().optional(),
});

export const createFormSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  schema: formSchemaSchema,
  settings: formSettingsSchema,
  password: z.string().min(6).optional(),
});

export const formIdParamSchema = z.object({
  id: uuidSchema,
});

export const passwordVerificationSchema = z.object({
  password: z.string().min(1),
});

export const formResponseSchema = z.object({
  id: uuidSchema,
  title: z.string(),
  description: z.string().nullable(),
  schema: formSchemaSchema,
  settings: formSettingsSchema,
  isActive: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
