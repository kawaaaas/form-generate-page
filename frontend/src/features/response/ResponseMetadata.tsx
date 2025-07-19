import type { Response } from '../../types/form';
import { formatValue } from '../../utils/responseUtils';

interface ResponseMetadataProps {
  response: Response;
}

export default function ResponseMetadata({ response }: ResponseMetadataProps) {
  if (!response.metadata || Object.keys(response.metadata).length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow mt-6">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">メタデータ</h2>
        <p className="text-sm text-gray-500 mt-1">技術的な情報</p>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {Object.entries(response.metadata).map(([key, value]) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row sm:items-center"
            >
              <div className="w-full sm:w-1/3 text-sm font-medium text-gray-700 mb-1 sm:mb-0">
                {key}
              </div>
              <div className="w-full sm:w-2/3 text-sm text-gray-900 bg-gray-50 rounded px-3 py-2">
                {formatValue(key, value)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
