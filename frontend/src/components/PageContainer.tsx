import type { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '4xl';
}

export default function PageContainer({
  children,
  maxWidth = '4xl',
}: PageContainerProps) {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
    '4xl': 'max-w-4xl',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className={`${maxWidthClasses[maxWidth]} mx-auto px-4 py-8`}>
        {children}
      </div>
    </div>
  );
}
