import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import SubmitButton from '../../components/SubmitButton';

interface PasswordFormData {
  password: string;
}

interface PasswordFormProps {
  onSubmit: (password: string) => void;
  isSubmitting: boolean;
  onBack: () => void;
}

const passwordSchema = z.object({
  password: z.string().min(1, 'パスワードを入力してください'),
});

export default function PasswordForm({
  onSubmit,
  isSubmitting,
  onBack,
}: PasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordSubmit: SubmitHandler<PasswordFormData> = (data) => {
    onSubmit(data.password);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            パスワード認証
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            このフォームはパスワードで保護されています。
            <br />
            パスワードを入力してください。
          </p>
          <form onSubmit={handleSubmit(handlePasswordSubmit)}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                パスワード
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                {...register('password')}
              />
              {errors.password?.message && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>
            <SubmitButton
              isSubmitting={isSubmitting}
              submittingText="認証中..."
              submitText="認証"
            />
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={onBack}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              ← ホームに戻る
            </button>
          </div>
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="text-sm text-yellow-800">
              <strong>テスト用パスワード:</strong> password123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
