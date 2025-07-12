import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { ResponseService } from '../../application/services/ResponseService'
import { PrismaFormRepository } from '../../infrastructure/repositories/PrismaFormRepository'
import { PrismaResponseRepository } from '../../infrastructure/repositories/PrismaResponseRepository'
import {
  createSuccessResponse,
  handleError,
} from '../../shared/utils/error.utils'
import {
  createResponseRequestSchema,
  formIdParamSchema,
  responseIdParamSchema,
  submitResponseSchema,
} from '../schemas/response.schemas'

const responseRepository = new PrismaResponseRepository()
const formRepository = new PrismaFormRepository()
const responseService = new ResponseService(responseRepository, formRepository)

export const responseController = new Hono()

responseController.post(
  '/create',
  zValidator('json', submitResponseSchema),
  async (c) => {
    try {
      const body = c.req.valid('json')
      const response = await responseService.submitResponse(body)

      return c.json(
        createSuccessResponse(response, 'Response submitted successfully'),
        201
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

responseController.post(
  '/form/:formId',
  zValidator('param', formIdParamSchema),
  zValidator('json', createResponseRequestSchema),
  async (c) => {
    try {
      const { formId } = c.req.valid('param')
      const body = c.req.valid('json')

      const submitDto = {
        formId,
        data: body.data,
        metadata: body.metadata,
      }

      const response = await responseService.submitResponse(submitDto)

      return c.json(
        createSuccessResponse(response, 'Response submitted successfully'),
        201
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

responseController.get(
  '/form/:formId',
  zValidator('param', formIdParamSchema),
  async (c) => {
    try {
      const { formId } = c.req.valid('param')
      const limit = c.req.query('limit')
        ? Number.parseInt(c.req.query('limit') ?? '0')
        : undefined
      const offset = c.req.query('offset')
        ? Number.parseInt(c.req.query('offset') ?? '0')
        : undefined

      const responses = await responseService.getResponsesForForm(formId, {
        limit,
        offset,
      })

      return c.json(createSuccessResponse(responses))
    } catch (error) {
      return handleError(c, error)
    }
  }
)

responseController.get(
  '/:id',
  zValidator('param', responseIdParamSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const response = await responseService.getResponse(id)

      return c.json(createSuccessResponse(response))
    } catch (error) {
      return handleError(c, error)
    }
  }
)

responseController.delete(
  '/:id',
  zValidator('param', responseIdParamSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')

      await responseService.deleteResponse(id)

      return c.json(
        createSuccessResponse(null, 'Response deleted successfully')
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

responseController.delete(
  '/form/:formId',
  zValidator('param', formIdParamSchema),
  async (c) => {
    try {
      const { formId } = c.req.valid('param')

      await responseService.deleteResponsesForForm(formId)

      return c.json(
        createSuccessResponse(
          null,
          'All responses for form deleted successfully'
        )
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)
