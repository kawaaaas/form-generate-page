export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      // Use the modern Clipboard API
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'absolute';
    textArea.style.left = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    const successful = document.execCommand('copy');
    document.body.removeChild(textArea);
    return successful;
  } catch (error) {
    console.error('Failed to copy text to clipboard:', error);
    return false;
  }
};
