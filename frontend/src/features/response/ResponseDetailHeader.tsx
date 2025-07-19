import { Link } from 'react-router-dom';
import type { Response } from '../../types/form';
import { formatDateDetail } from '../../utils/dateUtils';

interface ResponseDetailHeaderProps {
  response: Response;
  formId: string;
  isIndividualView?: boolean;
}

export default function ResponseDetailHeader({
  response,
  formId,
  isIndividualView,
}: ResponseDetailHeaderProps) {
  return (
    <div className="mb-6">
      {!isIndividualView && (
        <Link
          to={`/forms/${formId}/responses`}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          ← レスポンス一覧に戻る
        </Link>
      )}
      {isIndividualView && (
        <div className="text-sm text-gray-500 mb-4">📋 あなたの回答</div>
      )}
      <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
        {isIndividualView ? 'あなたの回答内容' : 'レスポンス詳細'}
      </h1>
      <div className="text-sm text-gray-500 space-y-1">
        <p>レスポンスID: {response.id}</p>
        {!isIndividualView && <p>フォームID: {response.formId}</p>}
        <p>回答日時: {formatDateDetail(response.createdAt)}</p>
      </div>
    </div>
  );
}
