import type { Context } from 'hono'
import type { ZodError } from 'zod'
import type { ApiError, ApiResponse } from '../types/api.types'

export class AppError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly statusCode: number = 500,
    public readonly details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'AppError'
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: Record<string, unknown>) {
    super('VALIDATION_ERROR', message, 400, details)
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string, id?: string) {
    super(
      'NOT_FOUND',
      `${resource}${id ? ` with id ${id}` : ''} not found`,
      404
    )
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super('UNAUTHORIZED', message, 401)
  }
}

export function formatZodError(error: ZodError): ApiError {
  const details: Record<string, string[]> = {}

  for (const issue of error.issues) {
    const path = issue.path.join('.')
    if (!details[path]) {
      details[path] = []
    }
    details[path].push(issue.message)
  }

  return {
    code: 'VALIDATION_ERROR',
    message: 'Validation failed',
    details,
  }
}

export function createErrorResponse<T = never>(
  error: string | ApiError | AppError
): ApiResponse<T> {
  if (typeof error === 'string') {
    return {
      success: false,
      error,
    }
  }

  if (error instanceof AppError) {
    return {
      success: false,
      error: error.message,
      ...(error.details && { details: error.details }),
    }
  }

  return {
    success: false,
    error: error.message,
    ...(error.details && { details: error.details }),
  }
}

export function createSuccessResponse<T>(
  data: T,
  message?: string
): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(message && { message }),
  }
}

export function handleError(c: Context, error: unknown): Response {
  console.error('Error occurred:', error)

  if (error instanceof AppError) {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    return c.json(createErrorResponse(error), error.statusCode as any)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  return c.json(createErrorResponse('Internal server error'), 500 as any)
}
