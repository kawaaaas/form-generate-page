import type { FormSettings } from '../../shared/types/api.types';
import { ValidationError } from '../../shared/utils/error.utils';
import { FormId } from '../value-objects/FormId';
import type { FormSchema } from '../value-objects/FormSchema';
import type { Password } from '../value-objects/Password';

export interface FormProps {
  id: FormId;
  title: string;
  description?: string;
  schema: FormSchema;
  settings: FormSettings;
  password?: Password;
  adminId: string;
  adminPassword: Password; // Required for admin access
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Form {
  private readonly _id: FormId;
  private _title: string;
  private _description?: string;
  private readonly _schema: FormSchema;
  private _settings: FormSettings;
  private readonly _password?: Password;
  private readonly _adminId: string;
  private readonly _adminPassword: Password; // Required for admin access
  private _isActive: boolean;
  private readonly _createdAt: Date;
  private _updatedAt: Date;

  constructor(props: FormProps) {
    this.validateProps(props);

    this._id = props.id;
    this._title = props.title;
    this._description = props.description;
    this._schema = props.schema;
    this._settings = props.settings;
    this._password = props.password;
    this._adminId = props.adminId;
    this._adminPassword = props.adminPassword;
    this._isActive = props.isActive;
    this._createdAt = props.createdAt;
    this._updatedAt = props.updatedAt;
  }

  static create(
    title: string,
    description: string | undefined,
    schema: FormSchema,
    settings: FormSettings,
    adminPassword: Password, // Required for admin access
    password?: Password,
  ): Form {
    const now = new Date();
    const adminId = crypto.randomUUID();

    return new Form({
      id: FormId.generate(),
      title,
      description,
      schema,
      settings,
      adminId,
      adminPassword,
      password,
      isActive: true,
      createdAt: now,
      updatedAt: now,
    });
  }

  get id(): FormId {
    return this._id;
  }

  get title(): string {
    return this._title;
  }

  get description(): string | undefined {
    return this._description;
  }

  get schema(): FormSchema {
    return this._schema;
  }

  get settings(): FormSettings {
    return { ...this._settings };
  }

  get hasPassword(): boolean {
    return this._password !== undefined;
  }

  get adminId(): string {
    return this._adminId;
  }

  get hasAdminPassword(): boolean {
    return true; // Always true since adminPassword is required
  }

  get isActive(): boolean {
    return this._isActive;
  }

  get createdAt(): Date {
    return new Date(this._createdAt);
  }

  get updatedAt(): Date {
    return new Date(this._updatedAt);
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (!this._password) {
      return !this._settings.requiresPassword;
    }

    return await this._password.verify(plainPassword);
  }

  async verifyAdminPassword(plainPassword: string): Promise<boolean> {
    return await this._adminPassword.verify(plainPassword);
  }

  updateTitle(title: string): void {
    this.validateTitle(title);
    this._title = title;
    this._updatedAt = new Date();
  }

  updateDescription(description?: string): void {
    this._description = description;
    this._updatedAt = new Date();
  }

  updateSettings(settings: FormSettings): void {
    this.validateSettings(settings);
    this._settings = { ...settings };
    this._updatedAt = new Date();
  }

  deactivate(): void {
    this._isActive = false;
    this._updatedAt = new Date();
  }

  activate(): void {
    this._isActive = true;
    this._updatedAt = new Date();
  }

  validateResponseData(data: Record<string, unknown>): {
    isValid: boolean;
    errors: Record<string, string[]>;
  } {
    return this._schema.validateResponseData(data);
  }

  requiresPasswordForAccess(): boolean {
    return this._settings.requiresPassword && this._password !== undefined;
  }

  requiresAdminPasswordForAccess(): boolean {
    return true; // Always true since adminPassword is required
  }

  getPasswordHash(): string | undefined {
    return this._password?.hashedValue;
  }

  getAdminPasswordHash(): string {
    return this._adminPassword.hashedValue;
  }

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  toJSON(): any {
    return {
      id: this._id.value,
      title: this._title,
      description: this._description,
      schema: this._schema.value,
      settings: this._settings,
      adminId: this._adminId,
      isActive: this._isActive,
      createdAt: this._createdAt.toISOString(),
      updatedAt: this._updatedAt.toISOString(),
    };
  }

  private validateProps(props: FormProps): void {
    this.validateTitle(props.title);
    this.validateSettings(props.settings);

    if (props.settings.requiresPassword && !props.password) {
      throw new ValidationError(
        'Password is required when requiresPassword is true',
      );
    }
  }

  private validateTitle(title: string): void {
    if (!title || title.trim().length === 0) {
      throw new ValidationError('Form title cannot be empty');
    }

    if (title.length > 255) {
      throw new ValidationError('Form title cannot exceed 255 characters');
    }
  }

  private validateSettings(settings: FormSettings): void {
    if (
      settings.confirmationMessage &&
      settings.confirmationMessage.length > 1000
    ) {
      throw new ValidationError(
        'Confirmation message cannot exceed 1000 characters',
      );
    }
  }
}
