import BackButton from '../../components/BackButton';

export default function CreateHeader() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-gray-900">フォーム作成</h1>

        <BackButton text="ホームに戻る" />
      </div>
      <p className="text-gray-600">
        フォームを作成して、回答を収集しましょう。必要な項目を追加して、カスタマイズできます。
      </p>
    </div>
  );
}
