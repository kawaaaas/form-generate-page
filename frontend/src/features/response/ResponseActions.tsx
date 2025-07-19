import { Link } from 'react-router-dom';

interface ResponseActionsProps {
  formId: string;
  isIndividualView?: boolean;
}

export default function ResponseActions({
  formId,
  isIndividualView,
}: ResponseActionsProps) {
  if (isIndividualView) {
    return (
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
        <div className="flex space-x-4">
          <Link
            to={`/forms/${formId}`}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium"
          >
            このフォームに回答する
          </Link>
          <Link
            to="/"
            className="bg-gray-100 text-gray-700 px-6 py-2 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
      <Link
        to={`/forms/${formId}/responses`}
        className="text-blue-600 hover:text-blue-800 text-sm"
      >
        ← レスポンス一覧に戻る
      </Link>

      <div className="flex space-x-4">
        <Link
          to={`/forms/${formId}`}
          className="text-gray-600 hover:text-gray-800 text-sm"
        >
          フォームを見る
        </Link>
      </div>
    </div>
  );
}
