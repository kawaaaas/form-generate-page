import { z } from 'zod';
import type { FormElement, FormElementValidation } from '../types/api.types';

export function createDynamicValidator(
  elements: FormElement[],
): z.ZodObject<Record<string, z.ZodType>> {
  const shape: Record<string, z.ZodType> = {};

  for (const element of elements) {
    let validator: z.ZodType;

    switch (element.type) {
      case 'input':
      case 'textarea':
        validator = z.string();
        break;
      case 'number':
        validator = z.number();
        break;
      case 'date':
        validator = z.string().date();
        break;
      case 'radio':
      case 'select':
        validator = z.string();
        if (element.options) {
          validator = z.enum(element.options as [string, ...string[]]);
        }
        break;
      case 'checkbox':
        validator = z.array(z.string());
        break;
      default:
        validator = z.string();
    }

    if (element.validation) {
      validator = applyValidationRules(validator, element.validation);
    }

    if (!element.validation?.required) {
      validator = validator.optional();
    }

    shape[element.name] = validator;
  }

  return z.object(shape);
}

function applyValidationRules(
  validator: z.ZodType,
  validation: FormElementValidation,
): z.ZodType {
  let result = validator;

  if (result instanceof z.ZodString) {
    if (validation.minLength !== undefined) {
      result = result.min(validation.minLength);
    }
    if (validation.maxLength !== undefined) {
      result = (result as z.ZodString).max(validation.maxLength);
    }
    if (validation.pattern) {
      result = (result as z.ZodString).regex(new RegExp(validation.pattern));
    }
  }

  if (result instanceof z.ZodNumber) {
    if (validation.min !== undefined) {
      result = result.min(validation.min);
    }
    if (validation.max !== undefined) {
      result = (result as z.ZodNumber).max(validation.max);
    }
  }

  return result;
}

export function sanitizeInput(input: unknown): unknown {
  if (typeof input === 'string') {
    return input.trim();
  }

  if (Array.isArray(input)) {
    return input.map(sanitizeInput);
  }

  if (input && typeof input === 'object') {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(input)) {
      sanitized[key] = sanitizeInput(value);
    }
    return sanitized;
  }

  return input;
}

export function validateFormElement(
  element: FormElement,
  value: unknown,
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (element.validation?.required && (!value || value === '')) {
    errors.push(`${element.label} is required`);
  }

  if (value && typeof value === 'string') {
    if (
      element.validation?.minLength &&
      value.length < element.validation.minLength
    ) {
      errors.push(
        `${element.label} must be at least ${element.validation.minLength} characters`,
      );
    }

    if (
      element.validation?.maxLength &&
      value.length > element.validation.maxLength
    ) {
      errors.push(
        `${element.label} must be at most ${element.validation.maxLength} characters`,
      );
    }

    if (
      element.validation?.pattern &&
      !new RegExp(element.validation.pattern).test(value)
    ) {
      errors.push(
        element.validation.customMessage ||
          `${element.label} format is invalid`,
      );
    }
  }

  if (value && typeof value === 'number') {
    if (
      element.validation?.min !== undefined &&
      value < element.validation.min
    ) {
      errors.push(
        `${element.label} must be at least ${element.validation.min}`,
      );
    }

    if (
      element.validation?.max !== undefined &&
      value > element.validation.max
    ) {
      errors.push(`${element.label} must be at most ${element.validation.max}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
