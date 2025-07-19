import type { Response } from '../../types/form';
import { formatValue, getFieldDisplayName } from '../../utils/responseUtils';

interface ResponseContentProps {
  response: Response;
}

export default function ResponseContent({ response }: ResponseContentProps) {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">回答内容</h2>
        <p className="text-sm text-gray-500 mt-1">
          {Object.keys(response.data).length} 項目の回答
        </p>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          {Object.entries(response.data).map(([key, value], index) => (
            <div
              key={key}
              className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0"
            >
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-blue-600 text-sm font-medium">
                    {index + 1}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-900 mb-2">
                    {getFieldDisplayName(key)}
                  </h3>
                  <div className="bg-gray-50 rounded-md p-3">
                    <p className="text-gray-900 whitespace-pre-wrap break-words">
                      {formatValue(key, value)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
