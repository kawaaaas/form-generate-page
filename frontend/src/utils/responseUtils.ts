import { formatDateOnly } from './dateUtils';

export const formatValue = (key: string, value: unknown): string => {
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
    if (
      key.toLowerCase().includes('salary') ||
      key.toLowerCase().includes('price') ||
      key.toLowerCase().includes('amount')
    ) {
      return value.toLocaleString('ja-JP', {
        style: 'currency',
        currency: 'JPY',
      });
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
    if (
      key.toLowerCase().includes('date') ||
      /^\d{4}-\d{2}-\d{2}$/.test(value)
    ) {
      try {
        const date = new Date(value);
        if (!Number.isNaN(date.getTime())) {
          return formatDateOnly(value);
        }
      } catch {
        // フォーマットに失敗した場合はそのまま表示
      }
    }

    // URLの場合
    if (
      key.toLowerCase().includes('url') ||
      key.toLowerCase().includes('website')
    ) {
      return value;
    }

    // 電話番号のフォーマット
    if (
      key.toLowerCase().includes('phone') ||
      key.toLowerCase().includes('tel')
    ) {
      return value;
    }

    // メールアドレス
    if (
      key.toLowerCase().includes('email') ||
      key.toLowerCase().includes('mail')
    ) {
      return value;
    }
  }

  return String(value);
};

export const getFieldDisplayName = (key: string): string => {
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
    phoneNumber: '電話番号',
  };

  return fieldNames[key] || key;
};
