import { Response } from '../../domain/entities/Response';
import type { ResponseRepository } from '../../domain/repositories/ResponseRepository';
import { FormId } from '../../domain/value-objects/FormId';
import { prisma } from '../database/PrismaClient';

export class PrismaResponseRepository implements ResponseRepository {
  async save(response: Response): Promise<void> {
    const data = {
      id: response.id,
      formId: response.formId.value,
      data: JSON.stringify(response.data),
      metadata: response.metadata ? JSON.stringify(response.metadata) : null,
      createdAt: response.createdAt,
    };

    await prisma.response.create({ data });
  }

  async findById(id: string): Promise<Response | null> {
    const responseData = await prisma.response.findUnique({
      where: { id },
    });

    if (!responseData) {
      return null;
    }

    return this.toDomainEntity(responseData);
  }

  async findByFormId(
    formId: FormId,
    options?: { limit?: number; offset?: number },
  ): Promise<Response[]> {
    const responses = await prisma.response.findMany({
      where: { formId: formId.value },
      orderBy: { createdAt: 'desc' },
      take: options?.limit,
      skip: options?.offset,
    });

    return responses.map((response) => this.toDomainEntity(response));
  }

  async countByFormId(formId: FormId): Promise<number> {
    return await prisma.response.count({
      where: { formId: formId.value },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.response.delete({
      where: { id },
    });
  }

  async deleteByFormId(formId: FormId): Promise<void> {
    await prisma.response.deleteMany({
      where: { formId: formId.value },
    });
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  private toDomainEntity(data: any): Response {
    return new Response({
      id: data.id,
      formId: new FormId(data.formId),
      data: JSON.parse(data.data),
      metadata: data.metadata ? JSON.parse(data.metadata) : undefined,
      createdAt: data.createdAt,
    });
  }
}
