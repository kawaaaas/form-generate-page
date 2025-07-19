import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <div className="py-16 text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        フォーム作成ツール
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        簡単にフォームを作成し、回答を収集できます。ログイン不要で誰でも利用可能です。
      </p>
      <Link
        to="/forms/create"
        className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors"
      >
        フォームを作成する
      </Link>
    </div>
  );
}
