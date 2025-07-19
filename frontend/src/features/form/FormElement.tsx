import type { FieldErrors, UseFormRegister } from 'react-hook-form';
import type { FormElement as FormElementType } from '../../types/form';

interface FormElementProps {
  element: FormElementType;
  register: UseFormRegister<Record<string, unknown>>;
  errors: FieldErrors<Record<string, unknown>>;
}

export default function FormElement({
  element,
  register,
  errors,
}: FormElementProps) {
  const validation: Record<string, unknown> = {};

  if (element.validation?.required) {
    validation.required =
      element.validation.customMessage || `${element.label}は必須です`;
  }

  if (element.validation?.minLength) {
    validation.minLength = {
      value: element.validation.minLength,
      message:
        element.validation.customMessage ||
        `${element.label}は${element.validation.minLength}文字以上で入力してください`,
    };
  }

  if (element.validation?.maxLength) {
    validation.maxLength = {
      value: element.validation.maxLength,
      message:
        element.validation.customMessage ||
        `${element.label}は${element.validation.maxLength}文字以下で入力してください`,
    };
  }

  if (element.validation?.min && element.type === 'number') {
    validation.min = {
      value: element.validation.min,
      message:
        element.validation.customMessage ||
        `${element.label}は${element.validation.min}以上で入力してください`,
    };
  }

  if (element.validation?.max && element.type === 'number') {
    validation.max = {
      value: element.validation.max,
      message:
        element.validation.customMessage ||
        `${element.label}は${element.validation.max}以下で入力してください`,
    };
  }

  if (element.validation?.pattern) {
    validation.pattern = {
      value: new RegExp(element.validation.pattern),
      message:
        element.validation.customMessage ||
        `${element.label}の形式が正しくありません`,
    };
  }

  const baseClasses =
    'w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500';
  const errorClasses = errors[element.name]
    ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
    : '';
  const finalClasses = `${baseClasses} ${errorClasses}`;

  const RequiredIndicator = () =>
    element.validation?.required && (
      <span className="text-red-500 ml-1">*</span>
    );

  const ErrorMessage = () =>
    errors[element.name] && (
      <p className="mt-1 text-sm text-red-600">
        {errors[element.name]?.message}
      </p>
    );

  switch (element.type) {
    case 'input':
      return (
        <div key={element.id} className="mb-6">
          <label
            htmlFor={element.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {element.label}
            <RequiredIndicator />
          </label>
          <input
            id={element.name}
            type="text"
            placeholder={element.placeholder}
            className={finalClasses}
            {...register(element.name, validation)}
          />
          <ErrorMessage />
        </div>
      );

    case 'textarea':
      return (
        <div key={element.id} className="mb-6">
          <label
            htmlFor={element.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {element.label}
            <RequiredIndicator />
          </label>
          <textarea
            id={element.name}
            rows={4}
            placeholder={element.placeholder}
            className={finalClasses}
            {...register(element.name, validation)}
          />
          <ErrorMessage />
        </div>
      );

    case 'number':
      return (
        <div key={element.id} className="mb-6">
          <label
            htmlFor={element.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {element.label}
            <RequiredIndicator />
          </label>
          <input
            id={element.name}
            type="number"
            placeholder={element.placeholder}
            className={finalClasses}
            {...register(element.name, {
              ...validation,
              valueAsNumber: true,
            })}
          />
          <ErrorMessage />
        </div>
      );

    case 'date':
      return (
        <div key={element.id} className="mb-6">
          <label
            htmlFor={element.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {element.label}
            <RequiredIndicator />
          </label>
          <input
            id={element.name}
            type="date"
            className={finalClasses}
            {...register(element.name, validation)}
          />
          <ErrorMessage />
        </div>
      );

    case 'radio':
      return (
        <div key={element.id} className="mb-6">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              {element.label}
              <RequiredIndicator />
            </legend>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="radio"
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    {...register(element.name, validation)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <ErrorMessage />
        </div>
      );

    case 'select':
      return (
        <div key={element.id} className="mb-6">
          <label
            htmlFor={element.name}
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            {element.label}
            <RequiredIndicator />
          </label>
          <select
            id={element.name}
            className={finalClasses}
            {...register(element.name, validation)}
          >
            <option value="">選択してください</option>
            {element.options?.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <ErrorMessage />
        </div>
      );

    case 'checkbox':
      if (
        element.name === 'agreeToTerms' ||
        element.name === 'subscribeNewsletter'
      ) {
        // Single checkbox for terms/newsletter
        return (
          <div key={element.id} className="mb-6">
            <div className="flex items-start">
              <input
                id={element.name}
                type="checkbox"
                value="true"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                {...register(element.name, validation)}
              />
              <label
                htmlFor={element.name}
                className="ml-2 text-sm text-gray-700"
              >
                {element.options?.[0] || element.label}
                <RequiredIndicator />
              </label>
            </div>
            <ErrorMessage />
          </div>
        );
      }
      // Multiple checkboxes
      return (
        <div key={element.id} className="mb-6">
          <fieldset>
            <legend className="block text-sm font-medium text-gray-700 mb-3">
              {element.label}
              <RequiredIndicator />
            </legend>
            <div className="space-y-2">
              {element.options?.map((option, index) => (
                <label key={index} className="flex items-center">
                  <input
                    type="checkbox"
                    value={option}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    {...register(element.name)}
                  />
                  <span className="ml-2 text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          </fieldset>
          <ErrorMessage />
        </div>
      );

    default:
      return null;
  }
}
