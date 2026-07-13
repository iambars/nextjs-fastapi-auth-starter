"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  AuthHeader,
  OAuthButtons,
  AuthDivider,
  ErrorText,
  AuthSubmitButton,
  FormInput,
} from "@/features/auth/components";
import { AuthState } from "@/features/auth/types";
import { authenticate, register } from "@/features/auth/actions";

type AuthMode = "login" | "register";

const initialState: AuthState = {
  success: false,
  redirect: null,
  errors: {},
};

interface AuthFormProps {
  mode: AuthMode;
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const isRegister = mode === "register";

  const [state, formAction, pending] = useActionState(
    (isRegister ? register : authenticate) as (
      state: AuthState,
      formData: FormData,
    ) => Promise<AuthState>,
    initialState,
  );

  useEffect(() => {
    if (state.success && state.redirect) {
      router.push(state.redirect);
    }
  }, [state, router]);

  return (
    <div className="bg-background flex min-h-screen items-center justify-center px-4">
      <div className="border-secondary/20 w-full max-w-md space-y-6 rounded-xl border p-6 shadow-lg">
        <AuthHeader
          title={isRegister ? "Create Account" : "Welcome Back"}
          subtitle={
            isRegister ? "Already have an account?" : "Don't have an account?"
          }
          linkHref={isRegister ? "/login" : "/register"}
          linkText={isRegister ? "Sign in" : "Create one"}
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

          {isRegister && (
            <>
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
            </>
          )}

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
            pendingText={isRegister ? "Creating account..." : "Signing in..."}
            text={isRegister ? "Create account" : "Sign in"}
          />
        </form>
      </div>
    </div>
  );
}
