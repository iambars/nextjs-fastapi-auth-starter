import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { signInWithGoogle, signInWithGithub } from "@/features/auth/actions";

export default function OAuthButtons() {
  return (
    <div className="flex justify-center gap-4">
      <form action={signInWithGoogle}>
        <button
          type="submit"
          className="dark:border-secondary/20 border-secondary/40 dark:hover:border-secondary/30 hover:border-secondary/70 hover:shadow-secondary/30 cursor-pointer rounded-lg border px-4 py-2.5 transition-all duration-300 hover:shadow-md"
          aria-label="Continue with Google"
        >
          <FcGoogle size={20} />
        </button>
      </form>

      <form action={signInWithGithub}>
        <button
          type="submit"
          className="dark:border-secondary/20 border-secondary/40 dark:hover:border-secondary/30 hover:border-secondary/70 hover:shadow-secondary/30 cursor-pointer rounded-lg border px-4 py-2.5 transition-all duration-300 hover:shadow-md"
          aria-label="Continue with GitHub"
        >
          <FaGithub size={20} />
        </button>
      </form>
    </div>
  );
}
