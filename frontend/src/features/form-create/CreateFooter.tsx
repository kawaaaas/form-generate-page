export default function CreateFooter() {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-900 mb-4">💡 ヒント</h3>
          <div className="space-y-3 text-sm text-blue-800">
            <p>• フォーム要素をドラッグして順序を変更できます</p>
            <p>• 必須項目を設定して入力漏れを防げます</p>
            <p>• パスワード保護で限定公開も可能です</p>
            <p>• プレビューで実際の表示を確認しましょう</p>
          </div>
        </div>

        <div className="mt-6 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            📊 フォーム統計
          </h3>
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>フォーム要素数:</span>
              <span className="font-medium">0個</span>
            </div>
            <div className="flex justify-between">
              <span>必須項目数:</span>
              <span className="font-medium">0個</span>
            </div>
            <div className="flex justify-between">
              <span>推定回答時間:</span>
              <span className="font-medium">約1分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
