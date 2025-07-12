import type { z } from 'zod'
import type {
  FormElement,
  FormSchema as FormSchemaType,
} from '../../shared/types/api.types'
import { ValidationError } from '../../shared/utils/error.utils'
import {
  createDynamicValidator,
  validateFormElement,
} from '../../shared/utils/validation.utils'

export class FormSchema {
  private readonly _elements: FormElement[]

  constructor(schema: FormSchemaType) {
    if (!schema.elements || schema.elements.length === 0) {
      throw new ValidationError('Form schema must contain at least one element')
    }

    this.validateSchema(schema)
    this._elements = schema.elements
  }

  get elements(): FormElement[] {
    return [...this._elements]
  }

  get value(): FormSchemaType {
    return {
      elements: this.elements,
    }
  }

  validateResponseData(data: Record<string, unknown>): {
    isValid: boolean
    errors: Record<string, string[]>
  } {
    const errors: Record<string, string[]> = {}
    let isValid = true

    for (const element of this._elements) {
      const value = data[element.name]
      const validation = validateFormElement(element, value)

      if (!validation.isValid) {
        errors[element.name] = validation.errors
        isValid = false
      }
    }

    return { isValid, errors }
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  createDynamicValidator(): z.ZodObject<any> {
    return createDynamicValidator(this._elements)
  }

  getElementById(id: string): FormElement | undefined {
    return this._elements.find((element) => element.id === id)
  }

  getElementByName(name: string): FormElement | undefined {
    return this._elements.find((element) => element.name === name)
  }

  private validateSchema(schema: FormSchemaType): void {
    const elementNames = new Set<string>()
    const elementIds = new Set<string>()

    for (const element of schema.elements) {
      if (elementNames.has(element.name)) {
        throw new ValidationError(`Duplicate element name: ${element.name}`)
      }

      if (elementIds.has(element.id)) {
        throw new ValidationError(`Duplicate element id: ${element.id}`)
      }

      elementNames.add(element.name)
      elementIds.add(element.id)

      this.validateElement(element)
    }
  }

  private validateElement(element: FormElement): void {
    if (element.type === 'radio' || element.type === 'select') {
      if (!element.options || element.options.length === 0) {
        throw new ValidationError(
          `Element ${element.name} of type ${element.type} must have options`
        )
      }
    }

    if (element.validation) {
      if (
        element.validation.minLength !== undefined &&
        element.validation.maxLength !== undefined
      ) {
        if (element.validation.minLength > element.validation.maxLength) {
          throw new ValidationError(
            `Element ${element.name}: minLength cannot be greater than maxLength`
          )
        }
      }

      if (
        element.validation.min !== undefined &&
        element.validation.max !== undefined
      ) {
        if (element.validation.min > element.validation.max) {
          throw new ValidationError(
            `Element ${element.name}: min cannot be greater than max`
          )
        }
      }
    }
  }
}
