interface ResponseHeaderProps {
  title: string;
  formId: string;
  count?: number;
  description?: string;
}

export default function ResponseHeader({
  title,
  formId,
  count,
  description,
}: ResponseHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600">フォームID: {formId}</p>
      {count !== undefined && (
        <p className="text-sm text-gray-500 mt-1">
          合計 {count} 件のレスポンス
        </p>
      )}
      {description && <p className="text-gray-600 mt-2">{description}</p>}
    </div>
  );
}
