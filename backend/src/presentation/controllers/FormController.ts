import { zValidator } from '@hono/zod-validator'
import { Hono } from 'hono'
import { FormService } from '../../application/services/FormService'
import { PrismaFormRepository } from '../../infrastructure/repositories/PrismaFormRepository'
import {
  createSuccessResponse,
  handleError,
} from '../../shared/utils/error.utils'
import {
  createFormSchema,
  formIdParamSchema,
  passwordVerificationSchema,
} from '../schemas/form.schemas'

const formRepository = new PrismaFormRepository()
const formService = new FormService(formRepository)

export const formController = new Hono()

formController.post(
  '/create',
  zValidator('json', createFormSchema),
  async (c) => {
    try {
      const body = c.req.valid('json')
      const form = await formService.createForm(body)

      return c.json(
        createSuccessResponse(form, 'Form created successfully'),
        201
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

formController.get(
  '/:id',
  zValidator('param', formIdParamSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const form = await formService.getForm(id)

      return c.json(createSuccessResponse(form))
    } catch (error) {
      return handleError(c, error)
    }
  }
)

formController.post(
  '/:id/verify',
  zValidator('param', formIdParamSchema),
  zValidator('json', passwordVerificationSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const { password } = c.req.valid('json')

      const form = await formService.verifyPassword(id, password)

      return c.json(
        createSuccessResponse(form, 'Password verified successfully')
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

formController.put(
  '/:id',
  zValidator('param', formIdParamSchema),
  zValidator('json', createFormSchema.partial()),
  async (c) => {
    try {
      const { id } = c.req.valid('param')
      const body = c.req.valid('json')

      const form = await formService.updateForm(id, body)

      return c.json(createSuccessResponse(form, 'Form updated successfully'))
    } catch (error) {
      return handleError(c, error)
    }
  }
)

formController.patch(
  '/:id/deactivate',
  zValidator('param', formIdParamSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')

      await formService.deactivateForm(id)

      return c.json(
        createSuccessResponse(null, 'Form deactivated successfully')
      )
    } catch (error) {
      return handleError(c, error)
    }
  }
)

formController.patch(
  '/:id/activate',
  zValidator('param', formIdParamSchema),
  async (c) => {
    try {
      const { id } = c.req.valid('param')

      await formService.activateForm(id)

      return c.json(createSuccessResponse(null, 'Form activated successfully'))
    } catch (error) {
      return handleError(c, error)
    }
  }
)
