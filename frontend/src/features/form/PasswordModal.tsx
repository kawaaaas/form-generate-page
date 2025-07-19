import { zodResolver } from '@hookform/resolvers/zod';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import Modal from '../../components/Modal';
import SubmitButton from '../../components/SubmitButton';

interface PasswordFormData {
  password: string;
}

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  isSubmitting: boolean;
  error?: string | null;
}

const passwordSchema = z.object({
  password: z.string().min(1, 'パスワードを入力してください'),
});

export default function PasswordModal({
  isOpen,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: PasswordModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const handlePasswordSubmit: SubmitHandler<PasswordFormData> = (data) => {
    onSubmit(data.password);
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="パスワード認証">
      <div className="space-y-4">
        <p className="text-gray-600 text-sm">
          このフォームはパスワードで保護されています。パスワードを入力してフォームを送信してください。
        </p>

        <form
          onSubmit={handleSubmit(handlePasswordSubmit)}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="modal-password"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              パスワード
            </label>
            <input
              id="modal-password"
              type="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              {...register('password')}
            />
            {(errors.password?.message || error) && (
              <p className="mt-1 text-sm text-red-600">
                {errors.password?.message || error}
              </p>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              disabled={isSubmitting}
            >
              キャンセル
            </button>
            <SubmitButton
              isSubmitting={isSubmitting}
              submittingText="送信中..."
              submitText="送信"
            />
          </div>
        </form>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-800">
            <strong>テスト用パスワード:</strong> password123
          </p>
        </div>
      </div>
    </Modal>
  );
}
