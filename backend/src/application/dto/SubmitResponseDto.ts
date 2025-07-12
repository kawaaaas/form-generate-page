export interface SubmitResponseDto {
  formId: string
  data: Record<string, unknown>
  metadata?: Record<string, unknown>
}

export interface ResponseItemDto {
  id: string
  formId: string
  data: Record<string, unknown>
  metadata?: Record<string, unknown>
  createdAt: string
}
