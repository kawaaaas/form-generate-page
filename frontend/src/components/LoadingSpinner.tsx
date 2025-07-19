interface LoadingSpinnerProps {
  text?: string;
}

export default function LoadingSpinner({
  text = '読み込み中...',
}: LoadingSpinnerProps) {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-gray-500">{text}</div>
    </div>
  );
}
