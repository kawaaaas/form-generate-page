import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import type { Response } from '../types/form';

// ダミーデータ - 様々なフォーム要素タイプを網羅
const mockResponses: Response[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    formId: '550e8400-e29b-41d4-a716-446655440000',
    data: {
      // テキスト入力
      fullName: '山田太郎',
      email: 'yamada@example.com',
      
      // 数値入力
      age: 25,
      salary: 5000000,
      
      // 日付入力
      birthDate: '1999-03-15',
      appointmentDate: '2024-02-20',
      
      // ラジオボタン
      gender: '男性',
      satisfaction: '非常に満足',
      
      // セレクトボックス
      prefecture: '東京都',
      jobTitle: 'エンジニア',
      
      // チェックボックス（複数選択）
      interests: ['プログラミング', 'ゲーム', '映画'],
      skills: ['JavaScript', 'TypeScript', 'React'],
      
      // テキストエリア
      feedback: 'とても良いサービスでした。UIが使いやすく、機能も豊富で満足しています。今後も利用したいと思います。',
      additionalComments: '特にフォーム作成機能が便利でした。',
      
      // 真偽値
      agreeToTerms: true,
      subscribeNewsletter: false,
      
      // その他
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
      // テキスト入力
      fullName: '佐藤花子',
      email: 'sato@example.com',
      
      // 数値入力
      age: 32,
      salary: 4200000,
      
      // 日付入力
      birthDate: '1991-08-22',
      appointmentDate: '2024-02-18',
      
      // ラジオボタン
      gender: '女性',
      satisfaction: '満足',
      
      // セレクトボックス
      prefecture: '大阪府',
      jobTitle: 'デザイナー',
      
      // チェックボックス（複数選択）
      interests: ['デザイン', '読書'],
      skills: ['Figma', 'Photoshop'],
      
      // テキストエリア
      feedback: '改善の余地があります。もう少し直感的な操作ができると良いと思います。',
      additionalComments: '',
      
      // 真偽値
      agreeToTerms: true,
      subscribeNewsletter: true,
      
      // その他
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
      // テキスト入力
      fullName: '田中次郎',
      email: 'tanaka@example.com',
      
      // 数値入力
      age: 28,
      salary: null, // 未入力の例
      
      // 日付入力
      birthDate: '1995-12-03',
      appointmentDate: null, // 未入力の例
      
      // ラジオボタン
      gender: 'その他',
      satisfaction: '普通',
      
      // セレクトボックス
      prefecture: '福岡県',
      jobTitle: 'マーケター',
      
      // チェックボックス（複数選択）
      interests: ['旅行', 'スポーツ', '音楽', '料理'],
      skills: [], // 選択なしの例
      
      // テキストエリア
      feedback: '普通です。可もなく不可もなくといった感じでした。',
      additionalComments: null, // 未入力の例
      
      // 真偽値
      agreeToTerms: true,
      subscribeNewsletter: false,
      
      // その他
      websiteUrl: 'https://tanaka-blog.com',
      phoneNumber: null // 未入力の例
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

export default function ResponseDetailPage() {
  const { formId, responseId } = useParams<{ formId: string; responseId: string }>();
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
      const foundResponse = mockResponses.find(r => r.id === responseId);
      
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatValue = (key: string, value: unknown): string => {
    if (value === null || value === undefined || value === '') {
      return '（未入力）';
    }
    
    // 配列（チェックボックスなど）
    if (Array.isArray(value)) {
      if (value.length === 0) {
        return '（選択なし）';
      }
      return value.join(', ');
    }
    
    // 真偽値
    if (typeof value === 'boolean') {
      return value ? 'はい' : 'いいえ';
    }
    
    // 数値フォーマット
    if (typeof value === 'number') {
      // 給与などの金額系
      if (key.toLowerCase().includes('salary') || key.toLowerCase().includes('price') || key.toLowerCase().includes('amount')) {
        return value.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY' });
      }
      // 年齢など
      if (key.toLowerCase().includes('age')) {
        return `${value}歳`;
      }
      return value.toLocaleString('ja-JP');
    }
    
    // 日付フォーマット
    if (typeof value === 'string') {
      // 日付形式の文字列を検出
      if (key.toLowerCase().includes('date') || /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        try {
          const date = new Date(value);
          if (!isNaN(date.getTime())) {
            return date.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              weekday: 'short'
            });
          }
        } catch {
          // フォーマットに失敗した場合はそのまま表示
        }
      }
      
      // URLの場合
      if (key.toLowerCase().includes('url') || key.toLowerCase().includes('website')) {
        return value;
      }
      
      // 電話番号のフォーマット
      if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('tel')) {
        return value;
      }
      
      // メールアドレス
      if (key.toLowerCase().includes('email') || key.toLowerCase().includes('mail')) {
        return value;
      }
    }
    
    return String(value);
  };

  const getFieldDisplayName = (key: string): string => {
    const fieldNames: Record<string, string> = {
      fullName: '氏名',
      email: 'メールアドレス',
      age: '年齢',
      salary: '年収',
      birthDate: '生年月日',
      appointmentDate: '希望面談日',
      gender: '性別',
      satisfaction: '満足度',
      prefecture: '都道府県',
      jobTitle: '職種',
      interests: '興味のある分野',
      skills: 'スキル',
      feedback: 'フィードバック',
      additionalComments: '追加コメント',
      agreeToTerms: '利用規約への同意',
      subscribeNewsletter: 'ニュースレター購読',
      websiteUrl: 'ウェブサイトURL',
      phoneNumber: '電話番号'
    };
    
    return fieldNames[key] || key;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 mb-4">{error}</div>
          <button
            type="button"
            onClick={() => navigate(`/forms/${formId}/responses`)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← レスポンス一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-4">レスポンスが見つかりません</div>
          <button
            type="button"
            onClick={() => navigate(`/forms/${formId}/responses`)}
            className="text-blue-600 hover:text-blue-800"
          >
            ← レスポンス一覧に戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="mb-6">
          <Link
            to={`/forms/${formId}/responses`}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            ← レスポンス一覧に戻る
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 mt-4">
            レスポンス詳細
          </h1>
          <div className="text-sm text-gray-500 space-y-1">
            <p>レスポンスID: {response.id}</p>
            <p>フォームID: {response.formId}</p>
            <p>回答日時: {formatDate(response.createdAt)}</p>
          </div>
        </div>

        {/* レスポンス内容 */}
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
                <div key={key} className="border-b border-gray-100 last:border-b-0 pb-4 last:pb-0">
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

        {/* メタデータ */}
        {response.metadata && Object.keys(response.metadata).length > 0 && (
          <div className="bg-white rounded-lg shadow mt-6">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">メタデータ</h2>
              <p className="text-sm text-gray-500 mt-1">
                技術的な情報
              </p>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                {Object.entries(response.metadata).map(([key, value]) => (
                  <div key={key} className="flex flex-col sm:flex-row sm:items-center">
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
        )}

        {/* アクション */}
        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <Link
            to={`/forms/${formId}/responses`}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            ← レスポンス一覧に戻る
          </Link>
          
          <div className="flex space-x-4">
            <Link
              to={`/forms/${formId}`}
              className="text-gray-600 hover:text-gray-800 text-sm"
            >
              フォームを見る
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
