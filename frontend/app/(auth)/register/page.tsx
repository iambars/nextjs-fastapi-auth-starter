"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { register, RegisterState } from "./actions";
import {
  AuthHeader,
  OAuthButtons,
  AuthDivider,
  ErrorText,
  AuthSubmitButton,
  FormInput,
} from "@/app/components/auth";

const initialState: RegisterState = {
  success: false,
  redirect: null,
  errors: {},
};

export default function RegisterPage() {
  const router = useRouter();
  const [state, formAction, pending] = useActionState(register, initialState);

  useEffect(() => {
    if (state.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-secondary/20 w-full max-w-md space-y-6 rounded-xl border p-6 shadow-lg">
        <AuthHeader
          title="Create Account"
          subtitle="Already have an account?"
          linkHref="/login"
          linkText="Sign in"
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
            label="First name"
            id="firstName"
            name="firstName"
            placeholder="John"
            autoComplete="given-name"
            errorMessage={state.errors?.firstName}
          />

          <FormInput
            label="Last name"
            id="lastName"
            name="lastName"
            placeholder="Doe"
            autoComplete="family-name"
            errorMessage={state.errors?.lastName}
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
            pendingText="Creating account..."
            text="Create account"
          />
        </form>
      </div>
    </div>
  );
}
