import { logout } from "@/features/auth/actions";

export default function DashboardPage() {
  return (
    <main className="bg-muted/40 flex min-h-screen items-center justify-center p-6">
      <section className="bg-background w-full max-w-lg rounded-lg border p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          You are signed in successfully.
        </p>

        <form className="mt-6" action={logout}>
          <button
            type="submit"
            className="bg-destructive text-destructive-foreground rounded-md px-4 py-2 text-sm font-medium"
          >
            Log out
          </button>
        </form>
      </section>
    </main>
  );
}
