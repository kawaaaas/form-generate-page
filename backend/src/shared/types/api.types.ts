export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginationResponse<T> {
  items: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export type FormElementType =
  | 'input'
  | 'textarea'
  | 'radio'
  | 'select'
  | 'checkbox'
  | 'date'
  | 'number';

export interface FormElementValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  customMessage?: string;
}

export interface FormElement {
  id: string;
  type: FormElementType;
  label: string;
  name: string;
  placeholder?: string;
  options?: string[];
  validation?: FormElementValidation;
}

export interface FormSchema {
  elements: FormElement[];
}

export interface FormSettings {
  requiresPassword: boolean;
  confirmationMessage?: string;
  redirectUrl?: string;
}
