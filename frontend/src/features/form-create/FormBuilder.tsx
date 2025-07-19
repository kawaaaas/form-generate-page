import { useState } from 'react';
import type { FormElementType, FormElementUI } from '../../types/form';
import ElementEditModal from './ElementEditModal';

interface FormBuilderProps {
  elements: FormElementUI[];
  onElementsChange: (elements: FormElementUI[]) => void;
}

export default function FormBuilder({
  elements,
  onElementsChange,
}: FormBuilderProps) {
  const [editingElement, setEditingElement] = useState<FormElementUI | null>(
    null,
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const elementTypes = [
    { type: 'input' as const, label: 'テキスト入力', icon: '📝' },
    { type: 'textarea' as const, label: 'テキストエリア', icon: '📄' },
    { type: 'radio' as const, label: 'ラジオボタン', icon: '🔘' },
    { type: 'select' as const, label: 'セレクトボックス', icon: '📋' },
    { type: 'checkbox' as const, label: 'チェックボックス', icon: '☑️' },
    { type: 'date' as const, label: '日付', icon: '📅' },
    { type: 'number' as const, label: '数値', icon: '🔢' },
  ];

  const addElement = (type: FormElementType) => {
    const newElement: FormElementUI = {
      id: crypto.randomUUID(),
      type,
      label: `新しい${elementTypes.find((et) => et.type === type)?.label}`,
      name: `field_${Date.now()}`,
      placeholder: '',
      validation: {
        required: false,
      },
      ...(type === 'radio' || type === 'select' || type === 'checkbox'
        ? {
            options: ['選択肢1', '選択肢2'],
          }
        : {}),
    };

    onElementsChange([...elements, newElement]);
  };

  const removeElement = (id: string) => {
    onElementsChange(elements.filter((element) => element.id !== id));
  };

  const editElement = (element: FormElementUI) => {
    setEditingElement(element);
    setIsModalOpen(true);
  };

  const saveElement = (updatedElement: FormElementUI) => {
    onElementsChange(
      elements.map((element) =>
        element.id === updatedElement.id ? updatedElement : element,
      ),
    );
  };

  const moveElement = (fromIndex: number, toIndex: number) => {
    const newElements = [...elements];
    const [removed] = newElements.splice(fromIndex, 1);
    newElements.splice(toIndex, 0, removed);
    onElementsChange(newElements);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          フォーム要素を追加
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {elementTypes.map((elementType) => (
            <button
              key={elementType.type}
              type="button"
              onClick={() => addElement(elementType.type)}
              className="p-3 border border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors text-center"
            >
              <div className="text-2xl mb-1">{elementType.icon}</div>
              <div className="text-sm text-gray-700">{elementType.label}</div>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          フォーム要素一覧
        </h3>
        {elements.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            上のボタンからフォーム要素を追加してください
          </div>
        ) : (
          <div className="space-y-3">
            {elements.map((element, index) => (
              <div
                key={element.id}
                className="p-4 border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="text-sm text-gray-500">#{index + 1}</div>
                    <div className="font-medium">{element.label}</div>
                    <div className="text-sm text-gray-500">
                      ({element.type})
                    </div>
                    {element.validation?.required && (
                      <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                        必須
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {index > 0 && (
                      <button
                        type="button"
                        onClick={() => moveElement(index, index - 1)}
                        className="text-gray-600 hover:text-gray-700 text-sm p-1"
                        title="上に移動"
                      >
                        ↑
                      </button>
                    )}
                    {index < elements.length - 1 && (
                      <button
                        type="button"
                        onClick={() => moveElement(index, index + 1)}
                        className="text-gray-600 hover:text-gray-700 text-sm p-1"
                        title="下に移動"
                      >
                        ↓
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => editElement(element)}
                      className="text-blue-600 hover:text-blue-700 text-sm"
                    >
                      編集
                    </button>
                    <button
                      type="button"
                      onClick={() => removeElement(element.id)}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      削除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ElementEditModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        element={editingElement}
        onSave={saveElement}
      />
    </div>
  );
}
