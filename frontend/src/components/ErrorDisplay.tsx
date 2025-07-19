interface ErrorDisplayProps {
  message: string;
  onRetry?: () => void;
  retryText?: string;
}

export default function ErrorDisplay({
  message,
  onRetry,
  retryText = 'ホームに戻る',
}: ErrorDisplayProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-600 mb-4">{message}</div>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="text-blue-600 hover:text-blue-800"
          >
            ← {retryText}
          </button>
        )}
      </div>
    </div>
  );
}
