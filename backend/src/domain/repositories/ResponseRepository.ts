import type { Response } from '../entities/Response';
import type { FormId } from '../value-objects/FormId';

export interface ResponseRepository {
  save(response: Response): Promise<void>;
  findById(id: string): Promise<Response | null>;
  findByFormId(
    formId: FormId,
    options?: {
      limit?: number;
      offset?: number;
    },
  ): Promise<Response[]>;
  countByFormId(formId: FormId): Promise<number>;
  delete(id: string): Promise<void>;
  deleteByFormId(formId: FormId): Promise<void>;
}
