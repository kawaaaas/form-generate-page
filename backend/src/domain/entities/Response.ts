import { ValidationError } from '../../shared/utils/error.utils'
import { sanitizeInput } from '../../shared/utils/validation.utils'
import type { FormId } from '../value-objects/FormId'

export interface ResponseProps {
  id: string
  formId: FormId
  data: Record<string, unknown>
  metadata?: Record<string, unknown>
  createdAt: Date
}

export class Response {
  private readonly _id: string
  private readonly _formId: FormId
  private readonly _data: Record<string, unknown>
  private readonly _metadata?: Record<string, unknown>
  private readonly _createdAt: Date

  constructor(props: ResponseProps) {
    this.validateProps(props)

    this._id = props.id
    this._formId = props.formId
    this._data = this.sanitizeData(props.data)
    this._metadata = props.metadata
      ? this.sanitizeData(props.metadata)
      : undefined
    this._createdAt = props.createdAt
  }

  static create(
    formId: FormId,
    data: Record<string, unknown>,
    metadata?: Record<string, unknown>
  ): Response {
    return new Response({
      id: crypto.randomUUID(),
      formId,
      data,
      metadata,
      createdAt: new Date(),
    })
  }

  get id(): string {
    return this._id
  }

  get formId(): FormId {
    return this._formId
  }

  get data(): Record<string, unknown> {
    return { ...this._data }
  }

  get metadata(): Record<string, unknown> | undefined {
    return this._metadata ? { ...this._metadata } : undefined
  }

  get createdAt(): Date {
    return new Date(this._createdAt)
  }

  getValue(fieldName: string): unknown {
    return this._data[fieldName]
  }

  hasField(fieldName: string): boolean {
    return fieldName in this._data
  }

  getFieldNames(): string[] {
    return Object.keys(this._data)
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  toJSON(): any {
    return {
      id: this._id,
      formId: this._formId.value,
      data: this._data,
      metadata: this._metadata,
      createdAt: this._createdAt.toISOString(),
    }
  }

  private validateProps(props: ResponseProps): void {
    if (!props.id || props.id.trim().length === 0) {
      throw new ValidationError('Response ID cannot be empty')
    }

    if (!props.data || Object.keys(props.data).length === 0) {
      throw new ValidationError('Response data cannot be empty')
    }

    for (const [key] of Object.entries(props.data)) {
      if (typeof key !== 'string' || key.trim().length === 0) {
        throw new ValidationError(
          'Response data keys must be non-empty strings'
        )
      }
    }
  }

  private sanitizeData(data: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {}

    for (const [key, value] of Object.entries(data)) {
      sanitized[key] = sanitizeInput(value)
    }

    return sanitized
  }
}
