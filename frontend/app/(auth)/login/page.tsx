"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { authenticate, LoginState } from "./actions";
import {
  AuthHeader,
  OAuthButtons,
  AuthDivider,
  FormInput,
  ErrorText,
  AuthSubmitButton,
} from "@/app/components/auth";

const initialState: LoginState = {
  success: false,
  redirect: null,
  errors: {},
};

export default function LoginPage() {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    authenticate,
    initialState,
  );

  useEffect(() => {
    if (state?.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-secondary/20 w-full max-w-md space-y-6 rounded-xl border p-6 shadow-lg">
        <AuthHeader
          title="Welcome Back"
          subtitle="Don't have an account?"
          linkHref="/register"
          linkText="Create one"
        />

        <OAuthButtons />

        <AuthDivider />

        {/* Form */}
        <form action={formAction} noValidate>
          <FormInput
            label="Email address"
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            errorMessage={state.errors?.email}
          />

          <FormInput
            label="Password"
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            required
            errorMessage={state.errors?.password}
          />

          <ErrorText message={state.errors?.form} />

          <AuthSubmitButton
            pending={pending}
            pendingText="Signing in..."
            text="Sign in"
          />
        </form>
      </div>
    </div>
  );
}
