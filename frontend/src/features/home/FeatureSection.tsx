export default function FeatureSection() {
  const features = [
    {
      title: '簡単作成',
      description: 'ドラッグ&ドロップで直感的にフォームを作成できます',
      icon: '📝',
    },
    {
      title: 'パスワード保護',
      description: 'オプションでパスワード保護を設定できます',
      icon: '🔒',
    },
    {
      title: '回答管理',
      description: '収集した回答を一覧で確認・管理できます',
      icon: '📊',
    },
  ];

  return (
    <div className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          主な機能
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
