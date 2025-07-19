import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import PageContainer from '../components/PageContainer';
import { mockForm } from '../data/mockForms';
import { mockResponses } from '../data/mockResponses';
import AdminPasswordModal from '../features/admin/AdminPasswordModal';
import ResponseList from '../features/response/ResponseList';

interface AdminForm {
  id: string;
  title: string;
  adminId: string;
  hasAdminPassword: boolean;
}

export default function AdminResponseListPage() {
  const { adminId } = useParams<{ adminId: string }>();
  const navigate = useNavigate();
  const [form, setForm] = useState<AdminForm | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    const fetchFormByAdminId = async () => {
      setIsLoading(true);
      setError(null);

      // Mock API call to get form by adminId
      setTimeout(() => {
        // Mock: adminId corresponds to a form
        if (adminId === 'admin_550e8400-e29b-41d4-a716-446655440001') {
          const adminForm: AdminForm = {
            id: mockForm.id,
            title: mockForm.title,
            adminId: adminId,
            hasAdminPassword: true, // Always true - admin password is required
          };
          setForm(adminForm);

          // Admin password is always required
          setShowPasswordModal(true);
        } else {
          setError('管理ページが見つかりません');
        }
        setIsLoading(false);
      }, 500);
    };

    if (adminId) {
      fetchFormByAdminId();
    } else {
      setError('無効な管理IDです');
      setIsLoading(false);
    }
  }, [adminId]);

  const handlePasswordSubmit = async (password: string) => {
    setIsVerifying(true);
    setPasswordError(null);

    // Mock admin password verification
    setTimeout(() => {
      if (password === 'admin123') {
        setIsAuthenticated(true);
        setShowPasswordModal(false);
        setPasswordError(null);
      } else {
        setPasswordError('管理用パスワードが正しくありません');
      }
      setIsVerifying(false);
    }, 1000);
  };

  const handlePasswordModalClose = () => {
    // Admin access requires password - redirect to home if modal is closed
    navigate('/');
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
        message="管理ページが見つかりません"
        onRetry={() => navigate('/')}
      />
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        <PageContainer>
          <div className="text-center py-12">
            <div className="mx-auto flex items-center justify-center w-12 h-12 rounded-full bg-amber-100">
              <svg
                className="w-6 h-6 text-amber-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="mt-4 text-xl font-semibold text-gray-900">
              管理用認証が必要です
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              「{form.title}
              」の回答一覧を表示するには、管理用パスワードが必要です。
            </p>
          </div>
        </PageContainer>

        <AdminPasswordModal
          isOpen={showPasswordModal}
          onClose={handlePasswordModalClose}
          onSubmit={handlePasswordSubmit}
          isSubmitting={isVerifying}
          error={passwordError}
          formTitle={form.title}
        />
      </>
    );
  }

  return (
    <PageContainer>
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
          管理画面
        </div>
        <h1 className="text-2xl font-bold text-gray-900">{form.title}</h1>
        <p className="text-gray-600">回答一覧</p>
      </div>

      <ResponseList
        responses={mockResponses}
        formId={form.id}
        showAdminActions={true}
      />
    </PageContainer>
  );
}
