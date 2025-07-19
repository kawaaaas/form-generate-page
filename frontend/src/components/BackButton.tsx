import { Link } from 'react-router-dom';

interface BackButtonProps {
  text: string;
}

export default function BackButton({ text }: BackButtonProps) {
  return (
    <Link
      to="/"
      className="text-blue-600 hover:text-blue-700 text-sm font-medium"
    >
      ← {text}
    </Link>
  );
}
