interface FormHeaderProps {
  title: string;
  description?: string;
}

export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{title}</h1>
      {description && (
        <p className="text-gray-600 whitespace-pre-wrap">{description}</p>
      )}
    </div>
  );
}
