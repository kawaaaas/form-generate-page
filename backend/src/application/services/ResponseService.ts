import { Response } from '../../domain/entities/Response'
import type { FormRepository } from '../../domain/repositories/FormRepository'
import type { ResponseRepository } from '../../domain/repositories/ResponseRepository'
import { FormId } from '../../domain/value-objects/FormId'
import { NotFoundError, ValidationError } from '../../shared/utils/error.utils'
import type {
  ResponseItemDto,
  SubmitResponseDto,
} from '../dto/SubmitResponseDto'

export class ResponseService {
  constructor(
    private readonly responseRepository: ResponseRepository,
    private readonly formRepository: FormRepository
  ) {}

  async submitResponse(dto: SubmitResponseDto): Promise<ResponseItemDto> {
    const formId = new FormId(dto.formId)

    const form = await this.formRepository.findById(formId)
    if (!form) {
      throw new NotFoundError('Form', dto.formId)
    }

    if (!form.isActive) {
      throw new ValidationError('Form is not active')
    }

    const validation = form.validateResponseData(dto.data)
    if (!validation.isValid) {
      throw new ValidationError(
        'Response data validation failed',
        validation.errors
      )
    }

    const response = Response.create(formId, dto.data, dto.metadata)

    await this.responseRepository.save(response)

    return this.toResponseDto(response)
  }

  async getResponse(id: string): Promise<ResponseItemDto> {
    const response = await this.responseRepository.findById(id)

    if (!response) {
      throw new NotFoundError('Response', id)
    }

    return this.toResponseDto(response)
  }

  async getResponsesForForm(
    formId: string,
    options?: { limit?: number; offset?: number }
  ): Promise<ResponseItemDto[]> {
    const formIdObj = new FormId(formId)

    const form = await this.formRepository.findById(formIdObj)
    if (!form) {
      throw new NotFoundError('Form', formId)
    }

    const responses = await this.responseRepository.findByFormId(
      formIdObj,
      options
    )

    return responses.map((response) => this.toResponseDto(response))
  }

  async getResponseCountForForm(formId: string): Promise<number> {
    const formIdObj = new FormId(formId)

    const form = await this.formRepository.findById(formIdObj)
    if (!form) {
      throw new NotFoundError('Form', formId)
    }

    return await this.responseRepository.countByFormId(formIdObj)
  }

  async deleteResponse(id: string): Promise<void> {
    const response = await this.responseRepository.findById(id)

    if (!response) {
      throw new NotFoundError('Response', id)
    }

    await this.responseRepository.delete(id)
  }

  async deleteResponsesForForm(formId: string): Promise<void> {
    const formIdObj = new FormId(formId)

    const form = await this.formRepository.findById(formIdObj)
    if (!form) {
      throw new NotFoundError('Form', formId)
    }

    await this.responseRepository.deleteByFormId(formIdObj)
  }

  private toResponseDto(response: Response): ResponseItemDto {
    const json = response.toJSON()
    return {
      id: json.id,
      formId: json.formId,
      data: json.data,
      metadata: json.metadata,
      createdAt: json.createdAt,
    }
  }
}
