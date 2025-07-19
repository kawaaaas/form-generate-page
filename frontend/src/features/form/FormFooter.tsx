import SubmitButton from '../../components/SubmitButton';

interface FormFooterProps {
  isSubmitting: boolean;
  onBack: () => void;
}

export default function FormFooter({ isSubmitting, onBack }: FormFooterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200">
      <button
        type="button"
        onClick={onBack}
        className="text-gray-600 hover:text-gray-800 text-sm mb-4 sm:mb-0"
      >
        ← ホームに戻る
      </button>

      <SubmitButton isSubmitting={isSubmitting} />
    </div>
  );
}
