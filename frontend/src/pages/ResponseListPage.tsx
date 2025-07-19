import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import PageContainer from '../components/PageContainer';
import { mockResponses } from '../data/mockResponses';
import ResponseHeader from '../features/response/ResponseHeader';
import ResponseList from '../features/response/ResponseList';
import type { Response } from '../types/form';

export default function ResponseListPage() {
  const { formId } = useParams<{ formId: string }>();
  const [responses, setResponses] = useState<Response[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // TODO: 実際のAPIコールに置き換える
    const fetchResponses = async () => {
      setIsLoading(true);
      // ダミーデータをロード
      setTimeout(() => {
        setResponses(mockResponses);
        setIsLoading(false);
      }, 500);
    };

    fetchResponses();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <PageContainer>
      <ResponseHeader
        title="レスポンス一覧"
        formId={formId || ''}
        count={responses.length}
      />

      <ResponseList responses={responses} formId={formId || ''} />

      <div className="mt-8 text-center">
        <Link
          to={`/forms/${formId}`}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          ← フォームに戻る
        </Link>
      </div>
    </PageContainer>
  );
}
