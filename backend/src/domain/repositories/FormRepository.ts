import type { Form } from '../entities/Form';
import type { FormId } from '../value-objects/FormId';

export interface FormRepository {
  save(form: Form): Promise<void>;
  findById(id: FormId): Promise<Form | null>;
  findByIdWithPassword(id: FormId): Promise<Form | null>;
  findByAdminId(adminId: string): Promise<Form | null>;
  update(form: Form): Promise<void>;
  delete(id: FormId): Promise<void>;
  findAll(options?: {
    isActive?: boolean;
    limit?: number;
    offset?: number;
  }): Promise<Form[]>;
  count(options?: { isActive?: boolean }): Promise<number>;
}
