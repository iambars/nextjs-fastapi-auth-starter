import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-background flex flex-1 flex-col items-center justify-center font-sans">
      <main className="bg-background flex min-h-screen w-full max-w-3xl flex-1 flex-col items-center justify-center px-16 py-32 sm:items-start">
        <div className="flex w-full flex-col justify-center">
          <h1 className="text-primary/95 text-5xl font-bold tracking-tight">
            Auth Starter
          </h1>

          <p className="text-secondary mt-6 max-w-2xl text-lg">
            A modern authentication starter built with Next.js, NextAuth,
            FastAPI, and PostgreSQL. Securely sign in with email and password or
            continue with your favorite OAuth provider.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/register"
              className="bg-foreground/80 text-background hover:bg-foreground flex h-12 items-center justify-center rounded-full px-8 transition duration-300 hover:scale-105"
            >
              Create Account
            </Link>

            <Link
              href="/login"
              className="border-border hover:bg-foreground/10 flex h-12 items-center justify-center rounded-full border px-8 transition duration-300 hover:scale-105"
            >
              Sign In
            </Link>
          </div>

          <div className="border-border mt-16 w-full rounded-2xl border p-6 text-left">
            <h2 className="text-lg font-semibold">Features</h2>

            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div>
                <h3 className="font-medium">Authentication</h3>

                <ul className="text-secondary mt-2 space-y-1">
                  <li>• Email & Password</li>
                  <li>• Google Sign-In</li>
                  <li>• GitHub Sign-In</li>
                </ul>
              </div>

              <div>
                <h3 className="font-medium">Security</h3>

                <ul className="text-secondary mt-2 space-y-1">
                  <li>• JWT Sessions</li>
                  <li>• Refresh Tokens</li>
                  <li>• Protected Routes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
