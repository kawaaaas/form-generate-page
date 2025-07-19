import { Link } from 'react-router-dom';
import CopyButton from '../../components/CopyButton';
import SuccessCard from '../../components/SuccessCard';

interface FormCreatedSuccessProps {
  formId: string;
  adminId: string;
  title: string;
  onCreateAnother: () => void;
}

export default function FormCreatedSuccess({
  formId,
  adminId,
  title,
  onCreateAnother,
}: FormCreatedSuccessProps) {
  const formUrl = `${window.location.origin}/forms/${formId}`;
  const adminUrl = `${window.location.origin}/admin/${adminId}/responses`;

  return (
    <SuccessCard
      title="フォーム作成完了"
      message={`「${title}」が作成されました。以下のリンクを共有して回答を収集してください。`}
    >
      <div className="space-y-6">
        {/* フォーム回答用URL */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">
            📝 フォーム回答用URL
          </h3>
          <p className="text-xs text-blue-700 mb-3">
            このURLを回答者に共有してください
          </p>
          <div className="bg-white rounded border p-3 mb-3">
            <p className="text-sm text-gray-800 break-all">{formUrl}</p>
          </div>
          <div className="flex gap-2">
            <CopyButton text={formUrl}>URLをコピー</CopyButton>
            <Link
              to={`/forms/${formId}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 bg-white border border-blue-300 rounded-md hover:bg-blue-50 transition-colors"
            >
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
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              プレビュー
            </Link>
          </div>
        </div>

        {/* 管理用URL */}
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-amber-900 mb-2">
            🔒 管理用URL（回答一覧）
          </h3>
          <p className="text-xs text-amber-700 mb-3">
            このURLで回答を管理できます。管理用パスワードが必要です。
          </p>
          <div className="bg-white rounded border p-3 mb-3">
            <p className="text-sm text-gray-800 break-all">{adminUrl}</p>
          </div>
          <div className="flex gap-2">
            <CopyButton text={adminUrl}>管理URLをコピー</CopyButton>
            <Link
              to={`/admin/${adminId}/responses`}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-amber-600 bg-white border border-amber-300 rounded-md hover:bg-amber-50 transition-colors"
            >
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
                  d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              管理画面
            </Link>
          </div>
        </div>

        {/* 重要な注意事項 */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-red-900 mb-2">⚠️ 重要</h3>
          <ul className="text-xs text-red-700 space-y-1">
            <li>• 管理用URLは他人に共有しないでください</li>
            <li>
              • 管理用パスワードを忘れると回答一覧にアクセスできなくなります
            </li>
            <li>
              • これらのURLは再表示されません。必要に応じて保存してください
            </li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onCreateAnother}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            別のフォームを作成
          </button>
          <Link
            to="/"
            className="flex-1 text-center bg-gray-100 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </SuccessCard>
  );
}
