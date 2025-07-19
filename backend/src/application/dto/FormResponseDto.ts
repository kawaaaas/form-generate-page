import type { FormSchema, FormSettings } from '../../shared/types/api.types';

export interface FormResponseDto {
  id: string;
  title: string;
  description?: string;
  schema: FormSchema;
  settings: FormSettings;
  adminId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
