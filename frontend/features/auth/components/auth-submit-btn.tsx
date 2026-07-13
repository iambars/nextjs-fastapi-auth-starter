type AuthSubmitButtonProps = {
  pending: boolean;
  pendingText: string;
  text: string;
};

function AuthSubmitButton({
  pending,
  pendingText,
  text,
}: AuthSubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-2 w-full rounded-lg bg-blue-500 py-2 transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? pendingText : text}
    </button>
  );
}

export default AuthSubmitButton;
