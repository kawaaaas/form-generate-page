import type { FormData } from '../../types/form';

interface FormPreviewProps {
  formData: FormData;
}

export default function FormPreview({ formData }: FormPreviewProps) {
  const { title, description, schema } = formData;
  const { elements } = schema;

  if (!title && elements.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">プレビュー</h3>
          <p className="text-sm text-gray-600">
            作成中のフォームがどのように表示されるかを確認できます
          </p>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <div className="text-gray-400">
            <div className="text-4xl mb-4">📋</div>
            <p className="text-lg font-medium mb-2">フォームプレビュー</p>
            <p className="text-sm">
              フォーム要素を追加すると
              <br />
              ここにプレビューが表示されます
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 mb-2">プレビュー</h3>
        <p className="text-sm text-gray-600">
          作成中のフォームがどのように表示されるかを確認できます
        </p>
      </div>

      <div className="border border-gray-300 rounded-lg p-6 bg-gray-50">
        <div className="space-y-6">
          {title && (
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              {description && (
                <p className="mt-2 text-gray-600">{description}</p>
              )}
            </div>
          )}

          {elements.length > 0 && (
            <div className="space-y-4">
              {elements.map((element) => (
                <div key={element.id} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    {element.label}
                    {element.validation?.required && (
                      <span className="text-red-500 ml-1">*</span>
                    )}
                  </label>

                  {element.type === 'input' && (
                    <input
                      type="text"
                      placeholder={element.placeholder}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  )}

                  {element.type === 'textarea' && (
                    <textarea
                      placeholder={element.placeholder}
                      disabled
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  )}

                  {element.type === 'number' && (
                    <input
                      type="number"
                      placeholder={element.placeholder}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  )}

                  {element.type === 'date' && (
                    <input
                      type="date"
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    />
                  )}

                  {element.type === 'select' && (
                    <select
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white"
                    >
                      <option>選択してください</option>
                      {element.options?.map((option, index) => (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  )}

                  {element.type === 'radio' && (
                    <div className="space-y-2">
                      {element.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="radio"
                            name={element.id}
                            value={option}
                            disabled
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}

                  {element.type === 'checkbox' && (
                    <div className="space-y-2">
                      {element.options?.map((option, index) => (
                        <label key={index} className="flex items-center">
                          <input
                            type="checkbox"
                            value={option}
                            disabled
                            className="mr-2"
                          />
                          {option}
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          <div className="pt-4">
            <button
              type="button"
              disabled
              className="px-6 py-2 bg-blue-600 text-white rounded-lg opacity-50 cursor-not-allowed"
            >
              送信する
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
