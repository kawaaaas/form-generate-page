interface SubmitButtonProps {
  isSubmitting: boolean;
  submittingText?: string;
  submitText?: string;
  disabled?: boolean;
}

export default function SubmitButton({
  isSubmitting,
  submittingText = '送信中...',
  submitText = '送信',
  disabled = false,
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={isSubmitting || disabled}
      className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
    >
      {isSubmitting ? submittingText : submitText}
    </button>
  );
}
