import type { FormElement, FormSchemaType, FormSettings } from '../types/form';

// Mock form for testing form response functionality
export const mockForm = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  title: '求人応募フォーム',
  description:
    'この度は弊社にご興味をお持ちいただき、ありがとうございます。以下のフォームにご記入ください。',
  schema: {
    elements: [
      {
        id: 'fullName',
        type: 'input',
        label: '氏名',
        name: 'fullName',
        placeholder: '山田太郎',
        validation: {
          required: true,
          minLength: 2,
          maxLength: 50,
          customMessage: '氏名は2文字以上50文字以下で入力してください',
        },
      },
      {
        id: 'email',
        type: 'input',
        label: 'メールアドレス',
        name: 'email',
        placeholder: 'example@email.com',
        validation: {
          required: true,
          pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
          customMessage: '有効なメールアドレスを入力してください',
        },
      },
      {
        id: 'age',
        type: 'number',
        label: '年齢',
        name: 'age',
        placeholder: '25',
        validation: {
          required: true,
          min: 18,
          max: 65,
          customMessage: '年齢は18歳以上65歳以下で入力してください',
        },
      },
      {
        id: 'birthDate',
        type: 'date',
        label: '生年月日',
        name: 'birthDate',
        validation: {
          required: true,
        },
      },
      {
        id: 'gender',
        type: 'radio',
        label: '性別',
        name: 'gender',
        options: ['男性', '女性', 'その他', '回答しない'],
        validation: {
          required: true,
        },
      },
      {
        id: 'prefecture',
        type: 'select',
        label: '都道府県',
        name: 'prefecture',
        options: [
          '北海道',
          '青森県',
          '岩手県',
          '宮城県',
          '秋田県',
          '山形県',
          '福島県',
          '茨城県',
          '栃木県',
          '群馬県',
          '埼玉県',
          '千葉県',
          '東京都',
          '神奈川県',
          '新潟県',
          '富山県',
          '石川県',
          '福井県',
          '山梨県',
          '長野県',
          '岐阜県',
          '静岡県',
          '愛知県',
          '三重県',
          '滋賀県',
          '京都府',
          '大阪府',
          '兵庫県',
          '奈良県',
          '和歌山県',
          '鳥取県',
          '島根県',
          '岡山県',
          '広島県',
          '山口県',
          '徳島県',
          '香川県',
          '愛媛県',
          '高知県',
          '福岡県',
          '佐賀県',
          '長崎県',
          '熊本県',
          '大分県',
          '宮崎県',
          '鹿児島県',
          '沖縄県',
        ],
        validation: {
          required: true,
        },
      },
      {
        id: 'jobTitle',
        type: 'select',
        label: '希望職種',
        name: 'jobTitle',
        options: [
          'エンジニア',
          'デザイナー',
          'マーケター',
          '営業',
          '企画',
          'コンサルタント',
          'その他',
        ],
        validation: {
          required: true,
        },
      },
      {
        id: 'skills',
        type: 'checkbox',
        label: 'スキル（複数選択可）',
        name: 'skills',
        options: [
          'JavaScript',
          'TypeScript',
          'React',
          'Vue.js',
          'Angular',
          'Node.js',
          'Python',
          'Java',
          'PHP',
          'Go',
          'Rust',
          'Swift',
          'Kotlin',
          'Figma',
          'Photoshop',
          'Illustrator',
        ],
        validation: {
          required: false,
        },
      },
      {
        id: 'interests',
        type: 'checkbox',
        label: '興味のある分野（複数選択可）',
        name: 'interests',
        options: [
          'プログラミング',
          'デザイン',
          'マーケティング',
          'ゲーム',
          '映画',
          '読書',
          '旅行',
          'スポーツ',
          '音楽',
          '料理',
        ],
        validation: {
          required: false,
        },
      },
      {
        id: 'salary',
        type: 'number',
        label: '希望年収（万円）',
        name: 'salary',
        placeholder: '500',
        validation: {
          required: false,
          min: 200,
          max: 2000,
          customMessage: '希望年収は200万円以上2000万円以下で入力してください',
        },
      },
      {
        id: 'appointmentDate',
        type: 'date',
        label: '希望面談日',
        name: 'appointmentDate',
        validation: {
          required: false,
        },
      },
      {
        id: 'phoneNumber',
        type: 'input',
        label: '電話番号',
        name: 'phoneNumber',
        placeholder: '090-1234-5678',
        validation: {
          required: false,
          pattern: '^0\\d{1,4}-\\d{1,4}-\\d{4}$',
          customMessage:
            '有効な電話番号を入力してください（例：090-1234-5678）',
        },
      },
      {
        id: 'websiteUrl',
        type: 'input',
        label: 'ウェブサイトURL',
        name: 'websiteUrl',
        placeholder: 'https://example.com',
        validation: {
          required: false,
          pattern: "^https?://[\\w\\-._~:/?#[\\]@!$&'()*+,;=%]+$",
          customMessage: '有効なURLを入力してください',
        },
      },
      {
        id: 'feedback',
        type: 'textarea',
        label: '志望動機・自己PR',
        name: 'feedback',
        placeholder: 'ご自身の経験やスキル、志望動機などをご記入ください',
        validation: {
          required: true,
          minLength: 50,
          maxLength: 1000,
          customMessage: '志望動機は50文字以上1000文字以下で入力してください',
        },
      },
      {
        id: 'additionalComments',
        type: 'textarea',
        label: '追加コメント',
        name: 'additionalComments',
        placeholder: 'その他、お聞かせいただきたいことがあればご記入ください',
        validation: {
          required: false,
          maxLength: 500,
          customMessage: '追加コメントは500文字以下で入力してください',
        },
      },
      {
        id: 'agreeToTerms',
        type: 'checkbox',
        label: '利用規約に同意する',
        name: 'agreeToTerms',
        options: ['利用規約に同意します'],
        validation: {
          required: true,
          customMessage: '利用規約への同意が必要です',
        },
      },
      {
        id: 'subscribeNewsletter',
        type: 'checkbox',
        label: 'ニュースレターの購読',
        name: 'subscribeNewsletter',
        options: ['ニュースレターを購読する'],
        validation: {
          required: false,
        },
      },
    ] as FormElement[],
  } as FormSchemaType,
  settings: {
    requiresPassword: true,
    confirmationMessage:
      'ご応募ありがとうございました。追って担当者よりご連絡いたします。',
  } as FormSettings,
  isActive: true,
  createdAt: '2024-01-10T00:00:00Z',
  updatedAt: '2024-01-10T00:00:00Z',
};

// Mock form with password protection
export const mockPasswordProtectedForm = {
  ...mockForm,
  id: '550e8400-e29b-41d4-a716-446655440001',
  title: 'パスワード保護フォーム',
  description: 'このフォームはパスワードで保護されています。',
  settings: {
    requiresPassword: true,
    confirmationMessage: 'フォームの送信が完了しました。',
  } as FormSettings,
};
