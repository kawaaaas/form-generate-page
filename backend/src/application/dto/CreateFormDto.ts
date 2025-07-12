import type { FormSchema, FormSettings } from '../../shared/types/api.types'

export interface CreateFormDto {
  title: string
  description?: string
  schema: FormSchema
  settings: FormSettings
  password?: string
}
