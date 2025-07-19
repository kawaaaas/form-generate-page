import { Form } from '../../domain/entities/Form';
import type { FormRepository } from '../../domain/repositories/FormRepository';
import { FormId } from '../../domain/value-objects/FormId';
import { FormSchema } from '../../domain/value-objects/FormSchema';
import { Password } from '../../domain/value-objects/Password';
import {
  NotFoundError,
  UnauthorizedError,
  ValidationError,
} from '../../shared/utils/error.utils';
import type { CreateFormDto } from '../dto/CreateFormDto';
import type { FormResponseDto } from '../dto/FormResponseDto';

export class FormService {
  constructor(private readonly formRepository: FormRepository) {}

  async createForm(dto: CreateFormDto): Promise<FormResponseDto> {
    const schema = new FormSchema(dto.schema);

    let password: Password | undefined;
    if (dto.settings.requiresPassword) {
      if (!dto.password) {
        throw new ValidationError(
          'Password is required when requiresPassword is true',
        );
      }
      password = await Password.fromPlainText(dto.password);
    }

    // Admin password is always required
    const adminPassword = await Password.fromPlainText(dto.adminPassword);

    const form = Form.create(
      dto.title,
      dto.description,
      schema,
      dto.settings,
      adminPassword,
      password,
    );

    await this.formRepository.save(form);

    return this.toResponseDto(form);
  }

  async getForm(id: string): Promise<FormResponseDto> {
    const formId = new FormId(id);
    const form = await this.formRepository.findById(formId);

    if (!form) {
      throw new NotFoundError('Form', id);
    }

    if (!form.isActive) {
      throw new NotFoundError('Form', id);
    }

    return this.toResponseDto(form);
  }

  async getFormForPasswordVerification(id: string): Promise<Form> {
    const formId = new FormId(id);
    const form = await this.formRepository.findByIdWithPassword(formId);

    if (!form) {
      throw new NotFoundError('Form', id);
    }

    if (!form.isActive) {
      throw new NotFoundError('Form', id);
    }

    return form;
  }

  async verifyPassword(id: string, password: string): Promise<FormResponseDto> {
    const form = await this.getFormForPasswordVerification(id);

    if (!form.requiresPasswordForAccess()) {
      return this.toResponseDto(form);
    }

    const isValidPassword = await form.verifyPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid password');
    }

    return this.toResponseDto(form);
  }

  async updateForm(
    id: string,
    dto: Partial<CreateFormDto>,
  ): Promise<FormResponseDto> {
    const formId = new FormId(id);
    const form = await this.formRepository.findByIdWithPassword(formId);

    if (!form) {
      throw new NotFoundError('Form', id);
    }

    if (dto.title !== undefined) {
      form.updateTitle(dto.title);
    }

    if (dto.description !== undefined) {
      form.updateDescription(dto.description);
    }

    if (dto.settings !== undefined) {
      form.updateSettings(dto.settings);
    }

    await this.formRepository.update(form);

    return this.toResponseDto(form);
  }

  async getFormByAdminId(adminId: string): Promise<Form> {
    const form = await this.formRepository.findByAdminId(adminId);

    if (!form) {
      throw new NotFoundError('Form', adminId);
    }

    if (!form.isActive) {
      throw new NotFoundError('Form', adminId);
    }

    return form;
  }

  async verifyAdminPassword(adminId: string, password: string): Promise<Form> {
    const form = await this.getFormByAdminId(adminId);

    // Admin password is always required
    const isValidPassword = await form.verifyAdminPassword(password);
    if (!isValidPassword) {
      throw new UnauthorizedError('Invalid admin password');
    }

    return form;
  }

  async deactivateForm(id: string): Promise<void> {
    const formId = new FormId(id);
    const form = await this.formRepository.findById(formId);

    if (!form) {
      throw new NotFoundError('Form', id);
    }

    form.deactivate();
    await this.formRepository.update(form);
  }

  async activateForm(id: string): Promise<void> {
    const formId = new FormId(id);
    const form = await this.formRepository.findById(formId);

    if (!form) {
      throw new NotFoundError('Form', id);
    }

    form.activate();
    await this.formRepository.update(form);
  }

  private toResponseDto(form: Form): FormResponseDto {
    const json = form.toJSON();
    return {
      id: json.id,
      title: json.title,
      description: json.description,
      schema: json.schema,
      settings: json.settings,
      adminId: json.adminId,
      isActive: json.isActive,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
    };
  }
}
