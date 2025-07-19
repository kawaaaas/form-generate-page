import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorDisplay from '../components/ErrorDisplay';
import LoadingSpinner from '../components/LoadingSpinner';
import PageContainer from '../components/PageContainer';
import { mockResponses } from '../data/mockResponses';
import ResponseActions from '../features/response/ResponseActions';
import ResponseContent from '../features/response/ResponseContent';
import ResponseDetailHeader from '../features/response/ResponseDetailHeader';
import ResponseMetadata from '../features/response/ResponseMetadata';
import type { Response } from '../types/form';

export default function ResponseDetailPage() {
  const { formId, responseId } = useParams<{
    formId?: string;
    responseId: string;
  }>();
  const navigate = useNavigate();
  const [response, setResponse] = useState<Response | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: 実際のAPIコールに置き換える
    const fetchResponse = async () => {
      setIsLoading(true);
      setError(null);

      // ダミーデータから該当のレスポンスを探す
      const foundResponse = mockResponses.find((r) => r.id === responseId);

      setTimeout(() => {
        if (foundResponse) {
          setResponse(foundResponse);
        } else {
          setError('レスポンスが見つかりません');
        }
        setIsLoading(false);
      }, 500);
    };

    if (responseId) {
      fetchResponse();
    } else {
      setError('無効なレスポンスIDです');
      setIsLoading(false);
    }
  }, [responseId]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorDisplay
        message={error}
        onRetry={() => navigate(formId ? `/forms/${formId}/responses` : '/')}
        retryText={formId ? 'レスポンス一覧に戻る' : 'ホームに戻る'}
      />
    );
  }

  if (!response) {
    return (
      <ErrorDisplay
        message="レスポンスが見つかりません"
        onRetry={() => navigate(formId ? `/forms/${formId}/responses` : '/')}
        retryText={formId ? 'レスポンス一覧に戻る' : 'ホームに戻る'}
      />
    );
  }

  const isIndividualView = !formId; // Individual response view when accessed via /responses/:responseId

  return (
    <PageContainer>
      <ResponseDetailHeader
        response={response}
        formId={formId || response.formId}
        isIndividualView={isIndividualView}
      />

      <ResponseContent response={response} />

      <ResponseMetadata response={response} />

      <ResponseActions
        formId={formId || response.formId}
        isIndividualView={isIndividualView}
      />
    </PageContainer>
  );
}
