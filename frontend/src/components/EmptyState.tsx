interface EmptyStateProps {
  message: string;
  description?: string;
}

export default function EmptyState({ message, description }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-lg shadow p-8 text-center">
      <p className="text-gray-500 text-lg mb-2">{message}</p>
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
  );
}
