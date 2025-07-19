interface PrivacyNoticeProps {
  context: 'create' | 'respond';
}

export default function PrivacyNotice({ context }: PrivacyNoticeProps) {
  if (context === 'create') {
    return (
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-amber-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.734-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-amber-800">
              ⚠️ 個人情報の取り扱いについて
            </h3>
            <div className="mt-2 text-sm text-amber-700">
              <p className="mb-2">
                このアプリケーションは簡易的なフォーム作成ツールです。以下の点にご注意ください：
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <strong>
                    個人情報を収集するフォームは作成しないでください
                  </strong>
                </li>
                <li>
                  氏名、住所、電話番号、メールアドレス等の個人を特定できる情報
                </li>
                <li>マイナンバー、クレジットカード情報等の機密情報</li>
                <li>
                  本アプリは特別な認証機能を持たないため、機密性の高い情報には適していません
                </li>
              </ul>
              <p className="mt-2 font-medium">
                適切な用途：アンケート、意見収集、イベント参加確認など
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-blue-800">
            🔒 個人情報保護のお知らせ
          </h3>
          <div className="mt-2 text-sm text-blue-700">
            <p className="mb-2">回答する前に以下をご確認ください：</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <strong>
                  個人情報（氏名、住所、電話番号等）の入力は避けてください
                </strong>
              </li>
              <li>
                このフォームは簡易的なツールで、特別な暗号化機能はありません
              </li>
              <li>機密性の高い情報の入力には適していません</li>
              <li>
                入力された情報は適切に管理されますが、リスクをご理解の上でご回答ください
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
