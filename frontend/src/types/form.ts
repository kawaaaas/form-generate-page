// Import Zod schemas directly from backend
export {
  createFormSchema,
  formElementSchema,
  formElementTypeSchema,
  formElementValidationSchema,
  formSchemaSchema,
  formSettingsSchema,
} from '../../../backend/src/presentation/schemas/form.schemas';

export {
  responseItemSchema,
  responseListSchema,
  submitResponseSchema,
  createResponseRequestSchema,
} from '../../../backend/src/presentation/schemas/response.schemas';

// Import types from Zod schemas
import type { z } from 'zod';
import type {
  createFormSchema,
  formElementSchema,
  formElementTypeSchema,
  formElementValidationSchema,
  formSchemaSchema,
  formSettingsSchema,
} from '../../../backend/src/presentation/schemas/form.schemas';
import type {
  responseItemSchema,
  responseListSchema,
  submitResponseSchema,
  createResponseRequestSchema,
} from '../../../backend/src/presentation/schemas/response.schemas';

// Infer types from backend Zod schemas
export type FormElementType = z.infer<typeof formElementTypeSchema>;
export type FormElementValidation = z.infer<typeof formElementValidationSchema>;
export type FormElement = z.infer<typeof formElementSchema>;
export type FormSchemaType = z.infer<typeof formSchemaSchema>;
export type FormSettings = z.infer<typeof formSettingsSchema>;
export type CreateFormRequest = z.infer<typeof createFormSchema>;

// Response types
export type Response = z.infer<typeof responseItemSchema>;
export type ResponseList = z.infer<typeof responseListSchema>;
export type SubmitResponse = z.infer<typeof submitResponseSchema>;
export type CreateResponseRequest = z.infer<typeof createResponseRequestSchema>;

// Frontend-specific type aliases
export interface FormElementUI extends FormElement {}

// Form data interface for React Hook Form
export interface FormData {
  title: string;
  description?: string;
  schema: FormSchemaType;
  settings: FormSettings;
  password?: string;
}
