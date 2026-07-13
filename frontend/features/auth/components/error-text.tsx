export default function ErrorText({ message }: { message?: string }) {
  return (
    <p
      className="min-h-4 text-xs text-red-500 dark:text-orange-500/85"
      aria-live="polite"
    >
      {message ?? "\u00A0"}
    </p>
  );
}
