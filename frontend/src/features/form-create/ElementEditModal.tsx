import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from '../../components/Modal';
import type { FormElementUI } from '../../types/form';
import { formElementValidationSchema } from '../../types/form';

const elementEditSchema = z.object({
  label: z.string().min(1, 'ラベルは必須です'),
  name: z.string().min(1, 'フィールド名は必須です'),
  placeholder: z.string().optional(),
  validation: formElementValidationSchema.optional(),
});

type ElementEditForm = z.infer<typeof elementEditSchema>;

interface ElementEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  element: FormElementUI | null;
  onSave: (element: FormElementUI) => void;
}

export default function ElementEditModal({
  isOpen,
  onClose,
  element,
  onSave,
}: ElementEditModalProps) {
  const [options, setOptions] = useState<string[]>(element?.options || []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ElementEditForm>({
    resolver: zodResolver(elementEditSchema),
    defaultValues: {
      label: element?.label || '',
      name: element?.name || '',
      placeholder: element?.placeholder || '',
      validation: element?.validation || {
        required: false,
      },
    },
  });

  const elementType = element?.type;
  const hasOptions =
    elementType === 'radio' ||
    elementType === 'select' ||
    elementType === 'checkbox';
  const isNumeric = elementType === 'number';
  const isTextBased = elementType === 'input' || elementType === 'textarea';

  const addOption = () => {
    setOptions([...options, '']);
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const removeOption = (index: number) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const onSubmit = (data: ElementEditForm) => {
    if (!element) return;

    const updatedElement: FormElementUI = {
      ...element,
      label: data.label,
      name: data.name,
      placeholder: data.placeholder,
      validation: data.validation,
      ...(hasOptions && { options }),
    };

    onSave(updatedElement);
    onClose();
  };

  const handleClose = () => {
    reset();
    setOptions(element?.options || []);
    onClose();
  };

  if (!element) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={`${element.type}要素の編集`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ラベル *
          </label>
          <input
            type="text"
            {...register('label')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="フィールドのラベルを入力"
          />
          {errors.label && (
            <p className="mt-1 text-sm text-red-600">{errors.label.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            フィールド名 *
          </label>
          <input
            type="text"
            {...register('name')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="field_name（半角英数字とアンダースコア）"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            プレースホルダー
          </label>
          <input
            type="text"
            {...register('placeholder')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="プレースホルダーテキスト"
          />
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="required"
            {...register('validation.required')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="required" className="ml-2 text-sm text-gray-700">
            必須項目
          </label>
        </div>

        {isTextBased && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最小文字数
              </label>
              <input
                type="number"
                min="0"
                {...register('validation.minLength', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最大文字数
              </label>
              <input
                type="number"
                min="0"
                {...register('validation.maxLength', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {isNumeric && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最小値
              </label>
              <input
                type="number"
                {...register('validation.min', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                最大値
              </label>
              <input
                type="number"
                {...register('validation.max', { valueAsNumber: true })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        )}

        {isTextBased && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              バリデーションパターン（正規表現）
            </label>
            <input
              type="text"
              {...register('validation.pattern')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="例: ^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$ (メール)"
            />
            <input
              type="text"
              {...register('validation.customMessage')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-2"
              placeholder="カスタムエラーメッセージ"
            />
          </div>
        )}

        {hasOptions && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              選択肢
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="選択肢のテキスト"
                  />
                  <button
                    type="button"
                    onClick={() => removeOption(index)}
                    className="px-3 py-2 text-red-600 hover:text-red-700 border border-red-300 rounded-lg hover:bg-red-50"
                  >
                    削除
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOption}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
              >
                + 選択肢を追加
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            キャンセル
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            保存
          </button>
        </div>
      </form>
    </Modal>
  );
}
