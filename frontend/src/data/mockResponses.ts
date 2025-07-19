import type { Response } from '../types/form';

// ダミーデータ - 様々なフォーム要素タイプを網羅
export const mockResponses: Response[] = [
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
      feedback:
        'とても良いサービスでした。UIが使いやすく、機能も豊富で満足しています。今後も利用したいと思います。',
      additionalComments: '特にフォーム作成機能が便利でした。',

      // 真偽値
      agreeToTerms: true,
      subscribeNewsletter: false,

      // その他
      websiteUrl: 'https://example.com',
      phoneNumber: '090-1234-5678',
    },
    metadata: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      ipAddress: '192.168.1.100',
      submissionTime: '2024-01-15T10:30:45.123Z',
      browserLanguage: 'ja-JP',
    },
    createdAt: '2024-01-15T10:30:00Z',
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
      feedback:
        '改善の余地があります。もう少し直感的な操作ができると良いと思います。',
      additionalComments: '',

      // 真偽値
      agreeToTerms: true,
      subscribeNewsletter: true,

      // その他
      websiteUrl: '',
      phoneNumber: '080-9876-5432',
    },
    metadata: {
      userAgent:
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15',
      ipAddress: '192.168.1.101',
      submissionTime: '2024-01-14T15:45:12.456Z',
      browserLanguage: 'ja-JP',
    },
    createdAt: '2024-01-14T15:45:00Z',
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
      phoneNumber: null, // 未入力の例
    },
    metadata: {
      userAgent:
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15',
      ipAddress: '192.168.1.102',
      submissionTime: '2024-01-13T09:15:33.789Z',
      browserLanguage: 'ja-JP',
    },
    createdAt: '2024-01-13T09:15:00Z',
  },
];
