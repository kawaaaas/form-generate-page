import bcrypt from 'bcrypt'
import { z } from 'zod'
import { ValidationError } from '../../shared/utils/error.utils'

export class Password {
  private readonly _hashedValue: string
  private static readonly SALT_ROUNDS = 12

  constructor(hashedValue: string) {
    if (!hashedValue || hashedValue.trim().length === 0) {
      throw new ValidationError('Password hash cannot be empty')
    }

    this._hashedValue = hashedValue
  }

  static async fromPlainText(plainPassword: string): Promise<Password> {
    const result = z.string().min(6).safeParse(plainPassword)

    if (!result.success) {
      throw new ValidationError('Password must be at least 6 characters long')
    }

    const hashedValue = await bcrypt.hash(plainPassword, Password.SALT_ROUNDS)
    return new Password(hashedValue)
  }

  static fromHash(hashedValue: string): Password {
    return new Password(hashedValue)
  }

  async verify(plainPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(plainPassword, this._hashedValue)
    } catch (error) {
      return false
    }
  }

  get hashedValue(): string {
    return this._hashedValue
  }
}
