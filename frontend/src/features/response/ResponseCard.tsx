import { Link } from 'react-router-dom';
import type { Response } from '../../types/form';
import { formatDate } from '../../utils/dateUtils';

interface ResponseCardProps {
  response: Response;
  formId: string;
  showAdminActions?: boolean;
}

export default function ResponseCard({
  response,
  formId,
  showAdminActions: _showAdminActions,
}: ResponseCardProps) {
  return (
    <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
      <Link
        to={`/forms/${formId}/responses/${response.id}`}
        className="block p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm font-medium">
                {Object.keys(response.data).length}
              </span>
            </div>
            <div>
              <p className="text-sm text-gray-500">
                {formatDate(response.createdAt)}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-400 truncate max-w-xs">
              ID: {response.id}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(response.data)
            .slice(0, 4)
            .map(([key, value]) => (
              <div key={key} className="border-l-4 border-gray-200 pl-3">
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  {key}
                </p>
                <p className="text-sm text-gray-900 truncate">
                  {String(value)}
                </p>
              </div>
            ))}
        </div>

        {Object.keys(response.data).length > 4 && (
          <div className="mt-4 text-xs text-gray-500">
            他 {Object.keys(response.data).length - 4} 項目...
          </div>
        )}
      </Link>
    </div>
  );
}
