import { Form } from '../../domain/entities/Form'
import type { FormRepository } from '../../domain/repositories/FormRepository'
import { FormId } from '../../domain/value-objects/FormId'
import { FormSchema } from '../../domain/value-objects/FormSchema'
import { Password } from '../../domain/value-objects/Password'
import type { FormSettings } from '../../shared/types/api.types'
import { prisma } from '../database/PrismaClient'

export class PrismaFormRepository implements FormRepository {
  async save(form: Form): Promise<void> {
    const data = {
      id: form.id.value,
      title: form.title,
      description: form.description || null,
      schema: JSON.stringify(form.schema.value),
      settings: JSON.stringify(form.settings),
      password: form.getPasswordHash() || null,
      isActive: form.isActive,
      createdAt: form.createdAt,
      updatedAt: form.updatedAt,
    }

    await prisma.form.create({ data })
  }

  async findById(id: FormId): Promise<Form | null> {
    const formData = await prisma.form.findUnique({
      where: { id: id.value },
      select: {
        id: true,
        title: true,
        description: true,
        schema: true,
        settings: true,
        password: false,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    if (!formData) {
      return null
    }

    return this.toDomainEntity(formData, false)
  }

  async findByIdWithPassword(id: FormId): Promise<Form | null> {
    const formData = await prisma.form.findUnique({
      where: { id: id.value },
    })

    if (!formData) {
      return null
    }

    return this.toDomainEntity(formData, true)
  }

  async update(form: Form): Promise<void> {
    await prisma.form.update({
      where: { id: form.id.value },
      data: {
        title: form.title,
        description: form.description || null,
        settings: JSON.stringify(form.settings),
        isActive: form.isActive,
        updatedAt: form.updatedAt,
      },
    })
  }

  async delete(id: FormId): Promise<void> {
    await prisma.form.delete({
      where: { id: id.value },
    })
  }

  async findAll(options?: {
    isActive?: boolean
    limit?: number
    offset?: number
  }): Promise<Form[]> {
    const where =
      options?.isActive !== undefined
        ? { isActive: options.isActive }
        : undefined

    const forms = await prisma.form.findMany({
      where,
      select: {
        id: true,
        title: true,
        description: true,
        schema: true,
        settings: true,
        password: false,
        isActive: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: options?.limit,
      skip: options?.offset,
    })

    return forms.map((form) => this.toDomainEntity(form, false))
  }

  async count(options?: { isActive?: boolean }): Promise<number> {
    const where =
      options?.isActive !== undefined
        ? { isActive: options.isActive }
        : undefined

    return await prisma.form.count({ where })
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private toDomainEntity(data: any, includePassword: boolean): Form {
    const schema = new FormSchema(JSON.parse(data.schema))
    const settings: FormSettings = JSON.parse(data.settings)

    let password: Password | undefined
    if (includePassword && data.password) {
      password = Password.fromHash(data.password)
    }

    return new Form({
      id: new FormId(data.id),
      title: data.title,
      description: data.description,
      schema,
      settings,
      password,
      isActive: data.isActive,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
    })
  }
}
