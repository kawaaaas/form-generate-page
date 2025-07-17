import { z } from 'zod';
import { ValidationError } from '../../shared/utils/error.utils';

export class FormId {
  private readonly _value: string;

  constructor(value: string) {
    const result = z.string().uuid().safeParse(value);

    if (!result.success) {
      throw new ValidationError('Invalid FormId format', { value });
    }

    this._value = result.data;
  }

  get value(): string {
    return this._value;
  }

  static generate(): FormId {
    return new FormId(crypto.randomUUID());
  }

  equals(other: FormId): boolean {
    return this._value === other._value;
  }

  toString(): string {
    return this._value;
  }
}
