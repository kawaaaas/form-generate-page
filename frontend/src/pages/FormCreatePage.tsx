import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import ActionButton from '../components/ActionButton';
import CreateFooter from '../features/form-create/CreateFooter';
import CreateHeader from '../features/form-create/CreateHeader';
import FormBuilder from '../features/form-create/FormBuilder';
import FormPreview from '../features/form-create/FormPreview';
import FormSettings from '../features/form-create/FormSettings';
import type { FormData, FormElementUI } from '../types/form';
import { createFormSchema } from '../types/form';

export default function FormCreatePage() {
  const [activeTab, setActiveTab] = useState<
    'builder' | 'settings' | 'preview'
  >('builder');

  // React Hook Form with Zod validation
  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(createFormSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      schema: {
        elements: [],
      },
      settings: {
        requiresPassword: false,
      },
      password: '',
    },
  });

  // Watch form data for preview
  const formData = watch();

  const handleElementsChange = (elements: FormElementUI[]) => {
    setValue('schema.elements', elements, { shouldValidate: true });
  };

  const onSubmit = (data: FormData) => {
    console.log('Publishing form:', data);
    // TODO: Implement form submission logic
  };

  const tabs = [
    { id: 'builder' as const, label: 'フォーム作成', icon: '🔧' },
    { id: 'settings' as const, label: '設定', icon: '⚙️' },
    { id: 'preview' as const, label: 'プレビュー', icon: '👁️' },
  ];

  return (
    <div className="py-8 flex flex-col space-y-8 items-center">
      <CreateHeader />
      <div className="flex items-center">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="border-b border-gray-200">
              <nav className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600 bg-blue-50'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {activeTab === 'builder' && (
                <FormBuilder
                  elements={formData.schema.elements}
                  onElementsChange={handleElementsChange}
                />
              )}
              {activeTab === 'settings' && (
                <FormSettings control={control} errors={errors} />
              )}
              {activeTab === 'preview' && <FormPreview formData={formData} />}
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <ActionButton
              onClick={handleSubmit(onSubmit)}
              text="フォームを公開"
              disabled={!isValid}
            />
          </div>
          <CreateFooter />
        </div>
      </div>
    </div>
  );
}
