import EmptyState from '../../components/EmptyState';
import type { Response } from '../../types/form';
import ResponseCard from './ResponseCard';

interface ResponseListProps {
  responses: Response[];
  formId: string;
  showAdminActions?: boolean;
}

export default function ResponseList({
  responses,
  formId,
  showAdminActions,
}: ResponseListProps) {
  if (responses.length === 0) {
    return (
      <EmptyState
        message="まだレスポンスがありません"
        description="フォームに回答が送信されると、ここに表示されます"
      />
    );
  }

  return (
    <div className="space-y-4">
      {responses.map((response) => (
        <ResponseCard
          key={response.id}
          response={response}
          formId={formId}
          showAdminActions={showAdminActions}
        />
      ))}
    </div>
  );
}
