import { useEffect, useState } from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import PrivacyNotice from '../components/PrivacyNotice';
import { mockForm, mockPasswordProtectedForm } from '../data/mockForms';
import FormContainer from '../features/form/FormContainer';
import FormElement from '../features/form/FormElement';
import FormFooter from '../features/form/FormFooter';
import FormHeader from '../features/form/FormHeader';
import PasswordModal from '../features/form/PasswordModal';
import ResponseSubmittedSuccess from '../features/form/ResponseSubmittedSuccess';

interface FormData {
  [key: string]: unknown;
}

export default function FormPage() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<typeof mockForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [responseId, setResponseId] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [pendingFormData, setPendingFormData] = useState<FormData | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  // Main form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  useEffect(() => {
    const fetchForm = async () => {
      setIsLoading(true);
      setError(null);

      // Mock API call
      setTimeout(() => {
        let foundForm: typeof mockForm | undefined;
        if (formId === '550e8400-e29b-41d4-a716-446655440001') {
          foundForm = mockPasswordProtectedForm;
        } else {
          foundForm = mockForm;
        }

        if (foundForm) {
          setForm(foundForm);
        } else {
          setError('フォームが見つかりません');
        }
        setIsLoading(false);
      }, 500);
    };

    if (formId) {
      fetchForm();
    } else {
      setError('無効なフォームIDです');
      setIsLoading(false);
    }
  }, [formId]);

  const handleFormSubmit: SubmitHandler<FormData> = async (data) => {
    // パスワード保護されている場合はモーダルを表示
    if (form?.settings.requiresPassword) {
      setPendingFormData(data);
      setPasswordError(null); // エラーをリセット
      setShowPasswordModal(true);
      return;
    }

    // パスワード保護されていない場合は直接送信
    submitForm(data);
  };

  const handlePasswordSubmit = async (password: string) => {
    setIsSubmitting(true);
    setPasswordError(null);

    // Mock password verification
    setTimeout(() => {
      if (password === 'password123') {
        // パスワードが正しい場合、保留中のフォームデータを送信
        if (pendingFormData) {
          submitForm(pendingFormData);
        }
        setShowPasswordModal(false);
      } else {
        // パスワードが間違っている場合はエラーを設定
        setPasswordError('パスワードが正しくありません');
        setIsSubmitting(false);
      }
    }, 1000);
  };

  const submitForm = (data: FormData) => {
    setIsSubmitting(true);

    // Mock form submission
    setTimeout(() => {
      console.log('Form submission:', data);
      // Generate mock response ID
      const mockResponseId = `res_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      setResponseId(mockResponseId);
      setIsSubmitted(true);
      setIsSubmitting(false);
      setPendingFormData(null);
    }, 1500);
  };

  const handlePasswordModalClose = () => {
    setShowPasswordModal(false);
    setPendingFormData(null);
    setPasswordError(null);
    setIsSubmitting(false);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorDisplay message={error} onRetry={() => navigate('/')} />;
  }

  if (!form) {
    return (
      <ErrorDisplay
        message="フォームが見つかりません"
        onRetry={() => navigate('/')}
      />
    );
  }

  if (isSubmitted && responseId) {
    return (
      <ResponseSubmittedSuccess
        responseId={responseId}
        confirmationMessage={form.settings.confirmationMessage}
        onReturnHome={() => navigate('/')}
      />
    );
  }

  return (
    <>
      <FormContainer>
        <PrivacyNotice context="respond" />
        <FormHeader title={form.title} description={form.description} />

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          {form.schema.elements.map((element) => (
            <FormElement
              key={element.id}
              element={element}
              register={register}
              errors={errors}
            />
          ))}

          <FormFooter
            isSubmitting={isSubmitting}
            onBack={() => navigate('/')}
          />
        </form>
      </FormContainer>

      <PasswordModal
        isOpen={showPasswordModal}
        onClose={handlePasswordModalClose}
        onSubmit={handlePasswordSubmit}
        isSubmitting={isSubmitting}
        error={passwordError}
      />
    </>
  );
}
