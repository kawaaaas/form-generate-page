type ActionButtonProps = {
  onClick: () => void;
  text: string;
  disabled?: boolean;
};

export default function ActionButton({
  onClick,
  text,
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      className={`px-6 py-2 rounded-lg transition-colors ${
        disabled
          ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700'
      }`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
}
