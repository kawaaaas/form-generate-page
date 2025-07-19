import { Link } from 'react-router-dom';
import CopyButton from '../../components/CopyButton';
import SuccessCard from '../../components/SuccessCard';

interface ResponseSubmittedSuccessProps {
  responseId: string;
  confirmationMessage?: string;
  onReturnHome: () => void;
}

export default function ResponseSubmittedSuccess({
  responseId,
  confirmationMessage,
  onReturnHome,
}: ResponseSubmittedSuccessProps) {
  const responseUrl = `${window.location.origin}/responses/${responseId}`;

  return (
    <SuccessCard
      title="送信完了"
      message={confirmationMessage || 'フォームの送信が完了しました。'}
    >
      <div className="space-y-6">
        {/* 個別回答用URL */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-green-900 mb-2">
            📋 あなたの回答
          </h3>
          <p className="text-xs text-green-700 mb-3">
            このURLで送信した回答を後から確認できます
          </p>
          <div className="bg-white rounded border p-3 mb-3">
            <p className="text-sm text-gray-800 break-all">{responseUrl}</p>
          </div>
          <div className="flex gap-2">
            <CopyButton text={responseUrl}>URLをコピー</CopyButton>
            <Link
              to={`/responses/${responseId}`}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-green-600 bg-white border border-green-300 rounded-md hover:bg-green-50 transition-colors"
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
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              回答を確認
            </Link>
          </div>
        </div>

        {/* 注意事項 */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-sm font-medium text-blue-900 mb-2">💡 重要</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>
              • この回答URLは再表示されません。必要に応じて保存してください
            </li>
            <li>• URLを知っている人は誰でもあなたの回答を見ることができます</li>
          </ul>
        </div>

        {/* アクションボタン */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button
            type="button"
            onClick={onReturnHome}
            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            ホームに戻る
          </button>
        </div>
      </div>
    </SuccessCard>
  );
}
