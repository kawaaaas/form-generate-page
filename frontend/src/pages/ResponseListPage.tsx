import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Response } from '../types/form';

// ダミーデータ - 様々なフォーム要素タイプを網羅
const mockResponses: Response[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    formId: '550e8400-e29b-41d4-a716-446655440000',
    data: {
      fullName: '山田太郎',
      email: 'yamada@example.com',
      age: 25,
      salary: 5000000,
      birthDate: '1999-03-15',
      appointmentDate: '2024-02-20',
      gender: '男性',
      satisfaction: '非常に満足',
      prefecture: '東京都',
      jobTitle: 'エンジニア',
      interests: ['プログラミング', 'ゲーム', '映画'],
      skills: ['JavaScript', 'TypeScript', 'React'],
      feedback: 'とても良いサービスでした。UIが使いやすく、機能も豊富で満足しています。今後も利用したいと思います。',
      additionalComments: '特にフォーム作成機能が便利でした。',
      agreeToTerms: true,
      subscribeNewsletter: false,
      websiteUrl: 'https://example.com',
      phoneNumber: '090-1234-5678'
    },
    metadata: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ipAddress: '192.168.1.100',
      submissionTime: '2024-01-15T10:30:45.123Z',
      browserLanguage: 'ja-JP'
    },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    formId: '550e8400-e29b-41d4-a716-446655440000',
    data: {
      fullName: '佐藤花子',
      email: 'sato@example.com',
      age: 32,
      salary: 4200000,
      birthDate: '1991-08-22',
      appointmentDate: '2024-02-18',
      gender: '女性',
      satisfaction: '満足',
      prefecture: '大阪府',
      jobTitle: 'デザイナー',
      interests: ['デザイン', '読書'],
      skills: ['Figma', 'Photoshop'],
      feedback: '改善の余地があります。もう少し直感的な操作ができると良いと思います。',
      additionalComments: '',
      agreeToTerms: true,
      subscribeNewsletter: true,
      websiteUrl: '',
      phoneNumber: '080-9876-5432'
    },
    metadata: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      ipAddress: '192.168.1.101',
      submissionTime: '2024-01-14T15:45:12.456Z',
      browserLanguage: 'ja-JP'
    },
    createdAt: '2024-01-14T15:45:00Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    formId: '550e8400-e29b-41d4-a716-446655440000',
    data: {
      fullName: '田中次郎',
      email: 'tanaka@example.com',
      age: 28,
      salary: null,
      birthDate: '1995-12-03',
      appointmentDate: null,
      gender: 'その他',
      satisfaction: '普通',
      prefecture: '福岡県',
      jobTitle: 'マーケター',
      interests: ['旅行', 'スポーツ', '音楽', '料理'],
      skills: [],
      feedback: '普通です。可もなく不可もなくといった感じでした。',
      additionalComments: null,
      agreeToTerms: true,
      subscribeNewsletter: false,
      websiteUrl: 'https://tanaka-blog.com',
      phoneNumber: null
    },
    metadata: {
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      ipAddress: '192.168.1.102',
      submissionTime: '2024-01-13T09:15:33.789Z',
      browserLanguage: 'ja-JP'
    },
    createdAt: '2024-01-13T09:15:00Z'
  }
];

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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            レスポンス一覧
          </h1>
          <p className="text-gray-600">
            フォームID: {formId}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            合計 {responses.length} 件のレスポンス
          </p>
        </div>

        {responses.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500">まだレスポンスがありません</p>
          </div>
        ) : (
          <div className="space-y-4">
            {responses.map((response) => (
              <div
                key={response.id}
                className="bg-white rounded-lg shadow hover:shadow-md transition-shadow"
              >
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
                    {Object.entries(response.data).slice(0, 4).map(([key, value]) => (
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
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Link
            to={`/forms/${formId}`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← フォームに戻る
          </Link>
        </div>
      </div>
    </div>
  );
}
