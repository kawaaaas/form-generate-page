import { type Control, Controller, type FieldErrors } from 'react-hook-form';
import type { FormData } from '../../types/form';

interface FormSettingsProps {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
}

export default function FormSettings({ control, errors }: FormSettingsProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">基本設定</h3>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              フォームタイトル *
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  id="title"
                  {...field}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="フォームのタイトルを入力してください"
                />
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              説明文
            </label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <textarea
                  id="description"
                  {...field}
                  value={field.value || ''}
                  rows={3}
                  className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="フォームの説明を入力してください（任意）"
                />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          セキュリティ設定
        </h3>
        <div className="space-y-4">
          <div className="flex items-center">
            <Controller
              name="settings.requiresPassword"
              control={control}
              render={({ field }) => (
                <input
                  type="checkbox"
                  id="hasPassword"
                  checked={field.value}
                  onChange={field.onChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              )}
            />
            <label htmlFor="hasPassword" className="ml-2 text-sm text-gray-700">
              パスワード保護を設定する
            </label>
          </div>

          <Controller
            name="settings.requiresPassword"
            control={control}
            render={({ field: { value: requiresPassword } }) => (
              <>
                {requiresPassword && (
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      パスワード
                    </label>
                    <Controller
                      name="password"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="password"
                          id="password"
                          {...field}
                          value={field.value || ''}
                          className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                          }`}
                          placeholder="パスワードを入力してください"
                        />
                      )}
                    />
                    {errors.password && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.password.message}
                      </p>
                    )}
                    <p className="mt-1 text-xs text-gray-500">
                      フォームにアクセスする際にパスワードが必要になります
                    </p>
                  </div>
                )}
              </>
            )}
          />
        </div>
      </div>
    </div>
  );
}
